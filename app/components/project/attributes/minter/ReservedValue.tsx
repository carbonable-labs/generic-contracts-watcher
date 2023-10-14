import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { DECIMALS } from "~/types/config";
import { bigIntToNumber } from "~/utils/starknet";

export default function ReservedValue() {
    const { minterAbi, minterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: minterAddress,
        abi: minterAbi,
        functionName: 'get_reserved_value'
    });

    if (error) {
        return (
            <div>Error loading reserved value...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Reserved value is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Reserved value"
            value={(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}

        />
    )
}