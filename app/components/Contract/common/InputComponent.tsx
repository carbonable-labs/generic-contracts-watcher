import { useState } from "react";
import { FunctionType } from "~/types/contract";

export default function InputComponenent({ functionData, setFinalInputValues, functionType }: { functionData: any, setFinalInputValues: (input: any) => void, functionType: FunctionType }) {
    const [inputValues, setInputValues] = useState<any|undefined>(undefined);

    if (functionData.inputs.length === 0) {
        return null;
    }

    const handleInputChange = (inputName: string, event: any) => {
        const newValue = event.target.value;
        
        if (newValue === "") {
            setInputValues(undefined);
            return;
        }

        setInputValues({ ...inputValues, [inputName]: newValue });
    };

    const handleSubmit = () => {
        if (Object.keys(inputValues).length !== functionData.inputs.length) {
            return;
        }

        setFinalInputValues(inputValues);
    };

    return (
        <div className="w-full px-4 py-5 bg-neutral-900">
            {functionData.inputs.map((input: any, index: number) => (
                <div key={index} className=" mb-2">
                    <label className="text-neutral-300 font-light mr-2 min-w-[80px]">{input.name}:</label>
                    <input
                        onChange={(e) => handleInputChange(input.name, e)}
                        className="w-full px-4 py-1 rounded-lg border border-neutral-600 bg-neutral-700 text-neutral-100 focus:outline-none focus:border-neutral-500"
                        placeholder={input.type}
                    />
                </div>
            ))}
            <div className="text-left mt-4">
                <button 
                    onClick={handleSubmit}
                    className="px-4 py-1 rounded-lg border border-neutral-600 bg-neutral-100 text-neutral-900 focus:outline-none focus:border-neutral-500 hover:bg-neutral-50 disabled:hover:bg-neutral-100 disabled:cursor-not-allowed"
                    disabled={functionType === FunctionType.WRITE || inputValues === undefined || (functionData.inputs.length > 0 && Object.keys(inputValues).length !== functionData.inputs.length)}
                >
                    Submit
                </button>
            </div>
            
        </div>
    )
}