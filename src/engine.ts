import { createHash } from "node:crypto";

export type Report = { equity: number; fills: number; bars: number };

export function ticker(symbol: string, i: number): number {
  const raw = createHash("sha256").update(`${symbol}:${i}`).digest();
  return 100 + raw.readUInt16BE(0) / 1000;
}

export function allow(notional: number, equity: number, maxPos = 0.25): boolean {
  if (equity <= 0) return false;
  return notional / equity <= maxPos;
}

export function backtest(bars = 32): Report {
  const symbol = "ETHUSDT";
  let equity = 10_000;
  let fills = 0;
  for (let i = 0; i < bars; i++) {
    const price = ticker(symbol, i);
    const qty = 0.01;
    if (!allow(qty * price, equity)) continue;
    equity -= qty * price * 0.0008;
    fills += 1;
  }
  return { equity, fills, bars };
}

export const meta = {
  exchange: "okx",
  symbol: "ETHUSDT",
  strategy: "dex",
};
