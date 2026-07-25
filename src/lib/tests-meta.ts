import type { TestMeta, TestType } from "./types";
import { EQ_QUESTIONS } from "@/data/eq-questions";
import { ENGAGE_QUESTIONS } from "@/data/engage-questions";
import { IQ_QUESTIONS } from "@/data/iq-questions";

export const BRAND = {
  name: "CorePrint",
  tagline: "Battery bám chuẩn quốc tế — cho tư vấn 25+",
  subtitle: "WAIS-aligned · MSCEIT/ESCI-aligned · UWES-17",
  description:
    "Ba assessment mô phỏng cấu trúc bài official (đổi item, không copy bản quyền): Wechsler indexes, MSCEIT ability branches + ESCI map, UWES-17 norms. Đầu ra là consultation brief — dùng được trong buổi tư vấn, không phải quiz giải trí.",
};

export const TESTS: Record<TestType, TestMeta> = {
  iq: {
    type: "iq",
    name: "IQ Profile",
    shortName: "IQ",
    tagline: "WAIS-IV-aligned · VCI · PRI · WMI",
    description:
      "CORE 34 câu · 25 phút: VCI 12 + PRI 12 (series/matrix Raven-style) + WMI 10. Composite FSIQ-style + index scores. Item original, đáp án có rationale kiểm chứng.",
    duration: "25 phút (có giờ)",
    questionCount: IQ_QUESTIONS.length,
    color: "#1B3A4B",
    accent: "#3D8B9C",
    icon: "brain",
    audienceNote: "Tham chiếu Pearson WAIS — CorePrint chỉ align cấu trúc.",
    framework: "WAIS-IV indexes (VCI/PRI/WMI) · Raven-style fluid items",
    benefits: [
      "Báo cáo index như WAIS (không chỉ 1 số IQ)",
      "Timed + weighted — gần aptitude chuyên nghiệp",
      "Rõ giới hạn: không thay WAIS có chứng chỉ",
    ],
  },
  eq: {
    type: "eq",
    name: "EQ Profile",
    shortName: "EQ",
    tagline: "MSCEIT 4 branches · map ESCI",
    description:
      "CORE 20 SJT (5×4 nhánh MSCEIT): Perceiving · Facilitating · Understanding · Managing. Ability partial credit 0/1/2. Map ESCI. Item original — không copy MSCEIT.",
    duration: "15–20 phút",
    questionCount: EQ_QUESTIONS.length,
    color: "#4A2C40",
    accent: "#C45C7A",
    icon: "heart",
    audienceNote: "Gần ability EI (MSCEIT) hơn self-rating EQ-i.",
    framework: "MSCEIT branches · ESCI competency map",
    benefits: [
      "Ability SJT — có đáp án tốt/kém như MSCEIT",
      "4 nhánh + EIQ-style composite",
      "Map ESCI 12-competency model cho leadership coach",
    ],
  },
  engage: {
    type: "engage",
    name: "Engage Profile",
    shortName: "Engage",
    tagline: "UWES-17 · norms Table 33",
    description:
      "CORE UWES-17 đúng 6+5+6, thang 0–6, mean scoring, band Table 33 (N=2,313). Construct map 1:1 vigor/dedication/absorption — wording adapted tiếng Việt.",
    duration: "6–10 phút",
    questionCount: ENGAGE_QUESTIONS.length,
    color: "#3D2E1F",
    accent: "#C4783A",
    icon: "flame",
    audienceNote: "Band theo norms UWES published — mẫu quốc tế.",
    framework: "UWES-17 Schaufeli & Bakker · official cutoffs",
    benefits: [
      "17 item đúng 3 trụ UWES",
      "Mean/6 + percentile bands manual",
      "Đối cực burnout (JD-R) — actionable HR/coach",
    ],
  },
};

export const TEST_LIST = Object.values(TESTS);
