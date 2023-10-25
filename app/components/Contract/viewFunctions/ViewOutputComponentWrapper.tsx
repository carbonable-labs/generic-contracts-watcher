import { useContractRead } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useConfig } from "~/root";
import { formatData } from "~/utils/starknet";

export default function ViewOutputComponentWrapper({ inputValues, functionData }: { inputValues?: any, functionData: any }) {
    if (inputValues === undefined && functionData.inputs.length === 0) {
        return <OutputComponent functionData={functionData} />;
    }

    if (inputValues !== undefined && functionData.inputs.length > 0) {
        return <OutputComponent inputValues={inputValues} functionData={functionData} />;
    }

    return (
        <div className="w-full px-4 py-2 bg-neutral-700 rounded-b-lg">
            No result
        </div>
    )
}

function OutputComponent({ inputValues, functionData }: { inputValues?: any, functionData: any }) {
    const { contractAddress, abi } = useConfig();
    const { data, isLoading, error } = useContractRead({
        address: contractAddress,
        abi,
        functionName: functionData.name,
        args: inputValues ? Object.values(inputValues) : [],
    });
    const [decodedValue, setDecodedValue] = useState<string>("");

    useEffect(() => {
        if (data === undefined) { return; }

        setDecodedValue(formatData(data, functionData.outputs[0]));
    }, [data]);

    if (isLoading) {
        return (
            <div className="w-full px-4 py-2 bg-neutral-700 rounded-b-lg">
                Loading...
            </div>
        );
    }

    if (error || data === undefined) {
        return (
            <div className="w-full px-4 py-2 bg-neutral-700 rounded-b-lg">
                Error: {error?.message}
            </div>
        );
    }

    return (
        <div className="w-full px-4 py-2 bg-neutral-700 rounded-b-lg">
            {decodedValue}
        </div>
    );
}
