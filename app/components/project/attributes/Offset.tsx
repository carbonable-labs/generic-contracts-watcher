import MaxAbsorption from "./offseter/MaxAbsorption";
import MinClaimable from "./offseter/MinClaimable";
import TotalAbsorption from "./offseter/TotalAbsorption";
import TotalClaimable from "./offseter/TotalClaimable";
import TotalClaimed from "./offseter/TotalClaimed";
import TotalDeposited from "./offseter/TotalDeposited";

export default function Offset() {

    return (
        <>
            <TotalDeposited />
            <TotalAbsorption />
            <MaxAbsorption />
            <TotalClaimable />
            <TotalClaimed />
            <MinClaimable />
        </>
    )
}