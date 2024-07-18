import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"

export default function Sidebar() {
    return (
        <ScrollArea className="w-[200px]">
            <h4 className="mb-4 text-sm font-medium leading-none">Sidebar</h4>
            <div>
              Home
            </div>
            <Separator/>
            <div>
              Cultivos
            </div>
            <Separator/>
            <div>
              Sensores
            </div>
            <Separator/>
        </ScrollArea>
    );
}