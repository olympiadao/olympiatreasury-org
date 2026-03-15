import { formatEther } from "viem";
import { TREASURY_ADDRESS, MORDOR_API } from "./config";

// ---------- Types ----------

export interface TreasuryBalance {
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
  type: "inflow" | "outflow";
  /** True for governance-linked withdrawals via Executor */
  governance: boolean;
}

export interface MinedBlocksData {
  blockRewards: bigint;
  txFees: bigint;
  blockCount: number;
}

export interface TreasuryStats {
  balance: TreasuryBalance;
  totalInflow: string;
  totalOutflow: string;
  /** Direct ETC transfers to treasury (donations) */
  totalDonations: string;
  /** Mined income: block rewards + tx fees from blocks mined to treasury */
  minedIncome: string;
  /** EIP-1559 basefee redirected via ECIP-1111 (post-Olympia) */
  baseFeeIncome: string;
  blockCount: number;
  txCount: number;
}

// ---------- Blockscout API ----------

interface BlockscoutAddress {
  coin_balance: string;
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
  source: "mining" | "donation" | "withdrawal";
}

interface BlockscoutResponse<T> {
  items: T[];
  next_page_params: Record<string, string> | null;
}

const EXECUTOR_ADDRESS = "0x94d4f74dDdE715Ed195B597A3434713690B14e97";

// Mordor era length for ECIP-1017 disinflation (mainnet uses 5,000,000)
const ERA_LENGTH = 2_000_000;

/** ECIP-1017: 5 ETC base reward, reduced by 4/5 each era */
function ecip1017Reward(blockNumber: number): bigint {
  const era = Math.floor(blockNumber / ERA_LENGTH);
  let reward = 5_000_000_000_000_000_000n; // 5 ETC in wei
  for (let i = 0; i < era; i++) {
    reward = (reward * 4n) / 5n;
  }
  return reward;
}

export async function fetchBalance(): Promise<TreasuryBalance> {
  const res = await fetch(
    `${MORDOR_API}/addresses/${TREASURY_ADDRESS}`
  );
  const data: BlockscoutAddress = await res.json();
  const wei = BigInt(data.coin_balance);
  return { wei, formatted: formatEther(wei) };
}

export async function fetchMinedBlocks(): Promise<MinedBlocksData> {
  let blockRewards = 0n;
  let txFees = 0n;
  let blockCount = 0;
  let url: string | null =
    `${MORDOR_API}/addresses/${TREASURY_ADDRESS}/blocks-validated`;

  while (url) {
    const res = await fetch(url);
    if (!res.ok) break;
    const data: BlockscoutResponse<BlockscoutBlock> = await res.json();

    for (const block of data.items ?? []) {
      blockCount++;
      // Use ECIP-1017 formula — Blockscout rewards field doesn't apply era disinflation
      blockRewards += ecip1017Reward(block.height);
      if (block.transaction_fees) {
        txFees += BigInt(block.transaction_fees);
      }
    }

    if (data.next_page_params) {
      const entries = Object.entries(data.next_page_params).map(
        ([k, v]) => [k, String(v)] as [string, string]
      );
      const params = new URLSearchParams(entries);
      url = `${MORDOR_API}/addresses/${TREASURY_ADDRESS}/blocks-validated?${params}`;
    } else {
      url = null;
    }
  }

  return { blockRewards, txFees, blockCount };
}

export async function fetchTransactions(): Promise<TreasuryTransaction[]> {
  const addr = TREASURY_ADDRESS.toLowerCase();
  const executor = EXECUTOR_ADDRESS.toLowerCase();

  // Fetch normal transactions (no limit/sort — Blockscout v2 doesn't support them)
  const normalRes = await fetch(
    `${MORDOR_API}/addresses/${TREASURY_ADDRESS}/transactions`
  );
  const normalData: BlockscoutResponse<BlockscoutTx> = await normalRes.json();

  // Only keep value transfers (skip 0-value admin calls like grantRole)
  const normal: TreasuryTransaction[] = (normalData.items ?? [])
    .filter((tx) => BigInt(tx.value) > 0n)
    .map((tx) => ({
      hash: tx.hash,
      blockNumber: tx.block_number,
      timestamp: tx.timestamp,
      from: tx.from.hash,
      to: tx.to?.hash ?? "",
      value: formatEther(BigInt(tx.value)),
      type: tx.from.hash.toLowerCase() === addr ? "outflow" : "inflow",
      governance: false,
    }));

  // Fetch internal transactions (withdrawals appear here)
  const internalRes = await fetch(
    `${MORDOR_API}/addresses/${TREASURY_ADDRESS}/internal-transactions`
  );
  const internalData: BlockscoutResponse<BlockscoutInternalTx> =
    await internalRes.json();

  // Filter: keep call type with value > 0, skip create2 deployments
  const internal: TreasuryTransaction[] = (internalData.items ?? [])
    .filter((tx) => tx.type === "call" && BigInt(tx.value) > 0n)
    .map((tx) => {
      const isOutflow = tx.from.hash.toLowerCase() === addr;
      // Outflows from treasury are governance-linked (via Executor→Treasury→recipient)
      const isGovernance =
        isOutflow || tx.from.hash.toLowerCase() === executor;
      return {
        hash: tx.transaction_hash,
        blockNumber: tx.block_number,
        timestamp: tx.timestamp,
        from: tx.from.hash,
        to: tx.to?.hash ?? "",
        value: formatEther(BigInt(tx.value)),
        type: isOutflow ? "outflow" : "inflow",
        governance: isGovernance,
      };
    });

  // Merge: dedupe by hash, prefer the record with higher value or outflow type
  const map = new Map<string, TreasuryTransaction>();
  for (const tx of [...normal, ...internal]) {
    const existing = map.get(tx.hash);
    if (!existing) {
      map.set(tx.hash, tx);
    } else if (tx.type === "outflow" && existing.type !== "outflow") {
      map.set(tx.hash, tx);
    } else if (
      parseFloat(tx.value) > parseFloat(existing.value)
    ) {
      map.set(tx.hash, tx);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.blockNumber - a.blockNumber
  );
}

export async function fetchBalanceHistory(): Promise<BalanceEvent[]> {
  const [transactions, minedBlocksRaw] = await Promise.all([
    fetchTransactions(),
    fetchMinedBlocksRaw(),
  ]);

  const events: BalanceEvent[] = [];

  // Add transaction events
  for (const tx of transactions) {
    const val = parseFloat(tx.value);
    events.push({
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp,
      delta: tx.type === "inflow" ? val : -val,
      source: tx.type === "inflow" ? "donation" : "withdrawal",
    });
  }

  // Add mined block events using ECIP-1017 formula (not Blockscout's incorrect rewards)
  for (const block of minedBlocksRaw) {
    const reward =
      parseFloat(formatEther(ecip1017Reward(block.height))) +
      parseFloat(formatEther(BigInt(block.transaction_fees || "0")));
    if (reward > 0) {
      events.push({
        blockNumber: block.height,
        timestamp: block.timestamp,
        delta: reward,
        source: "mining",
      });
    }
  }

  return events.sort((a, b) => a.blockNumber - b.blockNumber);
}

/** Raw mined blocks with timestamps for chart timeline */
async function fetchMinedBlocksRaw(): Promise<BlockscoutBlock[]> {
  const blocks: BlockscoutBlock[] = [];
  let url: string | null =
    `${MORDOR_API}/addresses/${TREASURY_ADDRESS}/blocks-validated`;

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
      url = `${MORDOR_API}/addresses/${TREASURY_ADDRESS}/blocks-validated?${params}`;
    } else {
      url = null;
    }
  }

  return blocks;
}

export async function fetchStats(): Promise<TreasuryStats> {
  const [balance, transactions, minedBlocks] = await Promise.all([
    fetchBalance(),
    fetchTransactions(),
    fetchMinedBlocks(),
  ]);

  let totalOutflow = 0n;
  let totalDonations = 0n;

  for (const tx of transactions) {
    const wei = BigInt(Math.round(parseFloat(tx.value) * 1e18));
    if (tx.type === "outflow") {
      totalOutflow += wei;
    } else {
      totalDonations += wei;
    }
  }

  // Total lifetime inflow = current balance + total outflows
  const totalInflow = balance.wei + totalOutflow;

  return {
    balance,
    totalInflow: formatEther(totalInflow),
    totalOutflow: formatEther(totalOutflow),
    totalDonations: formatEther(totalDonations),
    minedIncome: formatEther(minedBlocks.blockRewards + minedBlocks.txFees),
    baseFeeIncome: "0",
    blockCount: minedBlocks.blockCount,
    txCount: transactions.length,
  };
}
