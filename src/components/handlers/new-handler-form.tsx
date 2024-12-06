"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import Loading from "../ui/loading";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import next from "next";
import { Label } from "../ui/label";
import HandlerDetail from "./handler-detail";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    condition: z.string().optional(),
})

interface NewHandlerFormProps {
    onSubmit?: () => void,
    topic: string
}

export default function NewHandlerForm({ ...props } : NewHandlerFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [handler, setHandler] = useState<Handler>()
    const [step, setStep] = useState(1)

    const maxSteps = 3
    const nextStep = () => setStep((prev) => Math.min(prev + 1, maxSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmitType = (type?: string) => {
        var updatedHandler = handler
        if (type === "json" || type === "bytes") {
            if (!updatedHandler || updatedHandler.type != type) {
                updatedHandler = {
                    type: type,
                    topic: props.topic,
                    configurations: []
                }
            }
            setHandler(updatedHandler)
            nextStep()
        }
    }

    const handleSubmitJsonConfigurations = (newConfiguration: JSONValueConfiguration) => {
        console.log(newConfiguration)
        if (handler != undefined) {
            handler.configurations = [newConfiguration]
            setHandler(handler)
        }
        nextStep()
    }

    const handleSubmitHandler = () => {
        props.onSubmit?.()
    }

    return (
        <div>
            {
                isLoading &&
                <Loading text="Cargando"></Loading>
            }
            {
                step === 1 &&
                <HandlerTypeSelection handler={handler} step={step} steps={maxSteps} onSubmit={handleSubmitType}></HandlerTypeSelection>
            }
            {
                step === 2 && handler?.type == "json" && 
                <JsonConfigurationsStep
                    step={step} steps={maxSteps}
                    handler={handler}
                    onSubmit={handleSubmitJsonConfigurations}
                    onBack={prevStep}>
                </JsonConfigurationsStep>
            }
            {
                step === 2 && handler?.type == "bytes" && 
                <div>Bytes</div>
            }
            {
                step === 3 &&
                <HandlerSummary handler={handler} step={step} steps={maxSteps} onSubmit={handleSubmitHandler} onBack={prevStep}></HandlerSummary>
            }
        </div>
    )
}

interface NavigationButtonsProps {
    step: number,
    steps:number,
    onBack?: () => void,
    onNext?: () => void,
}

function NavigationButtons({ ...props } : NavigationButtonsProps) {
    return (
        <div>
            <Separator className="my-6"></Separator>
            <div className="flex flex-row justify-stretch">
                {
                    props.step > 1 &&
                    <Button variant="outline" onClick={props.onBack}> <ChevronLeftIcon/> Atras</Button>
                }
                <span className="flex-1"></span>
                {
                    props.step < props.steps &&
                    <Button variant="outline" onClick={props.onNext}>Siguiente<ChevronRightIcon/></Button>
                }
                {
                    props.step == props.steps &&
                    <Button onClick={props.onNext}>Confirmar</Button>
                }
            </div>
        </div>
    )

}

interface HandlerTypeSelectionProps {
    onSubmit?: (type?: string) =>void,
    handler?: Handler,
    step: number,
    steps: number,
}

function HandlerTypeSelection({...props} : HandlerTypeSelectionProps) {
    const [type, setType] = useState(props.handler && props.handler.type)
    const [errorMessage, setErrorMessage] = useState("")
    
    const onSelect = (value: string) => {
        setErrorMessage("")
        if (value === "json" || value === "bytes"){
            setType(value)
        }
    }

    const handleSubmit = () => {
        if (! (type === "json" || type === "bytes")) {
            setErrorMessage("Por favor selecciona un tipo")
        } 
        props.onSubmit?.(type)
    }

    return (
        <div>
            <p className="text-sm font-semibold">Selecciona el tipo</p>
            {   
                errorMessage && 
                <p className="text-sm text-destructive">{errorMessage}</p>
            }
            <Select value={props.handler && props.handler.type} onValueChange={onSelect}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Seleccionar Tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="bytes">BYTES</SelectItem>
                </SelectContent>
            </Select>
            <NavigationButtons step={props.step} steps={props.steps}
                onNext={handleSubmit}>
            </NavigationButtons>
        </div>
    )
}

interface ConfigurationsStepProps {
    onSubmit?: (newConfiguration: JSONValueConfiguration) => void,
    onBack?: () => void,
    handler: JSONHandler,
    step: number,
    steps: number,
}

const JsonConfigurationFormSchema = z.object({
    path: z.string().min(1, "este campo es requerido"),
})

function JsonConfigurationsStep({ ...props } : ConfigurationsStepProps) {
    const [configuration, setConfiguration] = useState<JSONValueConfiguration>(props.handler.configurations[0] || 
        {
            idPosition: "",
            path: "",
            additionalData: []
        }
    );
    const [onForm, setOnForm] = useState(false);
    
    const handleSubmit = async() => {
        const isValid = await form.trigger();
        console.log(isValid)
        if (isValid) {
            form.handleSubmit(onSubmit)()
        }
    }

    const form = useForm<z.infer<typeof JsonConfigurationFormSchema>>({
        resolver: zodResolver(JsonConfigurationFormSchema),
        defaultValues: {
            path: configuration.path
        },
    })

    function onSubmit(data: z.infer<typeof JsonConfigurationFormSchema>) {
        configuration.path = data.path
        setConfiguration(configuration)
        props.onSubmit?.(configuration)
    }

    const handleAdditionalDataSubmit = (newConfiguration: JSONDataConfiguration) => {
        configuration.additionalData.push(newConfiguration)
        setConfiguration(configuration)
        setOnForm(false)
    }

    return (
        <div>
            <h1 className="text-base font-semibold">Agrega configuraciones</h1>
            <div className="m-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 space-y-6">
                        <FormField
                        control={form.control}
                        name="path"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Data path</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este es el path dentro del json donde se encuentra el dato registrado por el sensor
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </form>
                </Form>
                
                <div>
                    <h2 className="text-sm font-medium">Configuraciones de datos adicionales</h2>
                    {
                        onForm ?
                        <div className="rounded border p-4 m-2">
                            <h3 className="text-sm font-semibold mb-2">Agregar configuración</h3>
                            <div className="m-2">
                                <AdditionalDataConfigurationForm
                                    onSubmit={handleAdditionalDataSubmit}
                                    onCancel={()=>{setOnForm(false)}}>
                                </AdditionalDataConfigurationForm>
                            </div>
                        </div>
                        :
                        <div className="space-y-2">
                            {
                                configuration.additionalData &&
                                configuration.additionalData.map((configuration: JSONDataConfiguration, index: number) => (
                                    <div key={index}>
                                        <AddionalDataConfigurationItem configuration={configuration}></AddionalDataConfigurationItem>
                                    </div>
                                ))
                            }
                            <div className="flex items-center justify-center">
                                <Button variant="ghost" onClick={() => {setOnForm(true)}}><PlusCircledIcon className="mr-2"></PlusCircledIcon>Agregar Configuración</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <NavigationButtons step={props.step} steps={props.steps}
                onBack={props.onBack}
                onNext={handleSubmit}>
            </NavigationButtons>
        </div>
    )
}

function AddionalDataConfigurationItem({ configuration } : {configuration: JSONDataConfiguration}) {
    return (
        <div className="text-xs rounded-full border p-1 pl-6 flex flex-row items-center ">
            <div className="w-24">
                {configuration.name}
            </div>
            <div>
                path: {configuration.path}
            </div>
            <span className="flex-1"></span>
            <Button className="rounded-full h-6 w-6 p-0" variant="ghost">
                <Cross1Icon></Cross1Icon>
            </Button>
        </div>
    )
}

const AdditionalDataFormSchema = z.object({
    name: z.string().min(1, "este campo es requerido"),
    path: z.string().min(1, "este campo es requerido"),
})

interface AdditionalDataConfigurationFormProps {
    onSubmit?: (config: JSONDataConfiguration) => void,
    onCancel?: () => void,
}

function AdditionalDataConfigurationForm({ ...props } : AdditionalDataConfigurationFormProps) {
    const form = useForm<z.infer<typeof AdditionalDataFormSchema>>({
        resolver: zodResolver(AdditionalDataFormSchema),
        defaultValues: {
            name: "",
            path: ""
        }
    })

    function onSubmit(data: z.infer<typeof AdditionalDataFormSchema>) {
        const newConfiguration = {
            name: data.name,
            path: data.path
        }
        props.onSubmit?.(newConfiguration)
    }
    
    const handleCancel = () => {
        props.onCancel?.()
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                            Nombre con el que se guardaran los datos
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="path"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Path</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex flex-row pt-6">
                        <Button onClick={handleCancel} variant="outline"><Cross1Icon className="mr-2"/>Cancelar</Button>
                        <span className="flex-1"></span>
                        <Button type="submit"><PlusIcon className="mr-2"/> Agregar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

interface HandlerSummaryProps {
    onSubmit?: () => void,
    onBack?: () => void,
    handler?: Handler,
    step: number,
    steps: number
}

function HandlerSummary({...props} : HandlerSummaryProps) {
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async () => {
        console.log(handler)
        setIsLoading(true)
        setErrorMessages([])
        try {
            const response = await fetch('/api/handlers', {
                method: 'POST',
                body: JSON.stringify(handler),
            })
        
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                toast({
                    variant: "destructive",
                    title: "Ups! Algo anduvo mal.",
                    description: "Hubo un problema con el registro, revisa los errores.",
                })
            } else {
                const data = await response.json()
                props.onSubmit?.()
                toast({
                    variant: "success",
                    title: "Exito!",
                    description: "Agregaste un nuevo handler.",
                })
            }
            
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handler = props.handler

    return (
        <div>
            {isLoading && <Loading text="Cargando"></Loading>}
            <div>
                {
                    errorMessages.map((message) => (
                        <p key={message} className="text-destructive text-xs">{message}</p>
                    ))
                }
            </div>
            {
                handler && !isLoading &&
                <HandlerDetail handler={handler} allowDelete={false}></HandlerDetail>
            }
            <NavigationButtons step={props.step} steps={props.steps}
                onBack={props.onBack}
                onNext={handleSubmit}>
            </NavigationButtons>
        </div>
    )
}