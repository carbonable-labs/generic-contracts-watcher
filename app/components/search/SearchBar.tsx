import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchBar() {
    const [contractAddress, setContractAddress] = useState<string>("");
    const [isContractAddressValid, setIsContractAddressValid] = useState<boolean>(true);

    const handleClick = () => {
        const regex = new RegExp(/^0x[0-9a-fA-F]{64}$/);
        setIsContractAddressValid(regex.test(contractAddress));
    }

    const handleChange = (e: any) => {
        setContractAddress(e.target.value);
        setIsContractAddressValid(true);
    }

    return (
        <div className="text-left w-10/12 mx-auto">
            <div className="flex justify-center items-center w-full">
                <input 
                    type="text" 
                    className={`w-full px-4 py-2 rounded-xl border border-neutral-600 bg-neutral-700 text-neutral-100 focus:outline-none focus:border-neutral-500 ${!isContractAddressValid ? 'border-red-700' : ''}`}
                    placeholder="Search contract address" 
                    onChange={handleChange}
                />
                <MagnifyingGlassIcon className="w-8 h-8 ml-2 cursor-pointer hover:text-neutral-50" onClick={handleClick} />
            </div>
            <div className="text-red-700 text-sm mt-1 ml-2">
                {!isContractAddressValid && 'Invalid contract address'}
            </div>
        </div>
    );
}
