import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";
import { DECIMALS } from "~/types/config";

export default function TotalAbsorption() {
    const { yielderAbi, yielderAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: yielderAddress,
        abi: yielderAbi,
        functionName: 'get_total_absorption'
    });

    if (error) {
        return (
            <div>Error loading total absorption...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Total absorption is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Total absorption"
            value={`t${(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}`}

        />
    )
}