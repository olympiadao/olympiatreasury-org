"use client";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import deployment from "@/lib/contracts.json";
import { ExternalLink } from "lucide-react";

const contracts = Object.values(deployment.contracts).map((c) => ({
  name: c.name,
  address: c.address,
  description: c.role,
}));

export function AboutContractsClient() {
  const config = useChainConfig();
  const explorerBase = `${config.explorer}/address`;

  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--text-muted)]">
        Deterministic CREATE2 deployment — identical addresses on Mordor (63) and ETC Mainnet (61).
      </p>
      {contracts.map((contract) => (
        <div
          key={contract.name}
          className="flex flex-col gap-2 rounded-lg border border-[var(--border-subtle)] p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="text-sm font-semibold">{contract.name}</span>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {contract.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <code className="font-mono text-xs text-[var(--brand-green)]">
              {contract.address.slice(0, 10)}...
              {contract.address.slice(-8)}
            </code>
            <a
              href={`${explorerBase}/${contract.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--brand-green-subtle)] hover:text-[var(--brand-green)]"
              aria-label={`View ${contract.name} on explorer`}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
