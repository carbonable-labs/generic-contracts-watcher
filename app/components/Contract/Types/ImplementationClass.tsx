import { useConfig } from "~/root";
import Tag from "../../common/Tag";

export default function ImplementationClass() {
    const { isImplementationClass } = useConfig();

    if (!isImplementationClass) {
        return null;
    }

    return (
         <Tag text="Class" className="text-red-700 bg-red-100 " />
    );
}