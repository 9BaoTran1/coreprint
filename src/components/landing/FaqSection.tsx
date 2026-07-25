const faqs = [
  {
    q: "Bài test có miễn phí không?",
    a: "Có. IQ, EQ và Engage đều free trên web. Bạn chỉ cần đăng ký form khi muốn buổi CRT tư vấn 1:1.",
  },
  {
    q: "Kết quả có phải IQ/EQ “chính thức” không?",
    a: "Không. CorePrint bám cấu trúc chuẩn (WAIS / MSCEIT·ESCI / UWES) với item original — dùng định hướng và tư vấn, không thay bài có license hay chẩn đoán lâm sàng.",
  },
  {
    q: "REF là gì? Mang đi đâu?",
    a: "REF là mã tóm tắt trên trang kết quả (vd. IQ-72-high). Sao chép REF dán vào form CRT hoặc đưa coach trong buổi 1:1.",
  },
  {
    q: "Nên làm đủ 3 bài không?",
    a: "Khuyến nghị đủ IQ · EQ · Engage để brief đầy đủ. Làm 1 bài vẫn tư vấn được theo trục đó.",
  },
  {
    q: "Dữ liệu có bị bán không?",
    a: "Kết quả lưu trên trình duyệt của bạn (localStorage). Form CRT chạy trên Tally — chỉ dùng để liên hệ tư vấn.",
  },
  {
    q: "Mất bao lâu?",
    a: "IQ ~25 phút (có giờ), EQ ~15–20 phút, Engage ~6–10 phút. Có thể làm rải theo ngày.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 py-14 md:py-20">
      <div className="container-page max-w-3xl">
        <span className="section-label">FAQ</span>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Câu hỏi thường gặp
        </h2>
        <p className="mt-3 text-muted">
          Đọc nhanh trước khi đo hoặc đăng ký CRT.
        </p>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group glass-card open:shadow-md"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-muted transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
