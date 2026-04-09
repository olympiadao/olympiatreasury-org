"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Clock } from "lucide-react";
import {
  OLYMPIA_ACTIVATION_BLOCK,
  AVG_BLOCK_TIME_SECONDS,
  type CountdownStatus,
} from "@/lib/olympia-countdown";
import { useQuery } from "@tanstack/react-query";
import { useActiveChainId } from "@/lib/hooks/use-chain";
import { getChainConfig } from "@/lib/config";

async function fetchCurrentBlock(chainId: number): Promise<number | null> {
  try {
    const config = getChainConfig(chainId);
    const res = await fetch(`${config.api}/main-page/blocks`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data[0]?.height ?? null : null;
  } catch {
    return null;
  }
}

function DigitBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-16 items-center justify-center rounded-lg border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] font-mono text-2xl font-bold text-[var(--brand-green)] shadow-[0_0_12px_rgba(0,255,174,0.08)]">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-xs text-[var(--text-muted)]">{label}</span>
    </div>
  );
}

const FALLBACK_TARGET_MS = new Date("2027-01-01T00:00:00Z").getTime();

export function CountdownBanner() {
  const chainId = useActiveChainId();
  const { data: currentBlock = null } = useQuery({
    queryKey: ["block-height", chainId],
    queryFn: () => fetchCurrentBlock(chainId),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const status: CountdownStatus = useMemo(() => {
    if (OLYMPIA_ACTIVATION_BLOCK === null) return "tbd";
    if (currentBlock !== null && currentBlock >= OLYMPIA_ACTIVATION_BLOCK) return "activated";
    return "pending";
  }, [currentBlock]);

  const initialSeconds = useMemo(() => {
    if (status !== "pending" || OLYMPIA_ACTIVATION_BLOCK === null || currentBlock === null)
      return null;
    return (OLYMPIA_ACTIVATION_BLOCK - currentBlock) * AVG_BLOCK_TIME_SECONDS;
  }, [status, currentBlock]);

  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  const tick = useCallback(() => {
    setRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    if (status !== "pending") return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [status, tick]);

  // Fallback date-based countdown for TBD state
  const [tbdSecondsLeft, setTbdSecondsLeft] = useState<number>(() =>
    Math.max(0, Math.floor((FALLBACK_TARGET_MS - Date.now()) / 1000))
  );

  useEffect(() => {
    if (status !== "tbd") return;
    const id = setInterval(() => {
      setTbdSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  if (status === "tbd") {
    const tbdDays = Math.floor(tbdSecondsLeft / 86400);
    const tbdHours = Math.floor((tbdSecondsLeft % 86400) / 3600);
    const tbdMinutes = Math.floor((tbdSecondsLeft % 3600) / 60);
    const tbdSecs = tbdSecondsLeft % 60;

    return (
      <div className="mb-8">
        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="flex gap-3">
            <DigitBox value={tbdDays} label="Days" />
            <DigitBox value={tbdHours} label="Hrs" />
            <DigitBox value={tbdMinutes} label="Min" />
            <DigitBox value={tbdSecs} label="Sec" />
          </div>
          <p className="text-center text-[10px] italic text-[var(--text-muted)] opacity-60">
            * Countdown is set to January 1, 2027 until the ETC mainnet activation block is set
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-3">
          <Clock size={16} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
          <div>
            <p className="text-sm text-[var(--text-muted)]">
              Olympia is in final testing on the Mordor Testnet — Activation Block: TBD.{" "}
              <a
                href="/upgrade"
                className="text-[var(--brand-green)] transition hover:opacity-80"
              >
                Upgrade guide →
              </a>
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)] opacity-75">
              The exact block number will be announced after the Olympia Upgrade core developers call. Upgrade your node as soon as a compatible release is available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "activated") {
    return (
      <div className="mb-8 flex items-center gap-3 rounded-lg border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-3">
        <span className="text-sm font-medium text-[var(--brand-green)]">
          Olympia is Live — BaseFee revenue is now flowing to the treasury.
        </span>
      </div>
    );
  }

  if (remaining === null) return null;

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-[#F59E0B]/30 bg-[#F59E0B]/5 px-4 py-3">
      <Clock size={16} className="text-[#F59E0B]" />
      <span className="text-sm font-medium text-[#F59E0B]">Olympia in</span>
      <span className="font-mono text-sm text-[#F59E0B]">
        {days}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m{" "}
        {String(seconds).padStart(2, "0")}s
      </span>
      <a
        href="https://olympiadao.org/upgrade"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto text-xs text-[#F59E0B] transition hover:opacity-80"
      >
        Upgrade guide →
      </a>
    </div>
  );
}
