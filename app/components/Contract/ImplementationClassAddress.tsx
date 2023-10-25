import { useConfig } from "~/root";
import LabelComponent from "../common/LabelComponent";

export default function ImplementationClassAddress() {
    const { implementationAddress } = useConfig();

    if (implementationAddress === "" ) {
        return null;
    }
    return (
        <LabelComponent title="Implementation class: " value={implementationAddress} />
    );
}