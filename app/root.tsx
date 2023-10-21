import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { StarknetProvider } from "./components/starknet/StarknetProvider";
import Header from "./components/menu/Header";
import Back from "./components/common/Back";
import type { Config } from "./types/config";
import { useState } from "react";
import type { Abi } from "starknet";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
    const defautlNetwork = process.env.NETWORK

    return json({ defautlNetwork });
};

export default function App() {
  const { defautlNetwork } = useLoaderData();
  const [contractAddress, setContractAddress] = useState<string>("");
  const [abi, setAbi] = useState<Abi|undefined>(undefined);
  const [viewFunctions, setViewFunctions] = useState([]);
  const [abiFunctions, setAbiFunctions] = useState([]);
  const [isProxy, setIsProxy] = useState<boolean>(false);
  const [implementationAddress, setImplementationAddress] = useState<string>("");
  const [isImplementationClass, setIsImplementationClass] = useState<boolean>(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"></link>
      </head>
      <body className="bg-neutral-800 text-neutral-100">
        <StarknetProvider defautlNetwork={defautlNetwork}  >
          <header className="fixed top-0 w-full z-50">
            <Header />
          </header>
          <main className="px-4 py-8 md:px-8 mt-[80px] relative w-screen mx-auto 2xl:max-w-6xl font-inter">
            <Back />
            <Outlet context={{ 
              contractAddress,
              setContractAddress,
              abi,
              setAbi,
              defautlNetwork,
              viewFunctions,
              setViewFunctions,
              isProxy,
              setIsProxy,
              implementationAddress,
              setImplementationAddress,
              abiFunctions,
              setAbiFunctions,
              isImplementationClass,
              setIsImplementationClass
              }} 
            />
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </StarknetProvider>
      </body>
    </html>
  );
}

export function useConfig() {
  return useOutletContext<Config>();
}
