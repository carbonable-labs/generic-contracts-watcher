export default function ErrorMessage({ displayError, message }: { displayError: boolean, message: string }) {
    if (displayError) {
        return (
            <div className="text-red-700 text-sm">
                {message}
            </div>
        )
    }

    return null;
}