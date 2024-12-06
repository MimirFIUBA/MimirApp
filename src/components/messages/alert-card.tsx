import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BellIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { timeAgo } from "@/lib/utils"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";


export default function AlertCard({message} : {message : Message}) {
    const [read, setRead] = useState(message.read)
    const timeAgoString = timeAgo(new Date(message.createdDate))
    let bodyMessage = ""
    try {
        bodyMessage = JSON.parse(message.body).message
    } catch {
        bodyMessage = message.body
    }

    const readMessage = () => {
        fetch('/api/messages/' + message.id, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              read: true,
            })
        })
        .then((res) => {
            if (res.status != 200) {
                throw new Error(res.statusText)
            } else {
                return res.json()
            }
        })
        .then((data) => {
            console.log(data)
            setRead(true)
        })
        .catch(error => {
            console.error(error)
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row text-sm">
                    {
                        !read && 
                        <div className="w-2 h-2 mr-2
                            bg-destructive text-destructive-foreground font-bold
                            text-center text-xs py-0.5
                            rounded-full"
                        ></div>
                    }
                    <BellIcon className="mr-2"></BellIcon>
                    {message.type}
                    <span className="flex-1"></span>
                    <p className="mr-2 text-xs text-muted-foreground">
                        {timeAgoString}
                    </p>
                </CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className="text-sm pb-1">
                <div className="flex flex-col">
                    {bodyMessage}
                </div>
                
            </CardContent>
            <CardFooter className="flex flex-row">
                <span className="flex-1"></span>
                {
                    !read &&
                    <Button variant="ghost" className="text-xs" onClick={readMessage}>
                        <VisibilityIcon className="mr-2"/>
                        Mark as read
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}