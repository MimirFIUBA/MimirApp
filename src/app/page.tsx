"use client";

import * as React from "react"

import Sidebar from "@/components/ui/sidebar";
import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import RegisterSensor from "@/sensor/registerSensor";

export default function Home() {
  

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
              
              <Button className="p-2 w-full grow">
                <PlusIcon className="mr-2 h-6 w-6" />Añadir cultivo
              </Button>
              <RegisterSensor />


          </div>
        </div>
      </div>
      <div className="p-2">Footer</div>
    </div>
  );
}