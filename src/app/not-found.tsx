

export default function Custom404() {
    return (
        <div className="flex flex-col justify-center text-center m-16">
            <h1 className="mb-4 text-xl">404 - Page Not Found</h1>
            <div className="text-sm">
                <p>Ups! esa pagina que estas buscando no existe.</p>
                <p>Verifica que la url sea correcta e intenta de nuevo.
                Si el error persiste contactate con soprte técnico.</p>
            </div>
        </div>
    )
}