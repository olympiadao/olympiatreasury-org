import { defineChain } from "viem";

export const TREASURY_ADDRESS =
  "0xd6165F3aF4281037bce810621F62B43077Fb0e37" as const;

export const MORDOR_EXPLORER = "https://etc-mordor.blockscout.com";
export const MORDOR_API = "https://etc-mordor.blockscout.com/api/v2";

export const mordor = defineChain({
  id: 63,
  name: "Mordor Testnet",
  nativeCurrency: { name: "Mordor Ether", symbol: "METC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.mordor.etccooperative.org"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: MORDOR_EXPLORER },
  },
  testnet: true,
});
