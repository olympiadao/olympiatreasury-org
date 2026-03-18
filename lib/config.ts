import { defineChain } from "viem";

export type SupportedChainId = 61 | 63;
export const DEFAULT_CHAIN_ID: SupportedChainId = 63;

export const CHAIN_CONFIG = {
  63: {
    treasury: "0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf" as const,
    executor: "0x64624f74f77639cba268a6c8bedc2778b707ef9a" as const,
    explorer: "https://etc-mordor.blockscout.com",
    api: "https://etc-mordor.blockscout.com/api/v2",
    eraLength: 2_000_000,
    name: "Mordor Testnet",
    symbol: "METC",
    testnet: true,
  },
  61: {
    treasury: "0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf" as const,
    executor: "0x64624f74f77639cba268a6c8bedc2778b707ef9a" as const,
    explorer: "https://etc.blockscout.com",
    api: "https://etc.blockscout.com/api/v2",
    eraLength: 5_000_000,
    name: "Ethereum Classic",
    symbol: "ETC",
    testnet: false,
  },
} as const;

export type ChainConfig = (typeof CHAIN_CONFIG)[SupportedChainId];

export function getChainConfig(chainId: number): ChainConfig {
  const config = CHAIN_CONFIG[chainId as SupportedChainId];
  if (!config) return CHAIN_CONFIG[DEFAULT_CHAIN_ID];
  return config;
}

// Backward compat
export const TREASURY_ADDRESS = CHAIN_CONFIG[63].treasury;
export const MORDOR_EXPLORER = CHAIN_CONFIG[63].explorer;
export const MORDOR_API = CHAIN_CONFIG[63].api;
export const ERA_LENGTH = CHAIN_CONFIG[63].eraLength;

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
