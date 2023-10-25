import { useEffect } from "react";
import Tag from "~/components/common/Tag";
import { useConfig } from "~/root";
import { ContractType } from "~/types/contract";

export default function ERC2O() {
    const { abiFunctions, setContractTypes } = useConfig();

    const isERC20 = 
        abiFunctions.some((func: any) => (func.name === 'name')) && 
        abiFunctions.some((func: any) => (func.name === 'symbol')) && 
        abiFunctions.some((func: any) => (func.name === 'decimals')) &&
        abiFunctions.some((func: any) => (func.name === 'totalSupply')) &&
        abiFunctions.some((func: any) => (func.name === 'balanceOf')) &&
        abiFunctions.some((func: any) => (func.name === 'allowance')) &&
        abiFunctions.some((func: any) => (func.name === 'transfer')) &&
        abiFunctions.some((func: any) => (func.name === 'approve')) &&
        abiFunctions.some((func: any) => (func.name === 'transferFrom'));
    
    useEffect(() => {
        if (isERC20) {
            setContractTypes((prevContractTypes) => [...prevContractTypes, ContractType.ERC20]);
        }
    }, [isERC20]);
    
    if (!isERC20) {
        return null;
    }

    return (
        <Tag text="ERC20" className="text-violet-700 bg-violet-100 " />
   );
}