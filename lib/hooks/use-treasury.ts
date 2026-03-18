"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBalance, fetchBalanceHistory, fetchStats, fetchTransactions } from "../treasury";
import { useActiveChainId } from "./use-chain";

const REFETCH_INTERVAL = 600_000; // 10 min
const STALE_TIME = 300_000; // 5 min

export function useTreasuryBalance() {
  const chainId = useActiveChainId();
  return useQuery({
    queryKey: ["treasury", "balance", chainId],
    queryFn: () => fetchBalance(chainId),
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}

export function useTreasuryStats() {
  const chainId = useActiveChainId();
  return useQuery({
    queryKey: ["treasury", "stats", chainId],
    queryFn: () => fetchStats(chainId),
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}

export function useTreasuryTransactions() {
  const chainId = useActiveChainId();
  return useQuery({
    queryKey: ["treasury", "transactions", chainId],
    queryFn: () => fetchTransactions(chainId),
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}

export function useTreasuryBalanceHistory() {
  const chainId = useActiveChainId();
  return useQuery({
    queryKey: ["treasury", "balanceHistory", chainId],
    queryFn: () => fetchBalanceHistory(chainId),
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}
