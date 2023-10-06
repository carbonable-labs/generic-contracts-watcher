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
      <h1 className="text-2xl md:text-4xl uppercase text-center font-bold">Carbonable Smart Contracts Watcher</h1>
      <div className="w-full h-80 relative mt-12">
        <iframe 
          title="wathing" 
          src="https://giphy.com/embed/anzLZHW9ImqI0" 
          width="100%" 
          height="100%" 
          style={{position: 'absolute'}} 
          className="giphy-embed" 
          allowFullScreen>
        </iframe>
      </div>
      <div className="mt-8">
        <Pages />
      </div>
    </div>
  );
}
