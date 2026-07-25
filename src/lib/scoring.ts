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
      "Bài tư duy CorePrint xem ba nhóm khả năng: hiểu ngôn ngữ, suy luận và giữ thông tin trong đầu khi giải quyết vấn đề. Thang điểm có mức giữa là 100 và chỉ dùng để tham khảo. Kết quả không thay đánh giá chuyên sâu.";
    const protocolLabel = "34 câu · tối đa 25 phút · kết quả theo từng nhóm";

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
      summary: `Điểm tổng hợp ước tính khoảng ${fsiq}, trên thang tham khảo có mức giữa là 100. Hãy xem từng nhóm bên dưới để biết khả năng nào đang nổi bật và khả năng nào cần rèn thêm.`,
      insights: [
        `Nhóm đang nổi bật: ${strongL}${strong[0]?.indexScore != null ? ` (điểm quy đổi khoảng ${strong[0].indexScore})` : ""}.`,
        `Nhóm nên rèn thêm: ${weakL}${weak[0]?.indexScore != null ? ` (điểm quy đổi khoảng ${weak[0].indexScore})` : ""}.`,
        "Nếu các nhóm lệch nhau rõ, nên trao đổi theo từng nhóm thay vì chỉ nhìn một con số tổng.",
        "Bài trực tuyến này không xem xét đầy đủ tốc độ xử lý thông tin, vì vậy không nên tự kết luận về khả năng đó.",
      ],
      growthTips: [
        "Tập trung vào nhóm thấp nhất: đọc và so sánh khái niệm; luyện bài logic; hoặc tập giữ số liệu ngắn trong đầu khi xử lý việc.",
        "Luyện 6–8 tuần với dạng bài tương đương, rồi làm lại trong điều kiện tương tự.",
        "Nếu cần kết luận chuyên sâu hoặc dùng cho tuyển dụng, hãy gặp chuyên gia có đủ chuyên môn và công cụ phù hợp.",
      ],
    };
  }

  if (type === "eq") {
    const frameworkNote =
      "Bài EQ CorePrint dùng các tình huống thực tế và chấm theo mức độ hiệu quả của cách xử lý cảm xúc, giao tiếp với người khác. Kết quả chỉ dùng để định hướng phát triển.";
    const protocolLabel = "20 tình huống · kết quả theo bốn nhóm";

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
      summary: `Điểm tổng quan ước tính khoảng ${eiq}, trên thang tham khảo có mức giữa là 100. Kết quả xem bốn mặt: nhận biết cảm xúc, vận dụng cảm xúc khi làm việc, hiểu cảm xúc và điều chỉnh cảm xúc.`,
      insights: [
        `Nhóm đang nổi bật: ${strongL}${strong[0]?.indexScore != null ? ` (điểm quy đổi khoảng ${strong[0].indexScore})` : ""}.`,
        `Nhóm nên phát triển thêm: ${weakL}.`,
        `Những kỹ năng làm việc liên quan: ${esciHints}.`,
        "Điểm dựa trên mức độ hiệu quả của cách ứng xử trong tình huống, không phải bạn tự chọn mô tả tính cách.",
      ],
      growthTips: [
        "Rèn nhóm thấp nhất bằng cách ghi lại cảm xúc và thử trước cách xử lý các tình huống tương tự trong công việc.",
        "Nếu bạn là quản lý, hãy xin nhận xét cụ thể từ đồng nghiệp và nhân viên về cách giao tiếp, xử lý bất đồng.",
        "Nếu cần đánh giá chuyên sâu, hãy trao đổi với chuyên gia có công cụ phù hợp và được phép sử dụng.",
      ],
    };
  }

  // engage
  const mean = overallMean ?? 0;
  const b = uwesTotalBand(mean);
  const frameworkNote =
    "Bài Engage xem mức năng lượng và gắn bó với công việc gần đây, trên thang từ 0 đến 6. Các mức kết quả được so sánh với dữ liệu tham khảo quốc tế, chỉ dùng để định hướng và không dùng để xếp hạng nhân viên.";
  const protocolLabel = "17 câu · mức từ 0 đến 6 · kết quả theo ba nhóm";

  return {
    band: b.key,
    bandLabel: `Mức gắn kết: ${b.labelVi}`,
    displayScore: `${mean.toFixed(2)}/6`,
    frameworkNote,
    protocolLabel,
    summary: `Điểm trung bình là ${mean.toFixed(2)}/6, tương ứng mức «${b.labelVi}». Hãy xem riêng sức lực, cảm giác công việc có ý nghĩa và khả năng tập trung để biết phần nào cần điều chỉnh trước.`,
    insights: [
      `Nhóm đang tốt nhất: ${strongL}${strong[0]?.mean != null ? ` (trung bình ${strong[0].mean}/6)` : ""}.`,
      `Nhóm cần chú ý nhất: ${weakL}${weak[0]?.mean != null ? ` (trung bình ${weak[0].mean}/6)` : ""}.`,
      "Điểm tổng thấp có thể cho thấy bạn đang mất kết nối với công việc. Hãy xem thêm các dấu hiệu mệt mỏi hoặc quá tải.",
      "Dữ liệu so sánh đến từ nhiều quốc gia, nên chỉ dùng để tham khảo và trao đổi, không dùng để xếp hạng nhân viên.",
    ],
    growthTips: [
      "Sức sống thấp: ngủ đủ, giảm tải, khôi phục sau giờ làm.",
      "Gắn kết thấp: làm rõ ý nghĩa công việc, điều chỉnh nhiệm vụ cho khớp giá trị.",
      "Tập trung thấp: dành riêng khoảng thời gian không bị gián đoạn cho việc quan trọng.",
      "Trong 90 ngày, hãy ưu tiên cải thiện nhóm thấp nhất trước.",
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
