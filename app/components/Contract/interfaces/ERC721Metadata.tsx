import { useContractRead } from "@starknet-react/core";
import { useEffect } from "react";
import Tag from "~/components/common/Tag";
import { useConfig } from "~/root";
import { IERC721_METADATA_ID } from "~/types/config";
import { ContractType } from "~/types/contract";

export default function ERC721Metadata() {
    const { viewFunctions } = useConfig();

    const supportsInterfaceFunction = viewFunctions.find(
        func => func.name === 'supports_interface' || func.name === 'supportsInterface'
    );

    if (supportsInterfaceFunction === undefined) {
        return null;
    }

    return <ERC721MetadataComponent supportsInterfaceFunction={supportsInterfaceFunction} />;
}

function ERC721MetadataComponent({ supportsInterfaceFunction }: { supportsInterfaceFunction: any }) {
    const { contractAddress, abi, setContractTypes } = useConfig();
    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
        abi,
        functionName: supportsInterfaceFunction.name,
        args: [IERC721_METADATA_ID],
    });

    useEffect(() => {
        if (data === undefined) { return; } 

        if (data === true || (data as any).success === 1n) {
            setContractTypes((prevContractTypes) => [...prevContractTypes, ContractType.ERC721_METADATA]);
        }
    }, [data]);

    if (isLoading || error || data === false || (data as any).success === 0n) {
        return null;
    }

    return (
        <Tag text="ERC721_METADATA" className="text-teal-700 bg-teal-100 " />
    );
}