export default function NameComponent({name}: {name: string}) {
    return (
        <div className="w-full px-4 py-2 bg-neutral-900 rounded-t-lg">
            <h1>{name}</h1>
        </div>
    )
}