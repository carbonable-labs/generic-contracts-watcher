import type { MetaFunction } from "@remix-run/node";
import Pages from "~/components/menu/Pages";

export const meta: MetaFunction = () => {
  return [
    { title: "Carbonable Smart Contracts Watcher" },
    { name: "description", content: "Monitore Carbonable Smart Contracts" },
  ];
};

export default function Index() {
  return (
    <div>
      <div className="mt-8">
        <Pages />
      </div>
    </div>
  );
}
