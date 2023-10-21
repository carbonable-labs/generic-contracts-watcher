import type { Abi } from "starknet";

export type Config = {
    contractAddress: string,
    setContractAddress: (address: string) => void,
    abi: Abi|undefined,
    setAbi: (abi: Abi|undefined) => void,
    defautlNetwork: string,
    viewFunctions: Array<any>,
    setViewFunctions: (viewFunction: Array<any>) => void,
    isProxy: boolean,
    setIsProxy: (isProxy: boolean) => void,
    implementationAddress: string,
    setImplementationAddress: (address: string) => void,
    abiFunctions: Array<any>,
    setAbiFunctions: (abiFunctions: Array<any>) => void,
    isImplementationClass: boolean,
    setIsImplementationClass: (isImplementationClass: boolean) => void
}

export const DECIMALS = 6;

// Account
export const IACCOUNT_ID = 0xa66bd575;
// ERC721
export const IERC721_ID = 0x80ac58cd;
