import type { TestProtocol, TestType } from "./types";

export const PROTOCOLS: Record<TestType, TestProtocol> = {
  iq: {
    format: "binary",
    timeLimitSeconds: 25 * 60,
    itemPointMax: 1,
    allowBack: true,
    estimatedMinutes: "20–25",
    standardizationNote:
      "Bài tư duy của CorePrint gồm 34 câu và có giới hạn 25 phút. Kết quả được chia theo khả năng hiểu ngôn ngữ, suy luận và giữ thông tin trong đầu khi giải quyết vấn đề. Kết quả chỉ dùng để định hướng phát triển, không phải đánh giá chuyên sâu.",
    instructions: [
      "Có 34 câu, chia ba nhóm: hiểu ngôn ngữ, suy luận logic, và giữ – xử lý thông tin.",
      "Mỗi câu chỉ có một đáp án đúng. Một số câu khó hơn sẽ được tính nhiều điểm hơn.",
      "Bạn có tối đa 25 phút. Hết giờ hệ thống sẽ nộp phần đã trả lời.",
      "Nên ngồi yên tĩnh, một mình, không dùng máy tính, AI hay tra cứu.",
      "Có thể quay lại câu trước nếu còn thời gian.",
    ],
    rules: [
      "Không nhờ người khác hoặc tra cứu — kết quả mới đáng tin để tư vấn",
      "Làm hết sức trong 25 phút; chưa kịp làm cũng không sao",
      "Nếu cần kết luận chuyên sâu, hãy gặp chuyên gia có đủ chuyên môn và chứng chỉ",
    ],
  },
  eq: {
    format: "sjt",
    timeLimitSeconds: null,
    itemPointMax: 2,
    allowBack: true,
    estimatedMinutes: "15–20",
    standardizationNote:
      "Bài EQ gồm 20 tình huống thực tế. Bạn chọn cách ứng xử phù hợp; điểm phản ánh mức độ hiệu quả khi xử lý cảm xúc và tương tác với người khác, không phải kiểu tính cách bạn thích.",
    instructions: [
      "Đọc kỹ từng tình huống trước khi chọn đáp án.",
      "Chọn hành vi bạn sẽ làm (hoặc nên làm) để xử lý hiệu quả, không tô hồng cho “đẹp”.",
      "Bốn nhóm được xem xét: nhận biết cảm xúc, vận dụng cảm xúc khi làm việc, hiểu cảm xúc thay đổi ra sao và điều chỉnh cảm xúc.",
      "Một số đáp án tốt hơn đáp án khác — không phải mọi lựa chọn ngang nhau.",
      "Có thể quay lại câu trước để chỉnh nếu cần.",
    ],
    rules: [
      "Trả lời trung thực theo cách bạn thường xử lý (hoặc cách hiệu quả nhất bạn tin)",
      "Đọc hết tình huống trước khi chọn",
      "Kết quả dùng để phát triển và tư vấn, không thay bài có bản quyền do chuyên gia thực hiện",
    ],
  },
  engage: {
    format: "likert",
    timeLimitSeconds: null,
    itemPointMax: 6,
    likertMax: 6,
    allowBack: true,
    estimatedMinutes: "6–10",
    standardizationNote:
      "Bài Engage gồm 17 câu về công việc trong khoảng 3–6 tháng gần đây. Bạn chọn mức từ “không bao giờ” đến “luôn luôn”.",
    instructions: [
      "Nghĩ về vai trò công việc chính trong 3–6 tháng gần đây.",
      "Có 17 câu thuộc ba nhóm: sức lực, cảm giác công việc có ý nghĩa và khả năng tập trung.",
      "Chọn mức độ từ 0 (không bao giờ) đến 6 (luôn luôn) cho mỗi câu.",
      "Không có đáp án đúng hoặc sai. Trả lời trung thực giúp phản ánh đúng tình trạng hiện tại.",
      "Có thể quay lại chỉnh câu trước.",
    ],
    rules: [
      "Trung thực — tô hồng sẽ che dấu dấu hiệu mệt mỏi hoặc mất động lực",
      "Nếu đang nghỉ việc: hãy nghĩ về công việc gần nhất kéo dài từ 3 tháng trở lên",
      "Kết quả chỉ hỗ trợ nhìn lại công việc, không thay tư vấn y tế",
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
