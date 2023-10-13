import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { DECIMALS } from "~/types/config";
import { bigIntToNumber } from "~/utils/starknet";

export default function MinValuePerTx() {
    const { minterAbi, minterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: minterAddress,
        abi: minterAbi,
        functionName: 'get_min_value_per_tx'
    });

    if (error) {
        return (
            <div>Error loading min value per tx...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Min value per tx is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Min value per transaction"
            value={(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}

        />
    )
}