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
import { useToast } from "@/components/ui/use-toast"
import { Control, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    crop: z.string(),
    nodeId: z.string(),
    dataType: z.string()
})

interface NewSensorFormProps {
    onSubmit?: () => void,
    crops?: Array<Crop>,
    crop?: Crop,
    node?: SensorNode,
    nodes?: Array<SensorNode>
}

interface CropFieldProps {
    control: Control<{
        name: string;
        crop: string;
        nodeId: string;
        dataType: string;
    }>,
    crops?: Array<Crop>,
    crop?: Crop,
}

interface NodeFieldProps {
    control: Control<{
        name: string;
        crop: string;
        nodeId: string;
        dataType: string;
    }>,
    crop?: Crop,
    node?: SensorNode,
    nodes?: Array<SensorNode>
}

interface NodeSelectGroupProps {
    crop?: Crop,
    node?: SensorNode,
    nodes?: Array<SensorNode>
}


export default function NewSensorForm({ ...props } : NewSensorFormProps) {
    const { toast } = useToast()
    const [ selectedCrop, setSelectedCrop ] = useState<Crop|undefined>()

    let crops = props.crops

    const handleOnChangeCrop = (
        value: string,
        onChange: (...event: string[]) => void
    ) => {
        let crop = crops?.find((crop) => {
            return crop.id == value
        })
        setSelectedCrop(crop)
        onChange(value)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values)

        try {
            const response = await fetch('api/sensors', {
                method: 'POST',
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
                props.onSubmit?.()
            }
            
        } catch (error) {
            // Capture the error message to display to the user
            // setError(error.message)
            console.error(error)
        } finally {
            // setIsLoading(false)
        }
    }

    const CropField = ({...props}: CropFieldProps) => {
        return (
            <FormField
            control={props.control}
            name="crop"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Cultivo</FormLabel>
                    <FormControl>
                        <Select onValueChange={(value: string) =>
                            handleOnChangeCrop(value, field.onChange)} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un cultivo." />
                            </SelectTrigger>
                            <SelectContent>
                                <CropSelectGroup crops={props.crops}></CropSelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
        )
    }

    const CropSelectGroup = ({...props} : {crops?: Array<Crop>}) => {
        let crops = props.crops
        
        if (crops != undefined && crops.length > 0) {
            return (
                <SelectGroup>
                    {crops.map((crop) => (
                        <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                    ))}
                </SelectGroup>
            )
        }

        return (
            <p>No crops to select.</p>
        )
    }

    const NodeField = ({...props}: NodeFieldProps) => {
        return (
            <FormField
                control={props.control}
                name="nodeId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nodo</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un nodo." />
                                </SelectTrigger>
                                <SelectContent>
                                    <NodeSelectGroup nodes={props.nodes}></NodeSelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }

    const NodeSelectGroup = ({...props} : NodeSelectGroupProps) => {
        let nodes = props.nodes
        if (nodes != undefined && nodes.length > 0) {
            return (
                <SelectGroup>
                    {nodes.map((sensorNode) => (
                        <SelectItem key={sensorNode.id} value={sensorNode.id}>{sensorNode.name}</SelectItem>
                    ))}
                </SelectGroup>
            )
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
                <CropField control={form.control} crops={props.crops}></CropField>
                <NodeField control={form.control} nodes={selectedCrop?.nodes}></NodeField>
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