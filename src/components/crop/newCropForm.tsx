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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    description: z.string(),
    type: z.string()
})

interface FormProps {
    onSubmit: () => void,
    crop?: Crop 
}

export default function NewCropForm({ onSubmit, crop } : FormProps) {
    const { toast } = useToast()
    const defaultValues = {
        name: "",
        description: "",
        type: ""
    }
    const values = (crop != undefined) ? crop : defaultValues

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: values
    })

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            const url = 'api/groups' + ((crop != undefined) ? ('/' + crop.id) : '') 
            const method = (crop != undefined) ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(values),
            })
        
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
            } else {
                const data = await response.json()
                toast({
                    variant: "success",
                    title: "Success.",
                    description: "Your request was submitted successfuly.",
                })
            }
            
            onSubmit()
        } catch (error) {
            // Capture the error message to display to the user
            // setError(error.message)
            console.error(error)
        } finally {
            // setIsLoading(false)
        }
    }
  
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descripci&oacute;n</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Registrar</Button>
            </form>
    </Form>
    )
  }