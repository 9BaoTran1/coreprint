import { Compass, Lightbulb, Target, Timer } from "lucide-react";

const items = [
  {
    icon: Timer,
    title: "Bớt mơ hồ khi quyết định",
    desc: "Thay vì “cảm giác không ổn”, bạn có điểm xuất phát về tư duy, cảm xúc và năng lượng — đủ để nói chuyện có trọng tâm.",
  },
  {
    icon: Lightbulb,
    title: "Insight rõ, không sáo",
    desc: "Mỗi bài cho band, các chiều/index, và gợi ý hành vi — không chỉ một con số rồi thôi.",
  },
  {
    icon: Target,
    title: "Chốt 1–2 việc / 90 ngày",
    desc: "Test free là bản đồ. Buổi CRT giúp chọn đòn bẩy thay vì list 20 mục không ai làm nổi.",
  },
  {
    icon: Compass,
    title: "Nhìn cả hệ, không dán nhãn",
    desc: "IQ cao chưa đủ nếu EQ thấp. Engage cao đôi khi là overwork. CorePrint nhìn ba trục cùng lúc.",
  },
];

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="section-label">Vì sao CorePrint</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Đo free có cấu trúc — mở được buổi CRT
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Bám khung công cụ chuẩn:{" "}
            <strong className="text-ink">WAIS-IV</strong> (IQ),{" "}
            <strong className="text-ink">MSCEIT / ESCI</strong> (EQ),{" "}
            <strong className="text-ink">UWES-17</strong> (Engage). Item original — không thay bản
            official; đủ sâu để coach/tư vấn 25+ có căn cứ, không phải quiz “cho vui”.
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
