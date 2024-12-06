'use client'
import * as React from "react"
import HomeCmp from "@/pages/home/home"

export default function Home() {
  return (
    <div className="flex flex-row items-stretch grow">    
      <div className="flex flex-col grow p-4">
        <HomeCmp />
      </div>
    </div>
  );
}