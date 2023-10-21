import Tag from "~/components/common/Tag";
import { useConfig } from "~/root";

export default function ERC2O() {
    const { viewFunctions } = useConfig();

    const isERC20 = 
        viewFunctions.some((func: any) => (func.name === 'name')) && 
        viewFunctions.some((func: any) => (func.name === 'symbol')) && 
        viewFunctions.some((func: any) => (func.name === 'decimals')) &&
        viewFunctions.some((func: any) => (func.name === 'totalSupply'));
    
    if (!isERC20) {
        return null;
    }

    return (
        <Tag text="ERC20" className="text-violet-700 bg-violet-100 " />
   );
}