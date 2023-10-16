import { useProjectAbis } from './ProjectAbisWrapper';
import CumulativeAbsorptionCurve from './analytics/CumulativeAbsorptionCurve';
import SellPricesCurve from './analytics/SellPriceCurve';
import CumulativeSaleCurve from './analytics/CumulativeSaleCurve';
import CompensatedPriceCurve from './analytics/UpdatedPriceCurve';
import UpdatedPriceCurve from './analytics/UpdatedPriceCurve';

export default function Analytics() {
    const { projectAbi, yielderAbi } = useProjectAbis();

    if (!projectAbi || !yielderAbi) {
        return (
            <div>Project ABI or Yielder ABI is undefined...</div>
        )
    }

    return (
        <>
            <CumulativeAbsorptionCurve />
            <SellPricesCurve />
            <UpdatedPriceCurve />
            <CumulativeSaleCurve />
        </>
    )
}