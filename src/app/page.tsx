"use client";

import * as React from "react"

import Sidebar from "@/components/ui/sidebar";
import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex p-4 pl-8 bg-primary min-h-16 items-center shadow-lg z-40">
        <h1 className="text-white text-xl font-bold ">MIMIR</h1>
      </div>
      <div className="flex flex-row items-stretch grow">
        <div className="flex h-full flex-col p-2 bg-slate-100">
          <Sidebar/>
        </div>
        <div className="grow p-4">
          <div className="pb-2">
            <h1>Home</h1>
          </div>
          <div className="flex flex-col grow justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 w-[200px]">
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="p-2 w-full grow">
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
                  <ProfileForm />
                </DialogContent>
              </Dialog>

              <Button className="p-2 w-full grow">
                <PlusIcon className="mr-2 h-6 w-6" />Añadir cultivo
              </Button>
          </div>
        </div>
      </div>
      <div className="p-2">Footer</div>
    </div>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const callApi = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('api/sensor', {
        method: 'POST',
        body: '{"name": "sensor nuevo", "description":"sensor from web app", "dataType":"float", "topic":"temp"}',
      })
 
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
 
      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      // setError(error.message)
      console.error(error)
    } finally {
      // setIsLoading(false)
    }
  }

  return (
    <form className="grid items-start gap-4" onSubmit={callApi}>
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="crop">Cultivo</Label>
        <Input id="crop" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dataType">Tipo de dato</Label>
        <Input id="dataType" />
      </div>
      <Button type="submit">Registrar</Button>
    </form>
  )
}