'use client'
import { BellIcon } from "@radix-ui/react-icons";
import AlertCard from "@/components/messages/alert-card";
import { Input } from "@/components/ui/input"
import { Search } from "@mui/icons-material";
import PageHeader from "@/components/page-header";
import { useEffect, useState } from "react";

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetch('/api/messages')
        .then((res) => {
            if (res.status != 200) {
                throw new Error(res.statusText)
            } else {
                return res.json()
            }
        })
        .then((data) => {
            setMessages(data.items)
            setIsLoading(false)
        })
        .catch(error => {
            setErrorMessage("No pudimos cargar la informacion de los cultivos: " + error.message)
        })
        .finally(() => {
            setIsLoading(false)
        });
    }, []);

    return (
        <div className="flex flex-col max-w-xl">
            <div className="my-6 flex flex-row items-center">
                <Search className="mr-2"/>
                <Input
                    placeholder="Buscar...">
                </Input>
            </div>
            <div className="flex flex-col space-y-2 ml-12">
                {
                    messages.map((message) => (
                        <AlertCard key={message.id} message={message}></AlertCard>
                    ))
                }
            </div>
        </div>
    )
}