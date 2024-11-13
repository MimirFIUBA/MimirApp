'use client'
import { CropTable } from "@/components/crop/cropTable";
import { useEffect, useState } from "react";


async function getData(): Promise<Crop[]> {
    return fetch('https://www.google.com/')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return data.items
    })
    // return [
    //     {
    //         id: "123",
    //         description: "test description",
    //         name: "test",
    //         type: "crop",
    //         nodes: [{
    //             id: "123",
    //             name: "test node",
    //             description: "test node description",
    //             sensors: []
    //         },]
    //     }
    // ]
}

export default function Page() {
    // const data = await getData();
    const [crops, setCrops] = useState<Crop[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('/api/groups')
        .then((res) => res.json())
        .then((data) => {
            setCrops(data.items)
            setIsLoading(false)
        });
    }, []);

    const refresh = () => {
        fetch('/api/groups')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        })
    };
    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Cultivos</h1>
            <h2 className="text-sm text-muted-foreground">Administra tus cultivos</h2>
            <div>
                <CropTable crops={crops} loading={false}></CropTable>
            </div>
        </div>
    );
}