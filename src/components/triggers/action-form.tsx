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
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Control, set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
    name: z.string(),
    type: z.string().optional(),
    message: z.string().optional(),
    mqttMessage: z.string().optional(),
    topic: z.string().optional(),
    command: z.string().optional(),
    commandArgs: z.string().optional(),
    triggerName: z.string().optional(),
    triggerStatus: z.boolean().optional()

})

interface ActionFormProps {
    onSubmit?: (action: Action) => void,
    onCancel?: () => void
    type?: string
}

export default function ActionForm ({...props} : ActionFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function handleSubmit(values: z.infer<typeof formSchema>) {
        var newAction = {
            name: values.name,
            type: props.type,
            message: values.message,
            mqttMessage: values.mqttMessage,
            topic: values.topic,
            command: values.command,
            commandArgs: values.commandArgs,
            triggerName: values.triggerName,
            triggerStatus: values.triggerStatus
        }
        props.onSubmit?.(newAction)
    }

    const handleCancel = () => {
        props.onCancel?.()
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder="nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {
                    props.type === 'mqttMessage' &&
                    <FormField
                    control={form.control}
                    name="mqttMessage"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                            <Input placeholder="mensaje" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                }
                {
                    props.type === 'mqttMessage' &&
                    <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                            <Input placeholder="topic" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                }
                {
                    props.type === 'triggerStatus' &&
                    <FormField
                    control={form.control}
                    name="triggerName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nombre del trigger</FormLabel>
                        <FormControl>
                            <Input placeholder="nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                }
                {
                    props.type === 'triggerStatus' &&
                    <FormField
                    control={form.control}
                    name="triggerStatus"
                    render={({ field }) => (
                        <FormItem>
                        <div className="space-y-0.5">
                            <FormLabel>Cambiar a Estado</FormLabel>
                        </div>
                        <FormControl>
                            <div className="flex text-xs space-x-2 items-center">
                                <p>Inactivo</p>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}>
                                </Switch>
                                <p>Activo</p>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                }
                {
                    props.type === 'print' &&
                    <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                            <Input placeholder="mensaje" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                }
                <div className="flex flex-row">
                    <Button type="button" variant="ghost" onClick={handleCancel}><Cross1Icon/>Cancelar</Button>
                    <span className="flex-1"/>
                    <Button type="submit" variant="ghost"><PlusIcon/>Agregar</Button>
                </div>
                </form>
            </Form>
        </div>
    )
}