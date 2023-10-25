import { useMemo } from "react";
import { useConfig } from "~/root";
import ViewFunction from "./ViewFunction";

export default function CustomViewFunctions({defaultFunctions}: {defaultFunctions: string[]}) {
    const { viewFunctions } = useConfig();
    const filteredViewFunctions = useMemo(() => {
        return viewFunctions.filter((viewFunction) => !defaultFunctions.includes(viewFunction.name));
    }, [viewFunctions, defaultFunctions]);

    if (filteredViewFunctions.length === 0) {
        return (
            <>No default view functions</>
        )
    }

    return (
        <>
            {filteredViewFunctions.map((viewFunction) => (
                <div key={viewFunction.name}>
                    <ViewFunction functionData={viewFunction} />
                </div>
            ))}
      </>
    )
}