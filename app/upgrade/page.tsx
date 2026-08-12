import type { Metadata } from "next";
import { Suspense } from "react";
import { ExternalLink, CheckCircle2, Flame, Landmark, Cpu, Layers, Code2, Network, ShieldCheck, LayoutDashboard, Github, Vote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Accordion } from "@/components/ui/Accordion";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/sections/NavHeaderFallback";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  // Rendered as this + the root template suffix; keep the pair under ~60 chars.
  title: "Olympia Upgrade: Glamsterdam EVM Alignment",
  description:
    "Glamsterdam-era EVM alignment, an EIP-1559 fee market funding a protocol treasury, and client security parameters, all activating together on Ethereum Classic.",
  keywords: [
    "Glamsterdam EVM alignment",
    "Olympia upgrade",
    "Ethereum Classic upgrade",
    "EVM alignment",
    "Foundry ETC",
    "Hardhat ETC",
    "wagmi ETC",
    "viem ETC",
    "EIP-1559",
    "ECIP-1111",
    "ECIP-1112",
    "ECIP-1121",
    "ECIP-1122",
    "Glamsterdam EVM",
    "Fusaka EVM",
    "protocol treasury",
    "Ethereum Classic node upgrade",
    "Fukuii",
    "Core-Geth",
    "hard fork",
    "ETC upgrade",
    "Dencun",
    "Pectra",
    "Fusaka",
    "Glamsterdam",
    "Prague",
    "Cancun",
    "EVM upgrade",
    "Solidity compatibility",
    "EIP-7702",
    "EIP-2537",
    "BLS12-381",
    "transient storage",
    "EIP-1153",
    "MCOPY",
    "EIP-5656",
    "London hard fork ETC",
  ],
  // Without its own block a route inherits the root og:url.
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://olympiatreasury.org/upgrade",
    siteName: "Olympia Treasury",
    title: "Olympia Upgrade: Glamsterdam EVM Alignment, EIP-1559 Fee Market, and Protocol Treasury",
    description:
      "Olympia is Ethereum Classic's most significant protocol upgrade. Glamsterdam-era EVM alignment closes years of execution-layer divergence, the EIP-1559 fee market credits the base fee to the Olympia Sovereignty Vault instead of burning it, and client security parameters activate at the same block. Node upgrade guides for Fukuii and Core-Geth.",
    images: [
      {
        url: "https://olympiatreasury.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Olympia Upgrade for Ethereum Classic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympia Upgrade: Glamsterdam EVM Alignment, EIP-1559 Fee Market, and Protocol Treasury",
    description:
      "Glamsterdam-era EVM alignment, an EIP-1559 fee market funding a protocol-controlled treasury, and client security parameters, all activating together on Ethereum Classic.",
    images: ["https://olympiatreasury.org/og-image.png"],
  },
};

const ecips = [
  {
    ecip: "ECIP-1111",
    title: "Base Fee Market and Vault Redirection",
    icon: Flame,
    description:
      "EIP-1559 arrives on Ethereum Classic, and the base fee it introduces is credited to the Olympia Sovereignty Vault rather than burned as Ethereum burns its own. That is the mechanism funding open-source core development without any foundation or donor dependency. A 1 gwei floor keeps the revenue from decaying to zero at low utilization. Fully additive: legacy transactions remain valid indefinitely. Miner block rewards and priority-fee tips are untouched.",
  },
  {
    ecip: "ECIP-1112",
    title: "Sovereignty Vault",
    icon: Landmark,
    description:
      "The one permanent contract in Olympia: no owner, no role, no setter, no parameter. It receives value and forwards it, unchanged, to one address fixed at construction — the Timelock that is the Olympia Treasury. sweep() is permissionless precisely because that destination is immutable, so a caller chooses only when the balance moves, never where. Everything mutable lives downstream, which is what makes the Treasury replaceable without a fork.",
  },
  {
    ecip: "ECIP-1121",
    title: "Glamsterdam EVM Alignment",
    icon: Cpu,
    description:
      "Building on Mystique and Spiral, Olympia delivers the execution-layer improvements from Dencun, Pectra, and Fusaka that are independent of Proof-of-Stake and blob data availability, then carries that work into Glamsterdam. Exchanges and wallets gain modern RPC compatibility and standard transaction support. Developers gain access to every current Ethereum tool, library, and framework: one codebase, every EVM chain.",
  },
  {
    ecip: "ECIP-1122",
    title: "Network Security Configuration",
    icon: ShieldCheck,
    description:
      "Three client parameters that activate at the same block, each encoding something the network previously assumed without specifying. A 1 gwei minimum miner tip keeps block production economically rational as fixed emission declines. The gas target becomes network-authoritative, closing the misconfiguration path that dragged the limit toward 1M in 2024. And MESS is restored, returning the chain-reorganization resistance its deactivation window removed.",
  },
];

/** Pick a chip's label color by measured contrast; no single color serves every hue. */
function readableOn(background: string): string {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  // Read channels directly: noUncheckedIndexedAccess types an indexed read as
  // number | undefined.
  const c = background.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const L = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  const onWhite = 1.05 / (L + 0.05);
  const onBlack = (L + 0.05) / 0.05;
  return onWhite >= onBlack ? "#ffffff" : "#0a0f10";
}

const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary",
    description:
      "EVM execution client in Scala 3. One binary runs several networks at once in a single JVM process, each isolated with its own state, metrics, and configuration. A further network is configuration rather than a new client. Consensus is selected per deployment: native Proof-of-Work for Ethereum Classic and Mordor, or Proof-of-Stake with a built-in consensus layer or an external client over the Engine API. Ethereum Classic's first native client, built ground-up for ETC rather than derived from an Ethereum client. It is the primary ETC client for the Olympia era.",
    runtime: "JDK 25+",
    disk: "500 GB+ (SNAP sync)",
    ram: "8 GB minimum",
    steps: [
      "Stop your running Fukuii node",
      "Download the Olympia-compatible release from GitHub",
      "Replace the existing binary",
      "Restart your node. Fukuii automatically follows the Olympia fork",
    ],
    githubUrl: "https://github.com/fukuii-project/fukuii-cli/releases",
    docsUrl: "https://docs.fukuii.org",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Maintained",
    description:
      "A go-ethereum derivative maintained for Ethereum Classic, in maintenance only. Existing operators have a supported path through the upgrade. New deployments should use Fukuii.",
    runtime: "Go 1.26+",
    disk: "500 GB+ (full sync)",
    ram: "8 GB minimum",
    steps: [
      "Stop your running Core-Geth node",
      "Download the Olympia-compatible release from GitHub",
      "Replace the existing binary or update via package manager",
      "Restart your node. It will automatically follow the Olympia fork",
    ],
    githubUrl: "https://github.com/ethereumclassic/core-geth/releases",
    docsUrl: "https://github.com/ethereumclassic/core-geth#readme",
  },
];

const faqItems = [
  {
    question: "Who is coordinating the Olympia upgrade?",
    answer:
      "Olympia is coordinated by the same developers, organizations, and community stewards who have delivered every Ethereum Classic network upgrade since 2016: Gotham, Die Hard, Defuse Difficulty Bomb, Thanos, and the full EVM compatibility series spanning Gas Reprice, Atlantis, Agharta, Phoenix, Magneto, Mystique, and Spiral. The ETC Cooperative, a US 501(c)(3) non-profit, funds Ethereum Classic's client development teams and has managed the hard fork coordination process throughout that history. Stakeholder outreach, client release sequencing, and cross-client testing are all established practice. Olympia is a significant upgrade carried forward by a team with a clean delivery record across a decade of ETC network upgrades.",
  },
  {
    question: "What role has the ETC Cooperative played, and what changes with Olympia?",
    answer:
      "The ETC Cooperative is a US 501(c)(3) non-profit that has funded Ethereum Classic's core client development for years, contributing millions of dollars to the network's client teams and infrastructure through every upgrade cycle. Every hard fork, every client release, and every cross-client coordination effort has been backed by their balance sheet. Olympia is what they were building toward: a protocol-native funding model that does not depend on any single organization's continued generosity. The Olympia Treasury, governed on-chain by Ethereum Classic's Olympia DAO, extends beyond institutional dependency to a durable financial foundation that scales with network usage. The model changes, not the commitment. The ETC Cooperative continues as an active steward, and any developer, mining operation, hardware manufacturer, or individual worldwide can contribute directly on-chain without fielding a team or managing a non-profit to do it.",
  },
  {
    question: "What is Grayscale's role in Ethereum Classic's development?",
    answer:
      "Grayscale launched the Grayscale Ethereum Classic Trust (ETCG) in 2018, years before Bitcoin ETFs existed as a product category, and became a major institutional donor to the ETC Cooperative, indirectly funding the network's core client development at a time when no other investment product issuer was doing anything comparable. What Grayscale was practicing on Ethereum Classic in 2018 is now a recognized trend: ETF issuers funding protocol development, corporate treasury strategies reinvesting in network ecosystems. Taking that model on-chain is only possible on Ethereum Classic because ETC is the only Proof-of-Work blockchain with native smart contracts. Olympia DAO makes it permissionless, opening a direct on-chain contribution path to every holder, whether through ETCG, a direct wallet, or any future investment product.",
  },
  {
    question: "What does EVM alignment to Glamsterdam actually mean for builders?",
    answer:
      "ECIP-1121 closes years of EVM divergence in a single upgrade, delivering the execution-layer improvements from Dencun, Pectra, and Fusaka that are independent of Proof-of-Stake and blob data availability, and carrying that work into Glamsterdam. Before Olympia, ETC lagged behind on these EIPs, creating real friction for developers deploying across EVM chains. After Olympia, Solidity 0.8.x, Foundry, Hardhat, wagmi, viem, and ethers.js all work on ETC without modification, patching, or ETC-specific overrides. One codebase deploys to every EVM chain. ETC could not credibly claim full tooling compatibility before Olympia. After Olympia, it can.",
  },
  {
    question: "Where does base-fee revenue actually go?",
    answer:
      "Two contracts, in that order. On Ethereum a transaction's base fee is destroyed — the burned half of what every transaction pays — while the priority-fee tip goes to the block producer. Ethereum Classic has no base fee today at all: EIP-1559 is not active here, so the component does not exist rather than being zero. ECIP-1111 introduces it and credits it at block finalization to the Olympia Sovereignty Vault instead of burning it. A 1 gwei floor keeps that revenue from decaying to zero at low utilization. The Vault holds nothing for long: sweep() forwards its whole balance to a TimelockController, which is the Olympia Treasury, and that is where funds sit until a passed proposal releases them. The base fee is not the transaction fee — a transaction pays base fee plus a priority-fee tip, and tips and ECIP-1017 block rewards are untouched by the whole suite. Both contracts also accept ordinary transfers from any address, so exchanges, custodians, miners, investment product issuers, and institutions can contribute on-chain with no overhead. Stakeholders who prefer a traditional giving model can contribute through the ETC Cooperative, a US 501(c)(3) non-profit that accepts tax-deductible donations.",
  },
  {
    question: "Why two contracts rather than one?",
    answer:
      "Because the address consensus commits to can only change by hard fork, and governance has to be able to change without one. Wiring a permanent address straight into a governance stack makes every component that address transitively commits to permanent as well. So the network makes the smallest possible thing permanent: a contract with no owner, no role, no setter and no parameter, whose entire behavior is to receive value and forward it unchanged to one immutable destination. Everything mutable — the Governor, the Timelock, CoreNFT, the sanctions oracle, the OFP Registry — lives strictly downstream and is replaceable by ordinary governance. Exactly one contract in Olympia is permanent, and it is the Vault. That asymmetry is what makes the Treasury replaceable, and it is the single largest structural gain in the design.",
  },
  {
    question: "How is Olympia tested, and how is an activation block chosen?",
    answer:
      "Mordor first. Mordor is Ethereum Classic's Proof-of-Work testnet and mirrors mainnet conditions closely, and cross-client state-transition equivalence must be demonstrated there before a mainnet activation block is scheduled. The mainnet block is set only after Mordor has run cleanly and network stakeholders — exchanges, custodians, mining pools, node operators and infrastructure providers — have confirmed readiness, and client releases are published well ahead of it. That sequence is the same one used for every previous ETC hard fork.",
  },
  {
    question: "Do miner rewards change?",
    answer:
      "ECIP-1017 block rewards and priority-fee tips are untouched by the whole Olympia suite. Two things are worth separating. At the minimum gas price, the Vault's gwei is new cost borne by the sender rather than a transfer out of miner revenue, and ECIP-1122's 1 gwei minimum miner tip makes the floor beneath the miner enforceable for the first time — today it is 1 wei by client default, with 1 gwei being a wallet convention rather than anything enforced. Above the floor, at a fixed total gas price, one gwei does move from the miner to the Vault. How large a share of fee income that is depends on the prevailing tip, and what bounds it is that fee income of either kind is small against ECIP-1017 subsidies at Ethereum Classic's measured utilization.",
  },
  {
    question: "What happens to a node that is not upgraded?",
    answer:
      "It stops following the canonical chain at the activation block, as with any consensus change. Recovering means upgrading the client and resyncing from the fork point. Exchanges, wallets, RPC providers, and services running outdated clients cannot process transactions on the post-Olympia chain. Client release announcements are published well in advance to give operators time to upgrade.",
  },
  {
    question: "Is Ethereum Classic a security or commodity after Olympia?",
    answer:
      "Olympia strengthens ETC's regulatory profile. As a Proof-of-Work blockchain with no pre-mine, no ICO, no foundation controlling the protocol, and now a community-governed on-chain treasury, ETC is positioned for classification as a digital commodity under the CLARITY Act. In the EU, ETC qualifies as a decentralized asset under MiCA, exempt from per-asset issuer requirements. Japan's FSA lists ETC among approved digital assets. UK and UAE regulatory frameworks treat Proof-of-Work assets with distinct treatment from staking-based networks. The three-layer governance structure of protocol clients, Wyoming DAO LLC, and the on-chain Olympia DAO maintains clear decentralization while satisfying compliance requirements at the legal entity layer. The network remains decentralized, and governance is open to any qualified participant worldwide.",
  },
  {
    question: "Can I roll back if something goes wrong?",
    answer:
      "In the unlikely event of a critical issue after activation, the same client teams that have managed every ETC emergency response since 2016 coordinate a patch release. The established stakeholder communication channels, including the ETC Cooperative, client maintainers, and major exchange contacts, are the same ones used for every previous upgrade, and the Mordor run provides a real network validation environment before mainnet activation. One thing is worth stating plainly rather than overclaimed: the clients carrying this work are forks maintained by the specification's own authoring team, so agreement between them shows the rule runs, not that four teams read the specification the same way. Cross-client test vectors are what convert that into independent confirmation.",
  },
];

const forkTimeline = [
  { name: "Dencun", fullName: "Cancun-Deneb", year: "2024", eips: ["EIP-1153", "EIP-2935", "EIP-5656"] },
  { name: "Pectra", fullName: "Prague-Electra", year: "2025", eips: ["EIP-2537", "EIP-6780", "EIP-7702"] },
  { name: "Fusaka", fullName: "Fulu-Osaka", year: "2025", eips: ["EIP-7623", "EIP-7642", "EIP-7823", "EIP-7825", "EIP-7939", "EIP-7951"] },
  { name: "Glamsterdam", fullName: "Gloas-Amsterdam", year: "2026", eips: ["EIP-7975", "EIP-7997"] },
];

const evmCategories = [
  {
    title: "Gas & State Access",
    icon: Layers,
    eips: ["EIP-7623", "EIP-7702", "EIP-7823", "EIP-7825", "EIP-7883", "EIP-7935"],
    description:
      "Account delegation, cheaper calldata, a per-transaction gas limit cap, MODEXP input bounds and repricing, and a network-authoritative 60M gas target. Reduces transaction costs and enables smart account patterns without protocol changes.",
  },
  {
    title: "EVM Safety",
    icon: ShieldCheck,
    eips: ["EIP-6780", "EIP-7910", "EIP-7934", "EIP-7997"],
    description:
      "SELFDESTRUCT restricted to the deployment transaction, an RLP block size limit, an eth_config RPC method, and a deterministic factory contract at the same address as every other EVM chain. Makes contract behavior more predictable and reduces attack surface.",
  },
  {
    title: "Cryptographic Precompiles",
    icon: Cpu,
    eips: ["EIP-2537", "EIP-7951"],
    description:
      "BLS12-381 pairing operations for ZK-friendly proof verification, P256VERIFY for WebAuthn and passkey authentication. Native cryptographic primitives for privacy and identity.",
  },
  {
    title: "Execution Context",
    icon: Code2,
    eips: ["EIP-1153", "EIP-2935", "EIP-5656", "EIP-7939"],
    description:
      "MCOPY for efficient memory operations, CLZ opcode for leading-zero counting, historical block hashes in state, transient storage TSTORE/TLOAD. Unlocks reentrancy guards, flash loans, and cross-contract patterns without persistent storage.",
  },
  {
    title: "Networking",
    icon: Network,
    eips: ["EIP-7642", "EIP-7975"],
    description:
      "eth/69 retains total difficulty for Proof-of-Work chain selection and drops receipt bloom filters; eth/70 paginates receipts for blocks above the p2p size limit. Both activate through devp2p capability negotiation rather than a hard fork.",
  },
];

const devTools = [
  {
    name: "Solidity 0.8.x+",
    description:
      "All recent compiler versions produce compatible bytecode for ETC without modification.",
  },
  {
    name: "Foundry / Hardhat",
    description:
      "Standard EVM testing and deployment toolchains work on ETC without ETC-specific forks or patches.",
  },
  {
    name: "wagmi / viem / ethers.js",
    description:
      "Standard wallet libraries and RPC types work on ETC without patching or overrides: one codebase, every EVM chain.",
  },
];

export default function UpgradePage() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}><NavHeader /></Suspense>
      <main>
        {/* Hero */}
        <section className="hero-gradient relative pt-36 pb-16">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <p className="text-sm font-mono uppercase tracking-widest text-[var(--brand-green)]">Olympia</p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                The{" "}
                <span className="text-[var(--brand-green)]">Olympia</span>{" "}
                Upgrade
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-lg text-[var(--text-muted)]">
                The Olympia era marks a shift from reactive maintenance to active
                development on the longest-running EVM and the only Proof-of-Work
                smart contract platform in the world.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--text-muted)]">
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">·</span>
                  <span><span className="font-semibold text-[var(--foreground)]">Glamsterdam EVM alignment:</span> closes years of divergence in a single upgrade; every current Ethereum tool, library, and framework works on ETC without modification. Solidity, Foundry, Hardhat, wagmi and viem all work from one codebase, on every EVM chain.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">·</span>
                  <span><span className="font-semibold text-[var(--foreground)]">EIP-1559 fee market:</span> Ethereum burns its base fee; Ethereum Classic credits its own to the Olympia Sovereignty Vault, funding open-source core development without any foundation or donor dependency. Predictable gas pricing, modern tooling compatibility, legacy transactions remain valid indefinitely.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">·</span>
                  <span><span className="font-semibold text-[var(--foreground)]">Protocol treasury:</span> the Vault sweeps into a Timelock the network governs, funding core development, infrastructure, and long-term network security. Base fee is not the transaction fee — priority-fee tips and ECIP-1017 block rewards go to miners in full.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">·</span>
                  <span><span className="font-semibold text-[var(--foreground)]">Institutional infrastructure:</span> the Proof-of-Work foundation for regulated stablecoin issuance (Classic USD, MiCA and GENIUS Act-compliant), digital commodity classification under the CLARITY Act, and the broadest cross-jurisdictional institutional access profile of any Proof-of-Work smart contract network</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/*
          An "Activation Status" banner stood here, carrying a countdown that fell back
          to a target date whenever no activation block was set. Both are timestamps in
          disguise: a completed upgrade does not count down to itself, and a date read
          two years later dates the page rather than informing anyone. What the section
          explains instead is the mechanism, which needs no updating. Do not restore it.
        */}

        {/* What Olympia Brings: ECIP explainer */}
        <section className="section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                What Olympia Brings to Ethereum Classic
              </h2>
              <p className="mb-8 text-sm text-[var(--text-muted)]">
                Four protocol changes in a single activation: a fee market that funds a protocol-controlled treasury, the Treasury contract itself, Glamsterdam EVM alignment that closes years of tooling divergence so every Ethereum library and framework works on ETC without modification, and the client security parameters that come with them. Delivered to the only Proof-of-Work smart contract platform in the world.
              </p>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2">
              {ecips.map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.ecip} delay={i * 80} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-6">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                        <Icon size={20} className="text-[var(--brand-green)]" />
                      </div>
                      <a
                        href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${item.ecip.toLowerCase().replace("ecip-", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--brand-green)] transition hover:opacity-70"
                      >
                        {item.ecip}
                      </a>
                      <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ECIP-1121 EVM Deep Dive */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <a
                href="https://ecips.ethereumclassic.org/ECIPs/ecip-1121"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-1 block font-mono text-xs text-[var(--brand-green)] transition hover:opacity-70"
              >ECIP-1121</a>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">EVM Compatibility</h2>
              <p className="mb-8 text-sm text-[var(--text-muted)]">
                Building on Mystique and Spiral, Olympia delivers the EVM execution-layer improvements from Dencun, Pectra, and Fusaka, and carries that work into Glamsterdam. Every EIP is compatible with Proof-of-Work and independent of blob data availability.
              </p>
            </FadeIn>

            {/* Fork Timeline */}
            <FadeIn delay={80}>
              <div className="mb-8 relative">
                {/* Desktop horizontal line */}
                <div className="hidden md:block absolute top-[22px] left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-[var(--border-brand)]" />
                <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
                  {forkTimeline.map((fork, i) => (
                    <div key={fork.name} className="relative flex md:flex-col md:items-center md:w-1/3 gap-4 md:gap-0">
                      {/* Mobile vertical line */}
                      {i < forkTimeline.length - 1 && (
                        <div className="md:hidden absolute left-[17px] top-[38px] bottom-[-22px] w-px bg-[var(--border-brand)]" />
                      )}
                      <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] font-mono text-xs font-bold text-[var(--brand-green)] relative z-10">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="md:mt-4 md:text-center">
                        <p className="font-semibold text-sm">{fork.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{fork.fullName} · {fork.year}</p>
                        <div className="mt-2 flex flex-wrap gap-1 md:justify-center">
                          {fork.eips.map((eip) => (
                            <a
                              key={eip}
                              href={`https://eips.ethereum.org/EIPS/eip-${eip.toLowerCase().replace("eip-", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-sm border border-[var(--color-violet)]/20 bg-[var(--color-violet-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-violet)] transition hover:opacity-70"
                            >
                              {eip}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Divergence callout */}
            <FadeIn delay={120}>
              <div className="mb-8 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                  Ethereum Classic implemented partial London EIPs in Mystique (2022) and partial Shanghai EIPs in Spiral (2024), deliberately deferring the EIP-1559 fee market for independent governance design. ECIP-1111 now delivers those deferred London EIPs. ECIP-1121 advances the execution layer through Dencun, Pectra, and Fusaka, taking every EVM improvement that is independent of Proof-of-Stake and blob data availability, then carries that work into Glamsterdam. Together, Olympia brings ETC current through Fusaka and opens Glamsterdam.
                </p>
              </div>
            </FadeIn>

            {/* EIP Categories */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {evmCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <FadeIn key={cat.title} delay={i * 60}>
                    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                          <Icon size={16} className="text-[var(--brand-green)]" />
                        </div>
                        <h3 className="text-sm font-semibold">{cat.title}</h3>
                      </div>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {cat.eips.map((eip) => (
                          <a
                            key={eip}
                            href={`https://eips.ethereum.org/EIPS/eip-${eip.toLowerCase().replace("eip-", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-sm border border-[var(--color-violet)]/20 bg-[var(--color-violet-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-violet)] transition hover:opacity-70"
                          >
                            {eip}
                          </a>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed text-[var(--text-muted)]">{cat.description}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Blobs excluded */}
            <FadeIn delay={160}>
              <div className="mb-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-primary)]">Blobs excluded by design.</span>{" "}
                  EIPs dependent on blob data availability (EIP-4844, EIP-7516, EIP-7691) are intentionally excluded. Ethereum introduced blobs to support L2 data availability, a concern Ethereum Classic as a pure Layer 1 execution chain does not have. ETC takes the execution-layer improvements without inheriting any L2 scaffolding.
                </p>
              </div>
            </FadeIn>

            {/* Developer tooling */}
            <FadeIn delay={200}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Developer Tooling: Works Without Modification
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {devTools.map((tool) => (
                  <div key={tool.name} className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
                    <p className="mb-1 text-sm font-semibold">{tool.name}</p>
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">{tool.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Olympia Upgrade Callout */}
        <SectionDivider />
        <section className="section-alt py-20">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight">The Olympia Upgrade</h2>
              <div className="mt-4 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-8 space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                <p>Olympia is Ethereum Classic&rsquo;s most significant protocol upgrade. Three changes arrive in a single activation: Glamsterdam EVM alignment, EIP-1559 fee market, and a protocol-governed treasury.</p>
                <p>The headline change is EVM alignment, closing years of execution-layer divergence from Ethereum in a single fork. Every Solidity compiler version, every deployment tool (Foundry, Hardhat), and every major library (wagmi, viem, ethers.js) works on ETC without modification, patching, or ETC-specific overrides. One codebase deploys to every EVM chain. ETC could not credibly claim this before Olympia. After Olympia, it can.</p>
                <p>The EIP-1559 fee market credits the base fee to the Olympia Sovereignty Vault instead of burning it, and the Vault sweeps into the Timelock that is the Olympia Treasury. Block rewards and priority-fee tips are untouched and go entirely to miners. Funding proposals are submitted on-chain, subject to the Governor&rsquo;s proposal threshold; core contributors vote, a strict majority carries, and the Governor is the Timelock&rsquo;s sole executor. Every step is verifiable on-chain.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Governance Framework */}
        <SectionDivider />
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight">Olympia Governance Framework</h2>
              <p className="mt-3 text-base text-[var(--text-muted)]">
                The Governor is the Timelock&rsquo;s sole executor, and that is the only
                path to Treasury funds; no multisig, committee, foundation or legal
                wrapper can override it. There is no separate executor contract — the
                compliance gate is an override on the Governor&rsquo;s own execution
                path, above the Timelock, so it screens whole batches. Voting power comes
                from the CoreNFT: soulbound, one non-delegable vote per core contributor,
                earned by contribution rather than bought.
              </p>
            </FadeIn>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Vote,
                  name: "Governance App",
                  description: "Proposal submission, on-chain voting, and execution tooling for network contributors",
                  href: "https://app.olympiadao.org",
                },
                {
                  icon: LayoutDashboard,
                  name: "Olympia DAO",
                  description: "Governance landing page covering upgrade details, ECIP specs, and the three-tier governance architecture",
                  href: "https://olympiadao.org",
                },
                {
                  icon: Landmark,
                  name: "Ethereum Classic DAO",
                  description: "Institutional site for the Wyoming DAO LLC, the legal entity behind Olympia DAO governance",
                  href: "https://ethereumclassicdao.org",
                },
                {
                  icon: Github,
                  name: "GitHub",
                  description: "Client implementations, governance contracts, and protocol infrastructure, all open-source",
                  href: "https://github.com/olympiadao",
                },
              ].map((p, i) => (
                <FadeIn key={p.name} delay={i * 80}>
                  <PropertyCard
                    icon={p.icon}
                    name={p.name}
                    description={p.description}
                    href={p.href}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <RoadmapSection />

        <SectionDivider />

        {/* Client Upgrade Guides */}
        <section className="section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                Steps to Upgrade Your Client
              </h2>
              <p className="mb-8 text-sm text-[var(--text-muted)]">
                Fukuii and Core-Geth are the two production Olympia implementations. Besu,
                Erigon, Ethrex, Go-Ethereum, Nethermind and Reth serve as upstream
                cross-client references. ETC plugins are the path by which they reach
                Olympia.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {clients.map((client, i) => (
                <FadeIn key={client.name} delay={i * 80}>
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                        style={{
                          backgroundColor: client.languageColor,
                          color: readableOn(client.languageColor),
                        }}
                      >
                        {client.language.slice(0, 2)}
                      </span>
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <span className="text-xs text-[var(--text-muted)]">
                          {client.role} · {client.language}
                        </span>
                      </div>
                      <a
                        href={client.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto rounded-full border border-[var(--border-default)] px-3 py-1 font-mono text-xs text-[var(--text-muted)] transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
                      >
                        Latest release
                      </a>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
                      {client.description}
                    </p>

                    {/* Prerequisites */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-[var(--bg-elevated)] px-3 py-2 text-center">
                        <p className="text-[10px] text-[var(--text-muted)]">Runtime</p>
                        <p className="text-sm font-semibold">{client.runtime}</p>
                      </div>
                      <div className="rounded-lg bg-[var(--bg-elevated)] px-3 py-2 text-center">
                        <p className="text-[10px] text-[var(--text-muted)]">Disk</p>
                        <p className="text-sm font-semibold">{client.disk}</p>
                      </div>
                      <div className="rounded-lg bg-[var(--bg-elevated)] px-3 py-2 text-center">
                        <p className="text-[10px] text-[var(--text-muted)]">RAM</p>
                        <p className="text-sm font-semibold">{client.ram}</p>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-2">
                      {client.steps.map((step, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-[var(--brand-green)]"
                          />
                          <p className="text-sm text-[var(--text-muted)]">{step}</p>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-4 flex gap-3">
                      <a
                        href={client.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Releases <ExternalLink size={12} />
                      </a>
                      <a
                        href={client.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Docs <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={60}>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-6">
                <Accordion items={faqItems} defaultAllOpen />
              </div>
            </FadeIn>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      </main>
      <FooterSection />
    </>
  );
}
