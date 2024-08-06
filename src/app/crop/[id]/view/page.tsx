export default function Page({ params }: { params: { id: string } }) {
    return <p>Crop View Page: {params.id}</p>;
}