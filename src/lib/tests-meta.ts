import type { TestMeta, TestType } from "./types";
import { EQ_QUESTIONS } from "@/data/eq-questions";
import { ENGAGE_QUESTIONS } from "@/data/engage-questions";
import { IQ_QUESTIONS } from "@/data/iq-questions";

export const BRAND = {
  name: "CorePrint",
  tagline: "Hiểu rõ ba trục: tư duy · cảm xúc · năng lượng",
  subtitle: "Hồ sơ định hướng cho người 25+",
  description:
    "CorePrint giúp bạn đo nhanh ba trục quan trọng trong công việc và cuộc sống: tư duy (IQ), trí tuệ cảm xúc (EQ) và mức gắn kết – năng lượng (Engage). Kết quả kèm gợi ý hành động, sẵn sàng mang vào buổi tư vấn CRT.",
};

export const TESTS: Record<TestType, TestMeta> = {
  iq: {
    type: "iq",
    name: "Hồ sơ tư duy (IQ)",
    shortName: "IQ",
    tagline: "Ngôn ngữ · suy luận · trí nhớ làm việc",
    description:
      "34 câu trong khoảng 25 phút. Đo khả năng hiểu ngôn ngữ, suy luận logic và giữ thông tin trong đầu khi xử lý vấn đề. Kết quả chia theo từng nhóm năng lực, không chỉ một con số.",
    duration: "Khoảng 25 phút",
    questionCount: IQ_QUESTIONS.length,
    color: "#1B3A4B",
    accent: "#3D8B9C",
    icon: "brain",
    audienceNote: "Phù hợp khi bạn muốn nhìn rõ điểm mạnh tư duy trước khi chọn hướng việc hoặc học tập.",
    framework: "Bám cấu trúc đánh giá nhận thức chuẩn (tham chiếu WAIS)",
    benefits: [
      "Thấy rõ nhóm năng lực mạnh / cần bồi đắp",
      "Có giới hạn thời gian — phản ánh điều kiện làm việc thật",
      "Dùng cho định hướng, không thay đánh giá lâm sàng",
    ],
  },
  eq: {
    type: "eq",
    name: "Hồ sơ cảm xúc (EQ)",
    shortName: "EQ",
    tagline: "Nhận diện · hiểu · điều tiết cảm xúc",
    description:
      "20 tình huống thực tế (khoảng 15–20 phút). Bạn chọn cách ứng xử phù hợp trong công việc và quan hệ. Điểm theo mức độ hiệu quả của hành vi, không phải “thích kiểu nào”.",
    duration: "15–20 phút",
    questionCount: EQ_QUESTIONS.length,
    color: "#4A2C40",
    accent: "#C45C7A",
    icon: "heart",
    audienceNote: "Phù hợp lead, chuyên viên và ai muốn cải thiện giao tiếp – lãnh đạo.",
    framework: "Bám mô hình năng lực cảm xúc (tham chiếu MSCEIT / ESCI)",
    benefits: [
      "Bốn nhóm: nhận biết, sử dụng, hiểu và quản lý cảm xúc",
      "Gợi ý hành vi cụ thể cho coach và bản thân",
      "Hỗ trợ lãnh đạo và làm việc nhóm",
    ],
  },
  engage: {
    type: "engage",
    name: "Hồ sơ năng lượng (Engage)",
    shortName: "Engage",
    tagline: "Sức sống · gắn kết · tập trung trong việc",
    description:
      "17 câu ngắn (khoảng 6–10 phút) về cảm nhận công việc gần đây: mức năng lượng, ý nghĩa và sự chìm đắm trong việc. Giúp nhận diện nguy cơ kiệt sức hoặc mất động lực sớm.",
    duration: "6–10 phút",
    questionCount: ENGAGE_QUESTIONS.length,
    color: "#3D2E1F",
    accent: "#C4783A",
    icon: "flame",
    audienceNote: "Phù hợp khi bạn nghi ngờ burnout, mất lửa, hoặc muốn cân bằng hiệu suất.",
    framework: "Bám thang đo gắn kết công việc chuẩn (tham chiếu UWES-17)",
    benefits: [
      "Ba trụ: sức sống, gắn kết, tập trung",
      "Dễ làm, kết quả ngay",
      "Gợi ý điều chỉnh nhịp làm việc 90 ngày",
    ],
  },
};

export const TEST_LIST = Object.values(TESTS);
