/**
 * CORE ENGAGE BATTERY — UWES-17 structure (Schaufeli & Bakker)
 * =============================================================================
 * Vigor (6) + Dedication (5) + Absorption (6) = 17
 * Scale 0–6 frequency (Never → Always / Every day) — identical to research scale
 * Scoring: mean = sum / n per dimension and total (UWES Manual)
 * Norms: Table 33 UWES Manual (N=2,313) via certified-refs.ts
 *
 * Items: Vietnamese formulations mapping 1:1 to published UWES constructs.
 * Wording is adapted for product use (not a licensed commercial reprint).
 * Academic UWES items are publicly documented in Schaufeli manuals for research.
 *
 * NO reverse items (official UWES-17 is positively keyed only).
 */
import type { Question } from "@/lib/types";
import { UWES_SCALE_LABELS } from "@/lib/protocols";

const SCALE = UWES_SCALE_LABELS.map((s) => ({
  id: String(s.value),
  label: `${s.value} — ${s.label}`,
  value: s.value,
}));

function item(
  id: string,
  dimension: "vigor" | "dedication" | "absorption",
  prompt: string,
  construct: string,
): Question {
  return {
    id,
    format: "likert",
    dimension,
    prompt,
    hint: `UWES construct: ${construct}`,
    options: SCALE,
  };
}

export const ENGAGE_QUESTIONS: Question[] = [
  // Vigor 6 — energy, resilience, persistence (VI1–VI6 constructs)
  item(
    "en_v1",
    "vigor",
    "Khi làm việc, tôi cảm thấy tràn đầy năng lượng.",
    "bursting with energy",
  ),
  item(
    "en_v2",
    "vigor",
    "Ở công việc, tôi cảm thấy mạnh mẽ và hăng hái.",
    "strong and vigorous",
  ),
  item(
    "en_v3",
    "vigor",
    "Khi thức dậy buổi sáng, tôi muốn đi làm / bắt đầu việc chính.",
    "feel like going to work",
  ),
  item(
    "en_v4",
    "vigor",
    "Tôi có thể tiếp tục làm việc trong những khoảng thời gian dài.",
    "continue for very long periods",
  ),
  item(
    "en_v5",
    "vigor",
    "Về mặt tinh thần, tôi rất bền bỉ trong công việc.",
    "mentally resilient",
  ),
  item(
    "en_v6",
    "vigor",
    "Tôi luôn kiên trì với công việc, ngay cả khi mọi thứ không suôn sẻ.",
    "persevere when things do not go well",
  ),

  // Dedication 5 — meaning, pride, challenge, inspiration
  item(
    "en_d1",
    "dedication",
    "Tôi thấy công việc mình làm đầy ý nghĩa và mục đích.",
    "full of meaning and purpose",
  ),
  item(
    "en_d2",
    "dedication",
    "Tôi nhiệt huyết / hăng hái với công việc của mình.",
    "enthusiastic about my job",
  ),
  item(
    "en_d3",
    "dedication",
    "Công việc của tôi truyền cảm hứng cho tôi.",
    "my job inspires me",
  ),
  item(
    "en_d4",
    "dedication",
    "Tôi tự hào về công việc mình đang làm.",
    "proud of the work I do",
  ),
  item(
    "en_d5",
    "dedication",
    "Đối với tôi, công việc là một thử thách đáng theo đuổi.",
    "work is challenging / worth pursuing",
  ),

  // Absorption 6 — immersion, flow, time distortion
  item(
    "en_a1",
    "absorption",
    "Thời gian trôi rất nhanh khi tôi đang làm việc.",
    "time flies when I'm working",
  ),
  item(
    "en_a2",
    "absorption",
    "Khi làm việc, tôi quên đi mọi thứ xung quanh.",
    "forget everything else around me",
  ),
  item(
    "en_a3",
    "absorption",
    "Tôi cảm thấy hạnh phúc khi làm việc một cách say mê / tập trung cao.",
    "happy when working intensely",
  ),
  item(
    "en_a4",
    "absorption",
    "Tôi chìm đắm / hòa mình vào công việc.",
    "immersed in my work",
  ),
  item(
    "en_a5",
    "absorption",
    "Tôi bị lôi cuốn bởi công việc đến mức khó dứt ra.",
    "get carried away / hard to stop",
  ),
  item(
    "en_a6",
    "absorption",
    "Tôi thấy khó tách mình ra khỏi công việc khi đang trong mạch tập trung.",
    "difficult to detach from my job",
  ),
];

export const ENGAGE_DIMENSIONS: Record<string, string> = {
  vigor: "Sức sống & bền bỉ",
  dedication: "Gắn kết & ý nghĩa công việc",
  absorption: "Tập trung & hòa mình vào việc",
};

/** Structure audit: must be 6+5+6 */
export const ENGAGE_STRUCTURE = {
  vigor: ENGAGE_QUESTIONS.filter((q) => q.dimension === "vigor").length,
  dedication: ENGAGE_QUESTIONS.filter((q) => q.dimension === "dedication").length,
  absorption: ENGAGE_QUESTIONS.filter((q) => q.dimension === "absorption").length,
  total: ENGAGE_QUESTIONS.length,
};
