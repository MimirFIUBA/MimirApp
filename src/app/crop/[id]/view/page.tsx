"use client"

import * as React from "react"

export default function Page({ params }: { params: { id: string } }) {
    const [crop, setCrop] = React.useState<Crop|undefined>()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('/api/groups/' + params.id)
        .then((res) => res.json())
        .then((data) => {
            setCrop(data)
            setIsLoading(false)
        })
    }, [params.id])

    
    return(
        <div>
            <h1>{crop?.name}</h1>
        </div>
    );
}