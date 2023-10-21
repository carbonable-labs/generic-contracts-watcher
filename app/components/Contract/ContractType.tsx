import Account from "./Types/Account";
import ImplementationClass from "./Types/ImplementationClass";
import ImplementationClassAddress from "./ImplementationClassAddress";
import Proxy from "./Types/Proxy";
import ERC2O from "./Types/ERC20";
import ERC721 from "./Types/ERC721";

export default function ContractType() {
    return (
        <>
            <div className="flex items-center justify-start">
                <Proxy />
                <ImplementationClass />
                <Account />
                <ERC2O />
                <ERC721 />
            </div>
            <div>
                <ImplementationClassAddress />
            </div>
        </>
        
    );
}