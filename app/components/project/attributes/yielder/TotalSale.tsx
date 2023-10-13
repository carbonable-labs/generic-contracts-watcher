import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";
import { DECIMALS } from "~/types/config";

export default function TotalSale() {
    const { yielderAbi, yielderAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: yielderAddress,
        abi: yielderAbi,
        functionName: 'get_total_sale'
    });

    if (error) {
        return (
            <div>Error loading total sale...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Total sale is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Total sale"
            value={`${(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}`}

        />
    )
}