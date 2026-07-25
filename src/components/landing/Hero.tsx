import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Users } from "lucide-react";
import { ConsultCta } from "@/components/consultation/ConsultCta";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <span className="section-label">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Dành cho người 25+ — đo có cấu trúc, dùng được cho tư vấn
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-ink md:text-5xl lg:text-[3.4rem]">
            Hiểu rõ mình hơn.{" "}
            <span className="text-accent">Tư vấn CRT có dữ liệu.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Ba bài miễn phí: <strong className="text-ink">tư duy (IQ)</strong>,{" "}
            <strong className="text-ink">cảm xúc (EQ)</strong> và{" "}
            <strong className="text-ink">năng lượng công việc (Engage)</strong>.
            Làm xong bạn nhận báo cáo và tóm tắt ưu tiên — sẵn sàng mang vào buổi
            tư vấn CRT 1:1.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#tests" className="btn-primary">
              Bắt đầu làm bài
              <ArrowRight className="h-4 w-4" />
            </Link>
            <ConsultCta label="Đặt tư vấn CRT" source="hero" variant="secondary" />
            <Link href="/phuong-phap" className="btn-secondary">
              Cách chúng tôi đo
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              { k: "IQ", v: "Tư duy & nhận thức" },
              { k: "EQ", v: "Cảm xúc & quan hệ" },
              { k: "Engage", v: "Năng lượng & gắn kết" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-line bg-white/70 px-3 py-3 text-center"
              >
                <p className="font-display text-xl font-semibold text-ink">{s.k}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card relative overflow-hidden p-6 md:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-6 h-36 w-36 rounded-full bg-teal/10 blur-2xl" />

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Minh họa hồ sơ ba trục
            </p>
            <div className="mt-5 space-y-3">
              {[
                { name: "IQ", desc: "Tư duy & nhận thức", pct: 72, color: "#3D8B9C" },
                { name: "EQ", desc: "Cảm xúc & quan hệ", pct: 84, color: "#C45C7A" },
                { name: "Engage", desc: "Năng lượng & gắn kết", pct: 61, color: "#C4783A" },
              ].map((row) => (
                <div key={row.name} className="rounded-2xl border border-line bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{row.name}</p>
                      <p className="text-xs text-muted">{row.desc}</p>
                    </div>
                    <span
                      className="font-display text-lg font-semibold"
                      style={{ color: row.color }}
                    >
                      {row.pct}
                    </span>
                  </div>
                  <div className="dim-bar mt-3">
                    <span style={{ width: `${row.pct}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-teal-soft/60 px-3 py-3 text-sm text-ink">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <p>
                Kết quả mang tính định hướng phát triển. Buổi CRT giúp bạn chọn 1–2
                việc ưu tiên trong 90 ngày — không dàn trải.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-4 left-6 right-6 flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-lg md:left-10 md:right-10">
            <Users className="h-4 w-4 shrink-0 text-accent" />
            <p className="text-xs text-muted md:text-sm">
              Dành cho người đi làm, quản lý và founder — ngôn ngữ rõ, insight thực dụng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
