import Link from "next/link";
import { FileText } from "lucide-react";
import { ConsultCta } from "@/components/consultation/ConsultCta";

export function CtaSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <div className="glass-card overflow-hidden p-6 sm:p-8 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Đã có kết quả? Hãy chọn bước đi tiếp theo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Đăng ký tư vấn CRT để cùng làm rõ điều quan trọng nhất và chọn kế hoạch
              90 ngày. Hãy kèm mã REF hoặc ảnh chụp kết quả để tiết kiệm thời gian.
            </p>
          </div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row md:mt-0 md:w-auto md:flex-col lg:flex-row">
            <ConsultCta
              label="Đặt tư vấn CRT"
              source="landing-cta"
              className="w-full whitespace-nowrap sm:w-auto"
            />
            <Link href="/ho-so" className="btn-secondary w-full whitespace-nowrap sm:w-auto">
              <FileText className="h-4 w-4" />
              Xem hồ sơ của tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
