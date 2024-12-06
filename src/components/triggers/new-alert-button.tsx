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
import NewAlertForm from "./new-alert-form";

interface NewAlertButtonProps {
    sensor: Sensor
    onSubmit?: (trigger?: Trigger) => void
}

export default function NewAlertButton({ sensor, onSubmit, ...props} : NewAlertButtonProps) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = (trigger?: Trigger ) => {
        setOpen(false)
        onSubmit?.(trigger)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-6 w-6" />Alerta
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Agregar alerta al sensor</DialogTitle>
                <DialogDescription>
                    Registra una nueva alerta para {sensor.topic}
                </DialogDescription>
                </DialogHeader>
                <NewAlertForm topic={sensor.topic} onSubmit={handleOnSubmit}></NewAlertForm>
            </DialogContent>
        </Dialog>
    )
}