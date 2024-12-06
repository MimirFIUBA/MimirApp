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
import { useToast } from "@/components/ui/use-toast"
import { Control, set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Delete } from "@mui/icons-material";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    condition: z.string(),
    message: z.string(),
    mqttMessage: z.string().optional(),
})

interface NewAlertFormProps {
    onSubmit?: (trigger?: Trigger) => void,
    topic: string
}

export default function NewAlertForm({ ...props } : NewAlertFormProps) {
    const { toast } = useToast()
    const [hasMqttMessage, setHasMqttMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setErrorMessages([])
        try {
            var mqttMessage = hasMqttMessage ? values.mqttMessage : ""
            var body = {
                name: values.name,
                topics: [props.topic],
                type: "event",
                active: true,
                condition: values.condition,
                actions: [
                    {
                        type: "alert",
                        message: values.message,
                        mqttMessage: mqttMessage
                    },
                ]
            }
            const response = await fetch('/api/triggers', {
                method: 'POST',
                body: JSON.stringify(body),
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
                const trigger = data
                toast({
                    variant: "success",
                    title: "Exito!",
                    description: "Agregaste una nueva alerta.",
                })
                props.onSubmit?.(trigger)
            }
            
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    return (
        <Form {...form}>
            <div>
                {
                    errorMessages.map((message) => (
                        <p key={message} className="text-destructive text-xs">{message}</p>
                    ))
                }
            </div>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                            <Textarea {...field}></Textarea>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        !hasMqttMessage ?
                        <Button className="m-2" variant="ghost" onClick={()=>setHasMqttMessage(true)}><PlusIcon/>Agregar acción por mqtt</Button>
                        :
                        <FormField
                        control={form.control}
                        name="mqttMessage"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Mensaje MQTT</FormLabel>
                            <div className="flex flex-row space-x-2 items-center">
                                <span className="flex-1">
                                    <FormControl >
                                    <Textarea {...field}></Textarea>
                                    </FormControl>
                                </span>
                                <div>
                                    <Button variant="destructive" size="icon" onClick={()=>setHasMqttMessage(false)}>
                                        <Delete />
                                    </Button>
                                </div>
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    }
                </div>

                
                <Button type="submit">Registrar</Button>
            </form>
    </Form>
    )
}