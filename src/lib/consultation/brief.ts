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
        `Tư duy · ${d.label}${d.indexScore != null ? ` (điểm quy đổi khoảng ${d.indexScore})` : ` (${d.percent}%)`}`,
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
          "Công việc hiện tại cần nhiều nhất khả năng nào: hiểu ngôn ngữ, suy luận hay giữ và xử lý thông tin trong đầu?",
          "Khi ra quyết định lớn, bạn thường thiếu thông tin, thiếu cách phân tích hay thiếu thời gian suy nghĩ?",
          "Có phần việc nào bạn hay né vì ‘nặng đầu’?",
        ],
        actions90d: [
          "Chọn nhóm thấp nhất và luyện 20 phút, 3 lần mỗi tuần bằng dạng bài tương tự; không học thuộc câu hỏi.",
          "Mỗi tuần ghi lại một quyết định: điều bạn cho là đúng, lựa chọn đã đưa ra và kết quả.",
          "Chọn kỹ năng cần học dựa trên nhóm tư duy bạn muốn cải thiện.",
        ],
      });
    }
    if (iq.band === "below" || iq.band === "low_avg" || iq.percent < 40) {
      risks.push(
        "Kết quả tư duy hiện còn thấp. Trước quyết định nghề nghiệp lớn, nên thu thập thêm thông tin và lập kế hoạch học kỹ năng rõ ràng.",
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
          "Ai trong công việc có thể cho bạn nhận xét trung thực về điểm bạn chưa tự nhận ra?",
          "Tình huống nào bạn hay chọn ‘thắng’ thay vì ‘hiểu’?",
        ],
        actions90d: [
          "Mỗi tuần luyện một tình huống nhỏ cho nhóm cần cải thiện, như hoãn gửi email khi nóng giận, lắng nghe hoặc làm rõ lợi ích chung.",
          "Mỗi tháng xin nhận xét về một cách ứng xử nên giữ và một cách nên đổi.",
          "Dành 15 phút thực hành tình huống trong buổi tư vấn thứ hai.",
        ],
      });
    }
    if (eq.percent < 50) {
      risks.push(
        "Kết quả xử lý tình huống cảm xúc còn thấp. Điều này có thể ảnh hưởng đến giao tiếp, góp ý, đàm phán và dẫn dắt nhóm.",
      );
    }
  }

  if (eng) {
    refCodes.push(`EN-${eng.percent}-${eng.band}`);

    dimStrong(eng, 70).forEach((d) => {
      if (d.mean != null && d.mean >= 4)
        strengths.push(`Năng lượng · ${d.label} (trung bình ${d.mean}/6)`);
    });

    const engWeak = [...eng.dimensions].sort(
      (a, b) => (a.mean ?? a.percent) - (b.mean ?? b.percent),
    );
    const lowest = engWeak[0];
    if (eng.band === "very_low" || eng.band === "low" || (lowest && (lowest.mean ?? 0) < 3)) {
      priorities.push({
        id: "engage-low",
        title: "Năng lượng hoặc mức gắn bó với công việc thấp",
        severity:
          eng.band === "very_low" || eng.band === "low" ? "high" : "medium",
        evidence: eng.dimensions.map(
          (d) => `${d.label}: trung bình ${d.mean ?? "—"}/6 (${d.percent}%)`,
        ),
        coachQuestions: [
          "Giấc ngủ và sức khỏe thể chất 4 tuần gần đây thế nào?",
          "Vấn đề chính nằm ở khối lượng công việc, công việc không hợp điều bạn coi trọng, hay quan hệ với quản lý và đồng nghiệp?",
          "Nếu giữ nguyên 6 tháng nữa, điều gì có thể hỏng trước?",
        ],
        actions90d: [
          "Tuần 1–2: ưu tiên phục hồi (ngủ, ranh giới công việc).",
          "Nếu thấy công việc thiếu ý nghĩa, thử điều chỉnh khoảng 20% nhiệm vụ để phù hợp hơn với điểm mạnh và điều bạn coi trọng.",
          "Nếu khó tập trung, dành riêng khung giờ không bị gián đoạn. Nếu nhiều nhóm cùng thấp, hãy xem lại vai trò hiện tại có còn phù hợp không.",
        ],
      });
      risks.push(
        `${eng.bandLabel} — nên ưu tiên năng lượng và ý nghĩa trước khi ép hiệu suất hoặc nhảy việc vội.`,
      );
    } else if (eng.band === "high" || eng.band === "very_high") {
      strengths.push(
        `Mức gắn bó với công việc cao (${eng.displayScore}). Cần giữ ranh giới để tránh làm quá sức vì đam mê.`,
      );
      if (lowest && (lowest.mean ?? 6) < 3.5) {
        priorities.push({
          id: "engage-imbalance",
          title: "Kết quả chung ổn nhưng các nhóm chưa cân bằng",
          severity: "low",
          evidence: [`Nhóm thấp hơn: ${lowest.label}, trung bình ${lowest.mean}/6`],
          coachQuestions: ["Bạn có đang làm thêm giờ để bù cho nhóm thấp này không?"],
          actions90d: ["Cân bằng phục hồi với thời gian làm sâu."],
        });
      }
    }
  }

  if (iq && eq && iq.percent >= 65 && eq.percent < 50) {
    priorities.unshift({
      id: "iq-eq-gap",
      title: "Tư duy tốt nhưng cách xử lý cảm xúc còn cần cải thiện",
      severity: "high",
      evidence: [
        `Tư duy: ${iq.bandLabel}`,
        `Cảm xúc: ${eq.bandLabel}`,
      ],
      coachQuestions: [
        "Bạn có từng đúng về lý lẽ nhưng vẫn không nhận được sự đồng thuận của cả nhóm không?",
        "Quản lý hoặc đồng nghiệp gần đây nhận xét gì về cách bạn giao tiếp?",
      ],
      actions90d: [
        "Ưu tiên rèn cách xử lý cảm xúc và quan hệ trước khi học thêm kỹ năng chuyên môn mới.",
        "Mỗi quyết định quan trọng: hỏi ‘ai bị ảnh hưởng và họ có thể cảm thấy gì?’",
      ],
    });
    risks.push(
      "Bạn có thể bị nhìn nhận là giỏi nhưng khó hợp tác, từ đó hạn chế khả năng dẫn dắt dù tư duy tốt.",
    );
  }

  if (eng && eq && (eng.band === "low" || eng.band === "very_low") && eq.percent < 55) {
    priorities.unshift({
      id: "burnout-eq",
      title: "Mất động lực và khó xử lý cảm xúc khi chịu áp lực",
      severity: "high",
      evidence: [eng.bandLabel, eq.bandLabel],
      coachQuestions: [
        "Bạn có đang thu mình hoặc ít kết nối với đồng nghiệp không?",
        "Bạn có đang nhận đủ sự hỗ trợ từ bạn bè, gia đình hoặc người hướng dẫn không?",
      ],
      actions90d: [
        "Ưu tiên an toàn và phục hồi trước khi ép chỉ tiêu.",
        "Chọn một người tin cậy để trò chuyện và cập nhật tình hình mỗi tuần.",
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
      ? `Bạn đã làm đủ 3 bài (${names}). Nội dung nên ưu tiên khi tư vấn: ${top[0]?.title ?? "duy trì những điểm đang tốt và làm rõ mục tiêu"}. Buổi đầu sẽ làm rõ hoàn cảnh và chọn 1–2 việc quan trọng trong 90 ngày.`
      : `Bạn đã có kết quả của ${names || "chưa có bài nào"}. Vẫn có thể tư vấn dựa trên kết quả hiện có; nên làm thêm ${(["iq", "eq", "engage"] as TestType[])
          .filter((t) => !types.includes(t))
          .map((t) => TESTS[t].shortName)
          .join(", ")} để quyết định cân bằng hơn.`;

  const sessionAgenda = [
    "0–5 phút: Thống nhất mục tiêu và giới hạn của buổi tư vấn; không chẩn đoán sức khỏe tâm lý.",
    "5–15 phút: Xem phần tóm tắt và đối chiếu với trải nghiệm thực tế của bạn.",
    "15–30 phút: Đào sâu 1–2 ưu tiên quan trọng nhất.",
    "30–40 phút: Chọn 2–3 hành động 90 ngày và cách theo dõi.",
    "40–45 phút: Thống nhất thời điểm xem lại tiến độ và cách giữ liên lạc.",
  ];

  const highCount = top.filter((p) => p.severity === "high").length;
  const suggestedPackage =
    highCount >= 2 || completeness === "full"
      ? "Gợi ý: ba buổi — bắt đầu, sau 30 ngày và sau 60 ngày — để làm rõ, thực hành và xem lại tiến độ"
      : "Gợi ý: một buổi 45 phút và có thể thêm buổi 30 phút để xem lại tiến độ sau 3–4 tuần";

  const suggestedGoal =
    top[0]?.id === "engage-low" || top[0]?.id === "burnout-eq"
      ? "Kiệt sức / phục hồi năng lượng"
      : top[0]?.id === "eq-branch" || top[0]?.id === "iq-eq-gap"
        ? "Cải thiện EQ và kỹ năng lãnh đạo"
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
      "Mang mã REF hoặc ảnh chụp kết quả từng bài.",
      "Viết ngắn về công việc hiện tại, một quyết định chưa đưa ra và một mối quan hệ đang căng thẳng.",
      "Ngủ đủ trước buổi để bạn tỉnh táo và nhìn nhận cảm xúc rõ hơn.",
      completeness === "partial"
        ? "Nếu kịp: hoàn thành nốt các bài còn lại trước buổi tư vấn."
        : "Chọn một ưu tiên bạn đồng ý nhất và một điểm trong phần tóm tắt mà bạn thấy chưa đúng.",
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
