"use client";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import deployment from "@/lib/contracts.json";
import { AddressLink } from "@/components/ui/AddressLink";

const contracts = Object.values(deployment.contracts).map((c) => ({
  name: c.name,
  address: c.address,
  description: c.role,
}));

/* Derivation per ECIP-1112 §"Deterministic Deployment". */
const specContracts = [
  { name: "OlympiaTreasury", derivation: "CREATE", stage: "Stage 1", role: "Holds basefee revenue; one withdrawal entry point, callable only by the Executor", ecip: "1112" },
  { name: "TimelockController", derivation: "CREATE", stage: "Stage 2", role: "Mandatory execution delay; no admin key, ever", ecip: "1113" },
  { name: "CoreNFT", derivation: "CREATE2", stage: "Stage 2", role: "Governance token: soulbound, one non-delegable vote per core contributor", ecip: "1113" },
  { name: "OlympiaGovernor", derivation: "CREATE2", stage: "Stage 2", role: "Proposal lifecycle and vote tallying, on OpenZeppelin Governor 5.x", ecip: "1113" },
  { name: "OlympiaExecutor", derivation: "CREATE2", stage: "Stage 2", role: "Sole authorized caller of the Treasury; bytecode frozen at Stage 1", ecip: "1113" },
  { name: "OFPRegistry", derivation: "CREATE2", stage: "Stage 2", role: "Binds funding-proposal metadata to a Governor proposal", ecip: "1114" },
];

export function AboutContractsClient() {
  const config = useChainConfig();

  return (
    <div className="space-y-6">
      {/* Specified architecture, per ECIP-1112/1113/1114 */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Specified architecture
        </p>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          Six contracts, deployed in two stages. The Treasury and Timelock derive their
          addresses from the deployer and a reserved nonce (<code className="font-mono">CREATE</code>);
          the rest derive from a salt and init code (<code className="font-mono">CREATE2</code>). Using
          the salted form for both halves of a pair would make the dependency circular, which is
          what the split avoids. Addresses are identical on Mordor (63) and ETC Mainnet (61).
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {specContracts.map((c) => (
            <div key={c.name} className="rounded-lg border border-[var(--border-subtle)] p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold">{c.name}</span>
                <span className="rounded-sm border border-[var(--border-default)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                  {c.derivation}
                </span>
                <span className="rounded-sm border border-[var(--border-default)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                  {c.stage}
                </span>
                <a
                  href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${c.ecip}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-[var(--brand-green)] transition hover:opacity-70"
                >
                  ECIP-{c.ecip}
                </a>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">{c.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live demo deployment */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Deployed contracts
        </p>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          The addresses this dashboard reads. Every figure above is derived from these
          contracts on the selected network.
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
            <AddressLink
              address={contract.address}
              explorer={config.explorer}
              truncate
              className="text-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
