"use client"
import * as React from "react"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import NewSensorButton from "@/components/sensor/newSensorButton";
import CropCard from "../../components/crop/cropCard";
import { useEffect, useState } from "react";
import NewCropButton from "@/components/crop/newCropButton";
import NewNodeButton from "@/components/sensorNode/newNodeButton";
import Loading from "@/components/ui/loading";

interface CropDashboardProps {
    loading: boolean,
    refresh: () => void,
    crops?: Crop[]
}

function CropDashboard({...props} : CropDashboardProps) {
    const crops = props.crops
    if (props.crops == undefined || props.loading) {
        return <p></p>
    } 
    return (
        <div className="m-2 flex flex-row flex-wrap">
            {props.crops.map((crop) => (
                <div key={crop.id} className="m-2">
                    <CropCard crop={crop} onSubmit={props.refresh} />
                </div>
            ))}
        </div>
    )
}

export default function Home() {
    const [crops, setCrops] = useState<Crop[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('/api/groups')
        .then((res) => res.json())
        .then((data) => {
            setCrops(data.items)
            setIsLoading(false)
        });

        // WebSocketExample.js
        const ws = new WebSocket("ws://localhost:8080/ws");
        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };
        ws.onmessage = (event) => {
            // Handle incoming messages
            console.log("Received:", event.data);
        };
        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };
        return () => {
            ws.close();
        };
    }, []);

    const refresh = () => {
        fetch('api/groups')
        .then((res) => res.json())
        .then((data) => {
            setCrops(data.items);
            setIsLoading(false);
        })
    };
    
    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="ml-4">
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
            {isLoading 
                ? <Loading text="Cargando" />
                : <CropDashboard loading={isLoading} crops={crops} refresh={refresh} />}
        </>
    );
}