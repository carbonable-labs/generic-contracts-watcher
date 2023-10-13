export default function LinkComponent({ href, title }: { href: string, title: string }) {
    return (
        <div className="text-ellipsis overflow-hidden text-neutral-300">
            <span>{title}: </span>
            <a href={href} target="_blank" rel="noreferrer" className="text-neutral-100 hover:text-neutral-50">{href}</a>
        </div>
    )
}