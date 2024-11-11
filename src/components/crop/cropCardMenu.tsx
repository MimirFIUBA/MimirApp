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
import NewCropForm from "./newCropForm";

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

    const editCropHandler = () => {
        setChildObject('crop')
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
                    {/* <DropdownMenuLabel>{props.crop.name}</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuGroup>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer" onClick={newNodeHandler}>
                                Agregar Nodo
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer" onClick={newSensorHandler}>
                                Agregar Sensor
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href={cropViewURL}>Ver</Link>
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer" onClick={editCropHandler}>
                                Editar
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogPortal>
                <FormDialogContent onSubmit={handleOnSubmit} object={childObject} crop={props.crop}></FormDialogContent>
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
    let form
    if (object == 'sensor') {
        title = "Agregar sensor al cultivo " + crop?.name
        description = ""
        form = <NewSensorForm onSubmit={onSubmit} crop={crop} crops={crops}></NewSensorForm>
    } else if (object == 'node') {
        title = "Agregar nodo al cultivo " + crop?.name
        description = ""
        form = <NewNodeForm onSubmit={onSubmit} crop={crop} crops={crops}></NewNodeForm>
    } else if (object == 'crop') {
        title = "Editar Cultivo"
        description = ""
        const handleOnSubmit = () => {
             if (onSubmit != undefined) {
                onSubmit()
            }
        }
        form = <NewCropForm onSubmit={handleOnSubmit} crop={crop}></NewCropForm>
    }

    return (
        <DialogContent className="DialogContent">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            { form }
        </DialogContent>
    )
}