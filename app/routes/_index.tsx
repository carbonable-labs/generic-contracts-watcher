import type { MetaFunction } from "@remix-run/node";
import ContractType from "~/components/Contract/ContractType";
import SearchBar from "~/components/search/SearchBar";
import { useConfig } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Starknet Smart Contracts Watcher" },
    { name: "description", content: "Monitore Starknet Smart Contracts" },
  ];
};

export default function Index() {
  const { abi } = useConfig();

  return (
    <>
      <div className="mt-8">
        <SearchBar />
      </div>
      { abi && (
        <div className="mt-8 border border-neutral-600 rounded-xl p-4">
          <ContractType />
        </div>
      )}
    </>
  );
}
