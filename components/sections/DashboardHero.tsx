"use client";

import {
  TrendingDown,
  Activity,
  Wallet,
  Landmark,
  ArrowRight,
  Heart,
  Pickaxe,
} from "lucide-react";
import { useTreasuryStats } from "@/lib/hooks/use-treasury";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { AddressLink } from "@/components/ui/AddressLink";

/*
 * This section used to open with a countdown to the activation block, and with a
 * base-fee-income tile that rendered a hardcoded zero.
 *
 * Both are timestamps in disguise. A completed product does not count down to itself,
 * and a countdown with no block to count to falls back to a date, which dates the page
 * every time someone reads it. The hardcoded figure was worse than stale: ECIP-1112
 * forbids the Vault from keeping an internal total, and the ECIP-1111 credit executes
 * no EVM code, so there is no on-chain "base fee received" to read and no honest way to
 * render one. What replaced them is the mechanism — two balances, what has been swept
 * between them, and when — which needs no updating.
 *
 * Do not restore either.
 */

function formatAmount(value: string): string {
  const num = parseFloat(value);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(4);
}

function formatSweepAge(timestamp: string): string {
  const then = new Date(timestamp).getTime();
  if (Number.isNaN(then)) return "—";
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days < 1) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function DashboardHero() {
  const { data: stats, isLoading, error } = useTreasuryStats();
  const config = useChainConfig();

  return (
    <section className="px-6 pt-4 pb-8">
      <div className="mx-auto max-w-6xl">
        {/* One system, two addresses: what receives, and what holds. */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <AddressCard
            label="Sovereignty Vault"
            spec="ECIP-1112"
            note="Receives the base fee. Permanent."
            address={config.vault}
            explorer={config.explorer}
          />
          <AddressCard
            label="Treasury"
            spec="ECIP-1113 §1.3"
            note="Holds the funds. Replaceable by governance."
            address={config.treasury}
            explorer={config.explorer}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            label="In the Vault"
            value={
              stats
                ? `${formatAmount(stats.vaultBalance)} ${config.symbol}`
                : "—"
            }
            subtitle="Arrived and not yet swept"
            icon={Wallet}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="In the Treasury"
            value={
              stats
                ? `${formatAmount(stats.treasuryBalance)} ${config.symbol}`
                : "—"
            }
            subtitle="Under governance control"
            icon={Landmark}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Last Sweep"
            value={
              stats
                ? stats.lastSweep
                  ? formatSweepAge(stats.lastSweep.timestamp)
                  : "None recorded"
                : "—"
            }
            subtitle={
              stats?.lastSweep
                ? `${formatAmount(stats.lastSweep.value)} ${config.symbol} · block #${stats.lastSweep.blockNumber.toLocaleString()}`
                : "sweep() is permissionless and unincentivized · nothing schedules it"
            }
            icon={ArrowRight}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Total Received"
            value={
              stats
                ? `${formatAmount(stats.totalReceived)} ${config.symbol}`
                : "—"
            }
            subtitle="Every source, from the explorer's balance history · no on-chain total exists"
            icon={Activity}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Mined to the Vault"
            value={
              stats ? `${formatAmount(stats.minedIncome)} ${config.symbol}` : "—"
            }
            subtitle={`Miners choosing the Vault as coinbase${stats ? ` · ${stats.blockCount} blocks` : ""}`}
            icon={Pickaxe}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Contributions"
            value={
              stats
                ? `${formatAmount(stats.contributions)} ${config.symbol}`
                : "—"
            }
            subtitle="Direct transfers from any address"
            icon={Heart}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Swept to the Treasury"
            value={
              stats ? `${formatAmount(stats.totalSwept)} ${config.symbol}` : "—"
            }
            subtitle="The one route out of the Vault"
            icon={ArrowRight}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Disbursed"
            value={
              stats
                ? `${formatAmount(stats.totalDisbursed)} ${config.symbol}`
                : "—"
            }
            subtitle="Paid out by executed proposals"
            icon={TrendingDown}
            loading={isLoading}
            error={!!error}
          />
          <KpiCard
            label="Transactions"
            value={stats ? stats.txCount.toString() : "—"}
            subtitle={
              stats ? (
                <>
                  <span className="text-[var(--brand-green)]">
                    In: {stats.inflowCount}
                  </span>
                  {" · "}
                  <span className="text-[var(--color-warning)]">
                    Out: {stats.outflowCount}
                  </span>
                </>
              ) : undefined
            }
            icon={Activity}
            loading={isLoading}
            error={!!error}
          />
        </div>
      </div>
    </section>
  );
}

function AddressCard({
  label,
  spec,
  note,
  address,
  explorer,
}: {
  label: string;
  spec: string;
  note: string;
  address: `0x${string}`;
  explorer: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-5 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
          {label}
        </span>
        <span className="font-mono text-[10px] text-[var(--brand-green)]">{spec}</span>
      </div>
      <div className="mt-1">
        <AddressLink address={address} explorer={explorer} className="text-sm" />
      </div>
      <p className="mt-1 text-[10px] text-[var(--text-subtle)]">{note}</p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  subtitle,
  icon: Icon,
  loading,
  error,
}: {
  label: string;
  value: string;
  // ReactNode, not string: the transactions card colors its In/Out counts.
  subtitle?: React.ReactNode;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  loading: boolean;
  error: boolean;
}) {
  const iconColor = "text-[var(--brand-green)]";

  return (
    <div
      className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 transition-all duration-200 hover:border-[var(--border-brand)]"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon size={18} className={iconColor} />
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
          {label}
        </span>
      </div>
      {loading ? (
        <div className="h-8 w-32 animate-pulse rounded bg-[var(--bg-elevated)]" />
      ) : error ? (
        <p className="text-sm text-[var(--color-error)]">Error loading</p>
      ) : (
        <>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="mt-1 text-[10px] text-[var(--text-subtle)]">{subtitle}</p>
          )}
        </>
      )}
    </div>
  );
}
