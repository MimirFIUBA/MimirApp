"use client"

import * as React from "react"
import NewNodeButton from "@/components/sensorNode/newNodeButton";
import NodeCard from "@/components/sensorNode/nodeCard";

export default function Page({ params }: { params: { id: string } }) {
    const [crop, setCrop] = React.useState<Crop|undefined>()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('/api/groups/' + params.id)
        .then((res) => res.json())
        .then((data) => {
            setCrop(data.items)
            setIsLoading(false)
        })
    }, [params.id])

    
    return(
        <div>
            <div className="flex flex-row">
                <div>
                    <h1 className="text-xl font-semibold">{crop?.name}</h1>
                    <h2 className="text-sm text-muted-foreground">{crop?.description}</h2>
                </div>
                <span className="flex-1"></span>
                <div>
                    {
                        crop != undefined ?
                        <NewNodeButton crops={[crop]}></NewNodeButton>
                        :<span></span>
                    }
                </div>
            </div>
            <div>
                {crop?.nodes?.map((node) => (
                    <div key={node.id} className="m-2">
                        <NodeCard node={node}></NodeCard>
                    </div>
                ))}
            </div>
        </div>
    );
}