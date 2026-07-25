import { Compass, Lightbulb, Target, Timer } from "lucide-react";

const items = [
  {
    icon: Timer,
    title: "Tiết kiệm vòng loay hoay",
    desc: "Thay vì “cảm giác mơ hồ”, bạn có dữ liệu ban đầu về tư duy, cảm xúc và động lực — điểm khởi đầu rõ cho quyết định 25+.",
  },
  {
    icon: Lightbulb,
    title: "Insight tức thì, không sáo rỗng",
    desc: "Mỗi bài test trả về band, radar chiều, và gợi ý hành vi cụ thể — không chỉ một con số đơn lẻ.",
  },
  {
    icon: Target,
    title: "Neo vào hành động 90 ngày",
    desc: "Kết quả free là bản đồ sơ bộ. Buổi tư vấn giúp ưu tiên 1–2 đòn bẩy thay vì checklist 20 mục không làm được.",
  },
  {
    icon: Compass,
    title: "Đa chiều, không một nhãn dán",
    desc: "IQ cao không đủ nếu EQ thấp. Engage cao có thể là overwork. CorePrint nhìn cả hệ — không gắn nhãn cứng.",
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
              Concept tương tự personal test — nhưng sâu và đa dạng hơn
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            CorePrint căn cấu trúc theo công cụ quốc tế có chuẩn hóa / chứng chỉ hành nghề:
            <strong className="text-ink"> WAIS-IV</strong> (Pearson),{" "}
            <strong className="text-ink">MSCEIT + ESCI</strong> (MHS / Korn Ferry),{" "}
            <strong className="text-ink">UWES-17</strong> (Schaufeli). Item original — không thay
            bản official; đủ sâu để tư vấn 25+ có căn cứ.
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
