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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Control, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    description: z.string(),
    groupId: z.string({
        required_error: "El cultivo es requerido",
    })
})

interface NewNodeFormProps {
    onSubmit?: () => void,
    crops?: Array<Crop>,
    crop?: Crop 
}

interface CropFieldProps {
    control?: Control<{
        name: string;
        description: string;
        groupId: string;
    }>,
    crops?: Array<Crop>,
    disabled?: boolean
}

export default function NewNodeForm({ onSubmit, crop, crops } : NewNodeFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            groupId: crop?.id,
        },
    })

    let isCropSelectionDisabled = crop != undefined

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('api/nodes', {
                method: 'POST',
                body: JSON.stringify(values),
            })
        
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }
            
            // Handle response if necessary
            const data = await response.json()
            onSubmit?.()
            
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
                <CropField control={form.control} crops={crops} disabled={isCropSelectionDisabled}></CropField>
                <Button type="submit">Registrar</Button>
            </form>
        </Form>
    )
}

function CropField({control, crops, disabled} : CropFieldProps) {

    return (
        <FormField
        control={control}
        name="groupId"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Cultivo</FormLabel>
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un cultivo." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {crops?.map((crop) => (
                                    <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}/>
    )
}