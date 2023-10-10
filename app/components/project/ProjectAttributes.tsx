import { useSlotURI } from "./SlotURI";

export default function ProjectAttributes() {
    const slotURI = useSlotURI();

    console.log(slotURI)

    return (
        <>
            <div className="text-xl font-bold uppercase mt-2">
                Project Attributes
            </div>
            <div className="flex items-start justify-start w-full flex-wrap mt-4">
                {slotURI.attributes.map((attribute, index) => {
                    return (
                        <div key={`attribute_${index}`} className="border border-opacityLight-10 rounded-2xl px-5 py-2 mr-3 mb-2 min-w-[100px]">
                            <div className="uppercase font-light mb-1 text-neutral-300 text-xs">{attribute.trait_type}</div>
                            <div className="text-neutral-100 font-bold">{attribute.value}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}