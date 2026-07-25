/**
 * Tham chiếu các bài test / công cụ CÓ CHỨNG CHỈ hoặc chuẩn hóa quốc tế.
 * CorePrint ALIGN cấu trúc & cách đọc điểm — KHÔNG copy item có bản quyền,
 * KHÔNG thay thế phiên bản official (Pearson / MHS / Korn Ferry).
 */

export const CERTIFIED_REFS = {
  iq: {
    primary: {
      name: "WAIS-IV / WAIS-5",
      publisher: "Pearson",
      certNote:
        "Chỉ nhà tâm lý lâm sàng / chuyên gia đủ điều kiện mới được administer. FSIQ + index scores (mean 100, SD 15).",
      structure: [
        "VCI — Verbal Comprehension (Similarities, Vocabulary, Information…)",
        "PRI / FRI — Perceptual / Fluid Reasoning (Matrix, Block Design…)",
        "WMI — Working Memory (Digit Span, Arithmetic)",
        "PSI — Processing Speed (Symbol Search, Coding) — hạn chế trên web text",
      ],
    },
    secondary: {
      name: "Raven’s Progressive Matrices",
      publisher: "Pearson / research editions",
      note: "Fluid reasoning không lời — CorePrint phần PRI mô phỏng dạng matrix/series, item original.",
    },
    coreprintAlign:
      "CorePrint đo tư duy qua 34 câu (khoảng 25 phút), chia nhóm ngôn ngữ – suy luận – trí nhớ làm việc. Kết quả mang tính định hướng; không thay bài đo lâm sàng chính thức.",
  },
  eq: {
    ability: {
      name: "MSCEIT / MSCEIT 2",
      publisher: "MHS (Multi-Health Systems)",
      certNote: "Ability EI — chấm consensus/expert. Cần training/publisher access.",
      branches: [
        "Perceiving Emotions",
        "Facilitating / Using Emotions (Connecting)",
        "Understanding Emotions",
        "Managing Emotions",
      ],
      scores: "Total EIQ ~ mean 100 SD 15; Area + Branch scores",
    },
    competency: {
      name: "ESCI (Emotional & Social Competency Inventory)",
      publisher: "Korn Ferry + Goleman/Boyatzis",
      certNote: "360° leadership — certification training Korn Ferry.",
      domains: [
        "Self-awareness: Emotional self-awareness",
        "Self-management: Self-control, Achievement, Positive outlook, Adaptability",
        "Social awareness: Empathy, Organizational awareness",
        "Relationship: Influence, Coach & mentor, Conflict, Inspirational leadership, Teamwork",
      ],
    },
    trait: {
      name: "EQ-i 2.0 / EQ 360",
      publisher: "MHS",
      certNote: "Level B — chỉ practitioner có certification mới administer & debrief.",
      composites: [
        "Self-Perception",
        "Self-Expression",
        "Interpersonal",
        "Decision Making",
        "Stress Management",
      ],
    },
    coreprintAlign:
      "CorePrint đo EQ qua 20 tình huống thực tế, chấm theo mức độ hiệu quả của hành vi cảm xúc – xã hội. Dùng cho phát triển và tư vấn; không thay bài đo chính thức có bản quyền.",
  },
  engage: {
    primary: {
      name: "UWES-17 / UWES-9",
      authors: "Schaufeli, Bakker et al.",
      note: "Academic scale đo work engagement; manual công bố norms (N≈2,313 cho UWES-17).",
      dimensions: ["Vigor (6)", "Dedication (5)", "Absorption (6)"],
      scale: "0 = Never … 6 = Always (every day)",
      scoring: "Mean per dimension + total mean (sum/n)",
      /** Official Table 33 UWES Manual — Total score cutoffs */
      normsTotal: {
        very_low: { max: 1.93 },
        low: { min: 1.94, max: 3.06 },
        average: { min: 3.07, max: 4.66 },
        high: { min: 4.67, max: 5.53 },
        very_high: { min: 5.54 },
        sampleMean: 3.82,
        sampleSD: 1.1,
        sampleN: 2313,
      },
      normsByDim: {
        vigor: {
          very_low: 2.17,
          low: [2.18, 3.2],
          average: [3.21, 4.8],
          high: [4.81, 5.6],
          very_high: 5.61,
        },
        dedication: {
          very_low: 1.6,
          low: [1.61, 3.0],
          average: [3.01, 4.9],
          high: [4.91, 5.79],
          very_high: 5.8,
        },
        absorption: {
          very_low: 1.6,
          low: [1.61, 2.75],
          average: [2.76, 4.4],
          high: [4.41, 5.35],
          very_high: 5.36,
        },
      },
    },
    coreprintAlign:
      "CorePrint đo mức gắn kết – năng lượng công việc qua 17 câu ngắn (thang 0–6). Kết quả giúp nhận diện sức sống, gắn kết và tập trung; mang tính định hướng sức khỏe nghề nghiệp.",
  },
} as const;

export type UwesBandKey =
  | "very_low"
  | "low"
  | "average"
  | "high"
  | "very_high";

export function uwesTotalBand(mean: number): {
  key: UwesBandKey;
  labelVi: string;
  labelEn: string;
} {
  const n = CERTIFIED_REFS.engage.primary.normsTotal;
  if (mean <= n.very_low.max)
    return { key: "very_low", labelVi: "Rất thấp", labelEn: "Very low" };
  if (mean <= n.low.max)
    return { key: "low", labelVi: "Thấp", labelEn: "Low" };
  if (mean <= n.average.max)
    return { key: "average", labelVi: "Trung bình", labelEn: "Average" };
  if (mean <= n.high.max)
    return { key: "high", labelVi: "Cao", labelEn: "High" };
  return { key: "very_high", labelVi: "Rất cao", labelEn: "Very high" };
}

/** Map % correct on an index → estimated index score mean 100 SD 15 (illustrative). */
export function percentToIndexScore(percent: number): number {
  // 50% → 100; 100% → 130; 0% → 70 (practice battery calibration)
  const z = (percent - 50) / 50; // -1..1 at 0..100 if linear from 0-100 around 50
  const score = 100 + 15 * (z * 2); // at 100% → 130, at 0% → 70
  return Math.round(Math.min(145, Math.max(55, score)));
}
