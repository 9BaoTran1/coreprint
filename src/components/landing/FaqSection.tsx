const faqs = [
  {
    q: "Các bài đo có miễn phí không?",
    a: "Có. Ba bài IQ, EQ và Engage đều miễn phí trên web. Bạn chỉ đăng ký form khi muốn đặt buổi tư vấn CRT 1:1.",
  },
  {
    q: "Kết quả có phải bài đo chính thức không?",
    a: "Không. CorePrint tham chiếu khung đo quốc tế và soạn câu hỏi riêng để định hướng phát triển. Không thay bài đo lâm sàng hay bài có bản quyền do chuyên gia có chứng chỉ thực hiện.",
  },
  {
    q: "Mã REF là gì? Dùng để làm gì?",
    a: "REF là mã tóm tắt trên trang kết quả (ví dụ IQ-72-high). Bạn sao chép mã này dán vào form đặt tư vấn CRT, hoặc đưa cho coach trong buổi 1:1 để họ nắm nhanh hồ sơ.",
  },
  {
    q: "Tôi có cần làm đủ ba bài không?",
    a: "Nên làm đủ IQ · EQ · Engage để tóm tắt tư vấn đầy đủ hơn. Chỉ làm một bài vẫn hữu ích cho trục đó.",
  },
  {
    q: "Thông tin của tôi có bị chia sẻ không?",
    a: "Kết quả bài đo lưu trên trình duyệt của bạn. Form đặt tư vấn chỉ dùng để liên hệ — không bán danh sách liên hệ.",
  },
  {
    q: "Mỗi bài mất bao lâu?",
    a: "IQ khoảng 25 phút (có đồng hồ), EQ khoảng 15–20 phút, Engage khoảng 6–10 phút. Bạn có thể làm rải theo ngày.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 py-14 md:py-20">
      <div className="container-page max-w-3xl">
        <span className="section-label">Câu hỏi thường gặp</span>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Trước khi bạn bắt đầu
        </h2>
        <p className="mt-3 text-muted">
          Những điều hay được hỏi trước khi làm bài hoặc đặt tư vấn.
        </p>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="group glass-card open:shadow-md">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="shrink-0 text-muted transition group-open:rotate-45">+</span>
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
