import { GrassOutlined, RocketOutlined, SensorsOutlined } from "@mui/icons-material";
import { RocketIcon, TableIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <div className="space-y-6">
                <p>
                    <b>Mimir</b> es un sistema de monitoreo y automatización de cultivos hidropónicos.
                    En esta sección haremos una breve introducción al sistema par que vayas aprendiendo como funciona.
                </p>
                <p>
                    El sistema esta compuesto por cultivos, los cuales se les pueden asignar nodos, que son los encargados de controlar a los sensores.
                    Por ejemplo, podemos tener un cultivo de tomates, conectado con un arduino u otro dispositivo y varios sensores, que pueden ser de temperatura, ph, etc.
                    En este caso nuestro nodo es el arduino. Pero también podríamos tener otro nodo con otros sensores o también actuadores, como podría ser una bomba de agua, o una luz.
                </p>
                <p>
                    ¿Cómo manejamos nuestro cultivo? Mimir provee una serie de herramientas para poder armar tu propio sistema automatizado.
                    Por un lado estan los <b>handlers</b>, que son los que le van a decir a Mimir como interpretar los datos que se envían desde los sensores.
                    Y por otro lado, los <b>triggers</b>, esta herramienta permite configurar acciones que se disparan cuando ocurre algún evento.
                    Los triggers estan compuestos de una condición, y varias acciones.
                    Por ejemplo, podríamos querer encender una bomba de agua cuando el ph este bajo para que regule el ph desde algún contenedor.
                    Para esto usariamos un trigger que se activa cuando el ph baja (o sube) a determinado valor y enviamos un mensaje mediante mqtt para que se active la bomba por determinado tiempo.
                </p>
                <p>
                    En las siguientes secciones se describen las herramientas con mayor profundidad:
                </p>
                <ul className="pl-6 space-y-2">
                    <li>
                        <Link href={"/docs/triggers"} className="flex underline decoration-solid font-bold text-primary">
                            <GrassOutlined className="mr-2"></GrassOutlined>
                            Cultivos
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/handlers" className="flex underline decoration-solid font-bold text-primary">
                            <SensorsOutlined className="mr-2"></SensorsOutlined>
                            Handlers
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/triggers" className="flex underline decoration-solid font-bold text-primary">
                            <RocketIcon className="mr-2" width={24} height={24}/>
                            Triggers
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/variables" className="flex underline decoration-solid font-bold text-primary">
                            <TableIcon className="mr-2" width={24} height={24}/>
                            Variables
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}