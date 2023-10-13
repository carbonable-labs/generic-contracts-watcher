import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import BooleanComponent from "~/components/common/BooleanComponent";

export default function PreSaleOpen() {
    const { minterAbi, minterAddress } = useProjectAbis();
    const { data, isLoading, error } = useContractRead({
        address: minterAddress,
        abi: minterAbi,
        functionName: 'is_pre_sale_open'
    });

    if (isLoading) {
        return (
            <div>Loading pre sale open...</div>
        )
    }

    if (error) {
        return (
            <div>Error loading pre sale open...</div>
        )
    }

    if (data === undefined || typeof data !== 'boolean') {
        return (
            <div>Pre sale open is undefined...</div>
        )
    }

    return (
        <BooleanComponent
            title="Pre-sale"
            text={data === true ? "Open" : "Closed"}
            value={data}
        />
    )
}