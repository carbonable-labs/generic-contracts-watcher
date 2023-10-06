import PageEntry from "./PageEntry";

export default function Pages() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <PageEntry name="SVG" path="/svg" />
        </div>
    );
}