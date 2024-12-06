'use-client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogDescription } from '@radix-ui/react-dialog';
import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from 'react';
import NewVariableForm from './new-variable-form';

export default function NewVariableButton({onSubmit} : {onSubmit?: () => void}) {
    const [open, setOpen] = useState(false);

    const handleOnSubmit = () => {
        setOpen(false)
        onSubmit?.()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-6 w-6" />Variable
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Nueva Variable</DialogTitle>
                <DialogDescription>Registra una nueva variable</DialogDescription>
                </DialogHeader>
                <NewVariableForm onSubmit={handleOnSubmit}/>
            </DialogContent>
        </Dialog>
    )
}