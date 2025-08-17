import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const sonicChain = {
  id: 64165,
  name: 'Sonic Testnet',
  nativeCurrency: { name: 'Sonic', symbol: 'S', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.sonic.game/'] },
  },
  blockExplorers: {
    default: { name: 'SonicScan', url: 'https://explorer.testnet.sonic.game' },
  },
};


export const config = createConfig({
  chains: [sonicChain, mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [sonicChain.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
