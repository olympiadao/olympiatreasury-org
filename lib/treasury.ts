import { formatEther } from "viem";
import { getChainConfig } from "./config";

// ---------- Types ----------

/** The two addresses this dashboard monitors. See `lib/config.ts`. */
export type MonitoredAccount = "vault" | "treasury";

/**
 * What a value transfer means, given which monitored address it touched.
 *
 * `sweep` is the Vault emptying into the Treasury — the only way value leaves the
 * Vault, because `destination` is immutable and `sweep()` is its one state-changing
 * function. `disbursement` is value leaving the Treasury, which happens only through a
 * passed proposal the Governor executes.
 */
export type TransactionKind = "contribution" | "sweep" | "disbursement" | "transfer";

export interface AccountBalance {
  wei: bigint;
  formatted: string;
}

export interface TreasuryTransaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  account: MonitoredAccount;
  direction: "in" | "out";
  kind: TransactionKind;
}

export interface MinedBlocksData {
  blockRewards: bigint;
  txFees: bigint;
  blockCount: number;
}

export interface TreasuryStats {
  /** Arrived and not yet swept. */
  vaultBalance: string;
  /** Under governance control. */
  treasuryBalance: string;
  /**
   * Lifetime inflow to the Vault, derived from the explorer's balance history as
   * current balance plus everything that has left. There is no on-chain total to
   * read: the ECIP-1111 credit is a direct state write that runs no EVM code, and
   * ECIP-1112 forbids the Vault from keeping an internal counter. This figure counts
   * every source, so it is total received rather than base-fee revenue.
   */
  totalReceived: string;
  totalSwept: string;
  totalDisbursed: string;
  contributions: string;
  /** Block rewards and fees from blocks mined with the Vault as coinbase. */
  minedIncome: string;
  blockCount: number;
  txCount: number;
  inflowCount: number;
  outflowCount: number;
  lastSweep: { timestamp: string; blockNumber: number; value: string } | null;
}

// ---------- Blockscout API ----------

interface BlockscoutAddress {
  coin_balance: string | null;
}

interface BlockscoutTx {
  hash: string;
  block_number: number;
  timestamp: string;
  from: { hash: string };
  to: { hash: string } | null;
  value: string;
}

interface BlockscoutInternalTx {
  transaction_hash: string;
  block_number: number;
  timestamp: string;
  from: { hash: string };
  to: { hash: string } | null;
  value: string;
  type: string;
}

interface BlockscoutBlock {
  height: number;
  timestamp: string;
  rewards: { reward: string; type: string }[];
  transaction_fees: string;
}

export interface BalanceEvent {
  blockNumber: number;
  timestamp: string;
  delta: number;
  account: MonitoredAccount;
}

interface BlockscoutResponse<T> {
  items: T[];
  next_page_params: Record<string, string> | null;
}

/** ECIP-1017: 5 ETC base reward, reduced by 4/5 each era */
function ecip1017Reward(blockNumber: number, eraLength: number): bigint {
  const era = Math.floor(blockNumber / eraLength);
  let reward = 5_000_000_000_000_000_000n; // 5 ETC in wei
  for (let i = 0; i < era; i++) {
    reward = (reward * 4n) / 5n;
  }
  return reward;
}

function addressOf(chainId: number, account: MonitoredAccount): `0x${string}` {
  const config = getChainConfig(chainId);
  return account === "vault" ? config.vault : config.treasury;
}

export async function fetchBalance(
  chainId: number,
  account: MonitoredAccount = "vault"
): Promise<AccountBalance> {
  const { api } = getChainConfig(chainId);
  const res = await fetch(`${api}/addresses/${addressOf(chainId, account)}`);
  const data: BlockscoutAddress = await res.json();
  const wei = BigInt(data.coin_balance ?? "0");
  return { wei, formatted: formatEther(wei) };
}

export async function fetchMinedBlocks(chainId: number): Promise<MinedBlocksData> {
  const blocks = await fetchMinedBlocksRaw(chainId);
  const { eraLength } = getChainConfig(chainId);

  let blockRewards = 0n;
  let txFees = 0n;

  for (const block of blocks) {
    // Use the ECIP-1017 formula — Blockscout's rewards field does not apply era
    // disinflation, so it reports Mordor rewards incorrectly.
    blockRewards += ecip1017Reward(block.height, eraLength);
    if (block.transaction_fees) {
      txFees += BigInt(block.transaction_fees);
    }
  }

  return { blockRewards, txFees, blockCount: blocks.length };
}

/**
 * Every value transfer touching one monitored address, from both the normal and the
 * internal transaction feeds, deduped by hash.
 */
async function fetchAccountTransfers(
  chainId: number,
  account: MonitoredAccount
): Promise<Omit<TreasuryTransaction, "kind">[]> {
  const { api } = getChainConfig(chainId);
  const address = addressOf(chainId, account);
  const self = address.toLowerCase();

  const [normalRes, internalRes] = await Promise.all([
    fetch(`${api}/addresses/${address}/transactions`),
    fetch(`${api}/addresses/${address}/internal-transactions`),
  ]);

  const normalData: BlockscoutResponse<BlockscoutTx> = normalRes.ok
    ? await normalRes.json()
    : { items: [], next_page_params: null };
  const internalData: BlockscoutResponse<BlockscoutInternalTx> = internalRes.ok
    ? await internalRes.json()
    : { items: [], next_page_params: null };

  // Only value transfers: a 0-value call is a role grant or a configuration change,
  // not money moving.
  const rows: Omit<TreasuryTransaction, "kind">[] = [];

  for (const tx of normalData.items ?? []) {
    if (BigInt(tx.value) <= 0n) continue;
    rows.push({
      hash: tx.hash,
      blockNumber: tx.block_number,
      timestamp: tx.timestamp,
      from: tx.from.hash,
      to: tx.to?.hash ?? "",
      value: formatEther(BigInt(tx.value)),
      account,
      direction: tx.from.hash.toLowerCase() === self ? "out" : "in",
    });
  }

  for (const tx of internalData.items ?? []) {
    if (tx.type !== "call" || BigInt(tx.value) <= 0n) continue;
    rows.push({
      hash: tx.transaction_hash,
      blockNumber: tx.block_number,
      timestamp: tx.timestamp,
      from: tx.from.hash,
      to: tx.to?.hash ?? "",
      value: formatEther(BigInt(tx.value)),
      account,
      direction: tx.from.hash.toLowerCase() === self ? "out" : "in",
    });
  }

  // One hash can appear in both feeds; prefer the outflow record, then the larger
  // value, so a withdrawal is never reported as the deposit leg of the same hash.
  const byHash = new Map<string, Omit<TreasuryTransaction, "kind">>();
  for (const row of rows) {
    const existing = byHash.get(row.hash);
    if (!existing) {
      byHash.set(row.hash, row);
    } else if (row.direction === "out" && existing.direction !== "out") {
      byHash.set(row.hash, row);
    } else if (parseFloat(row.value) > parseFloat(existing.value)) {
      byHash.set(row.hash, row);
    }
  }

  return Array.from(byHash.values());
}

export async function fetchTransactions(
  chainId: number
): Promise<TreasuryTransaction[]> {
  const config = getChainConfig(chainId);
  const vaultAddr = config.vault.toLowerCase();
  const treasuryAddr = config.treasury.toLowerCase();

  const [vaultRows, treasuryRows] = await Promise.all([
    fetchAccountTransfers(chainId, "vault"),
    fetchAccountTransfers(chainId, "treasury"),
  ]);

  const classify = (
    row: Omit<TreasuryTransaction, "kind">
  ): TreasuryTransaction => {
    const from = row.from.toLowerCase();
    const to = row.to.toLowerCase();
    let kind: TransactionKind;

    if (row.account === "vault") {
      kind =
        row.direction === "in"
          ? "contribution"
          : to === treasuryAddr
            ? "sweep"
            : "transfer";
    } else {
      kind =
        row.direction === "out"
          ? "disbursement"
          : from === vaultAddr
            ? "sweep"
            : "contribution";
    }

    return { ...row, kind };
  };

  // A sweep is one movement seen from both ends. Keep the Vault's side of it: that is
  // where `sweep()` was called, and counting both would double every figure derived
  // from the list.
  const merged = [
    ...vaultRows.map(classify),
    ...treasuryRows.map(classify).filter((row) => row.kind !== "sweep"),
  ];

  return merged.sort((a, b) => b.blockNumber - a.blockNumber);
}

export async function fetchBalanceHistory(
  chainId: number
): Promise<BalanceEvent[]> {
  const [transactions, minedBlocksRaw] = await Promise.all([
    fetchTransactions(chainId),
    fetchMinedBlocksRaw(chainId),
  ]);

  const { eraLength } = getChainConfig(chainId);
  const events: BalanceEvent[] = [];

  for (const tx of transactions) {
    const value = parseFloat(tx.value);

    if (tx.kind === "sweep") {
      // One movement, two balances: out of the Vault and into the Treasury.
      events.push({
        blockNumber: tx.blockNumber,
        timestamp: tx.timestamp,
        delta: -value,
        account: "vault",
      });
      events.push({
        blockNumber: tx.blockNumber,
        timestamp: tx.timestamp,
        delta: value,
        account: "treasury",
      });
      continue;
    }

    events.push({
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp,
      delta: tx.direction === "in" ? value : -value,
      account: tx.account,
    });
  }

  // Blocks mined with the Vault as coinbase credit it directly, with no transaction
  // to read them from.
  for (const block of minedBlocksRaw) {
    const reward =
      parseFloat(formatEther(ecip1017Reward(block.height, eraLength))) +
      parseFloat(formatEther(BigInt(block.transaction_fees || "0")));
    if (reward > 0) {
      events.push({
        blockNumber: block.height,
        timestamp: block.timestamp,
        delta: reward,
        account: "vault",
      });
    }
  }

  return events.sort((a, b) => a.blockNumber - b.blockNumber);
}

/** Raw mined blocks with timestamps, for the chart timeline. */
async function fetchMinedBlocksRaw(chainId: number): Promise<BlockscoutBlock[]> {
  const { api } = getChainConfig(chainId);
  const address = addressOf(chainId, "vault");
  const blocks: BlockscoutBlock[] = [];
  let url: string | null = `${api}/addresses/${address}/blocks-validated`;

  while (url) {
    const res = await fetch(url);
    if (!res.ok) break;
    const data: BlockscoutResponse<BlockscoutBlock> = await res.json();
    blocks.push(...(data.items ?? []));

    if (data.next_page_params) {
      const entries = Object.entries(data.next_page_params).map(
        ([k, v]) => [k, String(v)] as [string, string]
      );
      const params = new URLSearchParams(entries);
      url = `${api}/addresses/${address}/blocks-validated?${params}`;
    } else {
      url = null;
    }
  }

  return blocks;
}

export async function fetchStats(chainId: number): Promise<TreasuryStats> {
  const [vaultBalance, treasuryBalance, transactions, minedBlocks] =
    await Promise.all([
      fetchBalance(chainId, "vault"),
      fetchBalance(chainId, "treasury"),
      fetchTransactions(chainId),
      fetchMinedBlocks(chainId),
    ]);

  let totalSwept = 0n;
  let totalDisbursed = 0n;
  let vaultOutflow = 0n;
  let contributions = 0n;
  let inflowCount = 0;
  let outflowCount = 0;
  let lastSweep: TreasuryStats["lastSweep"] = null;

  for (const tx of transactions) {
    const wei = BigInt(Math.round(parseFloat(tx.value) * 1e18));

    switch (tx.kind) {
      case "sweep":
        totalSwept += wei;
        vaultOutflow += wei;
        break;
      case "transfer":
        vaultOutflow += wei;
        break;
      case "disbursement":
        totalDisbursed += wei;
        break;
      case "contribution":
        contributions += wei;
        break;
    }

    if (tx.direction === "in") inflowCount += 1;
    else outflowCount += 1;

    // Sorted newest-first, so the first sweep encountered is the most recent.
    if (tx.kind === "sweep" && lastSweep === null) {
      lastSweep = {
        timestamp: tx.timestamp,
        blockNumber: tx.blockNumber,
        value: tx.value,
      };
    }
  }

  return {
    vaultBalance: vaultBalance.formatted,
    treasuryBalance: treasuryBalance.formatted,
    totalReceived: formatEther(vaultBalance.wei + vaultOutflow),
    totalSwept: formatEther(totalSwept),
    totalDisbursed: formatEther(totalDisbursed),
    contributions: formatEther(contributions),
    minedIncome: formatEther(minedBlocks.blockRewards + minedBlocks.txFees),
    blockCount: minedBlocks.blockCount,
    txCount: transactions.length,
    inflowCount,
    outflowCount,
    lastSweep,
  };
}
