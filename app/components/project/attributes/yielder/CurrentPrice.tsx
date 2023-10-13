import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";

export default function CurrentPrice() {
    const { yielderAbi, yielderAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: yielderAddress,
        abi: yielderAbi,
        functionName: 'get_current_price'
    });

    if (error) {
        return (
            <div>Error loading current price...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Current price is undefined...</div>
        )
    }

    return (
        <LabelComponent
            title="Current Price"
            value={`$${bigIntToNumber(data).toString()}`}
        />
    )
}