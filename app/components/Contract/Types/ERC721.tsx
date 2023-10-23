import { useContractRead } from "@starknet-react/core";
import Tag from "~/components/common/Tag";
import { useConfig } from "~/root";
import { IERC721_ID } from "~/types/config";

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
    const { contractAddress, abi } = useConfig();
    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
        abi,
        functionName: supportsInterfaceFunction.name,
        args: [IERC721_ID],
    });

    if (isLoading || error || data === false || (data as any).success === 0n) {
        return null;
    }

    return (
        <Tag text="ERC721" className="text-violet-700 bg-violet-100 " />
    );
}