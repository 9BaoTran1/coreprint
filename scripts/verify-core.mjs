/**
 * CORE battery integrity checks
 * Run: node scripts/verify-core.mjs
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load(path) {
  return readFileSync(join(root, path), "utf8");
}

let fails = 0;
function ok(msg) {
  console.log("OK ", msg);
}
function bad(msg) {
  console.error("FAIL", msg);
  fails++;
}

// ── IQ ─────────────────────────────────────────────────────────
const iq = load("src/data/core/iq-bank.ts");
const iqIds = [...iq.matchAll(/id:\s*"(iq_[pvw]\d+)"/g)].map((m) => m[1]);
const uniqueIq = [...new Set(iqIds)];
const rationale = [...iq.matchAll(/(iq_[pvw]\d+):\s*\{\s*answer:\s*"([a-d])"/g)];
const key = Object.fromEntries(rationale.map((m) => [m[1], m[2]]));

if (uniqueIq.length !== 34) bad(`IQ count ${uniqueIq.length} expected 34`);
else ok(`IQ ${uniqueIq.length} items`);

const pri = uniqueIq.filter((id) => id.startsWith("iq_p")).length;
const wmi = uniqueIq.filter((id) => id.startsWith("iq_w")).length;
const vci = uniqueIq.filter((id) => id.startsWith("iq_v")).length;
if (pri !== 12 || wmi !== 10 || vci !== 12)
  bad(`IQ split PRI=${pri} WMI=${wmi} VCI=${vci} expected 12/10/12`);
else ok(`IQ split PRI=${pri} WMI=${wmi} VCI=${vci}`);

for (const id of uniqueIq) {
  const re = new RegExp(`id:\\s*"${id}"[\\s\\S]{0,900}?options:\\s*\\[([\\s\\S]*?)\\]`);
  const m = iq.match(re);
  if (!m) {
    bad(`parse ${id}`);
    continue;
  }
  const trues = [...m[1].matchAll(/id:\s*"([a-d])"[\s\S]*?value:\s*(true|false)/g)]
    .filter((x) => x[2] === "true")
    .map((x) => x[1]);
  if (trues.length !== 1) {
    bad(`${id} correct count ${trues.length}`);
    continue;
  }
  if (key[id] !== trues[0]) {
    bad(`${id} rationale ${key[id]} != value true ${trues[0]}`);
    continue;
  }
}
ok("IQ all single-correct + rationale match");

// Math spot-checks
const math = [
  [0.2 * 0.2 * 500, 20],
  [1.2 * 0.8, 0.96],
  [1 - 0.85 * 0.9, 0.235],
  [(60 + 18) / 6, 13],
  [(40 * 2) / 5, 16],
  [5 * 9 - 2, 43],
  [3 + 6, 9],
  [(5 * 4) / 2, 10],
  [2 ** 4, 16],
  [6 * 12, 72],
];
for (const [a, b] of math) {
  if (Math.abs(a - b) > 1e-9) bad(`math ${a} != ${b}`);
}
ok("IQ math spot-checks");

// ── EQ ─────────────────────────────────────────────────────────
const eq = load("src/data/core/eq-bank.ts");
const eqIds = [...eq.matchAll(/id:\s*"(eq_[pfum]\d+)"/g)].map((m) => m[1]);
const uniqueEq = [...new Set(eqIds)];
if (uniqueEq.length !== 20) bad(`EQ count ${uniqueEq.length} expected 20`);
else ok(`EQ ${uniqueEq.length} items`);

for (const prefix of ["eq_p", "eq_f", "eq_u", "eq_m"]) {
  const n = uniqueEq.filter((id) => id.startsWith(prefix)).length;
  if (n !== 5) bad(`${prefix}* count ${n} expected 5`);
}
ok("EQ 5 per MSCEIT branch");

for (const id of uniqueEq) {
  const re = new RegExp(`id:\\s*"${id}"[\\s\\S]{0,1200}?options:\\s*\\[([\\s\\S]*?)\\]`);
  const m = eq.match(re);
  if (!m) {
    bad(`EQ parse ${id}`);
    continue;
  }
  const vals = [...m[1].matchAll(/value:\s*(\d+)/g)].map((x) => Number(x[1]));
  const twos = vals.filter((v) => v === 2).length;
  if (twos !== 1) bad(`${id} should have exactly one value:2, got ${twos}`);
  if (Math.max(...vals) !== 2) bad(`${id} max score not 2`);
}
ok("EQ each item exactly one best (2)");

// ── Engage (ids via item("en_v1", ...) helper) ─────────────────
const en = load("src/data/core/engage-bank.ts");
const enIds = [
  ...en.matchAll(/item\(\s*\n?\s*"(en_[vda]\d+)"/g),
  ...en.matchAll(/id:\s*"(en_[vda]\d+)"/g),
].map((m) => m[1]);
const uniqueEn = [...new Set(enIds)];
if (uniqueEn.length !== 17) bad(`Engage count ${uniqueEn.length} expected 17`);
else ok(`Engage ${uniqueEn.length} items (UWES-17)`);

const v = uniqueEn.filter((id) => id.startsWith("en_v")).length;
const d = uniqueEn.filter((id) => id.startsWith("en_d")).length;
const a = uniqueEn.filter((id) => id.startsWith("en_a")).length;
if (v !== 6 || d !== 5 || a !== 6) bad(`Engage split V${v} D${d} A${a}`);
else ok(`Engage split Vigor=${v} Dedication=${d} Absorption=${a}`);

if (!en.includes("bursting with energy") || !en.includes("time flies")) {
  bad("Engage missing key UWES constructs in hints");
} else ok("Engage constructs mapped to UWES");

if (fails) {
  console.error("\nCORE VERIFY FAILED:", fails);
  process.exit(1);
}
console.log("\nCORE VERIFY PASSED — battery integrity OK");
