/**
 * CORE EQ BATTERY — MSCEIT 4-branch ability model (Mayer–Salovey–Caruso / MHS)
 * =============================================================================
 * Branch 1 Perceiving   — identify emotion in self/others/context (text scenarios)
 * Branch 2 Facilitating — match mood to cognitive task (facilitation science)
 * Branch 3 Understanding — blends, progressions, causes (emotion knowledge)
 * Branch 4 Managing     — regulate self & others (best response SJT)
 *
 * Scoring: expert-keyed partial credit 0 / 1 / 2 (SJT best practice)
 *   2 = maximally effective per ability EI + leadership research
 *   1 = partially effective / incomplete
 *   0 = counterproductive
 *
 * Secondary map → ESCI clusters (Goleman/Boyatzis–Korn Ferry) in EQ_TO_ESCI
 * ORIGINAL scenarios — not MSCEIT item content
 */
import type { Question } from "@/lib/types";

export const EQ_QUESTIONS: Question[] = [
  // ── Perceiving (5) ───────────────────────────────────────────
  {
    id: "eq_p1",
    format: "sjt",
    dimension: "perceiving",
    scenario:
      "Đồng nghiệp vốn hay góp ý, hôm nay khoanh tay, tránh mắt, trả lời cụt trong họp, rời phòng ngay khi hết agenda.",
    prompt: "Cảm xúc/trạng thái khả dĩ nhất cần giả định trước?",
    options: [
      { id: "a", label: "Họ chắc đang tức riêng bạn — đối đầu ngay", value: 0 },
      {
        id: "b",
        label:
          "Có tín hiệu khó chịu / rút lui / căng (stress, conflict, mệt) — cần kiểm chứng, chưa gán nhãn chắc",
        value: 2,
      },
      { id: "c", label: "Họ không có cảm xúc — chỉ bận nghĩ việc", value: 1 },
      { id: "d", label: "Im lặng = đồng ý hoàn toàn", value: 0 },
    ],
  },
  {
    id: "eq_p2",
    format: "sjt",
    dimension: "perceiving",
    scenario:
      "Sau pitch, sếp mỉm cười mỏng, gật nhẹ, chuyển topic rất nhanh, không hỏi follow-up.",
    prompt: "Đọc tín hiệu đúng nhất?",
    options: [
      { id: "a", label: "Sếp cực kỳ ấn tượng, sẽ approve ngay", value: 0 },
      {
        id: "b",
        label:
          "Lịch sự xã giao / chưa engage sâu — có thể chưa thuyết phục hoặc đang ưu tiên việc khác",
        value: 2,
      },
      { id: "c", label: "Sếp đang giận ngấm — chắc chắn", value: 0 },
      { id: "d", label: "Bỏ qua mọi tín hiệu non-verbal", value: 1 },
    ],
  },
  {
    id: "eq_p3",
    format: "sjt",
    dimension: "perceiving",
    scenario:
      "Bạn vừa bị feedback công khai. Tim đập nhanh, vai căng, giọng hơi cộc — miệng vẫn nói «không sao».",
    prompt: "Nhận diện đúng với bản thân?",
    options: [
      { id: "a", label: "Mình ổn 100% vì đã nói không sao", value: 0 },
      {
        id: "b",
        label:
          "Cơ thể đang báo stress / xấu hổ / phòng thủ — cần đặt tên cảm xúc trước khi phản ứng tiếp",
        value: 2,
      },
      { id: "c", label: "Chỉ thiếu caffeine", value: 0 },
      { id: "d", label: "Cảm xúc không liên quan công việc", value: 0 },
    ],
  },
  {
    id: "eq_p4",
    format: "sjt",
    dimension: "perceiving",
    scenario:
      "Khách gật gù nhiều nhưng hỏi vòng vo về timeline và «team bên em lo được chứ?»",
    prompt: "Lo ngại ngầm khả dĩ?",
    options: [
      { id: "a", label: "Họ tin tưởng tuyệt đối — chốt deal ngay", value: 0 },
      {
        id: "b",
        label: "E ngại rủi ro / capacity — làm rõ lo thật trước khi cam kết",
        value: 2,
      },
      { id: "c", label: "Chỉ muốn giảm giá, không lo gì khác", value: 1 },
      { id: "d", label: "Họ đang trêu", value: 0 },
    ],
  },
  {
    id: "eq_p5",
    format: "sjt",
    dimension: "perceiving",
    scenario:
      "Trong 1:1, junior nói «em ổn» nhưng mắt đỏ, gãi tay liên tục, trả lời lạc đề khi hỏi deadline.",
    prompt: "Ưu tiên nhận diện?",
    options: [
      { id: "a", label: "Tin 100% lời nói, bỏ tín hiệu cơ thể", value: 0 },
      {
        id: "b",
        label:
          "Lệch lời nói–cơ thể: có khả năng lo/sợ/quá tải — mở không gian an toàn để nói thật",
        value: 2,
      },
      { id: "c", label: "Họ đang nói dối cố ý hại team", value: 0 },
      { id: "d", label: "Chỉ là tính cách nhút nhát, bỏ qua", value: 1 },
    ],
  },

  // ── Facilitating (5) ─────────────────────────────────────────
  {
    id: "eq_f1",
    format: "sjt",
    dimension: "facilitating",
    scenario:
      "Cần brainstorm campaign mới 45 phút; team vừa hết sprint mệt.",
    prompt: "Trạng thái cảm xúc hỗ trợ task sáng tạo tốt hơn?",
    options: [
      { id: "a", label: "Sợ bị chê để «tập trung»", value: 0 },
      {
        id: "b",
        label:
          "Tò mò + an toàn tâm lý nhẹ — cảm xúc tích cực mở rộng ý tưởng (broaden-and-build)",
        value: 2,
      },
      { id: "c", label: "Khích lệ giận cạnh tranh nội bộ", value: 0 },
      { id: "d", label: "Im lặng tuyệt đối 45’ không tương tác", value: 1 },
    ],
  },
  {
    id: "eq_f2",
    format: "sjt",
    dimension: "facilitating",
    scenario: "Phải rà soát hợp đồng / chi tiết pháp lý dễ sai sót.",
    prompt: "Mindset / cảm xúc hữu ích hơn?",
    options: [
      { id: "a", label: "Hưng phấn cao, nhảy nhiều tab", value: 0 },
      {
        id: "b",
        label:
          "Bình tĩnh, hơi thận trọng — caution hỗ trợ phát hiện lỗi chi tiết",
        value: 2,
      },
      { id: "c", label: "Tức legal team để có động lực", value: 0 },
      { id: "d", label: "Buồn nặng, thờ ơ outcome", value: 0 },
    ],
  },
  {
    id: "eq_f3",
    format: "sjt",
    dimension: "facilitating",
    scenario: "Sắp pitch nhà đầu tư; vừa lo vừa hứng.",
    prompt: "Dùng cảm xúc hỗ trợ performance?",
    options: [
      { id: "a", label: "Che hoàn toàn, giả robot", value: 1 },
      {
        id: "b",
        label:
          "Tái đánh nhãn lo → «năng lượng sẵn sàng»; giữ tự tin vừa, không phủ nhận lo",
        value: 2,
      },
      { id: "c", label: "Kể hết nỗi sợ 10 phút đầu pitch", value: 0 },
      { id: "d", label: "Stimulant đến mức run tay", value: 0 },
    ],
  },
  {
    id: "eq_f4",
    format: "sjt",
    dimension: "facilitating",
    scenario: "Team vừa fail milestone; họp post-mortem.",
    prompt: "Khung cảm xúc giúp học bài học?",
    options: [
      { id: "a", label: "Xấu hổ + đổ lỗi công khai", value: 0 },
      {
        id: "b",
        label:
          "An toàn vừa đủ để nói sự thật + tò mò phân tích (không tiệc vui giả)",
        value: 2,
      },
      { id: "c", label: "Phủ nhận fail, chỉ nói điểm tốt", value: 0 },
      { id: "d", label: "Im lặng 1 tuần", value: 0 },
    ],
  },
  {
    id: "eq_f5",
    format: "sjt",
    dimension: "facilitating",
    scenario:
      "Bạn cần thuyết phục stakeholder bảo thủ đổi process; dữ liệu đã rõ.",
    prompt: "Trạng thái nào hỗ trợ ảnh hưởng tốt hơn?",
    options: [
      { id: "a", label: "Khinh bỉ «họ lạc hậu»", value: 0 },
      {
        id: "b",
        label:
          "Tò mò về lo của họ + bình tĩnh kiên nhẫn — giảm phòng thủ, tăng nghe",
        value: 2,
      },
      { id: "c", label: "Sợ hãi sẽ bị từ chối nên không mở miệng", value: 0 },
      { id: "d", label: "Hào hứng thái quá, bỏ qua concern", value: 1 },
    ],
  },

  // ── Understanding (5) ────────────────────────────────────────
  {
    id: "eq_u1",
    format: "sjt",
    dimension: "understanding",
    scenario:
      "Junior ban đầu hào hứng project → sau 1 tháng cáu → rồi thờ ơ, tránh task mới.",
    prompt: "Chuỗi cảm xúc khả dĩ nhất?",
    options: [
      { id: "a", label: "Vui → vui hơn → vui nhất", value: 0 },
      {
        id: "b",
        label:
          "Hứng thú → frustration khi vướng → rút lui / cynicism (disengagement)",
        value: 2,
      },
      { id: "c", label: "Tính cách đổi ngẫu nhiên", value: 0 },
      { id: "d", label: "Ghen từ ngày đầu — chắc chắn", value: 1 },
    ],
  },
  {
    id: "eq_u2",
    format: "sjt",
    dimension: "understanding",
    scenario:
      "Được khen công khai nhưng vừa tự hào vừa bất an.",
    prompt: "Hiểu mixed emotions?",
    options: [
      { id: "a", label: "Không thể vừa tự hào vừa bất an", value: 0 },
      {
        id: "b",
        label:
          "Bình thường: tự hào thành quả + lo kỳ vọng/áp lực duy trì",
        value: 2,
      },
      { id: "c", label: "Chỉ giả tạo — cảm xúc thật duy nhất là sợ", value: 0 },
      { id: "d", label: "Bất an = không xứng đáng tuyệt đối", value: 1 },
    ],
  },
  {
    id: "eq_u3",
    format: "sjt",
    dimension: "understanding",
    scenario:
      "Đồng nghiệp bị sếp chỉ trích; sau đó lạnh với cả team, không chỉ với sếp.",
    prompt: "Cơ chế cảm xúc giải thích tốt?",
    options: [
      { id: "a", label: "Xấu tính bẩm sinh", value: 0 },
      {
        id: "b",
        label:
          "Xấu hổ/tổn thương → phòng thủ lan (displacement) — cần repair an toàn",
        value: 2,
      },
      { id: "c", label: "Họ không có cảm xúc", value: 0 },
      { id: "d", label: "Chỉ muốn nghỉ việc, không liên quan feedback", value: 1 },
    ],
  },
  {
    id: "eq_u4",
    format: "sjt",
    dimension: "understanding",
    scenario:
      "Hai founder cãi: một nhấn «tôn trọng process», một nhấn «tốc độ market».",
    prompt: "Lõi nhu cầu dưới position?",
    options: [
      { id: "a", label: "Một đúng một sai tuyệt đối", value: 0 },
      {
        id: "b",
        label:
          "Cùng lo outcome: một sợ chaos/rủi ro, một sợ bỏ lỡ — interest khác, không chỉ cứng đầu",
        value: 2,
      },
      { id: "c", label: "Chỉ ego, không nhu cầu thật", value: 0 },
      { id: "d", label: "Ai to tiếng hơn thì đúng", value: 0 },
    ],
  },
  {
    id: "eq_u5",
    format: "sjt",
    dimension: "understanding",
    scenario:
      "Cảm xúc nào gần với «vừa giận người ấy vừa sợ mất quan hệ»?",
    prompt: "Hiểu blend / phức hợp?",
    options: [
      { id: "a", label: "Chỉ là giận — sợ không liên quan", value: 0 },
      {
        id: "b",
        label:
          "Ambivalence: giận (ranh giới bị vượt) + lo gắn kết — cần nói cả hai",
        value: 2,
      },
      { id: "c", label: "Không tồn tại cảm xúc kép", value: 0 },
      { id: "d", label: "Chỉ là yếu đuối", value: 0 },
    ],
  },

  // ── Managing (5) ─────────────────────────────────────────────
  {
    id: "eq_m1",
    format: "sjt",
    dimension: "managing",
    scenario: "Email khách gay gắt; bạn bực, đã mở ô reply.",
    prompt: "Chiến lược quản cảm xúc + quan hệ tốt nhất?",
    options: [
      { id: "a", label: "Reply ngay để dằn mặt", value: 0 },
      {
        id: "b",
        label:
          "Delay ≥20–30’ (hoặc qua đêm nếu không khẩn), nháp, soạn lại hướng giải quyết + ranh giới lịch sự",
        value: 2,
      },
      { id: "c", label: "Ignore vĩnh viễn", value: 0 },
      { id: "d", label: "Forward sếp kèm comment xúc cảm, không đề xuất", value: 1 },
    ],
  },
  {
    id: "eq_m2",
    format: "sjt",
    dimension: "managing",
    scenario: "Junior sai ảnh hưởng client; họ sợ bị mắng.",
    prompt: "Quản cảm xúc họ + sửa việc?",
    options: [
      { id: "a", label: "Chỉ trích tính cách trước team", value: 0 },
      {
        id: "b",
        label:
          "Tách người–hành vi; impact rõ; plan sửa + checklist; giữ phẩm giá",
        value: 2,
      },
      { id: "c", label: "Giấu lỗi, không cho học", value: 0 },
      { id: "d", label: "Chỉ bảo «đừng tái phạm»", value: 1 },
    ],
  },
  {
    id: "eq_m3",
    format: "sjt",
    dimension: "managing",
    scenario: "Conflict Product vs Engineering về ship date; họp nóng.",
    prompt: "Quản cảm xúc nhóm + quyết định?",
    options: [
      { id: "a", label: "Chọn phe quyền lực hơn", value: 0 },
      {
        id: "b",
        label:
          "Hạ nhiệt → làm rõ risk/interest → option thỏa impact & an toàn kỹ thuật",
        value: 2,
      },
      { id: "c", label: "Hoãn vô thời hạn", value: 0 },
      { id: "d", label: "Cắt đôi scope không tiêu chí", value: 1 },
    ],
  },
  {
    id: "eq_m4",
    format: "sjt",
    dimension: "managing",
    scenario: "Lead change process; 30% team kháng cự.",
    prompt: "Quản cảm xúc tổ chức?",
    options: [
      { id: "a", label: "Ép tuân thủ, gắn mác toxic", value: 0 },
      {
        id: "b",
        label:
          "Lắng nghe lo; chỉnh design nếu hợp lý; nêu non-negotiable; early adopter",
        value: 2,
      },
      { id: "c", label: "Hủy change để được lòng", value: 0 },
      { id: "d", label: "Chỉ gửi slide, không đối thoại", value: 1 },
    ],
  },
  {
    id: "eq_m5",
    format: "sjt",
    dimension: "managing",
    scenario:
      "Bạn nhận feedback: «Bạn hay ngắt lời khi căng». Bạn tin là không.",
    prompt: "Tự quản + học tốt nhất?",
    options: [
      { id: "a", label: "Bác bỏ: người khác mới ngắt lời", value: 0 },
      {
        id: "b",
        label:
          "Cảm ơn, xin ví dụ, tự quan sát 1–2 tuần họp trước khi kết luận",
        value: 2,
      },
      { id: "c", label: "Đồng ý ngay cho xong, không đổi gì", value: 0 },
      { id: "d", label: "Chỉ hỏi người thân (dễ thiên vị)", value: 1 },
    ],
  },
];

export const EQ_DIMENSIONS: Record<string, string> = {
  perceiving: "MSCEIT Branch 1 · Perceiving Emotions",
  facilitating: "MSCEIT Branch 2 · Facilitating Thought",
  understanding: "MSCEIT Branch 3 · Understanding Emotions",
  managing: "MSCEIT Branch 4 · Managing Emotions",
};

export const EQ_TO_ESCI: Record<string, string> = {
  perceiving: "ESCI · Self-awareness + Social awareness (đọc tín hiệu)",
  facilitating: "ESCI · Self-management (dùng cảm xúc cho performance)",
  understanding: "ESCI · Empathy / Social awareness (hiểu sâu)",
  managing: "ESCI · Relationship management (influence, conflict, coach)",
};

/** Audit: max points per item must be 2; unique best option */
export const EQ_KEY_AUDIT = EQ_QUESTIONS.map((q) => {
  const scores = q.options.map((o) => Number(o.value));
  const best = q.options.filter((o) => o.value === 2);
  return {
    id: q.id,
    max: Math.max(...scores),
    bestCount: best.length,
    bestId: best[0]?.id,
  };
});
