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
} from "lucide-react";
import { AboutContractsClient } from "./AboutContractsClient";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <h2 id="about-heading" className="text-lg font-semibold">About the Treasury</h2>

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

        <CollapsibleCard title="Contracts">
          <AboutContractsClient />
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
  return (
    <details
      open={defaultOpen || undefined}
      className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="text-[var(--text-subtle)] transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-[var(--border-subtle)] px-5 py-5">
        {children}
      </div>
    </details>
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
            <s.icon size={16} aria-hidden="true" />
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
            <Pickaxe size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Mine to the Treasury</p>
            <p className="mt-0.5">
              Mining pools and solo miners can set the treasury contract as their coinbase address.
              Block rewards flow directly into the vault, funding ETC development transparently.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <Heart size={16} aria-hidden="true" />
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
        Once the Olympia upgrade is complete on ETC mainnet, EIP-1559 basefee revenue will provide a
        sustainable, non-inflationary funding source. Community donations and mining support will remain
        welcome as supplementary income to accelerate protocol development.
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
          <inv.icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
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
  { icon: ShieldCheck, title: "Protocol Consensus", desc: "Client implementations enforce treasury rules at the protocol level." },
  { icon: Lock, title: "Contract Immutability", desc: "No upgradeable proxy, no admin methods." },
  { icon: Server, title: "Sanctions Defense", desc: "OFAC screening at proposal level + emergency pause." },
];

function Security() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {secLayers.map((l, i) => (
        <div key={i} className="flex items-start gap-2">
          <l.icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--brand-green)]" />
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
  { n: 1, title: "Accumulate", status: "active" as const, desc: "BaseFee + mining + donations" },
  { n: 2, title: "Govern", status: "next" as const, desc: "On-chain proposals and voting" },
  { n: 3, title: "Fund", status: "planned" as const, desc: "Treasury disbursements" },
  { n: 4, title: "Predict", status: "planned" as const, desc: "Futarchy governance" },
  { n: 5, title: "Optimize", status: "planned" as const, desc: "Protocol improvements" },
];

const stageConfig = {
  active: { icon: CircleCheck, color: "text-[var(--brand-green)]" },
  next: { icon: ArrowRight, color: "text-[var(--text-secondary)]" },
  planned: { icon: Clock, color: "text-[var(--text-subtle)]" },
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
            <StatusIcon size={12} aria-hidden="true" className={cfg.color} />
            <span className="text-[10px] text-[var(--text-subtle)]">{s.desc}</span>
          </div>
        );
      })}
    </div>
  );
}

