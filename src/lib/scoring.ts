import { ENGAGE_DIMENSIONS, ENGAGE_QUESTIONS } from "@/data/engage-questions";
import { EQ_DIMENSIONS, EQ_QUESTIONS, EQ_TO_ESCI } from "@/data/eq-questions";
import { IQ_DIMENSIONS, IQ_QUESTIONS } from "@/data/iq-questions";
import { PROTOCOLS } from "@/lib/protocols";
import {
  CERTIFIED_REFS,
  percentToIndexScore,
  uwesTotalBand,
} from "@/lib/standards/certified-refs";
import type {
  AnswerMap,
  DimensionScore,
  ItemFormat,
  Question,
  TestResult,
  TestType,
} from "./types";

function getQuestions(type: TestType): Question[] {
  if (type === "iq") return IQ_QUESTIONS;
  if (type === "eq") return EQ_QUESTIONS;
  return ENGAGE_QUESTIONS;
}

function getDimensionLabels(type: TestType): Record<string, string> {
  if (type === "iq") return IQ_DIMENSIONS;
  if (type === "eq") return EQ_DIMENSIONS;
  return ENGAGE_DIMENSIONS;
}

function formatOf(q: Question, type: TestType): ItemFormat {
  return q.format ?? PROTOCOLS[type].format;
}

function likertMax(type: TestType): number {
  return PROTOCOLS[type].likertMax ?? PROTOCOLS[type].itemPointMax;
}

function scoreAnswer(type: TestType, q: Question, optionId: string): number {
  const opt = q.options.find((o) => o.id === optionId);
  if (!opt) return 0;
  const fmt = formatOf(q, type);

  if (fmt === "binary") {
    return opt.value === true ? (q.weight ?? 1) : 0;
  }
  if (fmt === "sjt") {
    return typeof opt.value === "number" ? opt.value : 0;
  }
  let v = typeof opt.value === "number" ? opt.value : 0;
  if (q.reverse) v = likertMax(type) - v;
  return v;
}

function itemMax(type: TestType, q: Question): number {
  const fmt = formatOf(q, type);
  if (fmt === "binary") return q.weight ?? 1;
  if (fmt === "sjt") return PROTOCOLS[type].itemPointMax;
  return likertMax(type);
}

function buildDimensions(
  type: TestType,
  questions: Question[],
  answers: AnswerMap,
): DimensionScore[] {
  const labels = getDimensionLabels(type);
  const map = new Map<string, { score: number; max: number; n: number }>();

  for (const q of questions) {
    const key = q.dimension ?? "general";
    const prev = map.get(key) ?? { score: 0, max: 0, n: 0 };
    prev.max += itemMax(type, q);
    prev.n += 1;
    if (answers[q.id]) prev.score += scoreAnswer(type, q, answers[q.id]);
    map.set(key, prev);
  }

  return Array.from(map.entries()).map(([key, v]) => {
    const percent = v.max ? Math.round((v.score / v.max) * 100) : 0;
    const mean =
      type === "engage" && v.n
        ? Math.round((v.score / v.n) * 100) / 100
        : undefined;
    // WAIS-style index estimate or MSCEIT-style branch estimate
    const indexScore =
      type === "iq" || type === "eq" ? percentToIndexScore(percent) : undefined;

    return {
      key,
      label: labels[key] ?? key,
      score: Math.round(v.score * 100) / 100,
      max: Math.round(v.max * 100) / 100,
      percent,
      mean,
      indexScore,
    };
  });
}

function weakest(dims: DimensionScore[], n = 2) {
  return [...dims].sort((a, b) => a.percent - b.percent).slice(0, n);
}
function strongest(dims: DimensionScore[], n = 1) {
  return [...dims].sort((a, b) => b.percent - a.percent).slice(0, n);
}

function buildNarrative(
  type: TestType,
  percent: number,
  dimensions: DimensionScore[],
  overallMean?: number,
  fsiq?: number,
  eiq?: number,
): Pick<
  TestResult,
  | "band"
  | "bandLabel"
  | "summary"
  | "insights"
  | "growthTips"
  | "displayScore"
  | "frameworkNote"
  | "protocolLabel"
> {
  const weak = weakest(dimensions);
  const strong = strongest(dimensions);
  const weakL = weak.map((d) => d.label).join("; ");
  const strongL = strong[0]?.label ?? "—";
  const protocol = PROTOCOLS[type];

  if (type === "iq") {
    const ref = CERTIFIED_REFS.iq;
    const frameworkNote = `${ref.coreprintAlign} Chuẩn tham chiếu: ${ref.primary.name} (${ref.primary.publisher}) — FSIQ + VCI/PRI/WMI mean 100 SD 15. ${ref.primary.certNote} CorePrint là battery thực hành, không phải phiên bản clinical.`;
    const protocolLabel = "WAIS-IV-aligned indexes · timed 20’ · weighted items";

    const band =
      (fsiq ?? 100) >= 120
        ? "superior"
        : (fsiq ?? 100) >= 110
          ? "high_avg"
          : (fsiq ?? 100) >= 90
            ? "average"
            : (fsiq ?? 100) >= 80
              ? "low_avg"
              : "below";
    const bandLabel =
      band === "superior"
        ? "Composite cao (trên battery)"
        : band === "high_avg"
          ? "Composite trên trung bình"
          : band === "average"
            ? "Composite trung bình"
            : band === "low_avg"
              ? "Composite dưới trung bình"
              : "Composite thấp — cần xây nền";

    return {
      band,
      bandLabel,
      displayScore: `FSIQ-style ~${fsiq}`,
      frameworkNote,
      protocolLabel,
      summary: `Composite ước lượng ~${fsiq} (thang minh họa mean 100, SD 15 như Wechsler). Profile index: xem VCI / PRI / WMI bên dưới — đây là cách đọc chuẩn của WAIS-IV, không chỉ một số IQ đơn.`,
      insights: [
        `Index mạnh: ${strongL}${strong[0]?.indexScore != null ? ` (~${strong[0].indexScore})` : ""}.`,
        `Index cần rèn: ${weakL}${weak[0]?.indexScore != null ? ` (~${weak[0].indexScore})` : ""}.`,
        "Lệch index >15 điểm (ước lượng) gợi ý profile không đồng đều — tư vấn nên bám index, không chỉ FSIQ.",
        "PSI (Processing Speed) của WAIS không đo đủ trên web text — không suy diễn tốc độ xử lý từ battery này.",
      ],
      growthTips: [
        "Rèn đúng index thấp (VCI: đọc/analogy; PRI: matrix/series; WMI: mental math + hold).",
        "Tái đo sau 6–8 tuần luyện dạng tương đương (không học thuộc bank).",
        "Cần kết luận lâm sàng / tuyển dụng chính thức → WAIS với chuyên gia có chứng chỉ.",
      ],
    };
  }

  if (type === "eq") {
    const ref = CERTIFIED_REFS.eq;
    const frameworkNote = `${ref.coreprintAlign} Tham chiếu ability: ${ref.ability.name} (${ref.ability.publisher}) — 4 branches. Tham chiếu competency 360: ${ref.competency.name}. Trait inventory có cert: ${ref.trait.name} (Level B).`;
    const protocolLabel = "MSCEIT 4-branch ability SJT · expert key 0/1/2";

    const band =
      (eiq ?? 100) >= 120
        ? "high"
        : (eiq ?? 100) >= 90
          ? "average"
          : "developing";
    const bandLabel =
      band === "high"
        ? "EIQ-style cao (ability SJT)"
        : band === "average"
          ? "EIQ-style trung bình"
          : "EIQ-style cần phát triển";

    const esciHints = weak
      .map((d) => EQ_TO_ESCI[d.key] ?? d.label)
      .join("; ");

    return {
      band,
      bandLabel,
      displayScore: `EIQ-style ~${eiq}`,
      frameworkNote,
      protocolLabel,
      summary: `Tổng ability EI ước lượng ~${eiq} (minh họa thang MSCEIT mean 100). Bốn nhánh: Perceiving · Facilitating · Understanding · Managing. Báo cáo kèm map sang cụm ESCI để coaching leadership.`,
      insights: [
        `Nhánh mạnh: ${strongL}${strong[0]?.indexScore != null ? ` (~${strong[0].indexScore})` : ""}.`,
        `Nhánh yếu: ${weakL}.`,
        `Gợi ý ESCI (Korn Ferry/Goleman) để coach: ${esciHints}.`,
        "MSCEIT official chấm consensus/expert trên item có bản quyền; EQ-i 2.0 là trait self-report Level B — khác mô hình. CorePrint = ability SJT gần MSCEIT hơn EQ-i.",
      ],
      growthTips: [
        "Luyện nhánh thấp bằng journal + role-play tình huống tương tự.",
        "Leadership track: cân nhắc ESCI 360 với coach có cert Korn Ferry.",
        "Muốn báo cáo trait 15 subscales: EQ-i 2.0 qua practitioner Level B.",
      ],
    };
  }

  // engage — official UWES-17 norms Table 33
  const mean = overallMean ?? 0;
  const b = uwesTotalBand(mean);
  const norms = CERTIFIED_REFS.engage.primary.normsTotal;
  const frameworkNote = `${CERTIFIED_REFS.engage.coreprintAlign} Band theo UWES Manual Table 33 (N=${norms.sampleN}, M=${norms.sampleMean}, SD=${norms.sampleSD}).`;
  const protocolLabel = "UWES-17 structure · 0–6 · official percentile bands";

  return {
    band: b.key,
    bandLabel: `UWES Total: ${b.labelVi} (${b.labelEn})`,
    displayScore: `Mean ${mean.toFixed(2)}/6`,
    frameworkNote,
    protocolLabel,
    summary: `Điểm tổng mean ${mean.toFixed(2)}/6 → hạng «${b.labelEn}» theo norms UWES-17 (mẫu chuẩn manual, không phải mẫu VN). Mẫu tham chiếu M≈${norms.sampleMean}. Ba trụ Vigor / Dedication / Absorption đọc riêng như manual.`,
    insights: [
      `Trụ mạnh: ${strongL}${strong[0]?.mean != null ? ` (M=${strong[0].mean})` : ""}.`,
      `Trụ thấp: ${weakL}${weak[0]?.mean != null ? ` (M=${weak[0].mean})` : ""}.`,
      "Very low/Low trên Total gợi ý disengagement — đối cực burnout (exhaustion/cynicism) trong JD-R model.",
      "Norms từ manual châu Âu/đa quốc gia; VN có thể lệch văn hóa — dùng để định hướng + tư vấn, không HR ranking cứng.",
    ],
    growthTips: [
      "Vigor thấp → ngủ, workload, recovery.",
      "Dedication thấp → job crafting / ý nghĩa / values fit.",
      "Absorption thấp → deep work, giảm interruption.",
      "Tư vấn 90 ngày bám đúng trụ thấp nhất theo UWES.",
    ],
  };
}

export type ScoreOptions = {
  timeUsedSeconds?: number | null;
  timedOut?: boolean;
};

export function scoreTest(
  type: TestType,
  answers: AnswerMap,
  opts: ScoreOptions = {},
): TestResult {
  const questions = getQuestions(type);
  let raw = 0;
  let max = 0;

  for (const q of questions) {
    max += itemMax(type, q);
    if (answers[q.id]) raw += scoreAnswer(type, q, answers[q.id]);
  }

  raw = Math.round(raw * 100) / 100;
  max = Math.round(max * 100) / 100;
  const percent = max ? Math.round((raw / max) * 100) : 0;
  const dimensions = buildDimensions(type, questions, answers);

  const overallMean =
    type === "engage" && questions.length
      ? Math.round((raw / questions.length) * 100) / 100
      : undefined;

  // Composite like FSIQ / Total EIQ: average of index scores when available
  let fsiq: number | undefined;
  let eiq: number | undefined;
  if (type === "iq" && dimensions.length) {
    const idxs = dimensions
      .map((d) => d.indexScore)
      .filter((x): x is number => x != null);
    fsiq = idxs.length
      ? Math.round(idxs.reduce((a, b) => a + b, 0) / idxs.length)
      : percentToIndexScore(percent);
  }
  if (type === "eq" && dimensions.length) {
    const idxs = dimensions
      .map((d) => d.indexScore)
      .filter((x): x is number => x != null);
    eiq = idxs.length
      ? Math.round(idxs.reduce((a, b) => a + b, 0) / idxs.length)
      : percentToIndexScore(percent);
  }

  const narrative = buildNarrative(
    type,
    percent,
    dimensions,
    overallMean,
    fsiq,
    eiq,
  );

  return {
    type,
    completedAt: new Date().toISOString(),
    rawScore: raw,
    maxScore: max,
    percent,
    dimensions,
    timeUsedSeconds: opts.timeUsedSeconds ?? null,
    timedOut: opts.timedOut ?? false,
    ...narrative,
  };
}

export function getQuestionBank(type: TestType): Question[] {
  return getQuestions(type);
}
