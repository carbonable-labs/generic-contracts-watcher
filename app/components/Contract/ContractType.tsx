import ImplementationClassAddress from "./ImplementationClassAddress";
import Account from "./types/Account";
import ERC2O from "./types/ERC20";
import ERC721 from "./types/ERC721";
import Proxy from "./types/Proxy";


export default function ContractType() {
    return (
        <>
            <div className="flex items-center justify-start">
                <Proxy />
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