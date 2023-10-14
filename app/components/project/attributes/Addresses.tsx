import LabelComponent from "~/components/common/LabelComponent";
import { useProjectAbis } from "../ProjectAbisWrapper";

export default function Addresses() {
    const { projectAddress, minterAddress, yielderAddress, offseterAddress } = useProjectAbis();

    return (
        <>
            <LabelComponent
                title="Project adddress"
                value={projectAddress}
            />
            <LabelComponent
                title="Minter address"
                value={minterAddress}
            />
            <LabelComponent
                title="Yielder address"
                value={yielderAddress}
            />
            <LabelComponent
                title="Offseter address"
                value={offseterAddress}
            />
        </>
    )
}