'use client'

import ErrorDisplayer from '@/components/error-displayer';
import PageHeader from '@/components/page-header';
import NewAlertButton from '@/components/triggers/new-alert-button';
import NewTriggerButton from '@/components/triggers/new-trigger-button';
import NewTimerButton from '@/components/triggers/new-timer-button';
import Loading from '@/components/ui/loading';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect, useState } from 'react';
import HandlerDetail from '@/components/handlers/handler-detail';
import NewHandlerButton from '@/components/handlers/new-handler-button';
import { Delete, Rocket, Sensors, SensorsOff, StopCircle } from '@mui/icons-material';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebSocket } from '@/hooks/websocket-provider';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';


export default function Page({ params }: { params: { id: string } }) {
    const [sensor, setSensor] = useState<Sensor>({} as Sensor)
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { messages, isConnected, sendMessage } = useWebSocket();
    
    useEffect(()=>{
        loadSensor()
    },[params.id])

    useEffect(() => {
        const latestSensorMessage = messages.findLast((msg) => msg.type === "update");
    
        if (latestSensorMessage) {
            const sensorId: string = latestSensorMessage.payload.sensorId
            const value: Object = latestSensorMessage.payload.value
            const reading: SensorReading = {
                value: value,
                topic: sensorId,
                time: new Date()
            }
            sensor.lastSensedReading = reading
            setSensor(sensor)
        }
    },[messages, sensor])

    const loadSensor = () => {
        setIsLoading(true)
        fetch('/api/sensors/' + params.id)
        .then((res) => {
            if (res.status == 200) {
                return res.json()
            } else if (res.status == 404) {
                throw new Error("No encontramos el sensor")
            } else {
                throw new Error("Hubo un problema al buscar la información del sensor")
            }
        })
        .then((data) => {
            let sensor = data.items
            setSensor(sensor)
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div>
            {
                isLoading ?
                <Loading text='Cargando'></Loading>
                :
                error ? 
                <ErrorDisplayer message={errorMessage}></ErrorDisplayer>
                :
                <div>
                    <PageHeader
                        className="mb-6"
                        title={sensor.name}
                        rigthComponent={
                            <Button variant="outline" className="ml-2" size="icon" onClick={loadSensor}>
                                <ReloadIcon className="h-4 w-4 m-2" />
                            </Button>
                        }
                    >
                    </PageHeader>
                    <Tabs defaultValue="data" className="">
                        <TabsList>
                            <TabsTrigger value="data">Detalles</TabsTrigger>
                            <TabsTrigger value="configuration">Configuración</TabsTrigger>
                        </TabsList>
                        <TabsContent value="data">
                            <DetailContent sensor={sensor}></DetailContent>
                            <ConfigurationContent sensor={sensor} refresh={loadSensor} className='mt-6'/>
                        </TabsContent>
                        <TabsContent value="configuration">
                            <ConfigurationContent sensor={sensor}/>
                        </TabsContent>
                    </Tabs>
                </div>
            }
        </div>
    )
}

function DetailContent({ sensor } : {sensor:Sensor}) {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Detalles
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row mb-2'>
                        <h2 className='mr-2'>
                            Topic: {sensor.topic} 
                        </h2>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <h2 className='mr-2'>
                            Estado: 
                        </h2>
                        <TooltipProvider>
                            { sensor.isActive ?
                                <Tooltip>
                                    <TooltipTrigger><Sensors className='text-primary'/></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Activo</p>
                                    </TooltipContent>
                                </Tooltip>
                                 :
                                 <Tooltip>
                                    <TooltipTrigger><SensorsOff className='text-destructive'/></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Inactivo</p>
                                    </TooltipContent>
                                </Tooltip>
                            }
                        </TooltipProvider>
                    </div>
                    {
                        sensor.lastSensedReading &&
                        <div>
                            {
                            sensor.lastSensedReading.value ?
                            <div>
                                <p>{capitalizeFirstLetter(sensor.dataLabel) + ": "}
                                    {JSON.stringify(sensor.lastSensedReading.value)}
                                    {sensor.unit && sensor.unit}</p>
                                <p className='text-sm'>Úlitma actualización: {sensor.lastSensedReading.time.toString()}</p>
                            </div>
                            :
                            <p className='text-sm text-muted-foreground'>No hay datos</p>
                            }
                        </div>
                    }

                </CardContent>
            </Card>
        </div>
    )
}

interface ConfigurationContentProps {
    sensor: Sensor,
    refresh?: () => void,
    className?: string,
}

function ConfigurationContent({ sensor, className, refresh, ...props } : ConfigurationContentProps) {
    const [handler, setHandler] = useState(sensor.msgHandler)
    const [triggers, setTriggers] = useState(sensor.triggers) 

    const deleteHandlerCallback = () => {
        setHandler(undefined)
    }

    const triggerSubmitCallback = (trigger?: Trigger) => {
        if (trigger !== undefined) {
            triggers.push(trigger)
            setTriggers(triggers)
        }
    }
    
    return (
        <div className={cn(className)} {...props}>
            <div className='flex flex-row space-x-2'>
                <NewAlertButton sensor={sensor} onSubmit={triggerSubmitCallback}></NewAlertButton>
                <NewTriggerButton sensor={sensor}></NewTriggerButton>
                <NewTimerButton sensor={sensor}></NewTimerButton>
            </div>
            <div className='flex md:flex-row flex-col mt-6 md:space-x-2 md:space-y-0 space-y-2'>
                {
                    handler ?
                    <HandlerDetail handler={handler} allowDelete={true}
                        deleteCallback={deleteHandlerCallback} createCallback={refresh}>
                    </HandlerDetail>
                    :
                    <Card>
                        <CardHeader>
                            <CardTitle>Handler</CardTitle>
                            <CardDescription>No hay un handler definido para este sensor</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <NewHandlerButton sensor={sensor} onSubmit={refresh}></NewHandlerButton>
                        </CardContent>
                    </Card>
                }
                <TriggersDetail triggers={triggers} />
            </div>
        </div>
    )
}

interface TriggersDetailProps {
    triggers: Trigger[]
}

function TriggersDetail ({...props} : TriggersDetailProps) {
    const [triggers, setTriggers] = useState(props.triggers)
    
    const deleteCallback = (id: string) => {
        console.log(id)
        const filteredTriggers = triggers.filter((trigger) => (trigger.id != id))
        setTriggers(filteredTriggers)
    }
    
    return (
        <Card className='min-w-64'>
            <CardHeader>
                <CardTitle>Triggers</CardTitle>
                {
                    (triggers == null || triggers.length == 0) &&
                    <CardDescription>No hay triggers registrados para este sensor</CardDescription>
                }
            </CardHeader>
            <CardContent className="grid gap-4">
                <ScrollArea className="max-h-[500px]">
                    <div className="flex flex-col flex-wrap">
                        {
                            triggers?.map((trigger, index) => (
                                <TriggerItem key={index} trigger={trigger} onDelete={deleteCallback}/>
                            ))
                        }
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

interface TriggerItemProps {
    trigger: Trigger,
    onDelete?: (id: string) => void
}

function TriggerItem({ trigger, onDelete } : TriggerItemProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        setIsLoading(true)
        fetch('/api/triggers/' + trigger.id, {
            method: 'DELETE'
        })
        .then((res) => {
            console.log(res)
            if (res.status == 200) {
                return res.json()
            } else if (res.status == 404) {
                throw new Error("No encontramos el sensor")
            } else {
                throw new Error("Hubo un problema al intentar borrar el trigger")
            }
        })
        .then((data) => {
            onDelete?.(trigger.id)
            toast({
                variant: "success",
                title: "Exito!",
                description: "El trigger ha sido eliminado.",
            })
        })
        .catch((error) => {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Hubo un error al intentar eliminar el trigger.",
            })
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className='border rounded p-2 flex flex-row text-sm'>
            <div className='mr-2'>
                <div>
                    {
                        trigger.active ? 
                        <Rocket className='text-primary'/>
                        :
                        <StopCircle className='text-destructive'/>
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <div>{trigger.name}</div>
                <div>{trigger.type}</div>
            </div>
            <span className='flex-1'></span>

            <Button variant="ghost" className='rounded-full' size="icon"
            onClick={handleDelete}>
                <Delete className='text-sm'/>
            </Button>
        </div>
    )
}