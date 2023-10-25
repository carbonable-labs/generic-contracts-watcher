import { useState } from "react";
import InputComponenent from "../common/InputComponent";
import NameComponent from "../common/NameComponent";
import ViewOutputComponentWrapper from "./ViewOutputComponentWrapper";
import { FunctionType } from "~/types/contract";

export default function ViewFunction({ functionData }: { functionData: any }) {
    const [finalInputValues, setFinalInputValues] = useState<any|undefined>(undefined);

    return (
        <div className="border border-neutral-600 rounded-lg mb-4 ">
            <NameComponent name={functionData.name} />
            <InputComponenent 
                functionData={functionData}
                setFinalInputValues={setFinalInputValues}
                functionType={FunctionType.VIEW}
            />
            <ViewOutputComponentWrapper 
                functionData={functionData} 
                inputValues={finalInputValues}
            />
        </div>
    )
}