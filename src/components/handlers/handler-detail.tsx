import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { ChevronsUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Delete } from "@mui/icons-material";
import { useToast } from "@/components/ui/use-toast";


interface HandlerDetailProps {
    handler: Handler,
    allowDelete: boolean,
    deleteCallback?:()=>void,
    createCallback?: () => void,
}

export default function HandlerDetail({ handler, allowDelete, deleteCallback, createCallback } : HandlerDetailProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleDelete = async() => {
        setIsLoading(true)
        try {
            const id = handler.topic.replaceAll("/",".")
            console.log(id)
            const response = await fetch('/api/handlers/' + id, {
                method: 'DELETE',
            })
        
            console.log(response)
            if (!response.ok) {
                const data = await response.json()
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: "Hubo un error al intentar eliminar el handler.",
                })
            } else {
                const data = await response.json()
                deleteCallback?.()
                toast({
                    variant: "success",
                    title: "Exito!",
                    description: "Eliminaste el handler.",
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
      <Card>
        <CardHeader>
            <CardTitle>Handler</CardTitle>
            <CardDescription>Tipo: {handler.type}</CardDescription>
        </CardHeader>
        <CardContent>
            {handler.type === "json" && (
                <JSONHandlerInfo handler={handler}></JSONHandlerInfo>
            )}
            {handler.type === "bytes" && (
            <div>
                <h2>Bytes Configurations:</h2>
                {handler.configurations.map((config, index) => (
                <div key={index}>
                    <p>Data Type: {config.dataType}</p>
                    <p>Endianness: {config.endianness}</p>
                    <p>Size: {config.size} bytes</p>
                </div>
                ))}
            </div>
            )}
        </CardContent>
        <CardFooter>
            {
                allowDelete && 
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline"><Delete className="mr-2"/>Eliminar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>¿Estas seguro de eliminar el handler?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Una vez que elimines el handler no se podrá deshacer esta acción.
                            El sensor no podrá recibir mensajes hasta que crees uno nuevo. 
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/70"
                            onClick={handleDelete}>
                                <Delete></Delete>
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
        </CardFooter>
      </Card>
    );
}

function JSONHandlerInfo({ handler } : { handler : JSONHandler }) {
    return (
        <div>
            {
                handler.configurations.length > 1 && 
                <h2 className="text-sm font-medium">Configuraciones:</h2>
            }
            <div className="rounded border p-6">
                {handler.configurations.map((config, index) => (
                <div key={index} className="text-sm">
                    {
                        config.idPath && 
                        <p>ID Position: {config.idPath}</p>
                    }
                    <div className="flex flex-row space-x-1">
                        <p><b>Value Path:</b></p> {config.path && <Badge>{config.path}</Badge>}
                    </div>
                    <ConfigurationsDescription config={config}></ConfigurationsDescription>
                </div>
                ))}
            </div>
        </div>
    )
}

function ConfigurationsDescription({ config } : { config: JSONValueConfiguration }) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
        >
            <div className="flex items-center mt-2">
                <h3>Configuraciones de metadata</h3>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
                <ul className="m-2 list-disc">
                    {
                        config.additionalData &&
                        config.additionalData.map((dataConfig, idx) => (
                            <li className="ml-2" key={idx}>
                                Name: {dataConfig.name}, Path: {dataConfig.path}
                            </li>
                        ))
                    }
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}