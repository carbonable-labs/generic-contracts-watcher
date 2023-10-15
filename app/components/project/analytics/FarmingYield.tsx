import { useProjectAbis } from "../ProjectAbisWrapper";
import AbsorptionCurve from "./AbsorptionCurve";

export default function FarmingYield() {
    const { projectAbi, yielderAbi } = useProjectAbis();

    if (!projectAbi || !yielderAbi) {
        return (
            <div>Project ABI or Yielder ABI is undefined...</div>
        )
    }

    return (
        <>
            <AbsorptionCurve />
        </>
    )
}