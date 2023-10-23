import { useContractRead } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { num, shortString } from "starknet";
import { useConfig } from "~/root";

export default function Name() {
    const { viewFunctions } = useConfig();

    const nameFunction = viewFunctions.find(
        func => func.name === 'name'
    );

    if (nameFunction === undefined) {
        return null;
    }

    return <NameComponent nameFunction={nameFunction} />;
}

function NameComponent({ nameFunction }: { nameFunction: any }) {
    const { contractAddress, abi } = useConfig();
    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
        abi,
        functionName: nameFunction.name
    });
    const [decodedName, setDecodedName] = useState<string>("");

    useEffect(() => {
        if (data === undefined) { return; }

        if (typeof data === 'object' && data.hasOwnProperty('name')) {
            setDecodedName(shortString.decodeShortString(num.toHex((data as any).name)).toString());
        }

        if (typeof data === 'bigint') {
            setDecodedName(shortString.decodeShortString(num.toHex(data.toString())));
        }
    }, [data]);

    if (isLoading || error || data === undefined) {
        return null;
    }

    return (
        <div className="text-xl font-bold">
            {decodedName}
        </div>
    );
}