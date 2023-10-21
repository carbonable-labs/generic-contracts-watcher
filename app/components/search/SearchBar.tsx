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
    const { contractAddress, setContractAddress, abi, setAbi, defautlNetwork, setViewFunctions, setIsProxy, setImplementationAddress, setAbiFunctions, setIsImplementationClass } = useConfig();
    const [isContractAddressValid, setIsContractAddressValid] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayResult, setDisplayResult] = useState<boolean>(false);
    const [resultText, setResultText] = useState<string>("");

    const stopLoading = (abi: Abi|undefined, resultText: string) => {
        setIsLoading(false);
        setDisplayResult(true);
        setAbi(abi);
        setResultText(resultText);
    }

    const handleClick = async () => {
        const regex = new RegExp(/^0x[0-9a-fA-F]{64}$/);
        setIsContractAddressValid(regex.test(contractAddress));
        if (!regex.test(contractAddress)) { return; }

        setDisplayResult(false);
        setIsLoading(true);
        setAbi(undefined);
        setIsProxy(false);
        setViewFunctions([]);
        setImplementationAddress("");
        setIsImplementationClass(false);

        const {abiResult, isImplementationClass} = await fetchAbi(provider, contractAddress);

        if (abiResult === undefined) {
            stopLoading(undefined, "Contract not found");
            return;
        }

        const isProxy = abiResult.some((func: any) => (func.name === '__default__'));
        setIsProxy(isProxy);
        setIsImplementationClass(isImplementationClass);

        if (!isProxy) {
            stopLoading(abiResult, "");
            return;
        }

        const proxyContract = new Contract(abiResult, contractAddress, provider);
        const canGetImplementation = proxyContract.functions.hasOwnProperty("get_implementation");

        if (!canGetImplementation) {
            stopLoading(undefined, "No implementation found for this proxy contract");
            return;
        }

        const { implementation: implementationAddress } = await proxyContract.get_implementation();
        setImplementationAddress(num.toHex(implementationAddress));
        const compiledEContract = await provider.getClassByHash(num.toHex(implementationAddress));

        stopLoading(compiledEContract.abi, "");
    }

    const handleChange = (e: any) => {
        setContractAddress(e.target.value);
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
