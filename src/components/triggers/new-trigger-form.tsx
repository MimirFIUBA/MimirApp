"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
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
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import Loading from "../ui/loading";
import ActionForm from "./action-form";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    condition: z.string().optional(),
})

interface NewAlertFormProps {
    onSubmit?: () => void,
    topic: string
}

export default function NewTriggerForm({ ...props } : NewAlertFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [trigger, setTrigger] = useState<Trigger>({
        name: "",
        type: "event",
        active: true,
        topics: [],
        condition: "",
        actions: []
    })
    
    const [step, setStep] = useState(1)

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const submitTriggerStep = async(values: z.infer<typeof formSchema>) => {
        var newTrigger = trigger
        newTrigger.name = values.name
        newTrigger.topics = [props.topic]
        newTrigger.type = "event"
        newTrigger.active = true
        newTrigger.condition = values.condition

        setTrigger(newTrigger)
        nextStep()
    }

    const handleActionsSubmit = (actions : Array<Action>) => {
        const newTrigger = trigger 
        newTrigger.actions = actions
        setTrigger(newTrigger)
        nextStep()
    }

    const handleActionsBack = (actions : Array<Action>) => {
        const newTrigger = trigger 
        newTrigger.actions = actions
        console.log(newTrigger.actions)
        setTrigger(newTrigger)
        prevStep()
    }

    return (
        <div>
            {
                isLoading &&
                <Loading text="Cargando"></Loading>
            }
            {
                step === 1 && 
                <GeneralInfoTriggerForm step={step} onSubmit={submitTriggerStep} trigger={trigger}></GeneralInfoTriggerForm>
            }
            {
                step === 2 &&
                <ActionsStep step={step} trigger={trigger} onSubmit={handleActionsSubmit} onCancel={handleActionsBack}></ActionsStep>
            }
            {
                step === 3 && 
                <TriggerSummary step={step} onCancel={prevStep} trigger={trigger} onSubmit={props.onSubmit}></TriggerSummary>
            }
        </div>
    )
}

interface GeneralInfoTriggerFormProps {
    step: number;
    trigger: Trigger;
    onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

function GeneralInfoTriggerForm({step, trigger, onSubmit} : GeneralInfoTriggerFormProps) {
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: trigger.name,
            condition: trigger.condition,
        },
    });

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        onSubmit?.(values)
    }

    return (
        <Form {...form}>
                <div>
                    {
                        errorMessages.map((message) => (
                            <p key={message} className="text-destructive text-xs">{message}</p>
                        ))
                    }
                </div>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flow flow-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="condition"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Condición</FormLabel>
                                <FormControl>
                                    <Textarea {...field}></Textarea>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Separator className="mt-6 mb-2"></Separator>
                    <div className="flex flex-row justify-stretch">
                        {
                            step > 1 &&
                            <Button type="button" variant="outline"> <ChevronLeftIcon/> Atras</Button>
                        }
                        <span className="flex-1"></span>
                        <Button type="submit" variant="outline">Siguiente<ChevronRightIcon/></Button>
                    </div>
                </form>
        </Form>
    )
}

function ActionsStep({step, trigger, onSubmit, onCancel} : {step: number, trigger: Trigger, onSubmit?: (actions : Array<Action>) => void, onCancel?: (actions : Array<Action>) => void}) {
    const [actions, setActions] = useState<Action[]>(trigger.actions)
    const [activeAction, setActiveAction] = useState<Action>(
        {
            name: "",
            type: undefined,
            message: undefined,
            mqttMessage: undefined,
            topic: undefined,
            command: undefined,
            commandArgs: undefined,
            triggerName: undefined,
            triggerStatus: undefined
        }
    )
    const [onForm, setOnForm] = useState(false)
    
    const handleNewActionType = (value: string) => {
        activeAction.type = value
        setActiveAction(activeAction)
        setOnForm(true)
    }

    const handlePrevStep = () => {
        onCancel?.(actions)
    }

    const handleNextStep = () => {
        onSubmit?.(actions)
    }

    const handleCancel = () => {
        setActiveAction({
            name: "",
            type: undefined,
            message: undefined,
            mqttMessage: undefined,
            topic: undefined,
            command: undefined,
            commandArgs: undefined,
            triggerName: undefined,
            triggerStatus: undefined
        })
        setOnForm(false)
    }

    const handleNewAction = (newAction : Action) => {
        actions.push(newAction)
        setActions(actions)
        setOnForm(false)
    }

    const removeAction = (index: number) => {
        actions.splice(index, 1)
        setActions(actions)
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-m font-medium">Acciones</h1>
                <h2 className="text-xs text-muted-foreground">Agrega acciones al trigger</h2>
            </div>
            <div className="m-2">
                {
                    onForm ?
                    <div className="border border-slate-300 rounded p-6">
                        <ActionForm type={activeAction.type} onCancel={handleCancel} onSubmit={handleNewAction}></ActionForm>
                    </div>
                    :
                    <div className="space-y-6 mb-6">
                        <ActionDisplay actions={actions} onRemoveAction={removeAction} allowModify={true}></ActionDisplay>
                        <ActionTypeSelector onSelect={handleNewActionType}></ActionTypeSelector>
                    </div>
                }
            </div>
            <Separator className="mb-2"></Separator>
            <div className="flex flex-row justify-stretch">
                {
                    step > 1 &&
                    <Button type="button" variant="outline" onClick={handlePrevStep}><ChevronLeftIcon/> Atras</Button>
                }
                <span className="flex-1"></span>
                <Button type="button" variant="outline" onClick={handleNextStep}>Siguiente<ChevronRightIcon/></Button>
            </div>
        </div>
    )
}

function ActionTypeSelector({onSelect} : {onSelect : (value: string) => void}) {
    return (
        <div className="flex flex-row space-x-1 items-center justify-center">
            <PlusCircledIcon></PlusCircledIcon>
            <Select onValueChange={onSelect}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Agregar acción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="mqttMessage">Mqtt</SelectItem>
                    <SelectItem value="triggerStatus">Trigger Switch</SelectItem>
                    <SelectItem value="print">Print</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

interface TriggerSummaryProps {
    step: number,
    trigger: Trigger,
    onCancel?: () => void,
    onSubmit?: () => void,
}

function TriggerSummary({step, trigger, onCancel, onSubmit} : TriggerSummaryProps) {
    const [errorMessages, setErrorMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    
    const handleSubmit = async() => {
        setIsLoading(true)
        setErrorMessages([])
        try {
            const response = await fetch('/api/triggers', {
                method: 'POST',
                body: JSON.stringify(trigger),
            })
        
            if (!response.ok) {
                const data = await response.json()
                if (data.code == 6007) {
                    setErrorMessages(["La condición no compila"])
                }
                toast({
                    variant: "destructive",
                    title: "Ups! Algo anduvo mal.",
                    description: "Hubo un problema con el registro, revisa los errores.",
                })
            } else {
                const data = await response.json()
                onSubmit?.()
                toast({
                    variant: "success",
                    title: "Exito!",
                    description: "Agregaste un nuevo trigger.",
                })
            }
            
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {
                isLoading ?
                <Loading text="Cargando"></Loading>
                :
                <div>
                     <div>
                        {
                            errorMessages.map((message) => (
                                <p key={message} className="text-destructive text-xs">{message}</p>
                            ))
                        }
                    </div>
                    <h1 className="font-bold">Resumen</h1>
                    <div className="flex flex-row mb-4 text-sm justify-around">
                        <div className="flex flex-col m-2">
                            <div className="mb-1">
                                <p className="text-sm font-medium">Nombre</p>
                                <p className="text-muted-foreground">{trigger.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Condición</p>
                                <p className="text-muted-foreground">{trigger.condition}</p>
                            </div>
                        </div>
                        <Separator orientation="vertical"/>
                        <div className="flex flex-col m-2">
                            <ActionDisplay actions={trigger.actions} allowModify={false}></ActionDisplay>
                        </div>
                    </div>
                    <Separator className="mb-2"></Separator>
                    <div className="flex flex-row justify-stretch">
                        {
                            step > 1 &&
                            <Button type="button" variant="outline" onClick={onCancel}><ChevronLeftIcon/> Atras</Button>
                        }
                        <span className="flex-1"></span>
                        <Button type="button" variant="default" onClick={handleSubmit}>Registrar</Button>
                    </div>
                </div>
            }
        </div>
    )
}

interface ActionDisplayProps {
    actions: Array<Action>,
    onRemoveAction?: (index:number) => void
    allowModify?: boolean
}

function ActionDisplay({...props} : ActionDisplayProps) {
    const [actions, setActions] = useState(props.actions)
    const removeAction = (index: number) => {
        const newActions = actions.filter((_, i) => i !== index);
        setActions(newActions)
        props.onRemoveAction?.(index)
    }

    return (
        <div>
            <h1 className="text-sm font-medium mb-2">Lista de acciones</h1>
                <ScrollArea className="h-[200px]">
                    <div className="mx-2 p-2 space-y-2">
                        {
                            actions.length < 1 &&
                            <p className="text-xs m-1">No hay acciones</p>
                        }
                        {
                            actions.map((action: Action, index: number) => (
                                <div key={index} className="flex flex-row text-sm rounded-full
                                items-center
                                bg-primary px-6 p-2 text-primary-foreground">
                                    {action.name} - {action.type}
                                    <span className="flex-1"/>
                                    {
                                        props.allowModify && 
                                        <Button className="rounded-full h-8 w-8 p-0" variant="ghost" onClick={() => removeAction(index)}>
                                            <Cross1Icon></Cross1Icon>
                                        </Button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
        </div>
    )
}
