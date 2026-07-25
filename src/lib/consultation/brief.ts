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
        title: "Cần củng cố nhóm tư duy còn yếu",
        severity: weak[0].percent < 40 ? "high" : "medium",
        evidence: weak.map(
          (d) =>
            `${d.label}: ${d.percent}%${d.indexScore != null ? ` · khoảng ${d.indexScore}` : ""}`,
        ),
        coachQuestions: [
          "Công việc hiện tại đòi hỏi nhiều nhất nhóm nào: ngôn ngữ, suy luận hay trí nhớ thao tác?",
          "Khi ra quyết định lớn, bạn thường thiếu dữ liệu, thiếu khung suy nghĩ, hay thiếu thời gian suy?",
          "Có phần việc nào bạn hay né vì ‘nặng đầu’?",
        ],
        actions90d: [
          "Chọn 1 nhóm thấp nhất → luyện 3 lần/tuần × 20 phút (dạng tương đương, không học thuộc đề).",
          "Mỗi tuần ghi 1 quyết định: giả định → lựa chọn → kết quả.",
          "Gắn kỹ năng đang học với nhóm tư duy cần mài.",
        ],
      });
    }
    if (iq.band === "below" || iq.band === "low_avg" || iq.percent < 40) {
      risks.push(
        "Nền tư duy trên bài đo còn thấp — tránh quyết định nghề lớn chỉ theo cảm tính; cần lộ trình kỹ năng rõ.",
      );
    }
  }

  if (eq) {
    refCodes.push(`EQ-${eq.percent}-${eq.band}`);
    dimStrong(eq, 65)
      .slice(0, 2)
      .forEach((d) => {
        strengths.push(`Cảm xúc · ${d.label} (${d.percent}%)`);
      });
    const weak = dimWeak(eq, 55);
    if (weak.length) {
      const top = weak[0];
      priorities.push({
        id: "eq-branch",
        title: `Cần phát triển: ${top.label}`,
        severity: top.percent < 45 ? "high" : "medium",
        evidence: weak.map((d) => `${d.label}: ${d.percent}%`),
        coachQuestions: [
          "Kể một xung đột trong 90 ngày gần đây: bạn phản ứng thế nào ở phút đầu?",
          "Ai trong công việc sẽ xác nhận điểm mù này nếu được hỏi khéo?",
          "Tình huống nào bạn hay chọn ‘thắng’ thay vì ‘hiểu’?",
        ],
        actions90d: [
          "Mỗi tuần 1 kịch bản nhỏ cho nhóm yếu (dừng email nóng / lắng nghe / làm rõ lợi ích chung).",
          "Mỗi tháng xin 1 lần phản hồi: 1 hành vi nên giữ, 1 hành vi nên đổi.",
          "Diễn tập 15 phút trong buổi tư vấn lần 2.",
        ],
      });
    }
    if (eq.percent < 50) {
      risks.push(
        "EQ trên tình huống còn thấp — dễ ảnh hưởng lãnh đạo, phản hồi và đàm phán nếu bạn đang (hoặc sắp) lead.",
      );
    }
  }

  if (eng) {
    refCodes.push(`EN-${eng.percent}-${eng.band}`);

    dimStrong(eng, 70).forEach((d) => {
      if (d.mean != null && d.mean >= 4)
        strengths.push(`Năng lượng · ${d.label} (TB ${d.mean})`);
    });

    const engWeak = [...eng.dimensions].sort(
      (a, b) => (a.mean ?? a.percent) - (b.mean ?? b.percent),
    );
    const lowest = engWeak[0];
    if (eng.band === "very_low" || eng.band === "low" || (lowest && (lowest.mean ?? 0) < 3)) {
      priorities.push({
        id: "engage-low",
        title: "Gắn kết / năng lượng thấp — cần chú ý sớm",
        severity:
          eng.band === "very_low" || eng.band === "low" ? "high" : "medium",
        evidence: eng.dimensions.map(
          (d) => `${d.label}: TB ${d.mean ?? "—"} (${d.percent}%)`,
        ),
        coachQuestions: [
          "Giấc ngủ và sức khỏe thể chất 4 tuần gần đây thế nào?",
          "Vấn đề chủ yếu là khối lượng việc, lệch giá trị, hay quan hệ sếp/team?",
          "Nếu giữ nguyên 6 tháng nữa, điều gì có thể hỏng trước?",
        ],
        actions90d: [
          "Tuần 1–2: ưu tiên phục hồi (ngủ, ranh giới công việc).",
          "Nếu gắn kết thấp: điều chỉnh 20% nhiệm vụ theo điểm mạnh và ý nghĩa.",
          "Nếu tập trung thấp: chặn khung giờ làm sâu; nếu nhiều trụ thấp cùng lúc — rà lại sự phù hợp vai trò.",
        ],
      });
      risks.push(
        `${eng.bandLabel} — nên ưu tiên năng lượng và ý nghĩa trước khi ép hiệu suất hoặc nhảy việc vội.`,
      );
    } else if (eng.band === "high" || eng.band === "very_high") {
      strengths.push(
        `Gắn kết cao (${eng.displayScore}) — cần giữ ranh giới để tránh làm quá sức dưới danh nghĩa đam mê`,
      );
      if (lowest && (lowest.mean ?? 6) < 3.5) {
        priorities.push({
          id: "engage-imbalance",
          title: "Tổng gắn kết ổn nhưng lệch giữa các trụ",
          severity: "low",
          evidence: [`Trụ thấp hơn: ${lowest.label} TB ${lowest.mean}`],
          coachQuestions: ["Trụ thấp có đang được bù bằng làm thêm giờ không?"],
          actions90d: ["Cân bằng phục hồi với thời gian làm sâu."],
        });
      }
    }
  }

  if (iq && eq && iq.percent >= 65 && eq.percent < 50) {
    priorities.unshift({
      id: "iq-eq-gap",
      title: "Tư duy mạnh – ứng xử cảm xúc còn yếu (hay gặp ở 25+)",
      severity: "high",
      evidence: [
        `Tư duy: ${iq.bandLabel}`,
        `Cảm xúc: ${eq.bandLabel}`,
      ],
      coachQuestions: [
        "Bạn có từng ‘đúng về logic’ nhưng mất đồng thuận team không?",
        "Phản hồi gần đây từ sếp/đồng nghiệp nói gì về cách giao tiếp?",
      ],
      actions90d: [
        "Ưu tiên luyện EQ trước khi thêm kỹ năng kỹ thuật mới.",
        "Mỗi quyết định quan trọng: hỏi ‘ai bị ảnh hưởng và họ có thể cảm thấy gì?’",
      ],
    });
    risks.push(
      "Dễ bị nhìn là ‘giỏi nhưng khó theo’ — cản lãnh đạo dù tư duy tốt.",
    );
  }

  if (eng && eq && (eng.band === "low" || eng.band === "very_low") && eq.percent < 55) {
    priorities.unshift({
      id: "burnout-eq",
      title: "Mất gắn kết + EQ thấp khi chịu áp lực",
      severity: "high",
      evidence: [eng.bandLabel, eq.bandLabel],
      coachQuestions: [
        "Bạn có đang thu mình cảm xúc hoặc ‘tắt’ với đồng nghiệp không?",
        "Hỗ trợ xã hội hiện tại (bạn bè / gia đình / mentor) có đủ không?",
      ],
      actions90d: [
        "Ưu tiên an toàn và phục hồi trước khi ép chỉ tiêu.",
        "Chọn 1 người tin cậy để check-in mỗi tuần.",
      ],
    });
  }

  const sev: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
  priorities.sort((a, b) => sev[a.severity] - sev[b.severity]);
  const top = priorities.slice(0, 4);

  const completeness = types.length === 3 ? "full" : "partial";
  const names = types.map((t) => TESTS[t].shortName).join(" · ");

  const executiveSummary =
    completeness === "full"
      ? `Hồ sơ đủ 3 trục (${names}). Ưu tiên tư vấn: ${top[0]?.title ?? "duy trì và tinh chỉnh"}. Buổi 1: xác nhận bối cảnh và chọn 1–2 đòn bẩy trong 90 ngày — không dàn trải.`
      : `Hồ sơ một phần (${names || "chưa có"}). Vẫn tư vấn được theo trục đã có; nên bổ sung ${(["iq", "eq", "engage"] as TestType[])
          .filter((t) => !types.includes(t))
          .map((t) => TESTS[t].shortName)
          .join(", ")} để quyết định cân bằng hơn.`;

  const sessionAgenda = [
    "0–5 phút: Mục tiêu buổi và giới hạn (không chẩn đoán lâm sàng).",
    "5–15 phút: Duyệt tóm tắt — bạn xác nhận hoặc phản biện dữ liệu.",
    "15–30 phút: Đào sâu 1–2 ưu tiên quan trọng nhất.",
    "30–40 phút: Chọn 2–3 hành động 90 ngày và cách theo dõi.",
    "40–45 phút: Lịch follow-up và kênh hỗ trợ.",
  ];

  const highCount = top.filter((p) => p.severity === "high").length;
  const suggestedPackage =
    highCount >= 2 || completeness === "full"
      ? "Gợi ý: gói 3 buổi (0–30–60 ngày) — làm rõ → thực hành → rà soát"
      : "Gợi ý: buổi đơn 45 phút + follow-up 30 phút sau 3–4 tuần (tuỳ chọn)";

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
