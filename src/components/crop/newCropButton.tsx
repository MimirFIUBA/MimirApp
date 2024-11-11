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
import NewCropForm from "./newCropForm";

export default function NewCropButton({ onSubmit } : { onSubmit: () => void }) {
    const [open, setOpen] = React.useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
        if (onSubmit != undefined) {
            onSubmit()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-6 w-6" />Cultivo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Nuevo Cultivo</DialogTitle>
                </DialogHeader>
                <NewCropForm onSubmit={handleOnSubmit}/>
            </DialogContent>
        </Dialog>
    );
}