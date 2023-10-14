import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";
import { DECIMALS } from "~/types/config";

export default function TotalClaimable() {
    const { offseterAbi, offseterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: offseterAddress,
        abi: offseterAbi,
        functionName: 'get_total_claimable'
    });

    if (error) {
        return (
            <div>Error loading total claimable...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Total claimable is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Total claimable"
            value={`t${(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}`}

        />
    )
}