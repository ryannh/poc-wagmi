import { cookieStorage, createConfig, createStorage, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors"

export const config = createConfig({
  connectors: [
    injected(),
    walletConnect({ projectId: "bd461e19f604531e1531b240e3b180e4" }),
    metaMask(),
    safe(),
  ],
  chains: [mainnet, sepolia],
  ssr: true,
  multiInjectedProviderDiscovery: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
