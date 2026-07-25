import type { TestMeta, TestType } from "./types";
import { EQ_QUESTIONS } from "@/data/eq-questions";
import { ENGAGE_QUESTIONS } from "@/data/engage-questions";
import { IQ_QUESTIONS } from "@/data/iq-questions";

export const BRAND = {
  name: "CorePrint",
  tagline: "Hiểu rõ tư duy, cảm xúc và năng lượng trong công việc",
  subtitle: "Bộ kết quả định hướng cho người từ 25 tuổi",
  description:
    "CorePrint giúp bạn hiểu ba mặt quan trọng trong công việc và cuộc sống: khả năng tư duy (IQ), cách nhận biết và xử lý cảm xúc (EQ), cùng mức năng lượng và gắn bó với công việc (Engage). Kết quả đi kèm gợi ý hành động và có thể dùng trong buổi tư vấn CRT.",
};

export const TESTS: Record<TestType, TestMeta> = {
  iq: {
    type: "iq",
    name: "Hồ sơ tư duy (IQ)",
    shortName: "IQ",
    tagline: "Hiểu ngôn ngữ · suy luận · giữ và xử lý thông tin",
    description:
      "34 câu trong khoảng 25 phút. Đo khả năng hiểu ngôn ngữ, suy luận logic và giữ thông tin trong đầu khi xử lý vấn đề. Kết quả chia theo từng nhóm năng lực, không chỉ một con số.",
    duration: "Khoảng 25 phút",
    questionCount: IQ_QUESTIONS.length,
    color: "#1B3A4B",
    accent: "#3D8B9C",
    icon: "brain",
    audienceNote: "Phù hợp khi bạn muốn nhìn rõ điểm mạnh tư duy trước khi chọn hướng việc hoặc học tập.",
    framework: "Xem khả năng tư duy theo ba nhóm",
    benefits: [
      "Thấy rõ nhóm khả năng mạnh và nhóm cần rèn thêm",
      "Có giới hạn thời gian — phản ánh điều kiện làm việc thật",
      "Dùng để định hướng, không thay đánh giá chuyên sâu",
    ],
  },
  eq: {
    type: "eq",
    name: "Hồ sơ cảm xúc (EQ)",
    shortName: "EQ",
    tagline: "Nhận biết · hiểu · xử lý cảm xúc",
    description:
      "20 tình huống thực tế trong khoảng 15–20 phút. Bạn chọn cách ứng xử phù hợp trong công việc và các mối quan hệ. Điểm phản ánh mức độ hiệu quả của cách xử lý, không phải kiểu tính cách bạn thích.",
    duration: "15–20 phút",
    questionCount: EQ_QUESTIONS.length,
    color: "#4A2C40",
    accent: "#C45C7A",
    icon: "heart",
    audienceNote: "Phù hợp với quản lý, chuyên viên và người muốn cải thiện giao tiếp hoặc kỹ năng lãnh đạo.",
    framework: "Xem cách xử lý cảm xúc theo bốn nhóm",
    benefits: [
      "Bốn nhóm: nhận biết, sử dụng, hiểu và quản lý cảm xúc",
      "Gợi ý cách ứng xử cụ thể để tự rèn luyện hoặc trao đổi khi tư vấn",
      "Hỗ trợ lãnh đạo và làm việc nhóm",
    ],
  },
  engage: {
    type: "engage",
    name: "Hồ sơ năng lượng (Engage)",
    shortName: "Engage",
    tagline: "Sức lực · ý nghĩa · tập trung trong công việc",
    description:
      "17 câu ngắn trong khoảng 6–10 phút về công việc gần đây: sức lực, cảm giác có ý nghĩa và khả năng tập trung. Giúp bạn sớm nhận ra dấu hiệu mệt mỏi hoặc mất động lực.",
    duration: "6–10 phút",
    questionCount: ENGAGE_QUESTIONS.length,
    color: "#3D2E1F",
    accent: "#C4783A",
    icon: "flame",
    audienceNote: "Phù hợp khi bạn thấy có dấu hiệu kiệt sức, mất động lực hoặc muốn làm việc bền vững hơn.",
    framework: "Xem năng lượng công việc theo ba nhóm",
    benefits: [
      "Ba nhóm: sức lực, cảm giác có ý nghĩa và tập trung",
      "Câu hỏi ngắn, có kết quả ngay",
      "Gợi ý điều chỉnh nhịp làm việc 90 ngày",
    ],
  },
};

export const TEST_LIST = Object.values(TESTS);
