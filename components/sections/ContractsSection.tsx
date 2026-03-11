import { ExternalLink } from "lucide-react";

const MORDOR_EXPLORER = "https://explorer.etcnodes.org/mordor/address";

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
  return (
    <section
      id="contracts"
      className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Mordor Contracts
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-center text-[var(--text-muted)]">
          Deployed contract addresses on Mordor testnet (chain 63). Mainnet
          deployment follows successful testnet activation.
        </p>
        <p className="mx-auto mb-14 text-center text-xs text-[var(--text-subtle)]">
          Activation block: 15,800,850 (~March 28, 2026)
        </p>

        <div className="space-y-4">
          {contracts.map((contract) => (
            <div
              key={contract.name}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 transition-all duration-200 hover:border-[var(--border-brand)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{contract.name}</h3>
                    <span className="rounded-full border border-[var(--border-default)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                      {contract.ecip}
                    </span>
                    {contract.pending && (
                      <span className="rounded-full bg-[var(--brand-amber-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--brand-amber)]">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {contract.description}
                  </p>
                </div>
                {!contract.pending && (
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-xs text-[var(--brand-green)] sm:text-sm">
                      {contract.address.slice(0, 10)}...
                      {contract.address.slice(-8)}
                    </code>
                    <a
                      href={`${MORDOR_EXPLORER}/${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--brand-green-subtle)] hover:text-[var(--brand-green)]"
                      aria-label={`View ${contract.name} on explorer`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
