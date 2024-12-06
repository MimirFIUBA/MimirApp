"use client"
import * as React from "react"

import { HomeIcon, ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import NewSensorButton from "@/components/sensor/newSensorButton";
import { useEffect, useState } from "react";
import NewCropButton from "@/components/crop/newCropButton";
import NewNodeButton from "@/components/sensorNode/newNodeButton";
import Loading from "@/components/ui/loading";
import ErrorDisplayer from "@/components/error-displayer";
import PageHeader from "@/components/page-header";
import { useWebSocket } from "@/hooks/websocket-provider";
import { CropDashboard } from "@/components/crop/crop-dashboard";


function updateSensorReading(
    crops: Crop[],
    sensorId: string,
    value: SensorReading
): Crop[] {
    var updatedCrops: Crop[] = [];

    if (crops != null) {
        var updatedCrops = crops.map((crop) => {
            if (crop.nodes != null) {
                const updatedNodes = crop.nodes.map((node) => {
                    if (node.sensors != null) {
                        const updatedSensors = node.sensors.map((sensor) => {
                            if (sensor.name === sensorId) {
                                return {
                                    ...sensor,
                                    lastSensedReading: value,
                                };
                            }
                            return sensor;
                        });
    
                        return {
                            ...node,
                            sensors: updatedSensors,
                        };
                    }
                    return node;
                });
                return {
                    ...crop,
                    nodes: updatedNodes,
                };
            }
            return crop;
        });
    
        if (updatedCrops != undefined) {
            return updatedCrops
        }
    }
    return [];
}

export default function HomeCmp() {
    const [crops, setCrops] = useState<Crop[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const { messages, isConnected, sendMessage } = useWebSocket();
    
    useEffect(() => {
        // Escucha solo los mensajes relevantes para actualizar el valor del sensor
        const latestSensorMessage = messages.findLast((msg) => msg.type === "update");
    
        if (latestSensorMessage) {
            const sensorId: string = latestSensorMessage.payload.sensorId
            const value: Object = latestSensorMessage.payload.value
            const reading: SensorReading = {
                value: value,
                topic: sensorId,
                time: new Date()
            }
            if (crops != undefined) {
                let updatedCrops = updateSensorReading(crops, sensorId, reading)
                setCrops(updatedCrops)
            }
        }
    }, [messages, crops]);

    useEffect(() => {
        refresh()
    }, []);

    const refresh = () => {
        setIsLoading(true)
        fetch('/api/groups')
        .then((res) => {
            if (res.status != 200) {
                throw new Error(res.statusText)
            } else {
                return res.json()
            }
        })
        .then((data) => {
            setCrops(data.items)
        })
        .catch(error => {
            setErrorMessage("No pudimos cargar la informacion de los cultivos: " + error.message)
        })
        .finally(() => {
            setIsLoading(false)
        });
    };
    
    return (
        <>
        <PageHeader className="p-6"
            icon={<HomeIcon width={24} height={24}/>}
            title="Home"
            rigthComponent={
                <div className="flex flex-row justify-between">
                    <div className="mr-4">
                        <Button variant="outline" className="mr-2" size="icon" onClick={refresh}>
                            <ReloadIcon className="h-4 w-4 m-2" />
                        </Button>
                    </div>

                    <div className="space-x-2">
                        <NewCropButton onSubmit={refresh} />
                        <NewNodeButton crops={crops} onSubmit={refresh}/>
                        <NewSensorButton crops={crops} onSubmit={refresh}/>
                    </div>
                </div>
            }
        >
        </PageHeader>
            {
                errorMessage != "" &&
                <ErrorDisplayer message={errorMessage}></ErrorDisplayer>
            }
            {
                isLoading && <Loading text="Cargando" />
            }
            {
                !isLoading && errorMessage == "" &&
                <CropDashboard loading={isLoading} crops={crops} refresh={refresh}/>
            }
        </>
    );
}