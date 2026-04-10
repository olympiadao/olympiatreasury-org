import type { Metadata } from "next";
import { Suspense } from "react";
import { ExternalLink, CheckCircle2, Flame, Landmark, Cpu, Layers, Code2, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CountdownBanner } from "@/components/ui/CountdownBanner";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { NavHeader } from "@/components/sections/NavHeader";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Olympia Upgrade — EIP-1559, Protocol Treasury, and Fusaka EVM Alignment for Ethereum Classic",
  description:
    "Olympia is Ethereum Classic's most significant protocol upgrade. Adds EIP-1559 fee market, a protocol-controlled treasury for open-source core development, and full Fusaka EVM alignment including Dencun, Pectra, and Fusaka — positioning ETC as the Proof-of-Work infrastructure layer for institutional and sovereign adoption. Node upgrade guides for Fukuii and Core-Geth.",
  keywords: [
    "Olympia upgrade",
    "Ethereum Classic upgrade",
    "EIP-1559",
    "ECIP-1111",
    "ECIP-1112",
    "ECIP-1121",
    "Fusaka EVM",
    "EVM alignment",
    "protocol treasury",
    "Ethereum Classic node upgrade",
    "Fukuii",
    "Core-Geth",
    "hard fork",
    "ETC upgrade",
    "Dencun",
    "Pectra",
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
};

const ecips = [
  {
    ecip: "ECIP-1111",
    title: "EIP-1559 Fee Market",
    icon: Flame,
    description:
      "The most widely adopted transaction format and fee market in the EVM ecosystem, now on Ethereum Classic. Dynamic gas pricing delivers predictable fees for users and applications. Fully additive — legacy transactions remain valid indefinitely. Unlike Ethereum where the basefee is burned, ETC redirects it to the protocol treasury. Miner block rewards and tips remain completely untouched.",
  },
  {
    ecip: "ECIP-1112",
    title: "Protocol Treasury",
    icon: Landmark,
    description:
      "A protocol-controlled vault funded by basefee revenue and voluntary contributions. For the first time, institutions, developers, and network stakeholders can directly fund Ethereum Classic's core development and critical infrastructure without fielding their own team. Miners receive everything they do today — block rewards and tips remain completely untouched.",
  },
  {
    ecip: "ECIP-1121",
    title: "Fusaka EVM Alignment",
    icon: Cpu,
    description:
      "Building on Mystique and Spiral, Olympia delivers the remaining EVM execution-layer improvements from Dencun, Pectra, and Fusaka — every improvement that is independent of Proof-of-Stake and blob data availability. Exchanges and wallets gain modern RPC compatibility and standard transaction support. Developers gain full access to every current Ethereum tool, library, and framework — one codebase, every EVM chain.",
  },
];

const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary Client · Enterprise Grade",
    version: "TBD",
    runtime: "JDK 21+",
    disk: "500 GB+ (SNAP sync)",
    ram: "8 GB minimum",
    steps: [
      "Stop your running Fukuii node",
      "Download the Olympia-compatible release from GitHub",
      "Replace the existing binary",
      "Restart your node — Fukuii automatically follows the Olympia fork",
    ],
    githubUrl: "https://github.com/ethereumclassic/fukuii/releases",
    docsUrl: "https://github.com/ethereumclassic/fukuii#readme",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Legacy Client · Maintenance Mode",
    version: "TBD",
    runtime: "Go 1.24+",
    disk: "500 GB+ (full sync)",
    ram: "8 GB minimum",
    steps: [
      "Stop your running Core-Geth node",
      "Download the Olympia-compatible release from GitHub",
      "Replace the existing binary or update via package manager",
      "Restart your node — it will automatically follow the Olympia fork",
    ],
    githubUrl: "https://github.com/ethereumclassic/core-geth/releases",
    docsUrl: "https://github.com/ethereumclassic/core-geth#readme",
  },
];

const faqItems = [
  {
    question: "What happens if I don't upgrade?",
    answer:
      "If you do not upgrade before the Olympia activation block, your node will stop following the canonical chain. You will need to upgrade and resync from the fork point. Exchanges, wallets, and services running outdated clients will be unable to process transactions on the post-Olympia chain.",
  },
  {
    question: "Will my miner rewards change?",
    answer:
      "No. Block rewards and tips remain completely untouched. The Olympia upgrade redirects the EIP-1559 basefee — a value set to be destroyed — to the protocol treasury. This is entirely separate from miner rewards.",
  },
  {
    question: "When is the activation block?",
    answer:
      "The exact activation block will be announced after the Olympia Upgrade core developers call. All client implementations will release Olympia-compatible versions well before activation. Outreach will occur with all major network stakeholders to assure a smooth upgrade.",
  },
  {
    question: "Can I roll back if something goes wrong?",
    answer:
      "Olympia is backward compatible, but nodes must remain on current client versions to follow the canonical chain. In the unlikely event of an issue, emergency releases would be published promptly. All clients have been thoroughly tested by the same team that has delivered every Ethereum Classic network upgrade since 2016. Core-Geth is actively maintained through the Olympia upgrade, and Fukuii carries broader test coverage than any previous ETC client. Olympia also marks a fundamental shift from reactive maintenance to active development — so the network's core teams are responsive, engaged, and building forward.",
  },
];

const forkTimeline = [
  { name: "Dencun", fullName: "Cancun-Deneb", year: "2024", eips: ["EIP-1153", "EIP-5656", "EIP-2935"] },
  { name: "Pectra", fullName: "Prague-Electra", year: "2025", eips: ["EIP-7702", "EIP-2537", "EIP-6780"] },
  { name: "Fusaka", fullName: "Fulu-Osaka", year: "2025", eips: ["EIP-7623", "EIP-7951", "EIP-7825"] },
];

const evmCategories = [
  {
    title: "Gas & State Access",
    icon: Layers,
    eips: ["EIP-7702", "EIP-7623", "EIP-7825", "EIP-7883", "EIP-7935"],
    description:
      "Account delegation, cheaper calldata, gas limit enforcement, opcode repricing, and jumpdest removal. Reduces transaction costs and enables smart account patterns without protocol changes.",
  },
  {
    title: "EVM Safety",
    icon: ShieldCheck,
    eips: ["EIP-6780", "EIP-7934", "EIP-7910"],
    description:
      "SELFDESTRUCT restricted to deployment context, stack size enforcement, and call target constraints. Makes contract behavior more predictable and reduces attack surface.",
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
    eips: ["EIP-5656", "EIP-2935", "EIP-1153"],
    description:
      "MCOPY for efficient memory operations, historical block hashes in state, transient storage TSTORE/TLOAD. Unlocks reentrancy guards, flash loans, and cross-contract patterns without persistent storage.",
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
      "Standard wallet libraries and RPC types work on ETC without patching or overrides — one codebase, every EVM chain.",
  },
];

export default function UpgradePage() {
  return (
    <>
      <Suspense><NavHeader /></Suspense>
      <main>
        {/* Hero */}
        <section className="hero-gradient relative pt-36 pb-16">
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <FadeIn>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Olympia{" "}
                <span className="text-[var(--brand-green)]">Upgrade</span>
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mx-auto max-w-2xl text-lg text-[var(--text-muted)]">
                The Olympia era marks a shift from reactive maintenance to active
                development on the longest-running EVM and the only Proof-of-Work
                smart contract platform in the world.
              </p>
              <ul className="mx-auto mt-6 max-w-2xl space-y-3 text-left text-sm text-[var(--text-muted)]">
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">—</span>
                  <span><span className="font-semibold text-[var(--foreground)]">EIP-1559 fee market</span> — the most widely adopted transaction type in the EVM ecosystem, bringing predictable gas pricing and modern tooling compatibility</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">—</span>
                  <span><span className="font-semibold text-[var(--foreground)]">Protocol treasury</span> — seeded by basefee revenue and voluntary contributions, funding open-source core development, infrastructure, and long-term network security</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">—</span>
                  <span><span className="font-semibold text-[var(--foreground)]">Fusaka EVM alignment</span> — closes years of divergence in a single upgrade; every current Ethereum tool, library, and framework works on ETC without modification</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--brand-green)]">—</span>
                  <span><span className="font-semibold text-[var(--foreground)]">Institutional infrastructure</span> — the Proof-of-Work foundation for regulated stablecoins under MiCA and the GENIUS Act, energy grid stabilization, and ETF-compliant digital assets that regulators across the US, EU, Japan, and beyond are moving to define</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* Activation Status */}
        <section className="py-12 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <Suspense>
                <CountdownBanner />
              </Suspense>
            </FadeIn>
          </div>
        </section>

        {/* What Olympia Brings — ECIP Explainer */}
        <section className="section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                What Olympia Brings to Ethereum Classic
              </h2>
              <p className="mb-8 text-sm text-[var(--text-muted)]">
                A modern fee market, a protocol-controlled treasury, and full Fusaka EVM compatibility — delivered to the only Proof-of-Work smart contract platform in the world.
              </p>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-3">
              {ecips.map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.ecip} delay={i * 80}>
                    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-6">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                        <Icon size={20} className="text-[var(--brand-green)]" />
                      </div>
                      <p className="font-mono text-xs text-[var(--brand-green)]">
                        {item.ecip}
                      </p>
                      <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
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
              <p className="font-mono text-xs text-[var(--brand-green)] mb-1">ECIP-1121</p>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                EVM Compatibility in Detail
              </h2>
              <p className="mb-8 text-sm text-[var(--text-muted)] max-w-2xl">
                Three Ethereum upgrade cycles delivered to ETC in a single fork — every execution-layer improvement that is independent of Proof-of-Stake and blob data availability.
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
                            <span key={eip} className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                              {eip}
                            </span>
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
              <div className="mb-8 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">ETC context: </span>
                Ethereum Classic implemented partial London EIPs in Mystique (2022) and partial Shanghai EIPs in Spiral (2024), deliberately deferring the EIP-1559 fee market for independent governance design.
                ECIP-1111 now delivers those deferred London EIPs. ECIP-1121 advances the execution layer through Dencun, Pectra, and Fusaka — every EVM improvement that is independent of Proof-of-Stake and blob data availability.
                Together, Olympia brings ETC to full Fusaka execution-layer parity.
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
                          <span key={eip} className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                            {eip}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed text-[var(--text-muted)]">{cat.description}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Blobs excluded note */}
            <FadeIn delay={160}>
              <p className="mb-8 text-xs text-[var(--text-muted)] italic">
                Explicitly excluded: all blob-dependent EIPs (EIP-4844, EIP-7516, EIP-7691). Ethereum Classic is a pure Layer 1 execution chain with no data availability requirement — blobs are L2 scaffolding ETC does not need.
              </p>
            </FadeIn>

            {/* Developer tooling */}
            <FadeIn delay={200}>
              <h3 className="mb-4 text-base font-semibold">Developer Tooling — Works Without Modification</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {devTools.map((tool) => (
                  <div key={tool.name} className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-4">
                    <p className="mb-1 text-sm font-semibold">{tool.name}</p>
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">{tool.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Roadmap */}
        <RoadmapSection />

        <SectionDivider />

        {/* Client Upgrade Guides */}
        <section className="section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                Steps to Upgrade Your Client
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {clients.map((client, i) => (
                <FadeIn key={client.name} delay={i * 80}>
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--background)] p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                        style={{
                          backgroundColor: `${client.languageColor}20`,
                          color: client.languageColor,
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
                      <span className="ml-auto rounded-full border border-[var(--border-default)] px-3 py-1 font-mono text-xs text-[var(--text-muted)]">
                        Version: {client.version}
                      </span>
                    </div>

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
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
            </FadeIn>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <FadeIn key={i} delay={i * 60}>
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                    <h3 className="font-semibold">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {item.answer}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
