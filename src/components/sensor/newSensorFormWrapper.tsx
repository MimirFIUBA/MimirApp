"use client";

import { useEffect, useState } from "react";
import Loading from "../ui/loading";
import ErrorDisplayer from "../error-displayer";
import NewSensorForm from "./newSensorForm";

interface NewSensorFormWrapperProps {
    onSubmit?: () => void,
    crops?: Array<Crop>,
}

export default function NewSensorFormWrapper({ ...props } : NewSensorFormWrapperProps) {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ crops, setCrops ] = useState(props.crops)
    const [ errorMessage, setErrorMessage ] = useState("")

    useEffect(() => {
        fetch('/api/groups')
        .then((res) => {
            if (res.status != 200) {
                throw new Error(res.statusText)
            } else {
                return res.json()
            }
        })
        .then((data) => {
            setCrops(data.items)
            setIsLoading(false)
        })
        .catch(error => {
            setErrorMessage("No pudimos cargar la informacion de los cultivos: " + error.message)
        })
        .finally(() => {
            setIsLoading(false)
        });
    }, []);

    return (
        <>
        {
        isLoading 
            ? <Loading text="Cargando" />
            : <NewSensorForm onSubmit={props.onSubmit} crops={crops}/>
        }
        { errorMessage != "" && <ErrorDisplayer message={errorMessage}></ErrorDisplayer> }
        </>
    )
}