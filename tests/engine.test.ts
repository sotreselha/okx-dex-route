import assert from "node:assert/strict";
import { test } from "node:test";
import { allow, backtest, ticker } from "../src/engine.ts";

test("ticker positive", () => {
  assert.ok(ticker("BTCUSDT", 1) > 0);
});

test("risk reject", () => {
  assert.equal(allow(50, 100, 0.1), false);
});

test("risk allow", () => {
  assert.equal(allow(10, 100, 0.5), true);
});

test("backtest", () => {
  const r = backtest(16);
  assert.equal(r.bars, 16);
  assert.ok(r.equity > 0);
});
