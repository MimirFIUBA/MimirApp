import Link from "next/link";
import CropCard from "../../components/crop/cropCard";

interface CropDashboardProps {
    loading: boolean,
    refresh: () => void,
    crops?: Crop[]
}

export function CropDashboard({...props} : CropDashboardProps) {
    const crops = props.crops
    console.log(crops)
    if (!crops || crops.length < 1 || props.loading) {
        return (
            <div className="m-2 flex flex-col text-sm space-y-6">
                <p>No hay cultivos registrados.</p>
                <p>Consultá la documentación si necesitas ayuda para registrar tu primer cultivo: <Link href="/docs/crops" className="underline decoration-solid font-bold text-primary">Aprendé sobre el manejo de cultivos.</Link></p>
            </div>
        )
    } 
    return (
        <div className="m-2 flex flex-row flex-wrap">
            {crops.map((crop) => (
                <div key={crop.id} className="m-2">
                    <CropCard crop={crop} onSubmit={props.refresh} />
                </div>
            ))}
        </div>
    )
}
