import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { DECIMALS } from "~/types/config";
import { bigIntToNumber } from "~/utils/starknet";

export default function TotalDeposited() {
    const { offseterAbi, offseterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: offseterAddress,
        abi: offseterAbi,
        functionName: 'get_total_deposited'
    });

    if (error) {
        return (
            <div>Error loading total deposited...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Total deposited is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Total deposited"
            value={`$${(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}`}

        />
    )
}