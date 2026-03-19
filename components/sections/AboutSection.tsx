"use client";

import { useState } from "react";
import {
  ChevronDown,
  Flame,
  Landmark,
  FileCheck,
  Users,
  Ban,
  Lock,
  Shield,
  Minimize2,
  Eye,
  ShieldCheck,
  Server,
  CircleCheck,
  Clock,
  ArrowRight,
  Pickaxe,
  Heart,
  ExternalLink,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <h2 className="text-lg font-semibold">About the Treasury</h2>

        <CollapsibleCard title="How Funds Flow" defaultOpen>
          <FundFlow />
        </CollapsibleCard>

        <CollapsibleCard title="Community Funding">
          <CommunityFunding />
        </CollapsibleCard>

        <CollapsibleCard title="Governance Stages">
          <Stages />
        </CollapsibleCard>

        <CollapsibleCard title="Core Invariants">
          <Invariants />
        </CollapsibleCard>

        <CollapsibleCard title="Security Model">
          <Security />
        </CollapsibleCard>

        <CollapsibleCard title="Mordor Contracts · Chain 63">
          <MordorContracts />
        </CollapsibleCard>
      </div>
    </section>
  );
}

function CollapsibleCard({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-subtle)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-[var(--border-subtle)] px-5 py-5">
          {children}
        </div>
      )}
    </div>
  );
}

/* ---- Fund Flow ---- */
const flowSteps = [
  { icon: Flame, title: "BaseFee Collected", desc: "After Olympia activates, EIP-1559 basefee from every block is redirected to the treasury by consensus." },
  { icon: Pickaxe, title: "Mined Income", desc: "Mining pools and solo miners can direct block rewards and tx fees to the treasury by mining to the contract address." },
  { icon: Heart, title: "Direct Donations", desc: "Anyone can send ETC directly to the treasury contract to support protocol development transparently." },
  { icon: Landmark, title: "Treasury Accumulates", desc: "All three income streams grow the vault. Balance and full history are publicly visible on-chain." },
  { icon: FileCheck, title: "Proposals Submitted", desc: "Contributors submit ECFPs specifying recipient, amount, and milestones for governance review." },
  { icon: Users, title: "Governance Approves", desc: "DAO votes and authorizes eligible proposals. Only governance can trigger fund releases." },
];

function FundFlow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {flowSteps.map((s, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <s.icon size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold">{s.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Community Funding ---- */
function CommunityFunding() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        Until a robust EIP-1559 fee market exists on Ethereum Classic, the treasury relies on
        voluntary community support. There are two ways to contribute:
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <Pickaxe size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Mine to the Treasury</p>
            <p className="mt-0.5">
              Mining pools and solo miners can set the treasury contract as their coinbase address.
              Block rewards (2 ETC/block) flow directly into the vault, funding ETC development transparently.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <Heart size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Send a Donation</p>
            <p className="mt-0.5">
              Anyone can send ETC directly to the treasury address. Every donation is recorded on-chain
              and visible in the transactions table above. All withdrawals require governance approval.
            </p>
          </div>
        </div>
      </div>
      <p>
        Once Olympia activates, EIP-1559 basefee revenue will provide a sustainable,
        non-inflationary funding source. Community donations and mining support will remain welcome as
        supplementary income to accelerate protocol development.
      </p>
    </div>
  );
}

/* ---- Invariants ---- */
const invariants = [
  { icon: Ban, title: "No Minting", desc: "Cannot mint ETC — only holds received inflows." },
  { icon: Lock, title: "Immutable Code", desc: "No proxy patterns, no admin methods." },
  { icon: Shield, title: "Protocol-Controlled", desc: "Owned by protocol rules, not a multisig." },
  { icon: Minimize2, title: "Minimal Interface", desc: "Accepts deposits, executes on governance signal." },
  { icon: Eye, title: "Fully Transparent", desc: "All inflows/outflows visible on-chain." },
];

function Invariants() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {invariants.map((inv, i) => (
        <div key={i} className="flex items-start gap-2">
          <inv.icon size={16} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
          <div>
            <p className="text-xs font-semibold">{inv.title}</p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{inv.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Security ---- */
const secLayers = [
  { icon: ShieldCheck, title: "Protocol Consensus", desc: "Client implementations enforce ECIP-1112 rules." },
  { icon: Lock, title: "Contract Immutability", desc: "No upgradeable proxy, built on OpenZeppelin v5.6." },
  { icon: Server, title: "Sanctions Defense", desc: "OFAC screening at proposal level + emergency pause." },
];

function Security() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {secLayers.map((l, i) => (
        <div key={i} className="flex items-start gap-2">
          <l.icon size={16} className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
          <div>
            <p className="text-xs font-semibold">{l.title}</p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{l.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Stages ---- */
const stages = [
  { n: 1, title: "Accumulate", status: "active" as const, ecips: "ECIP-1111, 1112" },
  { n: 2, title: "Govern", status: "next" as const, ecips: "ECIP-1113, 1114" },
  { n: 3, title: "Fund", status: "planned" as const, ecips: "ECIP-1114, 1115" },
  { n: 4, title: "Predict", status: "planned" as const, ecips: "ECIP-1117" },
  { n: 5, title: "Optimize", status: "planned" as const, ecips: "ECIP-1118–1120" },
];

const stageConfig = {
  active: { icon: CircleCheck, color: "text-[var(--brand-green)]", bg: "bg-[var(--brand-green-subtle)]" },
  next: { icon: ArrowRight, color: "text-[var(--brand-amber)]", bg: "bg-[var(--brand-amber-subtle)]" },
  planned: { icon: Clock, color: "text-[var(--text-subtle)]", bg: "bg-transparent" },
};

function Stages() {
  return (
    <div className="flex flex-wrap gap-3">
      {stages.map((s) => {
        const cfg = stageConfig[s.status];
        const StatusIcon = cfg.icon;
        return (
          <div
            key={s.n}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-elevated)] text-xs font-bold text-[var(--text-muted)]">
              {s.n}
            </span>
            <span className="text-xs font-semibold">{s.title}</span>
            <StatusIcon size={12} className={cfg.color} />
            <span className="text-[10px] text-[var(--text-subtle)]">{s.ecips}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Mordor Contracts ---- */
const MORDOR_EXPLORER = "https://etc-mordor.blockscout.com/address";

const contracts: { name: string; address: string; ecip: string; description: string; pending?: boolean }[] = [
  { name: "Treasury", address: "0xd6165F3aF4281037bce810621F62B43077Fb0e37", ecip: "ECIP-1112", description: "Protocol-controlled vault for basefee revenue" },
  { name: "Governor", address: "0xEdbD61F1cE825CF939beBB422F8C914a69826dDA", ecip: "ECIP-1113", description: "On-chain governance and proposal execution" },
  { name: "Executor", address: "0x94d4f74dDdE715Ed195B597A3434713690B14e97", ecip: "ECIP-1113", description: "Sanctions-checked withdrawal execution" },
  { name: "Timelock", address: "0x1E0fADee5540a77012f1944fcce58677fC087f6e", ecip: "ECIP-1114", description: "Time-delayed execution of approved proposals" },
  { name: "ECFP Registry", address: "0xcB532fe70299D53Cc81B5F6365f56A108784d05d", ecip: "ECIP-1114", description: "Proposal categorization and metadata registry" },
  { name: "Governance NFT", address: "0x720676EBfe45DECfC43c8E9870C64413a2480EE0", ecip: "ECIP-1113", description: "Soulbound voting power token for DAO participation" },
  { name: "Sanctions Oracle", address: "0xEeeb33c8b7C936bD8e72A859a3e1F9cc8A26f3B4", ecip: "ECIP-1119", description: "OFAC sanctions compliance constraint" },
  { name: "Futarchy Oracle", address: "0x...", ecip: "ECIP-1117", description: "Prediction-market governance module", pending: true },
];

function MordorContracts() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--text-muted)]">
        Live on Mordor testnet. Mainnet deployment follows successful testnet validation.
      </p>
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
  );
}
