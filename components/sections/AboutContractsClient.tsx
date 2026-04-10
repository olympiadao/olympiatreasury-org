"use client";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { ExternalLink } from "lucide-react";

const contracts: { name: string; address: string; description: string }[] = [
  { name: "Treasury", address: "0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf", description: "Protocol-controlled vault for basefee revenue" },
  { name: "Executor", address: "0x64624f74F77639CbA268a6c8bEDC2778B707eF9a", description: "Sanctions-checked withdrawal execution" },
  { name: "Governor", address: "0xB85dbc899472756470EF4033b9637ff8fa2FD23D", description: "On-chain governance and proposal execution" },
  { name: "Timelock", address: "0xA5839b3e9445f7eE7AffdBC796DC0601f9b976C2", description: "Time-delayed execution of approved proposals" },
  { name: "ECFP Registry", address: "0xFB4De5674a6b9a301d16876795a74f3bdacfa722", description: "Proposal categorization and metadata registry" },
  { name: "Governance NFT", address: "0x73e78d3a3470396325b975FcAFA8105A89A9E672", description: "Non-transferable membership NFT granting voting power in DAO governance" },
  { name: "Sanctions Oracle", address: "0xfF2B8D7937D908D81C72D20AC99302EE6ACc2709", description: "OFAC sanctions compliance constraint" },
];

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
