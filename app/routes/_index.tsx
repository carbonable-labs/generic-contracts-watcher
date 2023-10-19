import type { MetaFunction } from "@remix-run/node";
import SearchBar from "~/components/search/SearchBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Starknet Smart Contracts Watcher" },
    { name: "description", content: "Monitore Starknet Smart Contracts" },
  ];
};

export default function Index() {
  return (
    <div>
      <div className="mt-8">
        <SearchBar />
      </div>
    </div>
  );
}
