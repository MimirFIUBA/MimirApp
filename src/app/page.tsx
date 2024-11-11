import * as React from "react"

import { Toaster } from "@/components/ui/toaster"
import HomeCmp from "@/pages/home/home"


export default function Home() {
  return (
    <div className="flex flex-row items-stretch grow">
      <Toaster />
      <div className="flex flex-col grow p-4">
        <HomeCmp />
      </div>
    </div>
  );
}