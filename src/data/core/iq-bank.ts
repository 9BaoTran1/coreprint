/**
 * CORE IQ BATTERY — WAIS-IV index architecture + Raven-style fluid rules
 * =============================================================================
 * Indexes (Pearson WAIS-IV analog):
 *   VCI  Verbal Comprehension  — Similarities, Analogy, Concept, Information-style
 *   PRI  Perceptual/Fluid      — Series, Matrix rules (Raven: progression, constancy, XOR-like)
 *   WMI  Working Memory        — Arithmetic, mental hold, sequencing
 *
 * Design rules:
 * - Progressive difficulty within index (easy → hard)
 * - Exactly ONE correct option; rationale documented in IQ_RATIONALE
 * - Weight 1 | 1.5 | 2 by difficulty (aptitude practice)
 * - ORIGINAL items — not WAIS/Raven copyright content
 * - Timed administration: 25 minutes (protocol)
 */
import type { Question } from "@/lib/types";

export const IQ_QUESTIONS: Question[] = [
  // ═══════════════════════════════════════════════════════════
  // PRI — Fluid / Matrix / Series (12)  progressive
  // ═══════════════════════════════════════════════════════════
  {
    id: "iq_p01",
    subtest: "PRI · Series (easy)",
    dimension: "pri",
    weight: 1,
    format: "binary",
    prompt: "2 · 4 · 6 · 8 · ?",
    options: [
      { id: "a", label: "9", value: false },
      { id: "b", label: "10", value: true },
      { id: "c", label: "12", value: false },
      { id: "d", label: "16", value: false },
    ],
  },
  {
    id: "iq_p02",
    subtest: "PRI · Series",
    dimension: "pri",
    weight: 1,
    format: "binary",
    prompt: "3 · 6 · 12 · 24 · ?",
    options: [
      { id: "a", label: "36", value: false },
      { id: "b", label: "48", value: true },
      { id: "c", label: "42", value: false },
      { id: "d", label: "30", value: false },
    ],
  },
  {
    id: "iq_p03",
    subtest: "PRI · Series",
    dimension: "pri",
    weight: 1,
    format: "binary",
    prompt: "2 · 6 · 12 · 20 · 30 · ?",
    options: [
      { id: "a", label: "40", value: false },
      { id: "b", label: "42", value: true },
      { id: "c", label: "36", value: false },
      { id: "d", label: "48", value: false },
    ],
  },
  {
    id: "iq_p04",
    subtest: "PRI · Series",
    dimension: "pri",
    weight: 1.5,
    format: "binary",
    prompt: "1 · 1 · 2 · 3 · 5 · 8 · ?",
    options: [
      { id: "a", label: "11", value: false },
      { id: "b", label: "12", value: false },
      { id: "c", label: "13", value: true },
      { id: "d", label: "15", value: false },
    ],
  },
  {
    id: "iq_p05",
    subtest: "PRI · Letter series",
    dimension: "pri",
    weight: 1.5,
    format: "binary",
    prompt: "A · C · F · J · O · ?",
    options: [
      { id: "a", label: "S", value: false },
      { id: "b", label: "T", value: false },
      { id: "c", label: "U", value: true },
      { id: "d", label: "V", value: false },
    ],
  },
  {
    id: "iq_p06",
    subtest: "PRI · Matrix (row rule)",
    dimension: "pri",
    weight: 1.5,
    format: "binary",
    prompt:
      "Ma trận 3×3 — mỗi hàng: cột3 = cột1 × cột2\n2  3  6\n4  2  8\n5  3  ?",
    options: [
      { id: "a", label: "8", value: false },
      { id: "b", label: "15", value: true },
      { id: "c", label: "12", value: false },
      { id: "d", label: "10", value: false },
    ],
  },
  {
    id: "iq_p07",
    subtest: "PRI · Matrix (row rule)",
    dimension: "pri",
    weight: 1.5,
    format: "binary",
    prompt:
      "Mỗi hàng: số tăng theo hệ số cố định trên hàng\n2  4  8\n3  6  12\n4  8  ?",
    options: [
      { id: "a", label: "12", value: false },
      { id: "b", label: "16", value: true },
      { id: "c", label: "20", value: false },
      { id: "d", label: "24", value: false },
    ],
  },
  {
    id: "iq_p08",
    subtest: "PRI · Alternating ops",
    dimension: "pri",
    weight: 2,
    format: "binary",
    prompt: "7 · 14 · 10 · 20 · 16 · 32 · 28 · ?",
    options: [
      { id: "a", label: "52", value: false },
      { id: "b", label: "56", value: true },
      { id: "c", label: "48", value: false },
      { id: "d", label: "60", value: false },
    ],
  },
  {
    id: "iq_p09",
    subtest: "PRI · Factorial growth",
    dimension: "pri",
    weight: 2,
    format: "binary",
    prompt: "1 · 2 · 6 · 24 · 120 · ?",
    options: [
      { id: "a", label: "240", value: false },
      { id: "b", label: "480", value: false },
      { id: "c", label: "720", value: true },
      { id: "d", label: "600", value: false },
    ],
  },
  {
    id: "iq_p10",
    subtest: "PRI · Matrix (sum rule)",
    dimension: "pri",
    weight: 2,
    format: "binary",
    prompt:
      "Mỗi hàng: cột3 = cột1 + cột2\n3  5  8\n7  2  9\n4  6  ?",
    options: [
      { id: "a", label: "9", value: false },
      { id: "b", label: "10", value: true },
      { id: "c", label: "11", value: false },
      { id: "d", label: "12", value: false },
    ],
  },
  {
    id: "iq_p11",
    subtest: "PRI · Spatial structure",
    dimension: "pri",
    weight: 1.5,
    format: "binary",
    prompt: "Hình chữ nhật chu vi 36 cm, chiều dài gấp đôi chiều rộng. Diện tích?",
    options: [
      { id: "a", label: "48 cm²", value: false },
      { id: "b", label: "72 cm²", value: true },
      { id: "c", label: "96 cm²", value: false },
      { id: "d", label: "108 cm²", value: false },
    ],
  },
  {
    id: "iq_p12",
    subtest: "PRI · Spatial / fold",
    dimension: "pri",
    weight: 2,
    format: "binary",
    prompt:
      "Gấp đôi một tờ giấy phẳng đúng 4 lần (mỗi lần gấp làm đôi toàn bộ). Số lớp giấy tối đa?",
    options: [
      { id: "a", label: "4", value: false },
      { id: "b", label: "8", value: false },
      { id: "c", label: "16", value: true },
      { id: "d", label: "32", value: false },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // WMI — Working Memory (10)
  // ═══════════════════════════════════════════════════════════
  {
    id: "iq_w01",
    subtest: "WMI · Arithmetic",
    dimension: "wmi",
    weight: 1,
    format: "binary",
    prompt: "15 + 27 = ?",
    options: [
      { id: "a", label: "32", value: false },
      { id: "b", label: "42", value: true },
      { id: "c", label: "41", value: false },
      { id: "d", label: "52", value: false },
    ],
  },
  {
    id: "iq_w02",
    subtest: "WMI · Arithmetic",
    dimension: "wmi",
    weight: 1,
    format: "binary",
    prompt: "20% của 20% của 500 = ?",
    options: [
      { id: "a", label: "10", value: false },
      { id: "b", label: "20", value: true },
      { id: "c", label: "25", value: false },
      { id: "d", label: "50", value: false },
    ],
  },
  {
    id: "iq_w03",
    subtest: "WMI · Arithmetic",
    dimension: "wmi",
    weight: 1.5,
    format: "binary",
    prompt:
      "Công việc cần 6 người làm trong 8 ngày (cùng năng suất). Với 4 người, cần bao nhiêu ngày?",
    options: [
      { id: "a", label: "10", value: false },
      { id: "b", label: "12", value: true },
      { id: "c", label: "14", value: false },
      { id: "d", label: "16", value: false },
    ],
  },
  {
    id: "iq_w04",
    subtest: "WMI · Arithmetic",
    dimension: "wmi",
    weight: 1.5,
    format: "binary",
    prompt: "Giá tăng 20% rồi giảm 20%. So với giá gốc?",
    options: [
      { id: "a", label: "Không đổi", value: false },
      { id: "b", label: "Giảm 4%", value: true },
      { id: "c", label: "Tăng 4%", value: false },
      { id: "d", label: "Giảm 20%", value: false },
    ],
  },
  {
    id: "iq_w05",
    subtest: "WMI · Arithmetic",
    dimension: "wmi",
    weight: 2,
    format: "binary",
    prompt:
      "Giảm giá 15%, rồi giảm thêm 10% trên giá đã giảm. Tổng mức giảm so gốc ≈ ?",
    options: [
      { id: "a", label: "23,5%", value: true },
      { id: "b", label: "25%", value: false },
      { id: "c", label: "22%", value: false },
      { id: "d", label: "26,5%", value: false },
    ],
  },
  {
    id: "iq_w06",
    subtest: "WMI · Mental average",
    dimension: "wmi",
    weight: 1.5,
    format: "binary",
    prompt: "Trung bình của 5 số là 12. Thêm số thứ 6 = 18. Trung bình mới?",
    options: [
      { id: "a", label: "12", value: false },
      { id: "b", label: "13", value: true },
      { id: "c", label: "14", value: false },
      { id: "d", label: "15", value: false },
    ],
  },
  {
    id: "iq_w07",
    subtest: "WMI · Ratio hold",
    dimension: "wmi",
    weight: 1.5,
    format: "binary",
    prompt: "A : B = 2 : 3 và A + B = 40. A bằng?",
    options: [
      { id: "a", label: "12", value: false },
      { id: "b", label: "16", value: true },
      { id: "c", label: "18", value: false },
      { id: "d", label: "24", value: false },
    ],
  },
  {
    id: "iq_w08",
    subtest: "WMI · Digit hold + op",
    dimension: "wmi",
    weight: 2,
    format: "binary",
    prompt:
      "Giữ ba số theo thứ tự: 5 · 2 · 9. Lấy (số đầu × số cuối) rồi trừ số giữa. Kết quả?",
    options: [
      { id: "a", label: "43", value: true },
      { id: "b", label: "45", value: false },
      { id: "c", label: "37", value: false },
      { id: "d", label: "47", value: false },
    ],
  },
  {
    id: "iq_w09",
    subtest: "WMI · Sequencing",
    dimension: "wmi",
    weight: 2,
    format: "binary",
    prompt:
      "Bạn nghe (tưởng tượng): 8, 3, 6, 1. Sắp tăng dần rồi lấy tổng hai số giữa. Tổng?",
    options: [
      { id: "a", label: "7", value: false },
      { id: "b", label: "9", value: true },
      { id: "c", label: "11", value: false },
      { id: "d", label: "14", value: false },
    ],
  },
  {
    id: "iq_w10",
    subtest: "WMI · Combinatorics hold",
    dimension: "wmi",
    weight: 1.5,
    format: "binary",
    prompt:
      "5 người, mỗi người bắt tay mỗi người khác đúng một lần. Tổng số cái bắt tay?",
    options: [
      { id: "a", label: "10", value: true },
      { id: "b", label: "15", value: false },
      { id: "c", label: "20", value: false },
      { id: "d", label: "25", value: false },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // VCI — Verbal Comprehension (12)
  // ═══════════════════════════════════════════════════════════
  {
    id: "iq_v01",
    subtest: "VCI · Similarities",
    dimension: "vci",
    weight: 1,
    format: "binary",
    prompt: "TÁO và CAM giống nhau nhất ở điểm nào?",
    options: [
      { id: "a", label: "Cùng màu", value: false },
      { id: "b", label: "Đều là trái cây", value: true },
      { id: "c", label: "Đều tròn tuyệt đối", value: false },
      { id: "d", label: "Đều mọc dưới đất", value: false },
    ],
  },
  {
    id: "iq_v02",
    subtest: "VCI · Similarities",
    dimension: "vci",
    weight: 1,
    format: "binary",
    prompt: "ĐỒNG HỒ và LỊCH giống nhau nhất ở?",
    options: [
      { id: "a", label: "Đều bằng kim loại", value: false },
      { id: "b", label: "Đều đo / tổ chức thời gian", value: true },
      { id: "c", label: "Đều hình tròn", value: false },
      { id: "d", label: "Đều dùng pin", value: false },
    ],
  },
  {
    id: "iq_v03",
    subtest: "VCI · Analogy",
    dimension: "vci",
    weight: 1,
    format: "binary",
    prompt: "BÚT đối với VIẾT :: DAO đối với…?",
    options: [
      { id: "a", label: "Bếp", value: false },
      { id: "b", label: "Cắt", value: true },
      { id: "c", label: "Sắc", value: false },
      { id: "d", label: "Thép", value: false },
    ],
  },
  {
    id: "iq_v04",
    subtest: "VCI · Analogy",
    dimension: "vci",
    weight: 1,
    format: "binary",
    prompt: "BÁC SĨ : BỆNH VIỆN :: GIÁO VIÊN : ?",
    options: [
      { id: "a", label: "Sách giáo khoa", value: false },
      { id: "b", label: "Trường học", value: true },
      { id: "c", label: "Học sinh", value: false },
      { id: "d", label: "Bảng điểm", value: false },
    ],
  },
  {
    id: "iq_v05",
    subtest: "VCI · Classification",
    dimension: "vci",
    weight: 1.5,
    format: "binary",
    prompt: "Từ nào KHÔNG cùng nhóm: Chó – Mèo – Ngựa – Ô tô – Bò?",
    options: [
      { id: "a", label: "Ngựa", value: false },
      { id: "b", label: "Ô tô", value: true },
      { id: "c", label: "Bò", value: false },
      { id: "d", label: "Mèo", value: false },
    ],
  },
  {
    id: "iq_v06",
    subtest: "VCI · Classification",
    dimension: "vci",
    weight: 1.5,
    format: "binary",
    prompt: "Số nào lệch nhóm (không phải số nguyên tố): 2 · 3 · 5 · 7 · 9 · 11?",
    options: [
      { id: "a", label: "7", value: false },
      { id: "b", label: "9", value: true },
      { id: "c", label: "11", value: false },
      { id: "d", label: "3", value: false },
    ],
  },
  {
    id: "iq_v07",
    subtest: "VCI · Concept",
    dimension: "vci",
    weight: 1.5,
    format: "binary",
    prompt: "«Hiệu quả» (effectiveness) gần nghĩa nhất với?",
    options: [
      { id: "a", label: "Làm thật nhiều việc", value: false },
      {
        id: "b",
        label: "Đạt đúng mục tiêu đã chọn bằng cách hợp lý",
        value: true,
      },
      { id: "c", label: "Làm nhanh bất kể chất lượng", value: false },
      { id: "d", label: "Giảm chi phí bằng mọi giá", value: false },
    ],
  },
  {
    id: "iq_v08",
    subtest: "VCI · Formal verbal logic",
    dimension: "vci",
    weight: 1.5,
    format: "binary",
    prompt: "«Nếu mưa thì đường ướt.» Quan sát: đường đang ướt. Kết luận hợp lệ?",
    options: [
      { id: "a", label: "Chắc chắn đang mưa", value: false },
      {
        id: "b",
        label: "Có thể mưa; đường ướt không chứng minh chắc chắn là mưa",
        value: true,
      },
      { id: "c", label: "Chắc chắn không mưa", value: false },
      { id: "d", label: "Mệnh đề gốc sai", value: false },
    ],
  },
  {
    id: "iq_v09",
    subtest: "VCI · Syllogism",
    dimension: "vci",
    weight: 2,
    format: "binary",
    prompt:
      "Tất cả kỹ sư đều tư duy hệ thống. Một số người tư duy hệ thống thích đọc sách. Kết luận chắc chắn?",
    options: [
      { id: "a", label: "Tất cả kỹ sư thích đọc sách", value: false },
      { id: "b", label: "Một số kỹ sư chắc chắn thích đọc sách", value: false },
      {
        id: "c",
        label: "Không thể kết luận chắc kỹ sư có thích đọc hay không",
        value: true,
      },
      { id: "d", label: "Không kỹ sư nào thích đọc sách", value: false },
    ],
  },
  {
    id: "iq_v10",
    subtest: "VCI · Modus tollens",
    dimension: "vci",
    weight: 1.5,
    format: "binary",
    prompt: "Nếu P đúng thì Q đúng. Biết Q sai. Suy ra?",
    options: [
      { id: "a", label: "P đúng", value: false },
      { id: "b", label: "P sai", value: true },
      { id: "c", label: "P có thể đúng hoặc sai", value: false },
      { id: "d", label: "Q phải đúng", value: false },
    ],
  },
  {
    id: "iq_v11",
    subtest: "VCI · Transitive",
    dimension: "vci",
    weight: 1,
    format: "binary",
    prompt: "Mọi A là B. Mọi B là C. Vậy:",
    options: [
      { id: "a", label: "Mọi C là A", value: false },
      { id: "b", label: "Mọi A là C", value: true },
      { id: "c", label: "Không A nào là C", value: false },
      { id: "d", label: "Một số B không phải C", value: false },
    ],
  },
  {
    id: "iq_v12",
    subtest: "VCI · Comprehension / judgment",
    dimension: "vci",
    weight: 2,
    format: "binary",
    prompt:
      "Ba phương án đầu tư khác nhau về rủi ro và lợi nhuận. Cách suy luận hệ thống nhất?",
    options: [
      { id: "a", label: "Chọn ngay phương án lời cao nhất", value: false },
      { id: "b", label: "Chọn theo cảm giác an toàn nhất", value: false },
      {
        id: "c",
        label:
          "Đối chiếu mục tiêu, khung thời gian, rủi ro chấp nhận được và chi phí cơ hội",
        value: true,
      },
      { id: "d", label: "Chọn theo đa số đồng nghiệp", value: false },
    ],
  },
];

export const IQ_DIMENSIONS: Record<string, string> = {
  vci: "Ngôn ngữ & hiểu khái niệm",
  pri: "Suy luận logic",
  wmi: "Trí nhớ làm việc",
};

/** Correct option id + short proof (QA / audit) */
export const IQ_RATIONALE: Record<string, { answer: string; why: string }> = {
  iq_p01: { answer: "b", why: "+2 arithmetic sequence → 10" },
  iq_p02: { answer: "b", why: "×2 each step → 48" },
  iq_p03: { answer: "b", why: "gaps +4,+6,+8,+10,+12 → 42" },
  iq_p04: { answer: "c", why: "Fibonacci 5+8=13" },
  iq_p05: { answer: "c", why: "+2,+3,+4,+5,+6 letters → U" },
  iq_p06: { answer: "b", why: "5×3=15 row product" },
  iq_p07: { answer: "b", why: "×2 across row → 16" },
  iq_p08: { answer: "b", why: "×2 then −4 alternating → 56" },
  iq_p09: { answer: "c", why: "n! pattern → 720" },
  iq_p10: { answer: "b", why: "4+6=10" },
  iq_p11: { answer: "b", why: "2(L+W)=36, L=2W → W=6,L=12, area=72" },
  iq_p12: { answer: "c", why: "2^4=16 layers" },
  iq_w01: { answer: "b", why: "15+27=42" },
  iq_w02: { answer: "b", why: "0.2×0.2×500=20" },
  iq_w03: { answer: "b", why: "48 person-days / 4 = 12" },
  iq_w04: { answer: "b", why: "1.2×0.8=0.96 → −4%" },
  iq_w05: { answer: "a", why: "1−0.85×0.9=0.235" },
  iq_w06: { answer: "b", why: "(60+18)/6=13" },
  iq_w07: { answer: "b", why: "2/5×40=16" },
  iq_w08: { answer: "a", why: "5×9−2=43" },
  iq_w09: { answer: "b", why: "sorted 1,3,6,8 mid 3+6=9" },
  iq_w10: { answer: "a", why: "C(5,2)=10" },
  iq_v01: { answer: "b", why: "shared category fruit" },
  iq_v02: { answer: "b", why: "shared function timekeeping" },
  iq_v03: { answer: "b", why: "tool:function" },
  iq_v04: { answer: "b", why: "professional:workplace" },
  iq_v05: { answer: "b", why: "only non-animal" },
  iq_v06: { answer: "b", why: "9=3×3 not prime" },
  iq_v07: { answer: "b", why: "effectiveness definition" },
  iq_v08: { answer: "b", why: "affirming the consequent invalid" },
  iq_v09: { answer: "c", why: "undistributed middle" },
  iq_v10: { answer: "b", why: "modus tollens" },
  iq_v11: { answer: "b", why: "transitivity of inclusion" },
  iq_v12: { answer: "c", why: "multi-criteria decision framework" },
};

export const IQ_ANSWER_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(IQ_RATIONALE).map(([id, v]) => [id, v.answer]),
);
