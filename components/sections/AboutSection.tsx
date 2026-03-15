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
} from "lucide-react";

export function AboutSection() {
  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <h2 className="text-lg font-semibold">About the Treasury</h2>

        <CollapsibleCard title="How Funds Flow" defaultOpen>
          <FundFlow />
        </CollapsibleCard>

        <CollapsibleCard title="Core Invariants">
          <Invariants />
        </CollapsibleCard>

        <CollapsibleCard title="Security Model">
          <Security />
        </CollapsibleCard>

        <CollapsibleCard title="Governance Stages">
          <Stages />
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
  { icon: Flame, title: "Basefee Collected", desc: "Miners get rewards + tips. Basefee is separated per ECIP-1111." },
  { icon: Landmark, title: "Treasury Accumulates", desc: "Basefee redirected to vault by consensus. Balance and history are public." },
  { icon: FileCheck, title: "Proposals Submitted", desc: "Contributors submit funding proposals specifying recipient, amount, and milestones." },
  { icon: Users, title: "Governance Approves", desc: "DAO votes and authorizes eligible proposals. Only governance can trigger fund releases." },
];

function FundFlow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
