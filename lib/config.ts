import { defineChain } from "viem";

export type SupportedChainId = 61 | 63;
export const DEFAULT_CHAIN_ID: SupportedChainId = 63;

/**
 * The two addresses this dashboard monitors, per network.
 *
 * `vault` is the base-fee destination — where consensus credits land and where
 * `sweep()` empties from. `treasury` is the TimelockController it sweeps into, which
 * holds the funds while governance decides.
 *
 * They live here rather than in `contracts.json` because an address is a property of
 * one network, not of the architecture. ECIP-1112 makes Mainnet's and Mordor's
 * independent published values and forbids deriving either from a salt or a deployer
 * nonce, so nothing here may be computed and nothing may be assumed equal across
 * chains. `contracts.json` carries the architecture and no addresses at all.
 */
export const CHAIN_CONFIG = {
  63: {
    vault: "0x60d0A7394f9Cd5C469f9F5Ec4F9C803F5294d79b" as `0x${string}`,
    treasury: "0x3d19fEfB093Abad60421B89CF48f4569aaae39b6" as `0x${string}`,
    explorer: "https://etc-mordor.blockscout.com",
    api: "https://etc-mordor.blockscout.com/api/v2",
    eraLength: 2_000_000,
    name: "Mordor Testnet",
    symbol: "METC",
    testnet: true,
  },
  61: {
    vault: "0x60d0A7394f9Cd5C469f9F5Ec4F9C803F5294d79b" as `0x${string}`,
    treasury: "0x3d19fEfB093Abad60421B89CF48f4569aaae39b6" as `0x${string}`,
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

export const MORDOR_EXPLORER = CHAIN_CONFIG[63].explorer;

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
