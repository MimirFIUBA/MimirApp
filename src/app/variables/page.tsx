'use client'

import { VariableTable } from "@/components/variables/variable-table";
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import NewVariableButton from "@/components/variables/new-variable-button";
import { TableIcon } from "@radix-ui/react-icons";

export default function Page() {
    const [variables, setVariables] = useState<Variable[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('/api/user-variables')
        .then((res) => res.json())
        .then((data) => {
            setVariables(data.items)
        })
        .finally(() => {
            setIsLoading(false)
        });
    }, []);

    const refresh = () => {
        setIsLoading(true)
        fetch('/api/user-variables')
        .then((res) => res.json())
        .then((data) => {
            setVariables(data.items)
        })
        .finally(() => {
            setIsLoading(false)
        });
    };

    return (
        <div>
            <PageHeader
                icon={
                  <TableIcon width={24} height={24}/>
                }
                title="Variables de Usuario"
                subtitle="Administra tus variables"
                rigthComponent={<NewVariableButton onSubmit={refresh}></NewVariableButton>}
            >
            </PageHeader>
            <VariableTable variables={variables} loading={isLoading}></VariableTable>
        </div>
    );
}