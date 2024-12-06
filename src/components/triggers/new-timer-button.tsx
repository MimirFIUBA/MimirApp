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

export default function NewTimerButton({sensor} : {sensor:Sensor}) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-6 w-6" />Timer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Agregar un timer al sensor</DialogTitle>
                <DialogDescription>
                    Registra un trigger de tipo timer para {sensor.topic}
                </DialogDescription>
                </DialogHeader>
                <NewAlertForm topic={sensor.topic} onSubmit={handleOnSubmit}></NewAlertForm>
            </DialogContent>
        </Dialog>
    )
}