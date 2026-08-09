"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTreasuryBalanceHistory } from "@/lib/hooks/use-treasury";
import { useChainConfig } from "@/lib/hooks/use-chain-config";

interface ChartPoint {
  label: string;
  balance: number;
}

export function BalanceChart() {
  const { data: events, isLoading } = useTreasuryBalanceHistory();
  const config = useChainConfig();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Recharts takes literal colors, so these mirror olympia-brand tokens by hand and
  // must switch on the resolved theme. Keep in step with globals.css.
  const tickColor = isDark ? "#9ca3af" : "#5f6673";       // --text-muted: 6.99 dark, 5.11 light
  const axisColor = isDark ? "#1a1a1a" : "#e2e8f0";       // --border-default
  const tooltipBg = isDark ? "#111111" : "#ffffff";       // --bg-surface
  const tooltipBorder = isDark ? "#1a1a1a" : "#e2e8f0";   // --border-default
  const tooltipText = isDark ? "#ffffff" : "#0a0f10";     // --text-primary
  // --brand-green. As a graphical object the series stroke needs 3:1, not 4.5:1;
  // it measures 13.46 dark and 4.75 light against the worst surface of each theme.
  const seriesColor = isDark ? "#00ffae" : "#007a53";

  const chartData = useMemo(() => {
    if (!events || events.length === 0) return [];

    let running = 0;
    const points: ChartPoint[] = [];

    for (const event of events) {
      running += event.delta;
      points.push({
        label: `#${event.blockNumber}`,
        balance: parseFloat(running.toFixed(6)),
      });
    }

    return points;
  }, [events]);

  if (isLoading) {
    return (
      <section aria-labelledby="balance-history-heading" className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="balance-history-heading" className="mb-6 text-lg font-semibold">Balance History</h2>
          <div className="h-64 animate-pulse rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]" />
        </div>
      </section>
    );
  }

  if (chartData.length === 0) {
    return (
      <section aria-labelledby="balance-history-heading" className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="balance-history-heading" className="mb-6 text-lg font-semibold">Balance History</h2>
          <div className="flex h-48 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
            <p className="text-sm text-[var(--text-muted)]">
              No transaction data yet
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="balance-history-heading" className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="balance-history-heading" className="mb-6 text-lg font-semibold">Balance History</h2>
        <div
          className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={seriesColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={seriesColor} stopOpacity={0} />
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
                formatter={(value) => [
                  `${Number(value).toFixed(4)} ${config.symbol}`,
                  "Balance",
                ]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke={seriesColor}
                strokeWidth={2}
                fill="url(#balanceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
