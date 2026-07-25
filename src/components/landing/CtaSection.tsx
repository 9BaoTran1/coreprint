import { Phone } from "lucide-react";
import { ConsultCta } from "@/components/consultation/ConsultCta";

export function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="glass-card overflow-hidden p-8 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Đã có hồ sơ? Biến insight thành kế hoạch.
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Đăng ký CRT tư vấn qua form — team sẽ liên hệ theo thông tin bạn để lại. Mang theo
              kết quả IQ · EQ · Engage để buổi nói chuyện đi thẳng vào trọng tâm.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:flex-col lg:flex-row">
            <ConsultCta source="landing-cta" className="whitespace-nowrap" />
            <a href="tel:+84900000000" className="btn-secondary whitespace-nowrap">
              <Phone className="h-4 w-4" />
              Gọi nhanh
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
