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
import NewSensorForm from "@/components/sensor/newSensorForm"

export default function NewSensorButton({ crops, onSubmit } : { crops?: Array<Crop>, onSubmit?: () => void }) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
        onSubmit?.()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-6 w-6" />Registrar Sensor
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Registrar sensor</DialogTitle>
                <DialogDescription>
                    Registrar un nuevo sensor. Cuando estes listo hace click en registrar.
                </DialogDescription>
                </DialogHeader>
                <NewSensorForm onSubmit={handleOnSubmit} crops={crops}/>
            </DialogContent>
        </Dialog>
    );
}