import { useConfig } from "~/root";
import Tag from "../../common/Tag";

export default function Proxy() {
    const { isProxy } = useConfig();

    if (!isProxy) {
        return null;
    }

    return (
         <Tag text="Proxy" className="text-blue-700 bg-blue-100 " />
    );
}