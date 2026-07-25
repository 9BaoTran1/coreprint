import type { TestProtocol, TestType } from "./types";
import { CERTIFIED_REFS } from "./standards/certified-refs";

export const PROTOCOLS: Record<TestType, TestProtocol> = {
  iq: {
    format: "binary",
    timeLimitSeconds: 25 * 60,
    itemPointMax: 1,
    allowBack: true,
    estimatedMinutes: "20–25",
    standardizationNote: CERTIFIED_REFS.iq.coreprintAlign,
    instructions: [
      "CORE battery 34 câu · 3 index WAIS-IV-aligned: VCI (12) · PRI (12) · WMI (10).",
      "PRI gồm series + matrix số (quy tắc Raven-style: progression, row product/sum) — item text original.",
      "VCI: similarities, analogy, classification, formal verbal logic (như Similarities/Comprehension).",
      "WMI: arithmetic + digit-hold + sequencing (như Arithmetic/Digit Span thao tác).",
      "Mỗi câu MỘT đáp án đúng; trọng số 1 / 1.5 / 2 theo độ khó. Giới hạn 25 phút.",
      "Yên tĩnh, không máy tính/AI/tra cứu. KHÔNG phải WAIS clinical Pearson.",
    ],
    rules: [
      "Không nhờ người / không tra cứu — kết quả mới dùng được cho tư vấn",
      "Làm hết sức trong 25’; hết giờ tự nộp phần đã trả lời",
      "Cần FSIQ lâm sàng → WAIS với chuyên gia đủ điều kiện",
    ],
  },
  eq: {
    format: "sjt",
    timeLimitSeconds: null,
    itemPointMax: 2,
    allowBack: true,
    estimatedMinutes: "15–20",
    standardizationNote: CERTIFIED_REFS.eq.coreprintAlign,
    instructions: [
      "CORE 20 tình huống · đúng 4 nhánh MSCEIT (mỗi nhánh 5 câu): Perceiving · Facilitating · Understanding · Managing.",
      "Ability model: có đáp án tốt hơn/kém hơn (không phải «bạn thích gì»).",
      "Chấm partial credit 0/1/2 theo khóa chuyên gia EI + leadership (SJT best practice).",
      "Perceiving = đọc tín hiệu · Facilitating = ghép mood–task · Understanding = chuỗi/blend · Managing = điều tiết.",
      "Map sang ESCI (Korn Ferry/Goleman) trên báo cáo. Khác EQ-i 2.0 trait Level B.",
    ],
    rules: [
      "Chọn hành vi bạn sẽ làm / nên làm theo EI hiệu quả — không tô hồng vô căn",
      "Đọc đủ tình huống trước khi chọn",
      "MSCEIT/ESCI/EQ-i official chỉ qua license + người có cert",
    ],
  },
  engage: {
    format: "likert",
    timeLimitSeconds: null,
    itemPointMax: 6,
    likertMax: 6,
    allowBack: true,
    estimatedMinutes: "6–10",
    standardizationNote: CERTIFIED_REFS.engage.coreprintAlign,
    instructions: [
      "CORE đúng cấu trúc UWES-17: Vigor 6 + Dedication 5 + Absorption 6 = 17 câu.",
      "Thang 0–6 (Never → Always) — scale nghiên cứu engagement chuẩn.",
      "Chấm mean = tổng/số item từng trụ và tổng (UWES Manual).",
      "Hạng Very low→Very high theo Table 33 (N=2,313). Mẫu M≈3.82.",
      "Nghĩ vai trò công việc chính 3–6 tháng gần đây. Item map construct UWES, wording tiếng Việt adapted.",
    ],
    rules: [
      "Trung thực — tô hồng che burnout/disengage",
      "Nếu nghỉ việc: công việc gần nhất ≥ 3 tháng",
      "Không reverse-score (đúng UWES-17 positive-keyed)",
    ],
  },
};

export const UWES_SCALE_LABELS: { value: number; label: string; short: string }[] = [
  { value: 0, label: "Không bao giờ", short: "0" },
  { value: 1, label: "Hầu như không bao giờ", short: "1" },
  { value: 2, label: "Hiếm khi", short: "2" },
  { value: 3, label: "Thỉnh thoảng", short: "3" },
  { value: 4, label: "Thường xuyên", short: "4" },
  { value: 5, label: "Rất thường xuyên", short: "5" },
  { value: 6, label: "Luôn luôn", short: "6" },
];
