import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";
import { DECIMALS } from "~/types/config";

export default function MaxSale() {
    const { yielderAbi, yielderAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: yielderAddress,
        abi: yielderAbi,
        functionName: 'get_max_sale'
    });

    if (error) {
        return (
            <div>Error loading max sale...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Max sale is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Max sale"
            value={`${(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}`}

        />
    )
}