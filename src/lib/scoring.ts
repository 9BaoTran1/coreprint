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
    const frameworkNote =
      "Bài tư duy CorePrint tham chiếu cách đọc hồ sơ nhận thức theo nhóm năng lực (ngôn ngữ, suy luận, trí nhớ làm việc). Thang điểm minh họa trung bình 100 — mang tính định hướng, không thay đánh giá lâm sàng chính thức.";
    const protocolLabel = "34 câu · có đồng hồ 25 phút · điểm theo nhóm năng lực";

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
        ? "Mức tổng quan: cao"
        : band === "high_avg"
          ? "Mức tổng quan: trên trung bình"
          : band === "average"
            ? "Mức tổng quan: trung bình"
            : band === "low_avg"
              ? "Mức tổng quan: dưới trung bình"
              : "Mức tổng quan: cần xây nền";

    return {
      band,
      bandLabel,
      displayScore: `~${fsiq}`,
      frameworkNote,
      protocolLabel,
      summary: `Điểm tổng hợp ước lượng khoảng ${fsiq} (thang minh họa, trung bình 100). Hãy xem chi tiết từng nhóm năng lực bên dưới — hồ sơ thường không đều giữa các nhóm, và đó chính là phần hữu ích khi tư vấn.`,
      insights: [
        `Nhóm mạnh: ${strongL}${strong[0]?.indexScore != null ? ` (khoảng ${strong[0].indexScore})` : ""}.`,
        `Nhóm cần rèn: ${weakL}${weak[0]?.indexScore != null ? ` (khoảng ${weak[0].indexScore})` : ""}.`,
        "Nếu các nhóm lệch nhau rõ, nên trao đổi theo từng nhóm thay vì chỉ nhìn một con số tổng.",
        "Bài web không đo đủ tốc độ xử lý như bài lâm sàng đầy đủ — không suy diễn phần đó từ kết quả này.",
      ],
      growthTips: [
        "Rèn đúng nhóm thấp: đọc & so sánh khái niệm (ngôn ngữ), bài suy luận/chuỗi (suy luận), giữ số liệu ngắn trong đầu (trí nhớ làm việc).",
        "Luyện 6–8 tuần với dạng bài tương đương, rồi làm lại trong điều kiện tương tự.",
        "Cần kết luận lâm sàng hoặc tuyển dụng chính thức: gặp chuyên gia có chứng chỉ phù hợp.",
      ],
    };
  }

  if (type === "eq") {
    const frameworkNote =
      "Bài EQ CorePrint dùng tình huống thực tế, chấm theo mức độ hiệu quả của hành vi cảm xúc – xã hội. Tham chiếu mô hình năng lực cảm xúc phổ biến trong lãnh đạo và coaching — mang tính định hướng phát triển.";
    const protocolLabel = "20 tình huống · bốn nhóm năng lực cảm xúc";

    const band =
      (eiq ?? 100) >= 120
        ? "high"
        : (eiq ?? 100) >= 90
          ? "average"
          : "developing";
    const bandLabel =
      band === "high"
        ? "Mức tổng quan: cao"
        : band === "average"
          ? "Mức tổng quan: trung bình"
          : "Mức tổng quan: cần phát triển";

    const esciHints = weak
      .map((d) => EQ_TO_ESCI[d.key] ?? d.label)
      .join("; ");

    return {
      band,
      bandLabel,
      displayScore: `~${eiq}`,
      frameworkNote,
      protocolLabel,
      summary: `Điểm tổng quan ước lượng khoảng ${eiq} (thang minh họa, trung bình 100). Bốn nhóm: nhận biết cảm xúc, dùng cảm xúc hỗ trợ việc, hiểu cảm xúc, và điều tiết cảm xúc. Phần dưới gợi ý hướng coaching lãnh đạo.`,
      insights: [
        `Nhóm mạnh: ${strongL}${strong[0]?.indexScore != null ? ` (khoảng ${strong[0].indexScore})` : ""}.`,
        `Nhóm cần phát triển: ${weakL}.`,
        `Gợi ý năng lực lãnh đạo liên quan: ${esciHints}.`,
        "Đây là cách chấm theo hành vi hiệu quả trong tình huống, khác với bảng tự đánh giá tính cách thuần túy.",
      ],
      growthTips: [
        "Luyện nhóm thấp bằng nhật ký cảm xúc và diễn tập tình huống tương tự trong công việc.",
        "Nếu bạn là quản lý: xin phản hồi 360° từ team về giao tiếp và xử lý xung đột.",
        "Muốn đo chuẩn chính thức: trao đổi với chuyên gia tư vấn có công cụ được cấp phép.",
      ],
    };
  }

  // engage
  const mean = overallMean ?? 0;
  const b = uwesTotalBand(mean);
  const frameworkNote =
    "Bài Engage đo mức gắn kết – năng lượng với công việc gần đây (thang 0–6). Phân hạng tham chiếu mẫu chuẩn quốc tế — dùng để định hướng, không xếp hạng cứng nhân sự.";
  const protocolLabel = "17 câu · thang 0–6 · ba trụ năng lượng";

  return {
    band: b.key,
    bandLabel: `Mức gắn kết: ${b.labelVi}`,
    displayScore: `${mean.toFixed(2)}/6`,
    frameworkNote,
    protocolLabel,
    summary: `Điểm trung bình tổng ${mean.toFixed(2)}/6 — mức «${b.labelVi}». Xem riêng ba trụ sức sống, gắn kết và tập trung bên dưới để biết nên điều chỉnh phần nào trước.`,
    insights: [
      `Trụ mạnh: ${strongL}${strong[0]?.mean != null ? ` (TB ${strong[0].mean})` : ""}.`,
      `Trụ thấp: ${weakL}${weak[0]?.mean != null ? ` (TB ${weak[0].mean})` : ""}.`,
      "Mức thấp trên tổng điểm có thể gợi ý đang xa rời công việc — nên xem cùng dấu hiệu mệt mỏi hoặc quá tải.",
      "Mẫu tham chiếu mang tính quốc tế; dùng để định hướng và tư vấn, không áp cứng vào xếp hạng nội bộ.",
    ],
    growthTips: [
      "Sức sống thấp: ngủ đủ, giảm tải, khôi phục sau giờ làm.",
      "Gắn kết thấp: làm rõ ý nghĩa công việc, điều chỉnh nhiệm vụ cho khớp giá trị.",
      "Tập trung thấp: khối thời gian sâu, giảm gián đoạn.",
      "Trong 90 ngày: ưu tiên đúng trụ thấp nhất trước.",
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
