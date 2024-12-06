import React from "react";
import Link from 'next/link'
import { BellIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/hooks/websocket-provider";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

function AlertButton({count} : {count: number}) {
    const [messageCount, setMessageCount] = useState(0)
    const { messages, isConnected, sendMessage } = useWebSocket();

    useEffect(()=>{
        //TODO: add alert filter
        fetch('/api/messages')
        .then((res) => {
            if (res.status != 200) {
                throw new Error(res.statusText)
            } else {
                return res.json()
            }
        })
        .then((data) => {
            const count = data.items.filter((message: Message)=>{return message.type == 'ALERT' && !message.read}).length
            setMessageCount(count)
        })
        .catch(error => {
            console.error(error)
        });
    },[messages]);
    
    return (

        <div className="relative mx-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href={"/alerts"}>
                        <BellIcon className="w-6 h-6"/>
                        {messageCount > 0 && (
                            <div
                            className="absolute -top-1 -right-2 w-5 h-5
                            bg-destructive text-destructive-foreground font-bold
                            text-center text-xs py-0.5
                            rounded-full"
                            >
                                {messageCount}
                            </div>
                        )}
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        {
                            messageCount == 0 ? 
                            <p>No tenes alertas</p>
                            : messageCount == 1 ?
                            <p>Tenes {messageCount} alerta sin leer</p>
                            : <p>Tenes {messageCount} alertas sin leer</p>

                        }
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
        </div>
    );
}

export default AlertButton;