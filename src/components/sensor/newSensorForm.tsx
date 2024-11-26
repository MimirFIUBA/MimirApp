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
import { useToast } from "@/components/ui/use-toast"
import { Control, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    dataName: z.string().min(2, {
        message: "El nombre de dato debe tener al menos dos caracteres.",
    }),
    groupId: z.string({
        required_error: "El cultivo es requerido",
    }),
    nodeId: z.string({
        required_error: "El nodo es requerido",
    }),
    dataType: z.string({
        required_error: "El tipo de dato es requerido",
    }),
    type: z.string({
        required_error: "El tipo de handler es requerido",
    }),
    jsonPath: z.string({
        required_error: "El path JSON es requerido",
    }),
    jsonData: z.array(z.object({
        name: z.string({
            required_error: "El nombre de la data json es requerido",
        }),
        path: z.string({
            required_error: "La ruta de la data json es requerida",
        })
    })),
    endianness: z.string({
        required_error: "El endianness es requerido",
    }),
    size: z.string({
        message: "El tamaño es requerido",
    })
})

interface NewSensorFormProps {
    onSubmit?: () => void,
    crops?: Array<Crop>,
    crop?: Crop,
    nodes?: Array<SensorNode>
    node?: SensorNode,
}

interface CropFieldProps {
    control: Control<{
        name: string;
        dataName: string;
        groupId: string;
        nodeId: string;
        dataType: string;
        type: string;
        jsonPath: string;
        jsonData: Array<JSONData>;
        endianness: string;
        size: string;
    }>,
    crops?: Array<Crop>,
    crop?: Crop,
    disabled?: boolean
}

interface NodeFieldProps {
    control: Control<{
        name: string;
        dataName: string;
        groupId: string;
        nodeId: string;
        dataType: string;
        type: string;
        jsonPath: string;
        jsonData: Array<JSONData>;
        endianness: string;
        size: string;
    }>,
    crop?: Crop,
    nodes?: Array<SensorNode>
    node?: SensorNode,
}

interface NodeSelectGroupProps {
    crop?: Crop,
    node?: SensorNode,
    nodes?: Array<SensorNode>
}

export default function NewSensorForm({ ...props } : NewSensorFormProps) {
    const { toast } = useToast()
    const [ selectedCrop, setSelectedCrop ] = useState<Crop|undefined>(props.crop)
    const [ handlerType, setHandlerType ] = useState<string>("");
    

    let crops = props.crops
    let isCropSelectionDisabled = props.crop != undefined

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

    const handleOnChangeHandlerType = (
        value: string,
        onChange: (...event: string[]) => void
    ) => {
        setHandlerType(value)
        onChange(value)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            dataName: "",
            groupId: selectedCrop?.id,
            jsonPath: "",
            jsonData: [],
            endianness: "",
            size: ""
        },
    })

    const handleSubmit = async(values: z.infer<typeof formSchema>) => {
        let body
        if (handlerType == 'json') {
            body = {...values, configurations: [ { path: values.jsonPath, data: values.jsonData } ]}
        } else if (handlerType == 'bytes') {
            body = {...values, configurations: [ { dataType: values.dataType, endianness: values.endianness, size: Number(values.size) } ]}
        }
        try {
            const response = await fetch('api/handlers', {
                method: 'POST',
                body: JSON.stringify(body),
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
            name="groupId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Cultivo</FormLabel>
                    <FormControl>
                        <Select onValueChange={(value: string) =>
                            handleOnChangeCrop(value, field.onChange)} defaultValue={field.value} disabled={props.disabled}>
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
            <SelectGroup>
                <p className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none">
                    No hay cultivos para seleccionar.
                </p>
            </SelectGroup>
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

        return (
            <SelectGroup>
                <p className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none">
                    No hay nodos para seleccionar.
                </p>
            </SelectGroup>
        )
    }

    const JSONFields = ({...props}) => {
        const { fields, append, remove } = useFieldArray({
            name: "jsonData",
            control: props.control
        });

        return (
            <>
                <FormField control={props.control}
                    name="jsonPath"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>JSON Path</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    <div><Label>JSON Data</Label></div>
                    <Button type="button" className="w-full" onClick={() => append({ name: "", path: "" })} >
                        <PlusIcon className="mr-2 h-6 w-6" /> Agregar
                    </Button>
                </div>
                {fields.map((field, index) => (
                    <JSONAdditionalData key={field.id} control={props.control} index={index} remove={remove} />
                ))}
            </>
        )
    }

    const JSONAdditionalData = ({...props}) => {
        return (
            <div key={props.key} className="col-span-2 grid grid-flow-col justify-stretch gap-8">
                <FormField control={props.control}
                    name={`jsonData.${props.index}.name`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>JSON Data Name {props.index + 1}</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={props.control}
                    name={`jsonData.${props.index}.path`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>JSON Data Path {props.index + 1}</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                )}
                />
                <Button type="button" onClick={() => props.remove(props.index)} className="self-end">
                    <MinusIcon className="mr-2 h-6 w-6" /> Eliminar
                </Button>
            </div>
        )
    }

    const BytesFields = ({...props}) => {
        return (
            <>
                <FormField control={props.control}
                    name="endianness"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Endianness</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un tipo de endianness." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="littleEndian">Little Endian</SelectItem>
                                        <SelectItem value="bigEndian">Big Endian</SelectItem>
                                        <SelectItem value="nativeEndian">Native Endian</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={props.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tama&ntilde;o</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} >
            <div className="grid grid-cols-2 gap-8">
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
                name="dataName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Data Name</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <CropField control={form.control} crops={props.crops} disabled={isCropSelectionDisabled}></CropField>
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
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tipo de Handler</FormLabel>
                        <FormControl>
                            <Select 
                                onValueChange={(value: string) => handleOnChangeHandlerType(value, field.onChange)}
                                defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una estructura de datos." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="json">JSON</SelectItem>
                                        <SelectItem value="bytes">Bytes</SelectItem>
                                        <SelectItem value="xml" disabled>XML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                { handlerType == 'json' && <JSONFields control={form.control} ></JSONFields> }
                { handlerType == 'bytes' && <BytesFields control={form.control} ></BytesFields> }
                <Button type="submit" className="col-span-2">Registrar</Button>
            </div>
        </form>
    </Form>
    )
}