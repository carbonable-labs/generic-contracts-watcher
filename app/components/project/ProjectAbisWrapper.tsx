import { useProvider } from "@starknet-react/core";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Abi } from "starknet";
import { useConfig } from "~/root";
import { fetchAbi } from "~/utils/starknet";

type ProjectAbiContextType = {
    projectAbi: Abi,
    minterAbi?: Abi,
    yielderAbi?: Abi,
    offseterAbi?: Abi,
    projectAddress: string,
    minterAddress?: string,
    yielderAddress?: string,
    offseterAddress?: string
}

const ProjectAbiContext = createContext<ProjectAbiContextType>({} as ProjectAbiContextType);

export default function ProjectAbisWrapper({ children, projectAddress }: { children: React.ReactNode, projectAddress: string }) {
    const { provider } = useProvider();
    const { projects } = useConfig();

    const minterAddress = useMemo(() => projects.find((project) => project.project === projectAddress)?.minter, [projects, projectAddress]);
    const yielderAddress = useMemo(() => projects.find((project) => project.project === projectAddress)?.yielder, [projects, projectAddress]);
    const offseterAddress = useMemo(() => projects.find((project) => project.project === projectAddress)?.offseter, [projects, projectAddress]);

    const [projectAbi, setProjectAbi] = useState<Abi|undefined>(undefined);
    const [minterAbi, setMinterAbi] = useState<Abi|undefined>(undefined);
    const [yielderAbi, setYielderAbi] = useState<Abi|undefined>(undefined);
    const [offseterAbi, setOffseterAbi] = useState<Abi|undefined>(undefined);
    
    useEffect(() => {
        async function fetchProjectAbiWrapper() {
            const projectAbiResult = await fetchAbi(provider, projectAddress);
            setProjectAbi(projectAbiResult);

        }
        fetchProjectAbiWrapper();
    }, [provider, projectAddress]);

    useEffect(() => {
        async function fetchMinterAbiWrapper() {

            if (minterAddress !== undefined) {
                const minterAbiResult = await fetchAbi(provider, minterAddress);
                setMinterAbi(minterAbiResult);
            }
        }
        fetchMinterAbiWrapper();
    }, [provider, minterAddress]);

    useEffect(() => {
        async function fetchYielderAbiWrapper() {

            if (yielderAddress !== undefined) {
                const minterAbiResult = await fetchAbi(provider, yielderAddress);
                setYielderAbi(minterAbiResult);
            }
        }
        fetchYielderAbiWrapper();
    }, [provider, yielderAddress]);

    useEffect(() => {
        async function fetchOffseterAbiWrapper() {

            if (offseterAddress !== undefined) {
                const minterAbiResult = await fetchAbi(provider, offseterAddress);
                setOffseterAbi(minterAbiResult);
            }
        }
        fetchOffseterAbiWrapper();
    }, [provider, offseterAddress]);


    if (projectAbi === undefined) { return null; }

    return (
        <ProjectAbiContext.Provider 
            value={{ projectAbi, minterAbi, yielderAbi, offseterAbi, projectAddress, minterAddress, yielderAddress, offseterAddress }}
        >
            { children }
        </ProjectAbiContext.Provider>
    );
}


export function useProjectAbis() {
    return useContext(ProjectAbiContext);
}