import { Link } from "@remix-run/react";

export default function Header() {
    return (
        <div className="w-full px-12 py-4 border-b border-b-opacityDark-80 bg-neutral-800/80 backdrop-blur-sm">
            <Link to={'/'} className="flex flex-nowrap items-start w-min">
                <img className="w-1/12 min-w-[180px]" src="/assets/images/common/logo.svg" alt="Logo Carbonable"/>
                <div className="uppercase font-bold text-greenish-500 ml-2 text-sm pt-1">
                    Watcher
                </div>
            </Link>
        </div>
    )
}