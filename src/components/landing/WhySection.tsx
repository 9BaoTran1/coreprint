import { Compass, Lightbulb, Target, Timer } from "lucide-react";

const items = [
  {
    icon: Timer,
    title: "Bớt mơ hồ khi cần quyết định",
    desc: "Thay vì chỉ “cảm giác không ổn”, bạn có điểm xuất phát rõ về tư duy, cảm xúc và năng lượng — đủ để nói chuyện có trọng tâm.",
  },
  {
    icon: Lightbulb,
    title: "Kết quả cụ thể, không sáo rỗng",
    desc: "Mỗi bài cho mức tổng quan, chi tiết theo từng nhóm năng lực, và gợi ý hành vi — không dừng ở một con số.",
  },
  {
    icon: Target,
    title: "Chốt 1–2 việc trong 90 ngày",
    desc: "Bài đo free là bản đồ. Buổi tư vấn CRT giúp chọn đòn bẩy thật sự, thay vì checklist dài không ai làm nổi.",
  },
  {
    icon: Compass,
    title: "Nhìn cả hệ, không dán nhãn",
    desc: "Tư duy mạnh chưa đủ nếu EQ thấp. Gắn kết cao đôi khi là làm quá sức. CorePrint nhìn ba trục cùng lúc.",
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
              Đo miễn phí có cấu trúc — mở được buổi tư vấn thật
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Chúng tôi tham chiếu khung đo quốc tế cho tư duy, trí tuệ cảm xúc và gắn
            kết công việc; câu hỏi được soạn riêng, không sao chép bài có bản quyền.
            Đủ sâu để coach và chuyên viên tư vấn 25+ có căn cứ — không phải quiz giải trí.
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
