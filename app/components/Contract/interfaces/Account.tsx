import { useContractRead } from "@starknet-react/core";
import { useEffect } from "react";
import Tag from "~/components/common/Tag";
import { useConfig } from "~/root";
import { IACCOUNT_ID } from "~/types/config";
import { ContractType } from "~/types/contract";

export default function ERC721() {
    const { viewFunctions } = useConfig();

    const supportsInterfaceFunction = viewFunctions.find(
        func => func.name === 'supports_interface' || func.name === 'supportsInterface'
    );

    if (supportsInterfaceFunction === undefined) {
        return null;
    }

    return <ERC721Component supportsInterfaceFunction={supportsInterfaceFunction} />;
}

function ERC721Component({ supportsInterfaceFunction }: { supportsInterfaceFunction: any }) {
    const { contractAddress, abi, setContractTypes } = useConfig();
    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
        abi,
        functionName: supportsInterfaceFunction.name,
        args: [IACCOUNT_ID],
    });

    useEffect(() => {
        if (data === undefined) { return; } 

        if (data === true || (data as any).success === 1n) {
            setContractTypes((prevContractTypes) => [...prevContractTypes, ContractType.ACCOUNT]);
        }
    }, [data]);

    if (isLoading || error || data === false || (data as any).success === 0n || data === undefined) {
        return null;
    }

    return (
        <Tag text="Account" className="text-orange-700 bg-orange-100 " />
    );
}