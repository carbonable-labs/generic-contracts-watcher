export default function PageEntry({name, path}: {name: string, path: string}) {
    return (
        <a
            href={path}
            className="w-full h-full border border-opacityLight-10 rounded-xl p-4 flex justify-center items-center hover:bg-opacityLight-5"
        >
            <div className="uppercase font-bold text-2xl">
                {name}
            </div>
        </a>
    )
}