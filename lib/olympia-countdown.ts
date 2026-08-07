// Olympia Activation Block — Update this ONE value when the core developers call sets the block.
export const OLYMPIA_ACTIVATION_BLOCK: number | null = null;
export const AVG_BLOCK_TIME_SECONDS = 13;
export type CountdownStatus = "tbd" | "pending" | "activated";

// Countdown target used while the activation block is TBD. Olympia is targeted for
// 2027; this date and the caption that renders it are separate strings, so change both.
export const OLYMPIA_FALLBACK_TARGET_ISO = "2027-03-31T00:00:00Z";
export const OLYMPIA_FALLBACK_TARGET_LABEL = "March 31, 2027";
