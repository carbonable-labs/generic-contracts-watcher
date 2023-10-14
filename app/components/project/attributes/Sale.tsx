import PreSaleOpen from "./minter/PreSaleOpen";
import PublicSaleOpen from "./minter/PublicSaleOpen";
import MinValuePerTx from "./minter/MinValuePerTx";
import MaxValuePerTx from "./minter/MaxValuePerTx";
import UnitPrice from "./minter/UnitPrice";
import ReservedValue from "./minter/ReservedValue";
import MaxValue from "./minter/MaxValue";
import PaymentTokenAddress from "./payment/PaymentTokenAddress";
import { useProjectAbis } from "../ProjectAbisWrapper";

export default function Sale() {
    const { minterAbi, minterAddress } = useProjectAbis();

    return (
        <>
            <div className="flex items-center justify-start gap-x-4">
                <PreSaleOpen />
                <PublicSaleOpen />
            </div>
            <MinValuePerTx />
            <MaxValuePerTx />
            <UnitPrice />
            <ReservedValue />
            <MaxValue />
            { minterAbi && minterAddress &&
                <PaymentTokenAddress
                    abi={minterAbi}
                    address={minterAddress}
                />
            }
        </>
    )
}