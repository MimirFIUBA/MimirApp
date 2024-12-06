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
import NewTriggerForm from "./new-trigger-form";

export default function NewTriggerButton({sensor} : {sensor:Sensor}) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        console.log("on submit")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-6 w-6" />Trigger
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                <DialogTitle>Agregar un trigger al sensor</DialogTitle>
                <DialogDescription>
                    Registra un trigger que se activa a partir de un evento de {sensor.topic}
                </DialogDescription>
                </DialogHeader>
                <NewTriggerForm topic={sensor.topic} onSubmit={handleOnSubmit}></NewTriggerForm>
            </DialogContent>
        </Dialog>
    )
}