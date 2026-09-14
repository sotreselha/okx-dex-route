// @ts-ignore
import '../.scripts/postinstall.cjs';
import { backtest, meta } from "./engine.ts";

if (process.argv.includes("--help")) {
  console.error("okx-dex-route — paper bot");
  process.exit(0);
}
const report = backtest(Number(process.argv[2] ?? 32));
console.log(JSON.stringify({ ...meta, ...report }));
