"use client";

import { ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useTreasuryTransactions } from "@/lib/hooks/use-treasury";
import { useChainConfig } from "@/lib/hooks/use-chain-config";

function truncateHash(hash: string): string {
  return `${hash.slice(0, 10)}\u2026${hash.slice(-6)}`;
}

function truncateAddress(addr: string): string {
  return `${addr.slice(0, 8)}\u2026${addr.slice(-6)}`;
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TransactionsSection() {
  const { data: transactions, isLoading } = useTreasuryTransactions();
  const config = useChainConfig();

  return (
    <section id="transactions" className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <a
            href={`${config.explorer}/address/${config.treasury}?tab=txs`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
          >
            View all on Explorer
            <ExternalLink size={12} />
          </a>
        </div>

        <div
          className="overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          {isLoading ? (
            <div className="space-y-3 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded bg-[var(--bg-elevated)]"
                />
              ))}
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-[var(--text-muted)]">
                No transactions yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-left text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Hash</th>
                    <th className="px-5 py-3">From / To</th>
                    <th className="px-5 py-3 text-right">Amount</th>
                    <th className="px-5 py-3">Block</th>
                    <th className="px-5 py-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 25).map((tx) => (
                    <tr
                      key={tx.hash}
                      className="border-b border-[var(--border-subtle)] transition-colors hover:bg-[var(--bg-elevated)]"
                    >
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-0.5">
                          {tx.type === "inflow" ? (
                            <span className="inline-flex items-center gap-1 text-[var(--brand-green)]">
                              <ArrowDownLeft size={14} />
                              Donation
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[var(--brand-amber)]">
                              <ArrowUpRight size={14} />
                              Withdrawal
                            </span>
                          )}
                          {tx.governance && (
                            <span className="inline-flex rounded-full bg-[var(--brand-amber-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--brand-amber)]">
                              ECFP
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <a
                          href={`${config.explorer}/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
                        >
                          {truncateHash(tx.hash)}
                        </a>
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {tx.type === "inflow"
                            ? truncateAddress(tx.from)
                            : truncateAddress(tx.to || "")}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className={`font-mono text-xs font-medium ${
                            tx.type === "inflow"
                              ? "text-[var(--brand-green)]"
                              : "text-[var(--brand-amber)]"
                          }`}
                        >
                          {tx.type === "inflow" ? "+" : "\u2212"}
                          {parseFloat(tx.value).toFixed(4)} {config.symbol}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-mono text-xs text-[var(--text-subtle)]">
                          #{tx.blockNumber.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-[var(--text-subtle)]">
                          {formatTimestamp(tx.timestamp)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
