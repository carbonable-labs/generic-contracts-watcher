import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectImage from "~/components/project/ProjectImage";
import ProjectAbiWrapper from "~/components/project/ProjectAbiWrapper";
import SlotURIWrapper from "~/components/project/SlotURI";
import ProjectInfo from "~/components/project/ProjectInfo";
import ProjectAttributes from "~/components/project/ProjectAttributes";
import ProjectTabs from "~/components/project/ProjectTabs";

export async function loader({params}: LoaderFunctionArgs) {
    return json({ project_address: params.project, slot: params.slot });
}

export default function Index() {
    const { project_address, slot } = useLoaderData();

    return (
        <>  
            <ProjectAbiWrapper 
                key={`abi_${slot}`} 
                projectAddress={project_address}
            >
                <SlotURIWrapper
                    slot={slot} 
                    projectAddress={project_address}
                >
                    <div className="w-full flex flex-wrap">
                        <div className="w-full md:w-1/3">
                            <ProjectImage />
                        </div>
                        <div className="w-full md:w-2/3 md:px-8 mt-4 md:mt-0">
                            <ProjectInfo slot={slot} />
                        </div>
                        <div className="w-full mt-4 ml-1">
                            <ProjectAttributes />
                        </div>
                    </div>
                </SlotURIWrapper>
                <div className="w-full">
                    <div className="text-xl font-bold uppercase mt-8">
                        Contracts analytics
                    </div>
                    <ProjectTabs />
                </div>
            </ProjectAbiWrapper>
        </>
    );
}