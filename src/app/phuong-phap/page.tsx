import type { Metadata } from "next";
import Link from "next/link";
import { CRT_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Phương pháp đo",
  description:
    "Tìm hiểu cách CorePrint xây dựng ba bài miễn phí về tư duy, cảm xúc và năng lượng công việc để hỗ trợ định hướng và tư vấn CRT.",
};

export default function MethodPage() {
  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <span className="section-label">Phương pháp</span>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Cách chúng tôi xây dựng các bài đo
      </h1>
      <p className="mt-4 text-muted leading-relaxed">
        CorePrint giúp người từ khoảng 25 tuổi và người tư vấn có thông tin rõ ràng về
        tư duy, cách xử lý cảm xúc và năng lượng công việc. Kết quả là điểm bắt đầu cho
        một cuộc trao đổi nghiêm túc, không phải bài vui để dán nhãn tính cách.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">1. Nguyên tắc</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong className="text-ink">Dựa trên cách đo được dùng rộng rãi</strong> —
            cấu trúc bài tham khảo các nghiên cứu về tư duy, cảm xúc và sự gắn bó với công việc.
          </li>
          <li>
            <strong className="text-ink">Câu hỏi soạn riêng</strong> — không sao chép bài
            đo chính thức có bản quyền.
          </li>
          <li>
            <strong className="text-ink">Nói rõ giới hạn</strong> — kết quả dùng để định
            hướng phát triển và tư vấn. Không dùng thay đánh giá chuyên sâu hoặc làm căn
            cứ duy nhất cho quyết định tuyển dụng quan trọng.
          </li>
          <li>
            <strong className="text-ink">Dùng được khi tư vấn</strong> — kết quả theo từng
            nhóm khả năng, gợi ý hành động 90 ngày và mã REF để chia sẻ nhanh.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">2. Ba mặt được xem xét</h2>

        <div className="glass-card space-y-2 p-5">
          <h3 className="font-semibold text-ink">Tư duy (IQ)</h3>
          <p className="text-sm leading-relaxed text-muted">
            Khoảng 34 câu, giới hạn khoảng 25 phút. Nhìn khả năng hiểu ngôn ngữ, suy luận
            logic và giữ thông tin khi xử lý vấn đề. Kết quả chia theo nhóm năng lực, không
            chỉ một con số.
          </p>
        </div>

        <div className="glass-card space-y-2 p-5">
          <h3 className="font-semibold text-ink">Cảm xúc (EQ)</h3>
          <p className="text-sm leading-relaxed text-muted">
            Khoảng 20 tình huống thực tế. Bạn chọn cách ứng xử; điểm phản ánh mức độ hiệu
            quả khi nhận biết, hiểu và xử lý cảm xúc trong công việc, các mối quan hệ.
          </p>
        </div>

        <div className="glass-card space-y-2 p-5">
          <h3 className="font-semibold text-ink">Năng lượng trong công việc (Engage)</h3>
          <p className="text-sm leading-relaxed text-muted">
            17 câu ngắn về công việc gần đây: sức lực, cảm giác công việc có ý nghĩa và
            khả năng tập trung. Hữu ích khi muốn sớm nhận ra mệt mỏi hoặc mất động lực.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          3. Khi nào dùng được / không nên dùng
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-teal/30 bg-teal-soft/40 p-4 text-sm text-ink">
            <p className="font-semibold">Nên dùng khi</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
              <li>Muốn bắt đầu trao đổi về nghề nghiệp, kỹ năng lãnh đạo hoặc năng lượng</li>
              <li>Cần chọn 1–2 ưu tiên hành động trong 90 ngày</li>
              <li>Muốn so sánh trước–sau sau một giai đoạn luyện tập</li>
              <li>Chuẩn bị dữ liệu trước buổi tư vấn CRT</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent-soft/50 p-4 text-sm text-ink">
            <p className="font-semibold">Không thay thế</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
              <li>Đánh giá IQ chuyên sâu hoặc chẩn đoán y khoa</li>
              <li>Làm căn cứ duy nhất cho quyết định tuyển dụng quan trọng</li>
              <li>Bài đo chính thức có bản quyền do chuyên gia thực hiện</li>
              <li>Tự xử lý trầm cảm / kiệt sức nặng — cần chuyên gia y tế</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          4. Điều kiện để kết quả đáng tin hơn
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Yên tĩnh, tỉnh táo, một phiên — hạn chế làm nhiều việc cùng lúc.</li>
          <li>Bài IQ: không dùng máy tính, AI hay tra cứu; tôn trọng thời gian.</li>
          <li>Bài EQ: chọn cách bạn thật sự sẽ xử lý hoặc cách bạn cho là hiệu quả, không chọn câu chỉ vì nghe hay.</li>
          <li>Bài Engage: nghĩ về 3–6 tháng gần đây, không tô hồng.</li>
          <li>Làm đủ ba bài nếu muốn tóm tắt tư vấn đầy đủ nhất.</li>
        </ol>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/#tests" className="btn-primary">
          Bắt đầu làm bài
        </Link>
        <Link href="/ho-so" className="btn-secondary">
          Xem hồ sơ
        </Link>
        <a
          href={CRT_CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Đặt tư vấn CRT
        </a>
      </div>
    </div>
  );
}
