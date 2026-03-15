"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBalance, fetchBalanceHistory, fetchStats, fetchTransactions } from "../treasury";

const REFETCH_INTERVAL = 600_000; // 10 min
const STALE_TIME = 300_000; // 5 min

export function useTreasuryBalance() {
  return useQuery({
    queryKey: ["treasury", "balance"],
    queryFn: fetchBalance,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}

export function useTreasuryStats() {
  return useQuery({
    queryKey: ["treasury", "stats"],
    queryFn: fetchStats,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}

export function useTreasuryTransactions() {
  return useQuery({
    queryKey: ["treasury", "transactions"],
    queryFn: fetchTransactions,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}

export function useTreasuryBalanceHistory() {
  return useQuery({
    queryKey: ["treasury", "balanceHistory"],
    queryFn: fetchBalanceHistory,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  });
}
