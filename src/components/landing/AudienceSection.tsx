const personas = [
  {
    title: "Professional 25–40",
    points: ["Muốn thăng tiến hoặc chuyển hướng", "Cần tự hiểu để negotiate role / scope", "Cân bằng hiệu suất và sức khỏe"],
  },
  {
    title: "Team lead & founder",
    points: ["EQ quyết định văn hóa team", "Engage thấp = turnover ẩn", "Cần mirror trước khi coach người khác"],
  },
  {
    title: "Người đang “đứng giữa ngã ba”",
    points: ["Burnout nhẹ hoặc disengage", "Câu hỏi “mình hợp gì?”", "Muốn quyết định dựa trên dữ liệu + đối thoại"],
  },
];

export function AudienceSection() {
  return (
    <section id="audience" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page rounded-[2rem] border border-line bg-ink px-6 py-12 text-white md:px-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Đối tượng 25+
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Không phải quiz tuổi teen — đây là gương soi cho giai đoạn “xây dựng”
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Từ 25 trở đi, quyết định nghề nghiệp, tài chính cảm xúc, quan hệ và năng lượng
            bắt đầu đan xen. CorePrint được viết bằng ngôn ngữ trưởng thành, insight thực dụng.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {personas.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <ul className="mt-3 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="text-sm text-white/65 before:mr-2 before:text-accent before:content-['→']">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
