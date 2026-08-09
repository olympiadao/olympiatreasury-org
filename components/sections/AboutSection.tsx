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
  Vote,
  Award,
  UserCheck,
  LogOut,
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

        <CollapsibleCard title="Staged Deployment" defaultOpen>
          <StagedDeployment />
        </CollapsibleCard>

        <CollapsibleCard title="Membership — the CoreNFT" defaultOpen>
          <Membership />
        </CollapsibleCard>

        <CollapsibleCard title="Community Funding" defaultOpen>
          <CommunityFunding />
        </CollapsibleCard>

        <CollapsibleCard title="Governance Stages" defaultOpen>
          <Stages />
        </CollapsibleCard>

        <CollapsibleCard title="Core Invariants" defaultOpen>
          <Invariants />
        </CollapsibleCard>

        <CollapsibleCard title="Security Model" defaultOpen>
          <Security />
        </CollapsibleCard>

        <CollapsibleCard title="Contracts" defaultOpen>
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
  { icon: Flame, title: "Base Fee Collected", desc: "A transaction pays a base fee plus a priority-fee tip. Ethereum burns the base fee; Olympia credits it to the Treasury at block finalization instead. Only the burned half moves — tips and ECIP-1017 block rewards go to miners in full." },
  { icon: Landmark, title: "A Floor Under Revenue", desc: "The basefee never falls below 1 gwei. Without that floor, sustained low utilization would decay it toward zero and eliminate Treasury revenue entirely." },
  { icon: Heart, title: "Voluntary Inflows", desc: "The Treasury accepts transfers from any address and records each one on-chain. Protocols may opt in to forward a share of their fees the same way." },
  { icon: FileCheck, title: "Proposals Submitted", desc: "An OFP names recipient, amount and metadata, and states whether it is retrospective or prospective. Submission is permissionless, gated by the Governor's proposal threshold measured against the author." },
  { icon: Users, title: "Governance Approves", desc: "Members vote; a strict majority of For over Against carries, subject to quorum. Only the Executor can then move funds." },
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

/* ---- Staged Deployment ---- */
function StagedDeployment() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        The Treasury deploys at the Olympia hard fork. The governance suite that spends
        from it deploys later, once audited — against addresses reserved before the
        Treasury exists.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--border-subtle)] p-3">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            Stage 1 — the fork
          </p>
          <p className="mt-1">
            Only the Treasury deploys. Basefee begins accumulating immediately, and
            nothing can spend it: no contract yet exists at the Executor&rsquo;s address,
            so the lock is enforced by the absence of a callable counterpart rather than
            by any access-control decision.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-3">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            Stage 2 — governance
          </p>
          <p className="mt-1">
            Timelock, CoreNFT, Governor, Executor and the OFP Registry deploy together,
            then the sanctions oracle is attached. There is no handover: the
            Executor&rsquo;s address was fixed in the Treasury&rsquo;s constructor at
            Stage 1, so deploying it populates an address the Treasury already trusts.
          </p>
        </div>
      </div>
      <p>
        The gap between the two is the audit window for the governance layer, and the
        reason the rollout is staged at all. It is a deliberate design property, not a
        degraded mode.
      </p>
    </div>
  );
}

/* ---- Membership ---- */
const membershipFacts = [
  { icon: Award, title: "Earned, never bought", desc: "Minted on proof of substantive, net-positive contribution to Ethereum Classic — and on nothing else. No amount of capital admits anyone." },
  { icon: UserCheck, title: "One member, one vote", desc: "Soulbound and non-transferable, with delegation locked to the holder. A vote cannot be sold, lent, or leased." },
  { icon: Vote, title: "Admitted by the DAO", desc: "One governance proposal per admission, with the evidence in its metadata. No minter role, no admissions committee, no unilateral account." },
  { icon: LogOut, title: "Revocable and resignable", desc: "A member may burn their own token at any time; the DAO may revoke by proposal on the same footing as admission. Re-admission is possible — exit is not exile." },
];

function Membership() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        Voting power comes from the CoreNFT and from nothing else. There is no fungible,
        transferable, purchasable token — nothing to buy, sell, lend, pool or accumulate,
        and therefore nothing on which a market in votes could form.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {membershipFacts.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
              <f.icon size={16} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{f.title}</p>
              <p className="mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p>
        Contribution is not only code: client and specification work, security research
        and responsible disclosure, infrastructure operation, documentation and sustained
        technical review all qualify. Trivial changes do not, and bad-faith conduct
        disqualifies rather than averaging out.
      </p>
      <p>
        <span className="font-semibold text-[var(--text-primary)]">
          Access to governance is gated; influence over it is not.
        </span>{" "}
        Membership is restricted because its vote spends protocol revenue. The futarchy
        markets are open to anyone holding ETC or Classic USD, with no membership and no
        application, and members read those public prices as input. Who decides is
        restricted; who informs the decision is not.
      </p>
    </div>
  );
}

/* ---- Community Funding ---- */
function CommunityFunding() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        Basefee redirection is the protocol-defined funding source, and it begins at the
        Olympia hard fork. Until then the Treasury relies on voluntary support. Neither
        route below is a protocol mechanism — both are ordinary transfers that any
        address can make, and the Treasury records each one on-chain.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <Pickaxe size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Mine to the Treasury</p>
            <p className="mt-0.5">
              A pool or solo miner can set the Treasury as their coinbase address, sending
              their own block rewards to it. This is a choice an operator makes, not
              something the protocol does — no ECIP directs mining revenue here.
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
        After activation, basefee revenue accrues automatically from network usage rather
        than from any donor, and voluntary contributions remain welcome alongside it.
        Smart contracts can opt in on the same terms: a protocol forwarding a share of
        its fees on-chain gains no special claim over the funds it sends.
      </p>
    </div>
  );
}

/* ---- Invariants ---- */
const invariants = [
  { icon: Ban, title: "No Minting", desc: "Cannot mint ETC — only holds received inflows." },
  { icon: Lock, title: "Immutable Code", desc: "No proxy patterns, no admin methods." },
  { icon: Shield, title: "Protocol-Controlled", desc: "Owned by protocol rules, not a multisig." },
  { icon: Minimize2, title: "Minimal Interface", desc: "Accepts deposits; a single withdrawal entry point callable only by the Executor. It performs no deduplication, and cannot — replay protection lives upstream, in the Governor and Timelock." },
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
  { icon: Server, title: "Sanctions Defense", desc: "Every Olympia contract that releases value screens the recipient immediately before release, and fails closed if the oracle is unset. For Treasury funds the binding checkpoint is the Executor." },
  { icon: Vote, title: "Proposal Integrity", desc: "Enforced by OpenZeppelin Governor 5.x, not by the vault. The vault checks only its caller." },
];

function Security() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
  { n: 1, title: "Consensus Upgrades", status: "active" as const, desc: "Hard fork; Treasury deploys" },
  { n: 2, title: "Core Governance", status: "next" as const, desc: "Governance suite deploys" },
  { n: 3, title: "Prediction Markets", status: "planned" as const, desc: "Futarchy signal layer" },
  { n: 4, title: "Treasury Distribution", status: "planned" as const, desc: "Smoothing at the contract layer" },
  { n: 5, title: "Protocol Integration", status: "planned" as const, desc: "Second hard fork; curve hardened" },
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

