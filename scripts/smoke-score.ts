/**
 * Smoke test: score all batteries + consultation brief
 * Run: npx tsx scripts/smoke-score.ts
 */
import { scoreTest } from "../src/lib/scoring";
import { IQ_QUESTIONS, IQ_ANSWER_KEY } from "../src/data/iq-questions";
import { EQ_QUESTIONS } from "../src/data/eq-questions";
import { ENGAGE_QUESTIONS } from "../src/data/engage-questions";
import { buildConsultBrief } from "../src/lib/consultation/brief";

const fails: string[] = [];
function assert(cond: boolean, msg: string) {
  if (!cond) fails.push(msg);
  else console.log("  ✓", msg);
}

console.log("\n—— IQ ——");
const iqAll = Object.fromEntries(
  IQ_QUESTIONS.map((q) => [q.id, IQ_ANSWER_KEY[q.id]]),
);
const iqPerfect = scoreTest("iq", iqAll, { timeUsedSeconds: 600 });
console.log("ALL CORRECT:", iqPerfect.displayScore, iqPerfect.percent + "%", iqPerfect.bandLabel);
console.log(
  "  dims:",
  iqPerfect.dimensions.map((d) => `${d.key}:${d.percent}%~${d.indexScore}`).join(" | "),
);
assert(iqPerfect.percent === 100, "IQ perfect = 100%");
assert(iqPerfect.rawScore === iqPerfect.maxScore, "IQ raw = max");
assert(iqPerfect.dimensions.length === 3, "IQ has 3 indexes");

const iqWrong = Object.fromEntries(
  IQ_QUESTIONS.map((q) => [q.id, q.options.find((o) => o.value === false)!.id]),
);
const iqZero = scoreTest("iq", iqWrong, { timeUsedSeconds: 100 });
console.log("ALL WRONG:", iqZero.displayScore, iqZero.percent + "%", iqZero.bandLabel);
assert(iqZero.percent === 0, "IQ wrong = 0%");

const half = Math.floor(IQ_QUESTIONS.length / 2);
const iqHalf = Object.fromEntries(
  IQ_QUESTIONS.map((q, i) => [
    q.id,
    i < half
      ? IQ_ANSWER_KEY[q.id]
      : q.options.find((o) => o.value === false)!.id,
  ]),
);
const iqMid = scoreTest("iq", iqHalf, { timeUsedSeconds: 900 });
console.log("HALF:", iqMid.displayScore, iqMid.percent + "%", iqMid.bandLabel);
assert(iqMid.percent > 0 && iqMid.percent < 100, "IQ half is mid range");

console.log("\n—— EQ ——");
const eqBest = Object.fromEntries(
  EQ_QUESTIONS.map((q) => [q.id, q.options.find((o) => o.value === 2)!.id]),
);
const eqPerfect = scoreTest("eq", eqBest);
console.log("ALL BEST:", eqPerfect.displayScore, eqPerfect.percent + "%", eqPerfect.bandLabel);
assert(eqPerfect.percent === 100, "EQ perfect = 100%");
assert(eqPerfect.dimensions.length === 4, "EQ has 4 branches");

const eqWorst = Object.fromEntries(
  EQ_QUESTIONS.map((q) => [q.id, q.options.find((o) => o.value === 0)!.id]),
);
const eqBad = scoreTest("eq", eqWorst);
console.log("ALL WORST:", eqBad.displayScore, eqBad.percent + "%", eqBad.bandLabel);
assert(eqBad.percent === 0, "EQ worst = 0%");

console.log("\n—— ENGAGE ——");
const engHigh = Object.fromEntries(ENGAGE_QUESTIONS.map((q) => [q.id, "6"]));
const engH = scoreTest("engage", engHigh);
console.log("ALL 6:", engH.displayScore, engH.percent + "%", engH.bandLabel);
assert(engH.band === "very_high", "Engage all-6 = very_high");
assert(engH.dimensions.every((d) => d.mean === 6), "All dim mean 6");

const engLow = Object.fromEntries(ENGAGE_QUESTIONS.map((q) => [q.id, "0"]));
const engL = scoreTest("engage", engLow);
console.log("ALL 0:", engL.displayScore, engL.percent + "%", engL.bandLabel);
assert(engL.band === "very_low", "Engage all-0 = very_low");

const engMid = Object.fromEntries(ENGAGE_QUESTIONS.map((q) => [q.id, "3"]));
const engM = scoreTest("engage", engMid);
console.log("ALL 3:", engM.displayScore, engM.percent + "%", engM.bandLabel);
assert(engM.band === "average" || engM.band === "low", "Engage all-3 mid band: " + engM.band);

console.log("\n—— BRIEF ——");
const brief = buildConsultBrief({ iq: iqMid, eq: eqPerfect, engage: engL });
console.log("completeness:", brief.completeness);
console.log("priorities:", brief.priorities.map((p) => `[${p.severity}] ${p.title}`).join("\n  "));
console.log("goal:", brief.suggestedGoal);
console.log("refs:", brief.refCodes.join(", "));
assert(brief.completeness === "full", "brief full with 3 tests");
assert(brief.priorities.length >= 1, "brief has priorities");
assert(brief.refCodes.length === 3, "brief has 3 REF codes");

console.log("\n—— EMPTY / PARTIAL ——");
const empty = scoreTest("iq", {});
console.log("IQ no answers:", empty.percent + "%", empty.displayScore);
assert(empty.percent === 0, "empty answers = 0%");

if (fails.length) {
  console.error("\n❌ FAILED:\n", fails.join("\n"));
  process.exit(1);
}
console.log("\n✅ SMOKE SCORE PASSED — kết quả scoring hoạt động đúng\n");
