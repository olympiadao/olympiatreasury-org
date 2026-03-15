"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTreasuryTransactions } from "@/lib/hooks/use-treasury";

interface ChartPoint {
  label: string;
  balance: number;
}

export function BalanceChart() {
  const { data: transactions, isLoading } = useTreasuryTransactions();

  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // Build cumulative balance from oldest to newest
    const sorted = [...transactions].sort(
      (a, b) => a.blockNumber - b.blockNumber
    );

    let running = 0;
    const points: ChartPoint[] = [];

    for (const tx of sorted) {
      const val = parseFloat(tx.value);
      if (tx.type === "inflow") {
        running += val;
      } else {
        running -= val;
      }
      points.push({
        label: `#${tx.blockNumber}`,
        balance: parseFloat(running.toFixed(6)),
      });
    }

    return points;
  }, [transactions]);

  if (isLoading) {
    return (
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-lg font-semibold">Balance History</h2>
          <div className="h-64 animate-pulse rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]" />
        </div>
      </section>
    );
  }

  if (chartData.length === 0) {
    return (
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-lg font-semibold">Balance History</h2>
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
    <section className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-lg font-semibold">Balance History</h2>
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
                  <stop offset="0%" stopColor="#00ffae" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00ffae" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={{ stroke: "#1f292b" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toFixed(2)
                }
                width={60}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f1614",
                  border: "1px solid #1f292b",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#fff",
                }}
                formatter={(value) => [
                  `${Number(value).toFixed(4)} METC`,
                  "Balance",
                ]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#00ffae"
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
