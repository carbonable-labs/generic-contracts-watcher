import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";

export default function APR({ minterAddress }: { minterAddress: string}) {
    const { yielderAbi, yielderAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: yielderAddress,
        abi: yielderAbi,
        functionName: 'get_apr',
        args: [minterAddress],
        parseResult: false
    });

    if (error) {
        return (
            <div>Error loading APR...</div>
        )
    }

    if (data === undefined || typeof data !== 'object') {
        return (
            <div>APR is undefined...</div>
        )
    }

    const dataAsArray = data as Array<string>
    const num = Number(dataAsArray[0]);
    const den = Number(dataAsArray[2]);
    const apr = (num / den) * 100;

    return (
        <LabelComponent
            title="APR"
            value={`${apr}%`}
        />
    )
}