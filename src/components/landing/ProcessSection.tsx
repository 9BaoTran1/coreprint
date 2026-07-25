const steps = [
  {
    n: "01",
    title: "Làm bài trong điều kiện tốt",
    desc: "Đọc hướng dẫn ngắn, ngồi yên tĩnh, trả lời trung thực. Bài IQ có đồng hồ; EQ và Engage làm theo nhịp của bạn.",
  },
  {
    n: "02",
    title: "Xem kết quả và việc nên ưu tiên",
    desc: "Bạn nhận bức tranh chung, điểm theo từng nhóm khả năng, gợi ý phát triển và mã REF để dùng khi đăng ký tư vấn.",
  },
  {
    n: "03",
    title: "Đặt buổi CRT 1:1",
    desc: "Điền biểu mẫu đăng ký, kèm mã REF và 1–2 mục tiêu. Nhờ đó, buổi trao đổi có thể đi thẳng vào điều bạn đang cần.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page">
        <div className="text-center">
          <span className="section-label">Quy trình</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Ba bước: làm bài → xem kết quả → tư vấn
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Một quy trình đơn giản để biến kết quả thành hành động phù hợp.
          </p>
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
