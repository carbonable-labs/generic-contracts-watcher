import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

export default function LinkComponent({ href, title }: { href: string, title: string }) {
    return (
        <div className="text-ellipsis overflow-hidden text-neutral-300">
            <span>{title}: </span>
            <a href={href} target="_blank" rel="noreferrer" className="text-neutral-100 hover:text-neutral-50">{href}</a>
        </div>
    )
}

export function ContractLinkComponent({ href, title, address }: { href: string, title: string, address: string }) {
    return (
        <div className="text-ellipsis overflow-hidden text-neutral-300 flex items-center">
            <div>{title}: </div>
            <div className="text-neutral-100 hover:text-neutral-50 flex items-center ml-2">
                <a href={href} target="_blank" rel="noreferrer">{address}</a>
                <ArrowTopRightOnSquareIcon className="ml-1 w-4 h-4 cursor-pointer" />
            </div>
            
        </div>
    )
}