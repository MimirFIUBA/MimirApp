import * as React from "react"

import { Toaster } from "@/components/ui/toaster"
import Sidebar from "@/components/ui/sidebar";
import HomeCmp from "@/pages/home/home"

export default function Home() {
  return (
    <div className="flex flex-row items-stretch grow">
      <Toaster />
      <div className="flex flex-col p-8 bg-slate-900 text-neutral-400">
        <Sidebar/>
      </div>
      <div className="grow p-4">
        <HomeCmp />
      </div>
    </div>
  );
}