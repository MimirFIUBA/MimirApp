import * as React from "react"

import { BellIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { CropCardMenu } from "./cropCardMenu"

interface CropCardProps
  extends React.ComponentProps<typeof Card> {
  crop: Crop,
  onSubmit?: () => void 
}

export default function CropCard({ className, ...props }: CropCardProps) {
    const crop = props.crop
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader className="flex flex-row align-top justify-between space-y-0">
                <Link href={"/crop/" + crop.id + "/view"}>
                    <CardTitle>{crop!.name}</CardTitle>
                    <CardDescription>{crop!.description}</CardDescription>
                </Link>
                <div className="m-0">
                    <CropCardMenu crop={crop} onSubmit={props.onSubmit}></CropCardMenu>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <BellIcon />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                        Alerts!
                        </p>
                        <p className="text-sm text-muted-foreground">
                        Here will appear alerts if any
                        </p>
                    </div>
                </div>
                <ScrollArea className="h-[200px] w-[350px]">
                    <div className="flex flex-wrap">
                        {crop.nodes?.map((node) => (
                            <div key={node.id} className="flex flex-grow flex-col space-x-4 rounded-md border p-4 m-2">
                                <h1 className="text-sm mb-2 font-medium leading-none">{node.name}</h1>
                                <div className="flex-1 space-y-1">
                                    {node.sensors?.map((sensor) => (
                                        <p key={sensor.id} className="text-sm text-muted-foreground">
                                            {sensor.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                Footer
            </CardFooter>
        </Card>
    )
}