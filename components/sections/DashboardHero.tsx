"use client";

import {
  Vault,
  ExternalLink,
  TrendingDown,
  Activity,
  Wallet,
  Flame,
  Heart,
  Pickaxe,
} from "lucide-react";
import { useTreasuryStats } from "@/lib/hooks/use-treasury";
import { TREASURY_ADDRESS, MORDOR_EXPLORER } from "@/lib/config";

function formatMetc(value: string): string {
  const num = parseFloat(value);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(4);
}

export function DashboardHero() {
  const { data: stats, isLoading, error } = useTreasuryStats();

  return (
    <section className="px-6 pt-28 pb-8">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--brand-amber-border)] bg-[var(--brand-amber-subtle)] px-4 py-1.5 text-xs font-medium text-[var(--brand-amber)]">
              <Vault size={14} />
              ECIP-1112 · Protocol-Controlled Treasury
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Olympia{" "}
              <span className="text-[var(--brand-green)]">Treasury</span>
            </h1>
            <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
              Live monitoring of the non-inflationary vault for Ethereum Classic
              protocol revenue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${MORDOR_EXPLORER}/address/${TREASURY_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
            >
              Explorer
              <ExternalLink size={14} />
            </a>
            <a
              href="https://app.olympiadao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            >
              Governance App
            </a>
          </div>
        </div>

        {/* Contract address */}
        <div className="mb-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-5 py-3">
          <span className="mr-3 text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
            Vault
          </span>
          <code className="font-mono text-sm text-[var(--brand-green)]">
            {TREASURY_ADDRESS}
          </code>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KpiCard
            label="Balance"
            value={stats ? `${formatMetc(stats.balance.formatted)} METC` : "—"}
            icon={Wallet}
            loading={isLoading}
            error={!!error}
            accent="green"
          />
          <KpiCard
            label="Mined Income"
            value={stats ? `${formatMetc(stats.minedIncome)} METC` : "—"}
            subtitle={`Block rewards + tx fees${stats ? ` · ${stats.blockCount} blocks` : ""}`}
            icon={Pickaxe}
            loading={isLoading}
            error={!!error}
            accent="green"
          />
          <KpiCard
            label="BaseFee"
            value={stats ? `${formatMetc(stats.baseFeeIncome)} METC` : "—"}
            subtitle="ECIP-1111 · activates with Olympia"
            icon={Flame}
            loading={isLoading}
            error={!!error}
            accent="green"
          />
          <KpiCard
            label="Donations"
            value={stats ? `${formatMetc(stats.totalDonations)} METC` : "—"}
            subtitle="Direct transfers from wallets"
            icon={Heart}
            loading={isLoading}
            error={!!error}
            accent="green"
          />
          <KpiCard
            label="Withdrawals"
            value={stats ? `${formatMetc(stats.totalOutflow)} METC` : "—"}
            subtitle="Governance-approved ECFPs"
            icon={TrendingDown}
            loading={isLoading}
            error={!!error}
            accent="amber"
          />
          <KpiCard
            label="Transactions"
            value={stats ? stats.txCount.toString() : "—"}
            icon={Activity}
            loading={isLoading}
            error={!!error}
            accent="green"
          />
        </div>
      </div>
    </section>
  );
}

function KpiCard({
  label,
  value,
  subtitle,
  icon: Icon,
  loading,
  error,
  accent,
}: {
  label: string;
  value: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  loading: boolean;
  error: boolean;
  accent: "green" | "amber";
}) {
  const iconColor =
    accent === "green" ? "text-[var(--brand-green)]" : "text-[var(--brand-amber)]";

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
