import type { TestProtocol, TestType } from "./types";

export const PROTOCOLS: Record<TestType, TestProtocol> = {
  iq: {
    format: "binary",
    timeLimitSeconds: 25 * 60,
    itemPointMax: 1,
    allowBack: true,
    estimatedMinutes: "20–25",
    standardizationNote:
      "Bài đo tư duy của CorePrint gồm 34 câu, có giới hạn 25 phút. Kết quả chia theo ngôn ngữ, suy luận và trí nhớ làm việc — mang tính định hướng, không thay đánh giá lâm sàng chính thức.",
    instructions: [
      "Có 34 câu, chia ba nhóm: hiểu ngôn ngữ, suy luận logic, và giữ – xử lý thông tin.",
      "Mỗi câu chỉ có một đáp án đúng. Một số câu khó hơn sẽ được tính trọng số cao hơn.",
      "Bạn có tối đa 25 phút. Hết giờ hệ thống sẽ nộp phần đã trả lời.",
      "Nên ngồi yên tĩnh, một mình, không dùng máy tính, AI hay tra cứu.",
      "Có thể quay lại câu trước nếu còn thời gian.",
    ],
    rules: [
      "Không nhờ người khác hoặc tra cứu — kết quả mới đáng tin để tư vấn",
      "Làm hết sức trong 25 phút; chưa kịp làm cũng không sao",
      "Cần đánh giá lâm sàng chính thức: gặp chuyên gia có chứng chỉ phù hợp",
    ],
  },
  eq: {
    format: "sjt",
    timeLimitSeconds: null,
    itemPointMax: 2,
    allowBack: true,
    estimatedMinutes: "15–20",
    standardizationNote:
      "Bài EQ gồm 20 tình huống thực tế. Bạn chọn cách ứng xử phù hợp; điểm phản ánh mức độ hiệu quả của hành vi cảm xúc – xã hội, không phải “tính cách bạn thích”.",
    instructions: [
      "Đọc kỹ từng tình huống trước khi chọn đáp án.",
      "Chọn hành vi bạn sẽ làm (hoặc nên làm) để xử lý hiệu quả, không tô hồng cho “đẹp”.",
      "Bốn nhóm năng lực: nhận biết cảm xúc, dùng cảm xúc hỗ trợ việc, hiểu chuỗi cảm xúc, và điều tiết cảm xúc.",
      "Một số đáp án tốt hơn đáp án khác — không phải mọi lựa chọn ngang nhau.",
      "Có thể quay lại câu trước để chỉnh nếu cần.",
    ],
    rules: [
      "Trả lời trung thực theo cách bạn thường xử lý (hoặc cách hiệu quả nhất bạn tin)",
      "Đọc hết tình huống trước khi chọn",
      "Kết quả dùng cho phát triển & tư vấn, không thay bài đo chính thức có bản quyền",
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
      "Bài Engage gồm 17 câu về cảm nhận công việc gần đây (khoảng 3–6 tháng). Thang điểm từ “không bao giờ” đến “luôn luôn”.",
    instructions: [
      "Nghĩ về vai trò công việc chính trong 3–6 tháng gần đây.",
      "Có 17 câu thuộc ba nhóm: sức sống, sự gắn kết, và mức tập trung / chìm đắm trong việc.",
      "Chọn mức độ từ 0 (không bao giờ) đến 6 (luôn luôn) cho mỗi câu.",
      "Không có đáp án đúng – sai; trung thực giúp nhận diện năng lượng thật.",
      "Có thể quay lại chỉnh câu trước.",
    ],
    rules: [
      "Trung thực — tô hồng sẽ che dấu dấu hiệu mệt mỏi hoặc mất động lực",
      "Nếu đang nghỉ việc: hãy nghĩ về công việc gần nhất kéo dài từ 3 tháng trở lên",
      "Kết quả mang tính định hướng sức khỏe nghề nghiệp, không thay tư vấn y tế",
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
