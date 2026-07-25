/**
 * Verify every IQ item has exactly one correct option and matches answer key.
 * Run: node scripts/verify-iq.mjs
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/data/iq-questions.ts"), "utf8");

const keyMatch = src.match(/export const IQ_ANSWER_KEY[\s\S]*?=\s*\{([\s\S]*?)\};/);
if (!keyMatch) {
  console.error("IQ_ANSWER_KEY not found");
  process.exit(1);
}
const key = {};
for (const m of keyMatch[1].matchAll(/(iq\d+)\s*:\s*"([a-d])"/g)) {
  key[m[1]] = m[2];
}

const qIds = [...src.matchAll(/id:\s*"(iq\d+)"/g)].map((m) => m[1]);
const unique = [...new Set(qIds)];

let fails = 0;
for (const id of unique) {
  const re = new RegExp(
    `id:\\s*"${id}"[\\s\\S]*?options:\\s*\\[([\\s\\S]*?)\\],\\s*\\n\\s*\\},`,
  );
  const block = src.match(re);
  if (!block) {
    // fallback looser
    const re2 = new RegExp(`id:\\s*"${id}"[\\s\\S]{0,1200}?options:\\s*\\[([\\s\\S]*?)\\]`);
    const b2 = src.match(re2);
    if (!b2) {
      console.error("Cannot parse", id);
      fails++;
      continue;
    }
    var optSrc = b2[1];
  } else {
    var optSrc = block[1];
  }
  const opts = [...optSrc.matchAll(/id:\s*"([a-d])"[\s\S]*?value:\s*(true|false)/g)];
  const trues = opts.filter((o) => o[2] === "true").map((o) => o[1]);
  if (trues.length !== 1) {
    console.error(id, "expected 1 correct, got", trues, "from", opts.length, "opts");
    fails++;
    continue;
  }
  if (key[id] && key[id] !== trues[0]) {
    console.error(id, "key says", key[id], "but value:true is", trues[0]);
    fails++;
    continue;
  }
  if (!key[id]) {
    console.error(id, "missing from answer key");
    fails++;
    continue;
  }
  console.log("OK", id, "→", trues[0]);
}

if (Object.keys(key).length !== unique.length) {
  console.error("Key count", Object.keys(key).length, "!= questions", unique.length);
  fails++;
}

if (fails) {
  console.error("FAILED", fails);
  process.exit(1);
}
console.log("All", unique.length, "IQ items verified.");
