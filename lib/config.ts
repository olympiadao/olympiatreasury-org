import { defineChain } from "viem";
import deployment from "./contracts.json";

export type SupportedChainId = 61 | 63;
export const DEFAULT_CHAIN_ID: SupportedChainId = 63;

export const CHAIN_CONFIG = {
  63: {
    treasury: deployment.contracts.treasury.address as `0x${string}`,
    executor: deployment.contracts.executor.address as `0x${string}`,
    explorer: "https://etc-mordor.blockscout.com",
    api: "https://etc-mordor.blockscout.com/api/v2",
    eraLength: 2_000_000,
    name: "Mordor Testnet",
    symbol: "METC",
    testnet: true,
  },
  61: {
    treasury: deployment.contracts.treasury.address as `0x${string}`,
    executor: deployment.contracts.executor.address as `0x${string}`,
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
