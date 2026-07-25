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
  title: "CRT tư vấn — Đặt lịch",
  description:
    "Đặt lịch tư vấn CRT 1:1 dựa trên hồ sơ IQ · EQ · Engage — định hướng sự nghiệp, lãnh đạo và năng lượng cho người 25+.",
};

const prepChecklist = [
  "Đã hoàn thành ít nhất 1 bài (IQ / EQ / Engage) — khuyến nghị đủ 3.",
  "Sao chép hoặc chụp màn hình mã REF trên trang kết quả (vd. IQ-72-high).",
  "Ghi 1–2 mục tiêu 90 ngày muốn bàn trong buổi CRT.",
  "Dán REF + bối cảnh ngắn vào form Tally (ô ghi chú nếu có).",
];

export default function ContactPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="section-label">CRT tư vấn 1:1</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Từ kết quả test đến kế hoạch rõ ràng
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            Điền form bên cạnh để đăng ký buổi CRT tư vấn. Nếu bạn đã làm IQ / EQ / Engage,
            mang theo REF code hoặc chụp màn hình kết quả — buổi nói chuyện sẽ bám dữ liệu
            thay vì bắt đầu từ con số không.
          </p>

          <div className="mt-6 rounded-2xl border border-teal/25 bg-teal-soft/40 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <CheckSquare className="h-4 w-4 text-teal" />
              Checklist trước khi gửi form
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
                title: "Đối thoại có cấu trúc",
                desc: "30–45 phút: làm rõ bối cảnh, đọc hồ sơ, chọn 1–2 ưu tiên hành động.",
              },
              {
                icon: CalendarDays,
                title: "Lịch linh hoạt",
                desc: "Team CRT liên hệ theo thông tin bạn để lại trên form Tally.",
              },
              {
                icon: Shield,
                title: "Riêng tư",
                desc: "Thông tin và kết quả chỉ phục vụ tư vấn, không public hay bán lead.",
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
            <p className="text-sm font-medium text-ink">Mở form trên tab mới</p>
            <p className="mt-1 text-xs text-muted">
              Ưu tiên nếu iframe bị chặn trên trình duyệt.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ConsultCta source="lien-he" className="!py-2.5 text-sm" />
              <a
                href={CRT_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2.5 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                tally.so/r/81WAjP
              </a>
            </div>
          </div>
        </div>

        <TallyEmbed title="Form CRT tư vấn" />
      </div>
    </div>
  );
}
