import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title?: string,
  subtitle?: string,
  rigthComponent?: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export default function PageHeader(props : PageHeaderProps) {
    return (
        <div className={cn("flex", props.className)}>
            {
                props.icon && 
                <div className="mr-2">
                    {props.icon}
                </div>
            }
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold">{props.title}</h1>
                <h2 className="text-sm text-muted-foreground">{props.subtitle}</h2>
            </div>
            <span className="flex-1"></span>
            <div className="flex">
                {props.rigthComponent}
            </div>
        </div>
    );
}