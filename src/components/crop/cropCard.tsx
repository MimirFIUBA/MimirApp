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
        <Card className={cn("w-[300px] h-[400px]", className)} {...props}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <Link href={"/crops/" + crop.id + "/view"} className="pt-1">
                    <CardTitle>{crop!.name}</CardTitle>
                    <CardDescription className="mt-1">{crop!.description}</CardDescription>
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
                        <p className="text-xs text-muted-foreground">
                            Here will appear alerts if any
                        </p>
                    </div>
                </div>
                <ScrollArea className="w-[250px] h-[200px]">
                    <div className="flex flex-col flex-wrap">
                        {crop.nodes?.map((node) => (
                            <div key={node.id} className="flex flex-1 flex-grow flex-col rounded-md border p-4 m-2">
                                <h1 className="text-sm mb-2 font-medium leading-none">{node.name}</h1>
                                <div className="flex-1 space-y-1">
                                    {node.sensors?.map((sensor) => (
                                        <div key={sensor.id} className="flex flex-row">
                                            <p className="text-xs">
                                                {sensor.name}
                                            </p>
                                            {
                                                sensor.lastSensedReading ? 
                                                <p className="text-xs text-muted-foreground ml-2">
                                                    {JSON.stringify(sensor.lastSensedReading.value)}
                                                </p>
                                                :
                                                <p className="text-xs text-muted-foreground ml-2">
                                                    No data
                                                </p>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}