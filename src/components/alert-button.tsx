import React from "react";
import Link from 'next/link'
import { BellIcon } from "@radix-ui/react-icons";

function AlertButton({count} : {count: number}) {
    return (
        <div className="relative mx-3">
            <Link href={"/alerts"}>
                <BellIcon className="w-6 h-6"/>
                {count > 0 && (
                    <div
                    className="absolute -top-1 -right-2 w-5 h-5
                    bg-destructive text-destructive-foreground font-bold
                    text-center text-xs py-0.5
                    rounded-full"
                    >
                        {count}
                    </div>
                )}
            </Link>
        </div>
    );
}

export default AlertButton;