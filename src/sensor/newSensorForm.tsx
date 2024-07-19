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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    crop: z.string().min(2, {
        message: "Crop name must be at least 2 characters."
    }),
    dataType: z.string()
})

export default function NewSensorForm({ onSubmit } : { onSubmit: () => void }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        try {
            const response = await fetch('api/sensor', {
                method: 'POST',
                body: JSON.stringify(values),
            })
        
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }
            
            // Handle response if necessary
            const data = await response.json()
            onSubmit()
            // ...
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
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="crop"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Cultivo</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="dataType"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tipo de dato</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo de dato." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="float">Float</SelectItem>
                                <SelectItem value="int">Integer</SelectItem>
                                <SelectItem value="string">String</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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