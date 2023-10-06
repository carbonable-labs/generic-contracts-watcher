import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { StarknetProvider } from "./components/starknet/StarknetProvider";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
    const defautlNetwork = process.env.NETWORK
    const infuraApiKey = process.env.INFURA_API_KEY;

    return json({ defautlNetwork, infuraApiKey });
};

export default function App() {
  const { defautlNetwork, infuraApiKey } = useLoaderData();

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
        <StarknetProvider defautlNetwork={defautlNetwork} infuraApiKey={infuraApiKey} >
          <main className="px-4 py-8">
            <Outlet />
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </StarknetProvider>
      </body>
    </html>
  );
}
