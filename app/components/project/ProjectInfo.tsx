import { useSlotURI } from "./SlotURI";

export default function ProjectInfo({slot}: {slot: string}) {
    const slotURI = useSlotURI();

    return (
        <>
            <div className="text-3xl uppercase font-bold mb-1">
                {slotURI.name}
                <span className="text-xl text-neutral-300 ml-2 font-light">(slot {slot})</span>
            </div>
            <div className="text-neutral-100">{slotURI.description}</div>
            <div className="mt-4">
                <LinkComponent href={slotURI.external_url} title="External URL" />
            </div>
            <div className="mt-2">
                <LinkComponent href={slotURI.youtube_url} title="Youtube URL" />
            </div>
            <div className="mt-2">
                <LinkComponent href={slotURI.banner_image_url} title="Banner Image URL" />
            </div>
        </>
    )
}

function LinkComponent({ href, title }: { href: string, title: string }) {
    return (
        <div className="text-ellipsis overflow-hidden">
            <span>{title}: </span>
            <a href={href} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-neutral-200">{href}</a>
        </div>
    )
}