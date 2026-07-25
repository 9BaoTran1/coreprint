"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2, ClipboardList } from "lucide-react";
import type { ConsultBrief } from "@/lib/consultation/brief";
import { ConsultCta } from "@/components/consultation/ConsultCta";
import { cn } from "@/lib/cn";

const sevStyle = {
  high: "bg-accent-soft text-accent border-accent/30",
  medium: "bg-[#f3efe8] text-ink border-line",
  low: "bg-teal-soft text-teal border-teal/20",
};

export function BriefPanel({
  brief,
  compact = false,
}: {
  brief: ConsultBrief;
  compact?: boolean;
}) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-line bg-ink px-6 py-5 text-white md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
          Tóm tắt tư vấn · dùng trong buổi 1:1
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold">
          Ưu tiên cần trao đổi
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          {brief.executiveSummary}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/60">
          <span className="rounded-full bg-white/10 px-2 py-0.5">
            {brief.completeness === "full" ? "Đủ 3 trục" : "Hồ sơ một phần"}
          </span>
          {brief.refCodes.map((c) => (
            <span key={c} className="rounded-full bg-white/10 px-2 py-0.5 font-mono">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6 p-6 md:p-8">
        {(brief.strengths.length > 0 || brief.risks.length > 0) && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                Điểm tựa
              </h3>
              <ul className="mt-2 space-y-1.5">
                {brief.strengths.length ? (
                  brief.strengths.map((s) => (
                    <li key={s} className="text-sm text-muted before:mr-2 before:text-teal before:content-['+']">
                      {s}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted">Làm thêm bài để thấy điểm tựa.</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <AlertTriangle className="h-4 w-4 text-accent" />
                Rủi ro cần nói trong buổi
              </h3>
              <ul className="mt-2 space-y-1.5">
                {brief.risks.length ? (
                  brief.risks.map((s) => (
                    <li key={s} className="text-sm text-muted before:mr-2 before:text-accent before:content-['!']">
                      {s}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted">Chưa có red flag nổi từ dữ liệu hiện có.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ClipboardList className="h-4 w-4" />
            Ưu tiên can thiệp (severity)
          </h3>
          <div className="mt-3 space-y-3">
            {brief.priorities.length === 0 && (
              <p className="text-sm text-muted">
                Profile ổn định — buổi tư vấn có thể tập trung tinh chỉnh mục tiêu 6–12 tháng.
              </p>
            )}
            {brief.priorities.map((p, i) => (
              <div key={p.id} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-muted">#{i + 1}</span>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase",
                      sevStyle[p.severity],
                    )}
                  >
                    {p.severity}
                  </span>
                  <h4 className="font-semibold text-ink">{p.title}</h4>
                </div>
                {!compact && (
                  <>
                    <p className="mt-2 text-xs font-medium text-muted">Bằng chứng từ bài đo</p>
                    <ul className="mt-1 space-y-0.5">
                      {p.evidence.map((e) => (
                        <li key={e} className="text-xs text-muted">
                          · {e}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold text-ink">Câu hỏi coach</p>
                        <ul className="mt-1 space-y-1">
                          {p.coachQuestions.map((q) => (
                            <li key={q} className="text-xs leading-relaxed text-muted">
                              ? {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-ink">Hành động 90 ngày</p>
                        <ul className="mt-1 space-y-1">
                          {p.actions90d.map((a) => (
                            <li key={a} className="text-xs leading-relaxed text-muted">
                              → {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {!compact && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Agenda gợi ý 45’
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-muted">
                {brief.sessionAgenda.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-dashed border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Client chuẩn bị
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted">
                {brief.clientPrep.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-ink">{brief.suggestedPackage}</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-teal/20 bg-teal-soft/30 px-4 py-3 text-xs leading-relaxed text-muted">
          <p className="font-semibold text-ink">Mang theo khi đăng ký / vào buổi 1:1</p>
          <ul className="mt-1.5 space-y-1">
            <li>· Mã REF (sao chép từ trang kết quả) — dán vào ghi chú form đăng ký</li>
            <li>· 1–2 ưu tiên trong tóm tắt bên trên</li>
            <li>· Bối cảnh: việc làm, quan hệ hoặc năng lượng bạn muốn cải thiện trong 90 ngày</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ConsultCta
            label="Đặt tư vấn CRT với tóm tắt này"
            source="brief"
            className="flex-1"
          />
          <Link href="/ho-so" className="btn-secondary flex-1">
            Xem hồ sơ tổng
          </Link>
        </div>
        <p className="text-[11px] leading-relaxed text-muted">
          Tóm tắt hỗ trợ định hướng nghề nghiệp và phát triển cá nhân — không thay chẩn đoán
          tâm lý lâm sàng hay bài đo chính thức do chuyên gia thực hiện.
        </p>
      </div>
    </div>
  );
}
