import { StarknetConfig, argent, braavos, jsonRpcProvider } from "@starknet-react/core";
import { goerli, mainnet } from "@starknet-react/chains";
import { useMemo } from "react";

export function StarknetProvider({ children, defautlNetwork }: { children: React.ReactNode, defautlNetwork: string }) {
    const chains = useMemo(() => {
        if (defautlNetwork === 'mainnet') {
          return [mainnet];
        }

        return [goerli]
      }, [defautlNetwork]);

      function rpc() {
        return {
          http: 'http://localhost:3000/api'
        }
      }
    
      const providers = [jsonRpcProvider({ rpc })];
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
