const personas = [
  {
    title: "Chuyên viên & người đi làm 25–40",
    points: [
      "Muốn thăng tiến hoặc chuyển hướng nghề nghiệp",
      "Cần hiểu điểm mạnh để định vị vai trò rõ hơn",
      "Muốn cân bằng hiệu suất và sức khỏe dài hạn",
    ],
  },
  {
    title: "Quản lý nhóm và người sáng lập",
    points: [
      "Cách xử lý cảm xúc ảnh hưởng trực tiếp đến văn hóa nhóm",
      "Mức gắn bó thấp có thể là dấu hiệu sớm của ý định nghỉ việc",
      "Cần hiểu rõ mình trước khi hướng dẫn và hỗ trợ người khác",
    ],
  },
  {
    title: "Đang đứng giữa ngã ba",
    points: [
      "Mệt mỏi, mất lửa hoặc cảm giác “không đúng chỗ”",
      "Câu hỏi “mình hợp với hướng nào?”",
      "Muốn quyết định dựa trên dữ liệu + đối thoại",
    ],
  },
];

export function AudienceSection() {
  return (
    <section id="audience" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page rounded-[2rem] border border-line bg-ink px-6 py-12 text-white md:px-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Dành cho ai
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Dành cho những lúc bạn cần nhìn lại công việc và chính mình
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            Từ khoảng 25 tuổi, công việc, các mối quan hệ và sức lực thường ảnh hưởng
            lẫn nhau. CorePrint giúp bạn nhìn rõ ba mặt này và mang kết quả vào buổi
            tư vấn CRT để trao đổi cụ thể hơn.
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
                  <li
                    key={pt}
                    className="text-sm text-white/65 before:mr-2 before:text-accent before:content-['→']"
                  >
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
