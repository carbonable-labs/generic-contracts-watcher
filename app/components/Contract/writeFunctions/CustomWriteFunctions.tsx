import { useMemo } from "react";
import { useConfig } from "~/root";
import WriteFunction from "./WriteFunction";

export default function CustomWriteFunctions({defaultFunctions}: {defaultFunctions: string[]}) {
    const { writeFunctions } = useConfig();
    const filteredWriteFunctions = useMemo(() => {
        return writeFunctions.filter((writeFunction) => !defaultFunctions.includes(writeFunction.name));
    }, [writeFunctions, defaultFunctions]);

    if (filteredWriteFunctions.length === 0) {
        return (
            <>No default write functions</>
        )
    }
    
    return (
        <>
            {filteredWriteFunctions.map((writeFunction) => (
                <div key={writeFunction.name}>
                <WriteFunction functionData={writeFunction} />
            </div>
            ))}
        </>
    )
}