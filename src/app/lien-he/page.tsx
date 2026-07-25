import type { Metadata } from "next";
import { TallyEmbed } from "@/components/consultation/TallyEmbed";
import { ConsultCta } from "@/components/consultation/ConsultCta";
import { CRT_CONSULT_URL } from "@/lib/constants";
import {
  CalendarDays,
  CheckSquare,
  ExternalLink,
  MessageSquareText,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Đặt tư vấn CRT",
  description:
    "Đăng ký tư vấn CRT 1:1 để cùng đọc kết quả tư duy, cảm xúc, năng lượng công việc và chọn kế hoạch phù hợp.",
};

const prepChecklist = [
  "Đã hoàn thành ít nhất một bài đo (IQ / EQ / Engage) — nên làm đủ ba nếu có thể.",
  "Sao chép mã REF trên trang kết quả (hoặc chụp màn hình báo cáo).",
  "Ghi 1–2 mục tiêu bạn muốn bàn trong 90 ngày tới.",
  "Dán mã REF và vài dòng về hoàn cảnh hiện tại vào phần ghi chú của biểu mẫu.",
];

export default function ContactPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="section-label">Tư vấn CRT 1:1</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Từ kết quả đo đến kế hoạch rõ ràng
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            Điền biểu mẫu bên cạnh để đăng ký tư vấn CRT. Nếu đã làm bài, hãy gửi mã REF
            hoặc ảnh chụp kết quả. Nhờ đó, buổi trao đổi có thể tập trung ngay vào điều
            bạn đang cần.
          </p>

          <div className="mt-6 rounded-2xl border border-teal/25 bg-teal-soft/40 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <CheckSquare className="h-4 w-4 text-teal" />
              Chuẩn bị trước khi gửi
            </p>
            <ul className="mt-3 space-y-2.5">
              {prepChecklist.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-teal/30 bg-white text-[11px] font-bold text-teal">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-4">
            {[
              {
                icon: MessageSquareText,
                title: "Trao đổi có cấu trúc",
                desc: "Khoảng 30–45 phút: làm rõ bối cảnh, đọc hồ sơ, chọn 1–2 ưu tiên hành động.",
              },
              {
                icon: CalendarDays,
                title: "Lịch linh hoạt",
                desc: "Đội ngũ sẽ liên hệ theo thông tin bạn để lại trong biểu mẫu đăng ký.",
              },
              {
                icon: Shield,
                title: "Thông tin được bảo mật",
                desc: "Chỉ dùng để liên hệ tư vấn — không công khai hay bán danh sách.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-line bg-white/50 p-4">
            <p className="text-sm font-medium text-ink">Mở biểu mẫu trong thẻ mới</p>
            <p className="mt-1 text-xs text-muted">
              Dùng cách này nếu biểu mẫu bên cạnh không hiển thị trên trình duyệt.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ConsultCta
                label="Mở biểu mẫu đăng ký"
                source="lien-he"
                className="!py-2.5 text-sm"
              />
              <a
                href={CRT_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2.5 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Mở liên kết đăng ký
              </a>
            </div>
          </div>
        </div>

        <TallyEmbed title="Biểu mẫu đăng ký tư vấn CRT" />
      </div>
    </div>
  );
}
