const faqs = [
  {
    q: "Các bài đo có miễn phí không?",
    a: "Có. Cả ba bài về tư duy (IQ), cảm xúc (EQ) và năng lượng công việc (Engage) đều miễn phí. Bạn chỉ cần điền biểu mẫu khi muốn đăng ký tư vấn CRT 1:1.",
  },
  {
    q: "Kết quả có phải bài đo chính thức không?",
    a: "Không. CorePrint dựa trên những cách đo được dùng rộng rãi và tự soạn câu hỏi để hỗ trợ phát triển. Kết quả không thay thế bài đánh giá chuyên sâu hoặc bài có bản quyền do chuyên gia đủ điều kiện thực hiện.",
  },
  {
    q: "Mã REF dùng để làm gì?",
    a: "REF là mã tham chiếu có trên trang kết quả. Bạn chỉ cần sao chép mã này vào biểu mẫu đăng ký hoặc gửi cho người tư vấn để họ tìm đúng phần kết quả cần trao đổi. Bạn không cần tự giải nghĩa mã.",
  },
  {
    q: "Tôi có cần làm đủ ba bài không?",
    a: "Nên làm đủ ba bài để phần tổng hợp đầy đủ hơn. Nếu chỉ làm một bài, bạn vẫn nhận được thông tin hữu ích về mặt đó.",
  },
  {
    q: "Thông tin của tôi có bị chia sẻ không?",
    a: "Kết quả được lưu trên trình duyệt của bạn. Thông tin trong biểu mẫu đăng ký chỉ được dùng để liên hệ tư vấn, không dùng để bán danh sách liên hệ.",
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
