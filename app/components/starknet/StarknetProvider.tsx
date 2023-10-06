import { StarknetConfig, argent, braavos, infuraProvider } from "@starknet-react/core";
import { goerli, mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, defautlNetwork, infuraApiKey }: { children: React.ReactNode, defautlNetwork: string, infuraApiKey: string }) {
    const chains = useMemo(() => {
        if (defautlNetwork === 'mainnet') {
          return [mainnet];
        }

        return [goerli]
      }, [defautlNetwork]);
    
      const providers = [infuraProvider({ apiKey: infuraApiKey })];
      // const providers = [jsonRpcProvider({ rpc })];
      const connectors = useMemo(() => [braavos(), argent()], []);
  
    return (
      <StarknetConfig
        chains={chains}
        providers={providers}
        connectors={connectors}
        autoConnect={true}
      >
        {children}
      </StarknetConfig>
    );
  }
