"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import NewHandlerForm from "./new-handler-form";


export default function NewHandlerButton({sensor, onSubmit} : {sensor:Sensor, onSubmit?: () => void}) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
        onSubmit?.()
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2" />Agregar Handler
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Agregar Handler</DialogTitle>
                <DialogDescription>
                    Registra un handler para {sensor.topic}
                </DialogDescription>
                </DialogHeader>
                <NewHandlerForm topic={sensor.topic} onSubmit={handleOnSubmit}></NewHandlerForm>
            </DialogContent>
        </Dialog>
    )
}