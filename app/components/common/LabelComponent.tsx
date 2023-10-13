export default function LabelComponent({ title, value }: { title: string, value: string|undefined }) {
    if (value === undefined) {
        return (
            <div className="text-ellipsis overflow-hidden text-neutral-300 mt-1">
                <span>{title}: </span>
                <span className="text-neutral-100">Loading...</span>
            </div>
        )
    }

    return (
        <div className="text-ellipsis overflow-hidden text-neutral-300 mt-1">
            <span>{title}: </span>
            <span className="text-neutral-100">{value}</span>
        </div>
    )
}