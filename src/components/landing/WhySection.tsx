import { Compass, Lightbulb, Target, Timer } from "lucide-react";

const items = [
  {
    icon: Timer,
    title: "Bớt mơ hồ khi cần quyết định",
    desc: "Thay vì chỉ thấy “có gì đó không ổn”, bạn có thông tin ban đầu về tư duy, cảm xúc và năng lượng để trao đổi đúng trọng tâm.",
  },
  {
    icon: Lightbulb,
    title: "Kết quả cụ thể, không sáo rỗng",
    desc: "Mỗi bài cho bạn bức tranh chung, điểm theo từng nhóm khả năng và gợi ý cụ thể — không chỉ là một con số.",
  },
  {
    icon: Target,
    title: "Chốt 1–2 việc trong 90 ngày",
    desc: "Kết quả miễn phí là điểm bắt đầu. Buổi tư vấn CRT giúp chọn 1–2 việc có tác động lớn, thay vì một danh sách dài khó thực hiện.",
  },
  {
    icon: Compass,
    title: "Nhìn toàn diện, không dán nhãn",
    desc: "Tư duy tốt chưa chắc đã đủ nếu bạn khó xử lý cảm xúc. Gắn bó với công việc cũng có thể đi kèm làm quá sức. CorePrint xem cả ba mặt cùng lúc.",
  },
];

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="section-label">Vì sao chọn CorePrint</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Kết quả miễn phí, rõ ràng và dùng được
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Các bài được xây dựng dựa trên những cách đo được sử dụng rộng rãi trên thế
            giới. Câu hỏi do CorePrint soạn riêng, không sao chép bài có bản quyền. Kết
            quả đủ để bạn và người tư vấn bắt đầu một cuộc trao đổi nghiêm túc, không
            phải bài vui để dán nhãn tính cách.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="glass-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
