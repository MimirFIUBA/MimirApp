'use client'
import { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import NewSensorButton from "@/components/sensor/newSensorButton";
import { SensorTable } from "@/components/sensor/sensor-table";

export default function Page() {
    const [sensors, setSensors] = useState<Sensor[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('/api/sensors')
        .then((res) => res.json())
        .then((data) => {
            setSensors(data.items)
            setIsLoading(false)
        });
    }, []);

    const refresh = () => {
        setIsLoading(true)
        fetch('/api/sensors')
        .then((res) => res.json())
        .then((data) => {
            setSensors(data.items)
            setIsLoading(false)
        });
    };
    return (
        <div>
            <PageHeader
                title="Sensores"
                subtitle="Administra tus sensores"
                rigthComponent={<NewSensorButton></NewSensorButton>}
            ></PageHeader>
            <SensorTable
                sensors={sensors}
                loading={isLoading}
            ></SensorTable>
        </div>
    );
}