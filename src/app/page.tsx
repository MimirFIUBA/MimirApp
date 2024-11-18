'use client'
import * as React from "react"
import HomeCmp from "@/pages/home/home"
import { useWebSocket } from "@/hooks/websocket-provider";


export default function Home() {
  const { messages, isConnected, sendMessage } = useWebSocket();

  return (
    <div className="flex flex-row items-stretch grow">    
      <div className="flex flex-col grow p-4">
        <HomeCmp />
      </div>
    </div>
  );
}