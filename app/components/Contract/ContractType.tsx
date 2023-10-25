import { useConfig } from "~/root";
import ImplementationClassAddress from "./ImplementationClassAddress";
import Account from "./interfaces/Account";
import ERC2O from "./interfaces/ERC20";
import ERC721 from "./interfaces/ERC721";
import ERC721Enumerable from "./interfaces/ERC721Enumerable";
import ERC721Metadata from "./interfaces/ERC721Metadata";
import ImplementationClass from "./types/ImplementationClass";
import Proxy from "./types/Proxy";


export default function ContractType() {
    const { isImplementationClass } = useConfig();

    if (isImplementationClass) {
        return (
            <>
                <div className="flex items-center justify-start">
                    <ImplementationClass />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-start">
                <span className="mr-2">Support interfaces: </span>
                <Proxy />
                <Account />
                <ERC2O />
                <ERC721 />
                <ERC721Enumerable />
                <ERC721Metadata />
            </div>
            <div>
                <ImplementationClassAddress />
            </div>
        </>
        
    );
}