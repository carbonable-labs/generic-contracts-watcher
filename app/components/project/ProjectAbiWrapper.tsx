import { useProvider } from "@starknet-react/core";
import { createContext, useContext, useEffect, useState } from "react";
import type { Abi } from "starknet";
import { fetchAbi } from "~/utils/starknet";

const ProjectAbiContext = createContext<Abi>({} as Abi);

export default function ProjectAbiWrapper({ children, projectAddress }: { children: React.ReactNode, projectAddress: string }) {
    const { provider } = useProvider();
    const [abi, setAbi] = useState<Abi|undefined>(undefined);
    
    useEffect(() => {
        async function fetchAbiWrapper() {
            const abiResult = await fetchAbi(provider, projectAddress);
            setAbi(abiResult);
        }
        fetchAbiWrapper();
    }, [provider, projectAddress]);

    if (abi === undefined) { return null; }

    return (
        <ProjectAbiContext.Provider value={ abi }>
            { children }
        </ProjectAbiContext.Provider>
    );
}


export function useProjectAbi() {
    return useContext(ProjectAbiContext);
}