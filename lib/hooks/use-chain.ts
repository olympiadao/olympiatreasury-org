"use client";

import { useSearchParams } from "next/navigation";
import { DEFAULT_CHAIN_ID, type SupportedChainId } from "../config";

export function useActiveChainId(): SupportedChainId {
  const params = useSearchParams();
  const raw = params.get("chain");
  if (raw === "61") return 61;
  if (raw === "63") return 63;
  return DEFAULT_CHAIN_ID;
}
