import type { Abi } from "starknet";
import type { ContractType } from "./contract";

export type Config = {
    contractAddress: string,
    setContractAddress: (address: string) => void,
    abi: Abi|undefined,
    setAbi: (abi: Abi|undefined) => void,
    defautlNetwork: string,
    viewFunctions: Array<any>,
    setViewFunctions: (viewFunction: Array<any>) => void,
    writeFunctions: Array<any>,
    setWriteFunctions: (writeFunctions: Array<any>) => void,
    isProxy: boolean,
    setIsProxy: (isProxy: boolean) => void,
    implementationAddress: string,
    setImplementationAddress: (address: string) => void,
    abiFunctions: Array<any>,
    setAbiFunctions: (abiFunctions: Array<any>) => void,
    isImplementationClass: boolean,
    setIsImplementationClass: (isImplementationClass: boolean) => void,
    contractTypes: ContractType[],
    setContractTypes: (callback: (prevContractTypes: ContractType[]) => ContractType[]) => void,
}

export const DECIMALS = 6;

// Interfaces
export const IACCOUNT_ID = 0xa66bd575;
export const IERC721_ID = 0x80ac58cd;
export const IERC721_ENUMERABLE_ID = 0x780e9d63;
export const IERC721_METADATA_ID = 0x5b5e139f;
export const IERC1155_ID = 0xd9b67a26;

// Functions
export const ERC20_DEFAULT_VIEW_FUNCTIONS = ["name", "symbol", "decimals", "totalSupply", "balanceOf", "allowance"];
export const ERC20_DEFAULT_WRITE_FUNCTIONS = ["approve", "transfer", "transferFrom"];
export const ERC721_DEFAULT_VIEW_FUNCTIONS = ["balanceOf", "ownerOf", "getApproved", "isApprovedForAll"];
export const ERC721_DEFAULT_WRITE_FUNCTIONS = ["safeTransferFrom", "transferFrom", "approve", "setApprovalForAll"];
export const ERC721_ENUMERABLE_DEFAULT_VIEW_FUNCTIONS = ["totalSupply", "tokenByIndex", "tokenOfOwnerByIndex"];
export const ERC721_ENUMERABLE_DEFAULT_WRITE_FUNCTIONS = [];
export const ERC721_METADATA_DEFAULT_VIEW_FUNCTIONS = ["name", "symbol", "tokenURI"];
export const ERC721_METADATA_DEFAULT_WRITE_FUNCTIONS = [];
export const ACCOUNT_DEFAULT_VIEW_FUNCTIONS = [];
export const ACCOUNT_DEFAULT_WRITE_FUNCTIONS = ["__validate__", "__execute__"];


export const contractRegex = /^0x[0-9a-fA-F]{62,64}$/;

declare global {
    interface BigInt {
        /** Convert to BigInt to string form in JSON.stringify */
        toJSON: () => string;
    }
}

BigInt.prototype.toJSON = function () {
    return this.toString();
};
