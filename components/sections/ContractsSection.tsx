"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";

const MORDOR_EXPLORER = "https://etc-mordor.blockscout.com/address";

const contracts = [
  {
    name: "Treasury",
    address: "0xd6165F3aF4281037bce810621F62B43077Fb0e37",
    ecip: "ECIP-1112",
    description: "Protocol-controlled vault for basefee revenue",
  },
  {
    name: "Governor",
    address: "0xEdbD61F1cE825CF939beBB422F8C914a69826dDA",
    ecip: "ECIP-1113",
    description: "On-chain governance and proposal execution",
  },
  {
    name: "Executor",
    address: "0x94d4f74dDdE715Ed195B597A3434713690B14e97",
    ecip: "ECIP-1113",
    description: "Sanctions-checked withdrawal execution",
  },
  {
    name: "Timelock",
    address: "0x1E0fADee5540a77012f1944fcce58677fC087f6e",
    ecip: "ECIP-1114",
    description: "Time-delayed execution of approved proposals",
  },
  {
    name: "ECFP Registry",
    address: "0xcB532fe70299D53Cc81B5F6365f56A108784d05d",
    ecip: "ECIP-1114",
    description: "Proposal categorization and metadata registry",
  },
  {
    name: "Governance NFT",
    address: "0x720676EBfe45DECfC43c8E9870C64413a2480EE0",
    ecip: "ECIP-1113",
    description: "Soulbound voting power token for DAO participation",
  },
  {
    name: "Sanctions Oracle",
    address: "0xEeeb33c8b7C936bD8e72A859a3e1F9cc8A26f3B4",
    ecip: "ECIP-1119",
    description: "OFAC sanctions compliance constraint",
  },
  {
    name: "Futarchy Oracle",
    address: "0x...",
    ecip: "ECIP-1117",
    description: "Prediction-market governance module",
    pending: true,
  },
];

export function ContractsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contracts" className="px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <div>
              <span className="text-sm font-semibold">Mordor Contracts</span>
              <span className="ml-3 text-xs text-[var(--text-subtle)]">
                Chain 63 · Activation block 15,800,850
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-[var(--text-subtle)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
          {open && (
            <div className="border-t border-[var(--border-subtle)] px-5 py-5">
              <div className="space-y-3">
                {contracts.map((contract) => (
                  <div
                    key={contract.name}
                    className="flex flex-col gap-2 rounded-lg border border-[var(--border-subtle)] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{contract.name}</span>
                        <span className="rounded-full border border-[var(--border-default)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">
                          {contract.ecip}
                        </span>
                        {contract.pending && (
                          <span className="rounded-full bg-[var(--brand-amber-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--brand-amber)]">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {contract.description}
                      </p>
                    </div>
                    {!contract.pending && (
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs text-[var(--brand-green)]">
                          {contract.address.slice(0, 10)}...
                          {contract.address.slice(-8)}
                        </code>
                        <a
                          href={`${MORDOR_EXPLORER}/${contract.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--brand-green-subtle)] hover:text-[var(--brand-green)]"
                          aria-label={`View ${contract.name} on explorer`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
