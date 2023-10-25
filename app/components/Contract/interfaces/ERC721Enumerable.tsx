import { useContractRead } from "@starknet-react/core";
import { useEffect } from "react";
import Tag from "~/components/common/Tag";
import { useConfig } from "~/root";
import { IERC721_ENUMERABLE_ID } from "~/types/config";
import { ContractType } from "~/types/contract";

export default function ERC721Enumerable() {
    const { viewFunctions } = useConfig();

    const supportsInterfaceFunction = viewFunctions.find(
        func => func.name === 'supports_interface' || func.name === 'supportsInterface'
    );

    if (supportsInterfaceFunction === undefined) {
        return null;
    }

    return <ERC721EnumerableComponent supportsInterfaceFunction={supportsInterfaceFunction} />;
}

function ERC721EnumerableComponent({ supportsInterfaceFunction }: { supportsInterfaceFunction: any }) {
    const { contractAddress, abi, setContractTypes } = useConfig();
    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
        abi,
        functionName: supportsInterfaceFunction.name,
        args: [IERC721_ENUMERABLE_ID],
    });

    useEffect(() => {
        if (data === undefined) { return; } 

        if (data === true || (data as any).success === 1n) {
            setContractTypes((prevContractTypes) => [...prevContractTypes, ContractType.ERC721_ENUMERABLE]);
        }
    }, [data]);

    if (isLoading || error || data === false || (data as any).success === 0n) {
        return null;
    }

    return (
        <Tag text="ERC721_ENUMERABLE" className="text-teal-700 bg-teal-100 " />
    );
}