import { useConfig } from "~/root";
import Tag from "../../common/Tag";

export default function Account() {
    const { abiFunctions } = useConfig();

    const isAccount = abiFunctions.some((func: any) => (func.name === '__execute__'));
    
    if (!isAccount) {
        return null;
    }

    return (
        <Tag text="Account" className="text-orange-700 bg-orange-100 " />
   );
}