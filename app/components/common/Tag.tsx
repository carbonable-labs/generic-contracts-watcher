export default function Tag({ text, className }: { text: string, className: string }) {
    return (
        <div className={`${className} rounded-lg px-2 py-1 text-sm font-bold mr-3 uppercase`}>
            {text}
        </div>
    );
}