import * as React from "react"

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


interface CropCardProps
  extends React.ComponentProps<typeof Card> {
  node: SensorNode,
  onSubmit?: () => void 
}

export default function NodeCard({ className, ...props }: CropCardProps) {
    const node : SensorNode = props.node
    return (
        <Card className={cn("w-[300px]", className)} {...props}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <Link href={"/nodes/" + node.id + "/view"} className="pt-1">
                    <CardTitle>{node!.name}</CardTitle>
                    <CardDescription className="mt-1">{node!.description}</CardDescription>
                </Link>
                {/* <div className="m-0">
                    <CropCardMenu crop={node} onSubmit={props.onSubmit}></CropCardMenu>
                </div> */}
            </CardHeader>
            <CardContent className="grid gap-4">
                <ScrollArea >
                    <div className="flex flex-wrap">
                        <div className="flex-1 space-y-1">
                            {node.sensors?.map((sensor) => (
                                <p key={sensor.id} className="text-sm text-muted-foreground">
                                    {sensor.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}