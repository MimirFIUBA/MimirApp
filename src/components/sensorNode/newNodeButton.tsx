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
import NewNodeForm from "@/components/sensorNode/newNodeForm";

export default function NewNodeButton({ crops, onSubmit } : { crops?: Array<Crop>, onSubmit?: () => void }) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
        onSubmit?.()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2" />Nodo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Nuevo Nodo</DialogTitle>
                </DialogHeader>
                <NewNodeForm onSubmit={handleOnSubmit} crops={crops} />
            </DialogContent>
        </Dialog>
    );
}