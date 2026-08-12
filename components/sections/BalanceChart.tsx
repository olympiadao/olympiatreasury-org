"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTreasuryBalanceHistory } from "@/lib/hooks/use-treasury";
import { useChainConfig } from "@/lib/hooks/use-chain-config";

interface ChartPoint {
  label: string;
  vault: number;
  treasury: number;
}

export function BalanceChart() {
  const { data: events, isLoading } = useTreasuryBalanceHistory();
  const config = useChainConfig();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Recharts takes literal colors, so every color here must switch on the resolved
  // theme. A bare hex is a bug: it renders the dark-mode value in light mode.
  const tickColor = isDark ? "#9ca3af" : "#5f6673";       // --text-muted: 6.99 dark, 5.11 light
  const axisColor = isDark ? "#1a1a1a" : "#e2e8f0";       // --border-default
  const tooltipBg = isDark ? "#111111" : "#ffffff";       // --bg-surface
  const tooltipBorder = isDark ? "#1a1a1a" : "#e2e8f0";   // --border-default
  const tooltipText = isDark ? "#ffffff" : "#0a0f10";     // --text-primary
  // --brand-green. As a graphical object a series stroke needs 3:1, not 4.5:1;
  // it measures 13.46 dark and 4.75 light against the worst surface of each theme.
  const vaultColor = isDark ? "#00ffae" : "#007a53";
  // --brand-amber, the treasury accent reserved to this site: 8.80 dark, 7.09 light.
  const treasuryColor = isDark ? "#f59e0b" : "#92400e";

  const chartData = useMemo(() => {
    if (!events || events.length === 0) return [];

    let vault = 0;
    let treasury = 0;
    const points: ChartPoint[] = [];

    for (const event of events) {
      if (event.account === "vault") vault += event.delta;
      else treasury += event.delta;

      points.push({
        label: `#${event.blockNumber}`,
        vault: parseFloat(vault.toFixed(6)),
        treasury: parseFloat(treasury.toFixed(6)),
      });
    }

    return points;
  }, [events]);

  if (isLoading) {
    return (
      <ChartShell>
        <div className="h-64 animate-pulse rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]" />
      </ChartShell>
    );
  }

  if (chartData.length === 0) {
    return (
      <ChartShell>
        <div className="flex h-48 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
          <p className="text-sm text-[var(--text-muted)]">No transaction data yet</p>
        </div>
      </ChartShell>
    );
  }

  return (
    <ChartShell>
      <div
        className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="vaultGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={vaultColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={vaultColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="treasuryGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={treasuryColor} stopOpacity={0.28} />
                <stop offset="100%" stopColor={treasuryColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              tick={{ fill: tickColor, fontSize: 11 }}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: tickColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toFixed(2)
              }
              width={60}
            />
            <Tooltip
              contentStyle={{
                background: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 8,
                fontSize: 13,
                color: tooltipText,
              }}
              formatter={(value, name) => [
                `${Number(value).toFixed(4)} ${config.symbol}`,
                name === "vault" ? "Vault" : "Treasury",
              ]}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: tickColor, fontSize: 12 }}>
                  {value === "vault" ? "Vault" : "Treasury"}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="vault"
              stroke={vaultColor}
              strokeWidth={2}
              fill="url(#vaultGrad)"
            />
            <Area
              type="monotone"
              dataKey="treasury"
              stroke={treasuryColor}
              strokeWidth={2}
              fill="url(#treasuryGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

function ChartShell({ children }: { children: React.ReactNode }) {
  return (
    <section aria-labelledby="balance-history-heading" className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="balance-history-heading" className="mb-1 text-lg font-semibold">
          Balance History
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-[var(--text-muted)]">
          Both balances over time. Revenue arrives in the Vault and leaves it only by a
          sweep, which is the same movement that raises the Treasury.
        </p>
        {children}
      </div>
    </section>
  );
}
