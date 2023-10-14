import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import BooleanComponent from "~/components/common/BooleanComponent";

export default function PublicSaleOpen() {
    const { minterAbi, minterAddress } = useProjectAbis();
    const { data, error } = useContractRead({
        address: minterAddress,
        abi: minterAbi,
        functionName: 'is_public_sale_open'
    });

    if (error) {
        return (
            <div>Error loading public sale open...</div>
        )
    }

    if (data === undefined || typeof data !== 'boolean') {
        return (
            <div>Pre sale open is undefined...</div>
        )
    }

    return (
        <BooleanComponent
            title="Public sale"
            text={data === true ? "Open" : "Closed"}
            value={data}
        />
    )
}