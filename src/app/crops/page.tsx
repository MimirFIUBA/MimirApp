'use client'
import { CropTable } from "@/components/crop/cropTable";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import NewCropButton from "@/components/crop/newCropButton";

export default function Page() {
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
        setIsLoading(true)
        fetch('/api/groups')
        .then((res) => res.json())
        .then((data) => {
            setCrops(data.items)
            setIsLoading(false)
        });
    };

    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">Cultivos</h1>
                    <h2 className="text-sm text-muted-foreground">Administra tus cultivos</h2>
                </div>
                <span className="flex-1"></span>
                <div className="flex">
                    <NewCropButton onSubmit={refresh}></NewCropButton>
                    <Button variant="outline" className="ml-2" size="icon" onClick={refresh}>
                        <ReloadIcon className="h-4 w-4 m-2" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-row-reverse m-2">
                
            </div>
            <div>
                <CropTable crops={crops} loading={isLoading}></CropTable>
            </div>
        </div>
    );
}