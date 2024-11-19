'use client'

import { useState, useEffect } from "react";
import PageHeader from "@/components/page-header";
import NewNodeButton from "@/components/sensorNode/newNodeButton";
import { NodeTable } from "@/components/sensorNode/nodesTable";
import { Hub } from '@mui/icons-material';

export default function Page() {

    const [nodes, setNodes] = useState<SensorNode[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('/api/nodes')
        .then((res) => res.json())
        .then((data) => {
            setNodes(data.items)
            setIsLoading(false)
        });
    }, []);

    const refresh = () => {
        setIsLoading(true)
        fetch('/api/nodes')
        .then((res) => res.json())
        .then((data) => {
            setNodes(data.items)
            setIsLoading(false)
        });
    };

    return (
        <div>
            <PageHeader
                icon={<Hub></Hub>}
                title="Nodos"
                subtitle="Administra tus nodos"
                rigthComponent={<NewNodeButton></NewNodeButton>}
            ></PageHeader>
            <NodeTable nodes={nodes} loading={false} ></NodeTable>
        </div>
    );
}