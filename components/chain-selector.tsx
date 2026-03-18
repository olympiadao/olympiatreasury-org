"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useActiveChainId } from "@/lib/hooks/use-chain";

const CHAINS = [
  { id: 63, name: "Mordor Testnet", shortName: "Mordor", icon: "/chains/mordor.svg", isTestnet: true },
  { id: 61, name: "Ethereum Classic", shortName: "ETC", icon: "/chains/etc.svg", isTestnet: false },
] as const;

export function ChainSelector() {
  const chainId = useActiveChainId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = CHAINS.find((c) => c.id === chainId) ?? CHAINS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSwitch(chain: (typeof CHAINS)[number]) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("chain", chain.id.toString());
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] px-3 py-2 text-sm font-medium transition-colors duration-150 hover:border-[var(--border-strong)]"
      >
        <Image src={current.icon} alt={current.name} width={20} height={20} />
        <span className="hidden sm:inline">{current.shortName}</span>
        {current.isTestnet && (
          <span className="hidden rounded bg-[var(--brand-amber-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--brand-amber)] sm:inline">
            Testnet
          </span>
        )}
        <ChevronDown
          size={14}
          className={`text-[var(--text-subtle)] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-lg">
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleSwitch(chain)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 hover:bg-[var(--bg-elevated)]"
            >
              <Image src={chain.icon} alt={chain.name} width={24} height={24} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{chain.name}</span>
                  {chain.isTestnet && (
                    <span className="rounded bg-[var(--brand-amber-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--brand-amber)]">
                      Testnet
                    </span>
                  )}
                </div>
                <span className="text-xs text-[var(--text-subtle)]">
                  Chain {chain.id}
                </span>
              </div>
              {chain.id === chainId && (
                <Check size={16} className="shrink-0 text-[var(--brand-green)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
