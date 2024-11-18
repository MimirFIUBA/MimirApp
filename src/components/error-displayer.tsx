import { Error } from "@mui/icons-material"

export default function ErrorDisplayer({message}: {message: string}) {
    return (
        <div className="text-destructive justify-center text-center">
            <div className="flex flex-row justify-center">
                <Error fontSize="large"></Error>
                <h1 className="text-4xl ml-2">Error</h1>
            </div>
            <h2>{message}</h2>
        </div>
    )
}