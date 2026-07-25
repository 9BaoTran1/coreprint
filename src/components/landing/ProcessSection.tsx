const steps = [
  {
    n: "01",
    title: "Đọc protocol & đo nghiêm túc",
    desc: "Hướng dẫn điều kiện đo (yên tĩnh, không tra cứu, IQ có giờ). Trả lời trung thực — không “cho đẹp”.",
  },
  {
    n: "02",
    title: "Báo cáo + consultation brief",
    desc: "Index/branch, band theo chuẩn tham chiếu, priority severity, câu hỏi coach, hành động 90 ngày.",
  },
  {
    n: "03",
    title: "CRT tư vấn 1:1 trên dữ liệu",
    desc: "Đăng ký form CRT, mang REF + brief. Buổi nói chuyện đi thẳng trọng tâm — không bắt đầu từ con số không.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page">
        <div className="text-center">
          <span className="section-label">3 bước gọn</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Đo → brief → CRT tư vấn
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative glass-card p-6 md:p-7">
              {i < steps.length - 1 && (
                <div className="absolute right-[-12px] top-1/2 z-10 hidden h-px w-6 bg-line md:block" />
              )}
              <p className="font-display text-4xl font-semibold text-accent/30">{s.n}</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
