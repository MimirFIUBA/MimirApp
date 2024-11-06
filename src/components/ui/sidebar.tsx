import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"

export default function Sidebar() {
    return (
        <ScrollArea className="w-[200px]">
            <div className="mb-1">
              Inicio
            </div>
            <div className="mb-1">
              Cultivos
            </div>
            <div className="mb-1">
              Sensores
            </div>
            <div className="mb-1">
              Actuadores
            </div>
            <div className="mb-1">
              Procesadores
            </div>
        </ScrollArea>
    );
}