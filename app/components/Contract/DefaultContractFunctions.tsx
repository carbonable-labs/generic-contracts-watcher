import { useConfig } from "~/root";
import { Subtitle, Title } from "../common/Title";
import { ContractType } from "~/types/contract";
import DefaultWriteFunctions from "./writeFunctions/DefaultWriteFunctions";
import DefaultViewFunctions from "./viewFunctions/DefaultViewFunctions";
import { ACCOUNT_DEFAULT_VIEW_FUNCTIONS, ACCOUNT_DEFAULT_WRITE_FUNCTIONS, ERC20_DEFAULT_VIEW_FUNCTIONS, ERC20_DEFAULT_WRITE_FUNCTIONS, ERC721_DEFAULT_VIEW_FUNCTIONS, ERC721_DEFAULT_WRITE_FUNCTIONS, ERC721_ENUMERABLE_DEFAULT_VIEW_FUNCTIONS, ERC721_ENUMERABLE_DEFAULT_WRITE_FUNCTIONS, ERC721_METADATA_DEFAULT_VIEW_FUNCTIONS, ERC721_METADATA_DEFAULT_WRITE_FUNCTIONS } from "~/types/config";
import { useEffect, useState } from "react";
import CustomViewFunctions from "./viewFunctions/CustomViewFunctions";
import CustomWriteFunctions from "./writeFunctions/CustomWriteFunctions";

export default function DefaultContractFunctions() {
    const  { contractTypes } = useConfig();
    const [defaultViewFunctions, setDefaultViewFunctions] = useState<string[]>([]);
    const [defaultWriteFunctions, setDefaultWriteFunctions] = useState<string[]>([]);

    useEffect(() => {
        const viewFunctions: string[] = [];
        const writeFunctions: string[] = [];

        if (contractTypes.includes(ContractType.ERC20)) {
            viewFunctions.push(...ERC20_DEFAULT_VIEW_FUNCTIONS);
            writeFunctions.push(...ERC20_DEFAULT_WRITE_FUNCTIONS);
        }

        if (contractTypes.includes(ContractType.ERC721)) {
            viewFunctions.push(...ERC721_DEFAULT_VIEW_FUNCTIONS);
            writeFunctions.push(...ERC721_DEFAULT_WRITE_FUNCTIONS);
        }

        if (contractTypes.includes(ContractType.ERC721_METADATA)) {
            viewFunctions.push(...ERC721_METADATA_DEFAULT_VIEW_FUNCTIONS);
            writeFunctions.push(...ERC721_METADATA_DEFAULT_WRITE_FUNCTIONS);
        }

        if (contractTypes.includes(ContractType.ERC721_ENUMERABLE)) {
            viewFunctions.push(...ERC721_ENUMERABLE_DEFAULT_VIEW_FUNCTIONS);
            writeFunctions.push(...ERC721_ENUMERABLE_DEFAULT_WRITE_FUNCTIONS);
        }

        if (contractTypes.includes(ContractType.ACCOUNT)) {
            viewFunctions.push(...ACCOUNT_DEFAULT_VIEW_FUNCTIONS);
            writeFunctions.push(...ACCOUNT_DEFAULT_WRITE_FUNCTIONS);
        }

        setDefaultViewFunctions(viewFunctions);
        setDefaultWriteFunctions(writeFunctions);
    }, [contractTypes]);

    return (
        <>
            <Title title="Default Functions" />
            <div>
                <Subtitle title="View functions" />
                <div className="">
                    <DefaultViewFunctions defaultFunctions={defaultViewFunctions} />
                </div>
            </div>
            <div className="mt-12">
                <Subtitle title="Write functions" />
                <div className="">
                    <DefaultWriteFunctions defaultFunctions={defaultWriteFunctions} />
                </div>
            </div>
            
            <>
                <Title title="Custom Functions" />
                <Subtitle title="View functions" />
                <div className="">
                    <CustomViewFunctions defaultFunctions={defaultViewFunctions} />
                </div>
                
                
                <Subtitle title="Write functions" />
                <div className="">
                    <CustomWriteFunctions defaultFunctions={defaultWriteFunctions} />
                </div>
            </>
        </>
    );
}