import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectImage from "~/components/project/ProjectImage";
import ProjectAbisWrapper from "~/components/project/ProjectAbisWrapper";
import SlotURIWrapper from "~/components/project/SlotURI";
import ProjectInfo from "~/components/project/ProjectInfo";
import ProjectMetadata from "~/components/project/ProjectMetadata";
import { Title } from "~/components/common/Title";
import ProjectTabs from "~/components/project/ProjectTabs";

export async function loader({params}: LoaderFunctionArgs) {
    return json({ project_address: params.project, slot: params.slot });
}

export default function Index() {
    const { project_address, slot } = useLoaderData();

    return (
        <>  
            <ProjectAbisWrapper 
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
                        <div className="w-full ml-1">
                            <ProjectMetadata />
                        </div>
                    </div>
                </SlotURIWrapper>
                <div className="w-full">
                    <Title
                        title="Contracts data"
                        icon="🪪"
                     />
                     <ProjectTabs />
                </div>
            </ProjectAbisWrapper>
        </>
    );
}