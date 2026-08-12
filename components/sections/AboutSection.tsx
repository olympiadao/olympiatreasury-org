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
  ArrowRight,
  Pickaxe,
  Heart,
  Vote,
  Award,
  UserCheck,
  LogOut,
} from "lucide-react";
import { AboutContracts } from "./AboutContracts";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <h2 id="about-heading" className="text-lg font-semibold">
          About the Vault and the Treasury
        </h2>

        <CollapsibleCard title="How Funds Flow" defaultOpen>
          <FundFlow />
        </CollapsibleCard>

        <CollapsibleCard title="Deployment Order" defaultOpen>
          <DeploymentOrder />
        </CollapsibleCard>

        <CollapsibleCard title="Core Contributors: the CoreNFT" defaultOpen>
          <CoreContributors />
        </CollapsibleCard>

        <CollapsibleCard title="Contributing Directly" defaultOpen>
          <CommunityFunding />
        </CollapsibleCard>

        <CollapsibleCard title="The Five Stages" defaultOpen>
          <Stages />
        </CollapsibleCard>

        <CollapsibleCard title="Core Invariants" defaultOpen>
          <Invariants />
        </CollapsibleCard>

        <CollapsibleCard title="Security Model" defaultOpen>
          <Security />
        </CollapsibleCard>

        <CollapsibleCard title="Contracts" defaultOpen>
          <AboutContracts />
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
  {
    icon: Flame,
    title: "Base Fee Credited",
    desc: "A transaction pays a base fee plus a priority-fee tip. On Ethereum the base fee is destroyed — the burned half of what every transaction pays. Ethereum Classic has no base fee at all until ECIP-1111 introduces one, and credits it to the Vault at block finalization rather than burning it. Tips and ECIP-1017 block rewards go to miners in full.",
  },
  {
    icon: Landmark,
    title: "A Floor Under Revenue",
    desc: "The base fee never falls below 1 gwei. Without that floor, sustained low utilization would decay it toward zero and eliminate the revenue entirely.",
  },
  {
    icon: ArrowRight,
    title: "Swept to the Treasury",
    desc: "sweep() moves the Vault's whole balance to the Treasury. Anyone may call it and it costs the caller gas; it is safe because the destination is immutable, so a caller chooses only when the balance moves, never where.",
  },
  {
    icon: FileCheck,
    title: "Proposals Submitted",
    desc: "An OFP names recipient, amount and metadata, and states whether it is retrospective or prospective. Submission is permissionless and carries no bond, gated only by the Governor's proposal threshold measured against the author.",
  },
  {
    icon: Users,
    title: "Governance Approves",
    desc: "Core contributors vote. A strict majority of For over Against carries, subject to quorum. The Governor is the Timelock's sole executor, and every execution passes its sanctions gate before the Timelock pays anyone.",
  },
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
            <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">
              {s.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Deployment order ---- */
function DeploymentOrder() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        <span className="font-semibold text-[var(--text-primary)]">
          Nothing is predicted.
        </span>{" "}
        No address is computed in advance from a salt or a deployer nonce, and no client
        recomputes one — each hardcodes the Vault&rsquo;s real deployed address, published
        together with the network it is on. Mainnet and Mordor are independent values.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--border-subtle)] p-3">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            Dependency order, not a schedule
          </p>
          <p className="mt-1">
            The Timelock deploys first, because CoreNFT holds its address as an immutable
            constructor argument and cannot be built before it exists. CoreNFT, then the
            Governor, then the Timelock&rsquo;s role grants, then the Vault — whose
            immutable destination must be the Timelock&rsquo;s real address. The sanctions
            oracle and the OFP Registry attach through Timelock-gated setters and are a
            constructor argument to nothing.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-3">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            The fork commits to code that already exists
          </p>
          <p className="mt-1">
            The activation fork is the last step. Everything the hardcoded address
            transitively commits to — the Vault, the Timelock it forwards to, the Governor
            and CoreNFT that spend from it — is deployed, audited and readable on-chain
            before the block that starts crediting it. The alternative asks the network to
            trust a future deployment rather than inspect a present one.
          </p>
        </div>
      </div>
      <p>
        No account holds an admin role once the role grants complete, and the Timelock
        administers its own roles from that point on. The Governor holds{" "}
        <code className="font-mono">EXECUTOR_ROLE</code> and nothing else does, which is
        what makes the sanctions gate binding rather than advisory.
      </p>
    </div>
  );
}

/* ---- Core contributors ---- */
const contributorFacts = [
  {
    icon: Award,
    title: "Earned, never bought",
    desc: "Minted on proof of substantive, net-positive contribution to Ethereum Classic, and on nothing else. No amount of capital admits anyone, and no identity verification is required or may be imposed.",
  },
  {
    icon: UserCheck,
    title: "One contributor, one vote",
    desc: "Soulbound and non-transferable, with delegation locked to the holder. A vote cannot be sold, lent, or leased.",
  },
  {
    icon: Vote,
    title: "Admitted by the DAO",
    desc: "One governance proposal per admission, with the evidence in its metadata. No minter role, no admissions committee, no unilateral account.",
  },
  {
    icon: LogOut,
    title: "Revocable and resignable",
    desc: "A contributor may burn their own token at any time, and the DAO may revoke by proposal on the same footing as admission. Re-admission is possible, so exit is not exile.",
  },
];

function CoreContributors() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        Voting power comes from the CoreNFT and from nothing else. There is no fungible,
        transferable, purchasable token. There is nothing to buy, sell, lend, pool or
        accumulate, and therefore nothing on which a market in votes could form.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {contributorFacts.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
              <f.icon size={16} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                {f.title}
              </p>
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
        Membership grows by proposal and supply is unbounded, so the electorate is open
        to earn and closed to buy — never a fixed council. Quorum tracks admissions
        automatically, because it is measured as a fraction of the supply at each
        proposal&rsquo;s snapshot.
      </p>
    </div>
  );
}

/* ---- Contributing directly ---- */
function CommunityFunding() {
  return (
    <div className="space-y-3 text-xs leading-relaxed text-[var(--text-muted)]">
      <p>
        Base-fee redirection is the protocol-defined funding source. Neither route below
        is a protocol mechanism: both are ordinary transfers any address can make, and
        the chain records each one.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <Pickaxe size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              Mine to the Vault
            </p>
            <p className="mt-0.5">
              A pool or solo miner can set the Vault as their coinbase address, sending
              their own block rewards to it. That is a choice an operator makes, not
              something the protocol does. No ECIP directs mining revenue here.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)] text-[var(--brand-green)]">
            <Heart size={16} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              Contribute directly
            </p>
            <p className="mt-0.5">
              The Vault accepts incoming transfers unconditionally, and every one is
              visible in the transactions table above. Whatever arrives leaves by the
              same single route as base-fee revenue: a sweep to the Treasury, and then
              only a passed proposal.
            </p>
          </div>
        </div>
      </div>
      <p>
        Smart contracts can opt in on the same terms. A protocol forwarding a share of
        its fees on-chain gains no special claim over the funds it sends, and the Vault
        keeps no record distinguishing them — it holds no internal accounting at all.
      </p>
    </div>
  );
}

/* ---- Invariants ---- */
const invariants = [
  {
    icon: Ban,
    title: "No Minting",
    desc: "Neither contract can mint ETC. Each holds only what it receives.",
  },
  {
    icon: Lock,
    title: "Immutable Vault",
    desc: "No proxy, no delegatecall, no selfdestruct, no admin. Deployed exactly once.",
  },
  {
    icon: Shield,
    title: "No Authorization State",
    desc: "The Vault has no owner, role, guardian, or pause flag, so no sequence of calls can change who may do what.",
  },
  {
    icon: Minimize2,
    title: "One Way Out",
    desc: "Balance leaves the Vault only through sweep(), and sweep() can send only to the immutable destination. Both are provable by reading thirty lines.",
  },
  {
    icon: Eye,
    title: "No Internal Accounting",
    desc: "The Vault keeps no deposit counter. The consensus credit runs no EVM code, so a contract releasing funds against an internal total would release nothing.",
  },
];

function Invariants() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {invariants.map((inv, i) => (
        <div key={i} className="flex items-start gap-2">
          <inv.icon
            size={16}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[var(--brand-green)]"
          />
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
  {
    icon: ShieldCheck,
    title: "Protocol Consensus",
    desc: "Every client credits the base fee to the same hardcoded address at block finalization. Any deviation forks.",
  },
  {
    icon: Lock,
    title: "A Permanent Commitment, Minimized",
    desc: "What the fork makes unchangeable is only that revenue lands in the Timelock. Which Governor spends it, under which rules, stays replaceable.",
  },
  {
    icon: Server,
    title: "Sanctions Screening",
    desc: "The Governor screens every externally-directed target immediately before execution and fails closed if the oracle is unset. It sits above the Timelock, so it sees whole batches rather than one recipient at a time.",
  },
  {
    icon: Vote,
    title: "Proposal Integrity",
    desc: "Enforced by OpenZeppelin Governor 5.x, whose proposal identifier is the hash of targets, values, calldatas and description. Neither the Vault nor the Timelock validates a proposal.",
  },
];

function Security() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {secLayers.map((l, i) => (
        <div key={i} className="flex items-start gap-2">
          <l.icon
            size={16}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[var(--brand-green)]"
          />
          <div>
            <p className="text-xs font-semibold">{l.title}</p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{l.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- The five stages ---- */
/*
 * Stage numbers describe how the system is built, which is a structural fact and stays.
 * What was here before also carried an "active / next / planned" status per stage,
 * which is a progress bar in disguise: it dates the page, and every reading of it goes
 * stale without anyone editing the file. The stages keep their order and lose their
 * position marker.
 */
const stages = [
  {
    n: 1,
    title: "Consensus Upgrades",
    ecips: "1111, 1112, 1121, 1122",
    desc: "Hard fork. The Vault begins receiving base fee and sweeping it to the Timelock.",
  },
  {
    n: 2,
    title: "Core Governance",
    ecips: "1113, 1114, 1119",
    desc: "Governance goes live: binding the sanctions oracle and the OFP Registry, after which the DAO can spend.",
  },
  {
    n: 3,
    title: "Prediction Markets",
    ecips: "1117, 1118",
    desc: "Contract deployment, seeded by an OFP the Governor passes.",
  },
  {
    n: 4,
    title: "Treasury Distribution",
    ecips: "1115",
    desc: "Smoothing runs as a governance-configured experiment on Treasury-held revenue.",
  },
  {
    n: 5,
    title: "Protocol Integration",
    ecips: "1116",
    desc: "A second, separate hard fork embeds the demonstrated curve into block finalization.",
  },
];

function Stages() {
  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
        Stages 1 and 5 are hard forks; stages 2, 3 and 4 are not — they are contract
        deployments and governance actions on a chain whose consensus rules are already
        settled, and none can cause a client to diverge. Each stage depends only on the
        stages before it.
      </p>
      <div className="flex flex-wrap gap-3">
        {stages.map((s) => (
          <div
            key={s.n}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-elevated)] text-xs font-bold text-[var(--text-muted)]">
              {s.n}
            </span>
            <span className="text-xs font-semibold">{s.title}</span>
            <span className="font-mono text-[10px] text-[var(--brand-green)]">
              ECIP-{s.ecips}
            </span>
            <span className="text-[10px] text-[var(--text-subtle)]">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
