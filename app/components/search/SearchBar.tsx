import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useProvider } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useConfig } from "~/root";
import { fetchAbi } from "~/utils/starknet";
import SearchResult from "./SearchResult";
import { Subtitle } from "../common/Title";
import ErrorMessage from "./ErrorMessage";
import type { Abi } from "starknet";
import { Contract, num } from "starknet";

export default function SearchBar() {
    const { provider } = useProvider();
    const { setContractAddress, abi, setAbi, defautlNetwork, setViewFunctions, setIsProxy, setImplementationAddress, setAbiFunctions, setIsImplementationClass } = useConfig();
    const [isContractAddressValid, setIsContractAddressValid] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayResult, setDisplayResult] = useState<boolean>(false);
    const [resultText, setResultText] = useState<string>("");
    const [userContractAddress, setUserContractAddress] = useState<string>("");

    const stopLoading = (abi: Abi|undefined, resultText: string) => {
        setIsLoading(false);
        setDisplayResult(true);
        setAbi(abi);
        setResultText(resultText);
    }

    const handleClick = async () => {
        // Check if the contract address is valid
        const regex = new RegExp(/^0x[0-9a-fA-F]{64}$/);
        setIsContractAddressValid(regex.test(userContractAddress));
        if (!regex.test(userContractAddress)) { return; }

        // Reset the state
        setDisplayResult(false);
        setIsLoading(true);
        setAbi(undefined);
        setIsProxy(false);
        setViewFunctions([]);
        setImplementationAddress("");
        setIsImplementationClass(false);
        setContractAddress(userContractAddress);

        // Fetch the ABI
        const {abiResult, isImplementationClass} = await fetchAbi(provider, userContractAddress);

        if (abiResult === undefined) {
            stopLoading(undefined, "Contract not found");
            return;
        }

        // Check if the contract is a proxy
        const isProxy = abiResult.some((func: any) => (func.name === '__default__'));
        setIsProxy(isProxy);
        setIsImplementationClass(isImplementationClass);

        if (!isProxy) {
            stopLoading(abiResult, "");
            return;
        }

        // If the contract is a proxy, fetch the implementation address
        const proxyContract = new Contract(abiResult, userContractAddress, provider);
        const possibleImplementationFunctionNames = ["implementation", "getImplementation", "get_implementation"];
        const matchingFunctionName = possibleImplementationFunctionNames.find(name => proxyContract[name] && typeof proxyContract[name] === "function");

        if (matchingFunctionName === undefined) {
            stopLoading(undefined, "No implementation found for this proxy contract");
            return;
        }

        const { implementation, address } = await proxyContract[matchingFunctionName]();
        const implementationAddress = address === undefined ? num.toHex(implementation) : num.toHex(address);
        setImplementationAddress(implementationAddress);

        try {
            const compiledContract = address === undefined ? await provider.getClassByHash(implementationAddress) : await provider.getClassAt(implementationAddress);
            stopLoading(compiledContract.abi, "");
        } catch { 
            stopLoading(undefined, "No implementation found for this proxy contract");
            return;
        }
    }

    const handleChange = (e: any) => {
        setUserContractAddress(e.target.value);
        setIsContractAddressValid(true);
    }

    useEffect(() => {
        if (!abi) { return; }
    
        // Define a recursive function to extract functions
        const extractFunctions = (abi: Abi) => {
          return abi.reduce((functions, item) => {
            if (item.type === 'function') {
              functions.push(item);
            } else if (item.type === 'struct' || item.type === 'interface' || item.type === 'contract') {
              // If the item is an object, recursively extract functions
              const nestedFunctions = extractFunctions(item.members || item.items);
              functions.push(...nestedFunctions);
            }
            return functions;
          }, []);
        };
    
        const extractedFunctions = extractFunctions(abi);
        setViewFunctions(extractedFunctions.filter((func: any) => (func.state_mutability === 'view' || func.stateMutability === 'view')));
        setAbiFunctions(extractedFunctions);
      }, [abi]);

    return (
        <>
            <div className="text-left w-full">
                     <div className="w-full">
                        <Subtitle title={`Search a contract on Starknet ${defautlNetwork}`} />
                    </div>
                <div className="flex justify-center items-center w-full">
                    <input 
                        type="text" 
                        className={`w-full px-4 py-2 rounded-xl border border-neutral-600 bg-neutral-700 text-neutral-100 focus:outline-none focus:border-neutral-500 ${!isContractAddressValid ? 'border-red-700' : ''}`}
                        placeholder="Search contract address" 
                        onChange={handleChange}
                    />
                    {!isLoading && <MagnifyingGlassIcon className="w-8 h-8 ml-2 cursor-pointer hover:text-neutral-50" onClick={handleClick} /> }
                    {isLoading && <div className="animate-spin rounded-full ml-2 h-8 w-8 border-b-2 border-neutral-100"></div> }
                </div>
                <div className="mt-1 ml-2">
                    <ErrorMessage 
                        displayError={!isContractAddressValid} 
                        message="Invalid contract address"
                    />
                </div>
            </div>
            <div className="mt-8">
                <SearchResult
                    displayResult={displayResult}
                    hasAbi={abi !== undefined}
                    resultText={resultText}
                />
            </div>
        </>
        
    );
}
