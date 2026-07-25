import type { TestResult, TestType } from "@/lib/types";
import { TESTS } from "@/lib/tests-meta";

export type Severity = "high" | "medium" | "low";

export type PriorityTheme = {
  id: string;
  title: string;
  severity: Severity;
  evidence: string[];
  coachQuestions: string[];
  actions90d: string[];
};

export type ConsultBrief = {
  generatedAt: string;
  testsIncluded: TestType[];
  completeness: "partial" | "full";
  executiveSummary: string;
  strengths: string[];
  risks: string[];
  priorities: PriorityTheme[];
  sessionAgenda: string[];
  suggestedPackage: string;
  clientPrep: string[];
  refCodes: string[];
  /** Pre-fill for contact form */
  suggestedGoal: string;
};

function dimWeak(r: TestResult, maxPct = 55) {
  return r.dimensions.filter((d) => d.percent <= maxPct).sort((a, b) => a.percent - b.percent);
}
function dimStrong(r: TestResult, minPct = 70) {
  return r.dimensions.filter((d) => d.percent >= minPct).sort((a, b) => b.percent - a.percent);
}

/**
 * Sinh brief tư vấn từ hồ sơ — dùng được trong buổi 1:1
 * (không thay chẩn đoán lâm sàng).
 */
export function buildConsultBrief(
  results: Partial<Record<TestType, TestResult>>,
): ConsultBrief {
  const types = (["iq", "eq", "engage"] as TestType[]).filter((t) => results[t]);
  const priorities: PriorityTheme[] = [];
  const strengths: string[] = [];
  const risks: string[] = [];
  const refCodes: string[] = [];

  const iq = results.iq;
  const eq = results.eq;
  const eng = results.engage;

  if (iq) {
    refCodes.push(`IQ-${iq.percent}-${iq.band}`);
    const strong = dimStrong(iq, 65);
    const weak = dimWeak(iq, 55);
    strong.slice(0, 2).forEach((d) => {
      strengths.push(
        `Tư duy · ${d.label}${d.indexScore != null ? ` (index ~${d.indexScore})` : ` (${d.percent}%)`}`,
      );
    });
    if (weak.length) {
      priorities.push({
        id: "iq-index-gap",
        title: "Lệch / yếu index nhận thức (WAIS-aligned)",
        severity: weak[0].percent < 40 ? "high" : "medium",
        evidence: weak.map(
          (d) =>
            `${d.label}: ${d.percent}%${d.indexScore != null ? ` · index ~${d.indexScore}` : ""}`,
        ),
        coachQuestions: [
          "Công việc hiện tại đòi hỏi index nào nhiều nhất (ngôn ngữ / fluid / nhớ thao tác)?",
          "Khi ra quyết định lớn, bạn thường thiếu dữ liệu, thiếu framework, hay thiếu thời gian suy?",
          "Có phần việc nào bạn tránh vì ‘nặng đầu’?",
        ],
        actions90d: [
          "Chọn 1 index thấp nhất → luyện 3×/tuần × 20’ (dạng tương đương, không học thuộc đề).",
          "Decision log 1 quyết định/tuần: giả định → lựa chọn → kết quả.",
          "Gắn skill học (SQL / strategy / writing) với index cần mài.",
        ],
      });
    }
    if (iq.band === "below" || iq.band === "low_avg" || iq.percent < 40) {
      risks.push("Baseline nhận thức trên battery thấp — tránh quyết định nghề lớn chỉ dựa cảm tính; cần lộ trình kỹ năng rõ.");
    }
  }

  if (eq) {
    refCodes.push(`EQ-${eq.percent}-${eq.band}`);
    dimStrong(eq, 65)
      .slice(0, 2)
      .forEach((d) => {
        strengths.push(`EQ ability · ${d.label} (${d.percent}%)`);
      });
    const weak = dimWeak(eq, 55);
    if (weak.length) {
      const top = weak[0];
      priorities.push({
        id: "eq-branch",
        title: `Khoảng trống EI — ${top.label}`,
        severity: top.percent < 45 ? "high" : "medium",
        evidence: weak.map((d) => `${d.label}: ${d.percent}% · key SJT`),
        coachQuestions: [
          "Kể 1 xung đột 90 ngày gần đây: bạn đã phản ứng thế nào ở phút đầu?",
          "Ai trong đời sống/công việc sẽ xác nhận điểm mù này nếu hỏi 360° nhẹ?",
          "Tình huống nào bạn hay chọn ‘thắng’ thay vì ‘hiểu’?",
        ],
        actions90d: [
          "1 script/tuần cho nhánh yếu (pause email nóng / active listening / conflict interest).",
          "Peer feedback 1 lần/tháng: 1 hành vi cần giữ, 1 hành vi cần đổi.",
          "Role-play 15’ trong buổi tư vấn #2.",
        ],
      });
    }
    if (eq.percent < 50) {
      risks.push("EQ ability SJT thấp — rủi ro leadership, feedback, đàm phán nếu đang lead hoặc sắp lead.");
    }
  }

  if (eng) {
    refCodes.push(`EN-${eng.percent}-${eng.band}`);

    dimStrong(eng, 70).forEach((d) => {
      if (d.mean != null && d.mean >= 4)
        strengths.push(`Engage · ${d.label} (M=${d.mean})`);
    });

    const engWeak = [...eng.dimensions].sort(
      (a, b) => (a.mean ?? a.percent) - (b.mean ?? b.percent),
    );
    const lowest = engWeak[0];
    if (eng.band === "very_low" || eng.band === "low" || (lowest && (lowest.mean ?? 0) < 3)) {
      priorities.push({
        id: "engage-low",
        title: "Gắn kết thấp / cảnh báo sớm (UWES)",
        severity:
          eng.band === "very_low" || eng.band === "low" ? "high" : "medium",
        evidence: eng.dimensions.map(
          (d) => `${d.label}: M=${d.mean ?? "—"} (${d.percent}%)`,
        ),
        coachQuestions: [
          "Triệu chứng thể chất/giấc ngủ 4 tuần gần đây thế nào?",
          "Vấn đề là workload, values misfit, hay quan hệ sếp/team?",
          "Nếu giữ nguyên 6 tháng nữa, cái gì sẽ vỡ trước?",
        ],
        actions90d: [
          "Tuần 1–2: recovery non-negotiable (ngủ, biên giới).",
          "Job crafting 20% theo điểm mạnh nếu Dedication thấp.",
          "Deep work blocks nếu Absorption thấp; review role fit nếu Vigor+Dedication cùng thấp.",
        ],
      });
      risks.push(
        `UWES band «${eng.bandLabel}» — ưu tiên năng lượng/ý nghĩa trước khi ép hiệu suất hoặc nhảy việc bốc đồng.`,
      );
    } else if (eng.band === "high" || eng.band === "very_high") {
      strengths.push(`Engage cao (${eng.displayScore}) — bảo vệ khỏi overwork ngụy trang đam mê`);
      if (lowest && (lowest.mean ?? 6) < 3.5) {
        priorities.push({
          id: "engage-imbalance",
          title: "Engage tổng ổn nhưng lệch trụ",
          severity: "low",
          evidence: [`Trụ thấp hơn: ${lowest.label} M=${lowest.mean}`],
          coachQuestions: ["Trụ thấp có đang bù bằng overwork không?"],
          actions90d: ["Cân bằng recovery vs deep immersion."],
        });
      }
    }
  }

  // Cross-battery patterns
  if (iq && eq && iq.percent >= 65 && eq.percent < 50) {
    priorities.unshift({
      id: "iq-eq-gap",
      title: "Tư duy mạnh – EI situational yếu (pattern hay gặp 25+)",
      severity: "high",
      evidence: [
        `IQ composite band: ${iq.bandLabel}`,
        `EQ SJT band: ${eq.bandLabel}`,
      ],
      coachQuestions: [
        "Bạn có từng ‘đúng về logic’ nhưng mất đồng thuận team không?",
        "Phản hồi từ sếp/peer gần đây nói gì về cách giao tiếp?",
      ],
      actions90d: [
        "Ưu tiên EQ branch thấp hơn thêm skill kỹ thuật mới.",
        "Mỗi quyết định quan trọng: 1 vòng ‘ai bị ảnh hưởng + họ cảm thấy gì’.",
      ],
    });
    risks.push("Rủi ro ‘smart but hard to follow’ — cản leadership dù IQ tốt.");
  }

  if (eng && eq && (eng.band === "low" || eng.band === "very_low") && eq.percent < 55) {
    priorities.unshift({
      id: "burnout-eq",
      title: "Disengage + EQ thấp dưới áp lực",
      severity: "high",
      evidence: [eng.bandLabel, eq.bandLabel],
      coachQuestions: [
        "Bạn có đang cô lập cảm xúc hoặc ‘tắt’ với đồng nghiệp không?",
        "Hỗ trợ xã hội hiện tại (bạn/gia đình/mentor) đủ không?",
      ],
      actions90d: [
        "An toàn & phục hồi trước KPI.",
        "1 mối quan hệ tin cậy để check-in tuần.",
      ],
    });
  }

  // Sort priorities by severity
  const sev: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
  priorities.sort((a, b) => sev[a.severity] - sev[b.severity]);
  const top = priorities.slice(0, 4);

  const completeness = types.length === 3 ? "full" : "partial";
  const names = types.map((t) => TESTS[t].shortName).join(" · ");

  const executiveSummary =
    completeness === "full"
      ? `Hồ sơ đủ 3 trục (${names}). Ưu tiên tư vấn: ${top[0]?.title ?? "duy trì & tinh chỉnh"}. Buổi 1: xác nhận bối cảnh + chọn 1–2 đòn bẩy 90 ngày; không dàn trải.`
      : `Hồ sơ một phần (${names || "chưa có"}). Vẫn tư vấn được theo trục đã có; khuyến nghị bổ sung ${(["iq", "eq", "engage"] as TestType[])
          .filter((t) => !types.includes(t))
          .map((t) => TESTS[t].shortName)
          .join(", ")} để tránh quyết định lệch.`;

  const sessionAgenda = [
    "0–5’: Mục tiêu buổi & giới hạn (không chẩn đoán lâm sàng).",
    "5–15’: Duyệt brief + client xác nhận/phản bác dữ liệu.",
    "15–30’: Đào 1–2 priority severity cao (câu hỏi coach).",
    "30–40’: Chọn 2–3 hành động 90 ngày + chỉ số theo dõi.",
    "40–45’: Lịch follow-up & kênh hỗ trợ.",
  ];

  const highCount = top.filter((p) => p.severity === "high").length;
  const suggestedPackage =
    highCount >= 2 || completeness === "full"
      ? "Gói 3 buổi (0–30–60 ngày): chẩn đoán → thực hành → review"
      : "Buổi đơn 45’ + optional follow-up 30’ sau 3–4 tuần";

  const suggestedGoal =
    top[0]?.id === "engage-low" || top[0]?.id === "burnout-eq"
      ? "Burnout / phục hồi năng lượng"
      : top[0]?.id === "eq-branch" || top[0]?.id === "iq-eq-gap"
        ? "Nâng EQ & leadership"
        : top[0]?.id === "iq-index-gap"
          ? "Định hướng sự nghiệp / chuyển việc"
          : "Xây kế hoạch 90 ngày";

  return {
    generatedAt: new Date().toISOString(),
    testsIncluded: types,
    completeness,
    executiveSummary,
    strengths: strengths.slice(0, 6),
    risks: risks.slice(0, 5),
    priorities: top,
    sessionAgenda,
    suggestedPackage,
    clientPrep: [
      "Mang REF code / chụp màn hình kết quả từng bài.",
      "Viết 5 dòng: bối cảnh công việc, 1 quyết định đang treo, 1 mối quan hệ căng.",
      "Ngủ đủ trước buổi — dữ liệu cảm xúc trung thực hơn.",
      completeness === "partial"
        ? "Nếu kịp: hoàn thành nốt các bài còn lại trước buổi tư vấn."
        : "Review 1 priority bạn đồng ý nhất và 1 điểm bạn phản đối trong brief.",
    ],
    refCodes,
    suggestedGoal,
  };
}

export function saveBrief(brief: ConsultBrief) {
  if (typeof window === "undefined") return;
  localStorage.setItem("coreprint_consult_brief", JSON.stringify(brief));
}

export function loadBrief(): ConsultBrief | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("coreprint_consult_brief");
    return raw ? (JSON.parse(raw) as ConsultBrief) : null;
  } catch {
    return null;
  }
}
