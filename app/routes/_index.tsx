import type { MetaFunction } from "@remix-run/node";
import ContractType from "~/components/contract/ContractType";
import SearchBar from "~/components/search/SearchBar";
import ContractFunctions from "~/components/contract/ContractFunctions";
import { useConfig } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Starknet Smart Contracts Watcher" },
    { name: "description", content: "Monitore Starknet Smart Contracts" },
  ];
};

export default function Index() {
  const { abi } = useConfig();

  if (!abi) {
    return (
      <div className="mt-8">
        <SearchBar />
      </div>
    );
  }

  return (
    <>
      <div className="mt-8">
        <SearchBar />
      </div>
      <div className="mt-8 border border-neutral-600 rounded-xl p-4">
        <ContractType />
      </div>
      <div className="mt-8 border border-neutral-600 rounded-xl p-4">
        <ContractFunctions />
      </div>
    </>
  );
}
