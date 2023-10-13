import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";

export default function UnitPrice() {
    const { minterAbi, minterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: minterAddress,
        abi: minterAbi,
        functionName: 'get_unit_price'
    });

    if (error) {
        return (
            <div>Error loading min value per tx...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Unit price is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Unit price"
            value={`$${bigIntToNumber(data).toString()}`}

        />
    )
}