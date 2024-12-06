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
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }).refine(s => !s.includes(' '), 'El nombre no puede contener espacios'),
    value: z.string({
        required_error: "El valor es requerido",
    }),
    dataType: z.string({
        required_error: "El valor es requerido",
    }),
})

interface NewSensorFormProps {
    onSubmit?: () => void,
}

export default function NewVariableForm({ ...props } : NewSensorFormProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            value: "",
        },
    })

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            var variable: Variable = {
                id: "",
                name: values.name,
                value: null,
            }
            if (values.dataType == 'number') {
                variable.value = Number(values.value)
            } else if (values.dataType == 'boolean') {
                if (values.value == 'true') {
                    variable.value = true
                } else if (values.value == 'false') {
                    variable.value = false
                } 
            }
            const response = await fetch('api/user-variables', {
                method: 'POST',
                body: JSON.stringify(variable),
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
                    description: "Has creado una nueva variable.",
                })
                props.onSubmit?.()
            }
            
        } catch (error) {
            // Capture the error message to display to the user
            // setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
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
                name="value"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Valor</FormLabel>
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
                                    <SelectItem value="boolean">Boolean</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
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