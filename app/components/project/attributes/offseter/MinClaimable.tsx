import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";

export default function MinClaimable() {
    const { offseterAbi, offseterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: offseterAddress,
        abi: offseterAbi,
        functionName: 'get_min_claimable'
    });

    if (error) {
        return (
            <div>Error loading min claimable...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Min claimable is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Min claimable"
            value={`t${(bigIntToNumber(data)).toString()}`}

        />
    )
}