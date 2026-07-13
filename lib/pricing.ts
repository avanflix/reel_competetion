// UI-only build: the entry fee is a display constant for now. Once the
// back end is wired up this can read from an environment variable again.
const DEFAULT_ENTRY_FEE_USD = 25;

export function getEntryFeeLabel(): string {
  return `$${DEFAULT_ENTRY_FEE_USD.toFixed(2)}`;
}
