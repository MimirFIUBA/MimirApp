'use client'

import * as React from "react"
import NewNodeButton from "@/components/sensorNode/newNodeButton";
import NodeCard from "@/components/sensorNode/nodeCard";
import PageHeader from "@/components/page-header";
import NewSensorButton from "@/components/sensor/newSensorButton";

export default function Page({ params }: { params: { id: string } }) {
    const [node, setNode] = React.useState<SensorNode|undefined>()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('/api/nodes/' + params.id)
        .then((res) => res.json())
        .then((data) => {
            setNode(data.items)
            setIsLoading(false)
        })
    }, [params.id])

    
    return(
        <div>
            <PageHeader
                title={node?.name}
                subtitle={node?.description}
                rigthComponent={
                    <NewSensorButton></NewSensorButton>
                }
            ></PageHeader>
            <div>
                {node?.sensors?.map((sensor) => (
                    <div key={sensor.id} className="m-2">
                        <h1>{sensor.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}