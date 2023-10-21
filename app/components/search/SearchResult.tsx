
export default function SearchResult({ hasAbi, resultText, displayResult }: { hasAbi: boolean, resultText: string, displayResult: boolean }) {

    if (displayResult && !hasAbi) {
        return (
            <div className="mt-8 border border-neutral-600 rounded-xl p-4">
                {resultText}
            </div>
        )
    }

    return null;
}