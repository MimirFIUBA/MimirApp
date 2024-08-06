import * as React from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { GearIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import NewSensorForm from "../sensor/newSensorForm";
import NewNodeForm from "../sensorNode/newNodeForm";

interface CropCardMenuProps {
  crop: Crop,
  onSubmit?: () => void
}

export function CropCardMenu({ ...props }: CropCardMenuProps) {
    const [childObject, setChildObject] = React.useState('node');
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
        props.onSubmit?.()
    }
    
    const cropViewURL = "/crop/" + props.crop.id + "/view"

    const newNodeHandler = () => {
        setChildObject('node')
        }
        
    const newSensorHandler = () => {
        setChildObject('sensor')
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <GearIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{props.crop.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer" onClick={newNodeHandler}>
                                Nuevo nodo
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer" onClick={newSensorHandler}>
                                Nuevo sensor
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={cropViewURL}>Ver</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogPortal>
                <FormDialogContent onSubmit={handleOnSubmit} object={childObject} crop={props.crop}></FormDialogContent>
                {/* <DialogContent className="DialogContent">
                    <DialogTitle>Nuevo {childObject}</DialogTitle>
                    <DialogDescription>Registrar un nuevo nodo. Cuando estes listo hace click en registrar.</DialogDescription>
                    { childObject === 'sensor' ? <NewSensorForm onSubmit={handleOnSubmit}></NewSensorForm> : <NewNodeForm onSubmit={handleOnSubmit}></NewNodeForm>}
                </DialogContent> */}
            </DialogPortal>
        </Dialog>
    )
}

function FormDialogContent({ object, onSubmit, crop } : { object: string, onSubmit?: () => void, crop?: Crop }) {
    let crops = []
    if (crop != undefined) {
        crops.push(crop)
    }
    let title
    let description
    if (object == 'sensor') {
        title = "Nuevo Sensor"
        description = "Registrar un nuevo sensor. Cuando estes listo hace click en registrar."
    } else if (object == 'node') {
        title = "Nuevo Nodo"
        description = "Registrar un nuevo nodo. Cuando estes listo hace click en registrar."
    }

    return (
        <DialogContent className="DialogContent">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            { object === 'sensor' ? <NewSensorForm onSubmit={onSubmit}></NewSensorForm> : <NewNodeForm onSubmit={onSubmit} crop={crop} crops={crops}></NewNodeForm>}
        </DialogContent>
    )
}