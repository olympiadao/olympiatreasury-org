"use client";

import { getChainConfig, type ChainConfig } from "../config";
import { useActiveChainId } from "./use-chain";

export function useChainConfig(): ChainConfig {
  return getChainConfig(useActiveChainId());
}
