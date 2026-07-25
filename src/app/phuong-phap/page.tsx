import type { Metadata } from "next";
import Link from "next/link";
import { CERTIFIED_REFS } from "@/lib/standards/certified-refs";
import { CRT_CONSULT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Phương pháp & chuẩn tham chiếu",
  description:
    "CorePrint mô phỏng cấu trúc WAIS-IV, MSCEIT/ESCI, UWES-17 — item original, phục vụ tư vấn, không thay bản official có license.",
};

export default function MethodPage() {
  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <span className="section-label">Methodology</span>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Không phải web chơi — battery định hướng tư vấn
      </h1>
      <p className="mt-4 text-muted leading-relaxed">
        Mục tiêu: cho người 25+ và coach một <strong className="text-ink">hồ sơ có cấu trúc</strong>{" "}
        đủ để mở buổi tư vấn (sự nghiệp, EI, năng lượng) — bám khung bài official, đổi item để tránh
        bản quyền, minh bạch giới hạn.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">1. Nguyên tắc thiết kế</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong className="text-ink">Cấu trúc = official</strong> (index / branch / dimension).
          </li>
          <li>
            <strong className="text-ink">Item = original</strong> — không copy WAIS, Raven, MSCEIT,
            ESCI, EQ-i, UWES nguyên văn.
          </li>
          <li>
            <strong className="text-ink">IQ CORE 34</strong>: VCI12+PRI12+WMI10; series/matrix
            Raven-style; mỗi đáp án có rationale audit; 25’ timed.
          </li>
          <li>
            <strong className="text-ink">EQ CORE 20</strong>: 5×4 nhánh MSCEIT ability SJT; đúng một
            best answer (2đ)/câu; map ESCI.
          </li>
          <li>
            <strong className="text-ink">Engage CORE 17</strong>: UWES-17 đúng 6+5+6; thang 0–6;
            norms Table 33; construct-mapped.
          </li>
          <li>
            <strong className="text-ink">CI</strong>: <code>node scripts/verify-core.mjs</code> kiểm
            toàn vẹn bank trước ship.
          </li>
          <li>
            <strong className="text-ink">Đầu ra</strong>: Consultation brief (priority, câu hỏi coach,
            hành động 90 ngày) — không chỉ con số.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="font-display text-xl font-semibold text-ink">2. Chuẩn tham chiếu</h2>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-ink">IQ ← {CERTIFIED_REFS.iq.primary.name}</h3>
          <p className="mt-1 text-xs text-muted">{CERTIFIED_REFS.iq.primary.publisher}</p>
          <p className="mt-2 text-sm text-muted">{CERTIFIED_REFS.iq.coreprintAlign}</p>
          <ul className="mt-2 list-disc pl-5 text-xs text-muted">
            {CERTIFIED_REFS.iq.primary.structure.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-accent">{CERTIFIED_REFS.iq.primary.certNote}</p>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-ink">EQ ← {CERTIFIED_REFS.eq.ability.name}</h3>
          <p className="mt-1 text-xs text-muted">
            + {CERTIFIED_REFS.eq.competency.name} · tham chiếu {CERTIFIED_REFS.eq.trait.name}
          </p>
          <p className="mt-2 text-sm text-muted">{CERTIFIED_REFS.eq.coreprintAlign}</p>
          <ul className="mt-2 list-disc pl-5 text-xs text-muted">
            {CERTIFIED_REFS.eq.ability.branches.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-ink">Engage ← {CERTIFIED_REFS.engage.primary.name}</h3>
          <p className="mt-1 text-xs text-muted">{CERTIFIED_REFS.engage.primary.authors}</p>
          <p className="mt-2 text-sm text-muted">{CERTIFIED_REFS.engage.coreprintAlign}</p>
          <p className="mt-2 text-xs text-muted">
            Scale {CERTIFIED_REFS.engage.primary.scale}. Scoring:{" "}
            {CERTIFIED_REFS.engage.primary.scoring}. Norms N=
            {CERTIFIED_REFS.engage.primary.normsTotal.sampleN}.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">3. Khi nào dùng được / không</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-teal/30 bg-teal-soft/40 p-4 text-sm text-ink">
            <p className="font-semibold">Dùng được</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
              <li>Mở buổi career / leadership / energy coaching</li>
              <li>Ưu tiên 1–2 đòn bẩy 90 ngày</li>
              <li>So sánh trước–sau sau khi luyện (cùng điều kiện đo)</li>
              <li>Lead gen tư vấn có dữ liệu</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent-soft/50 p-4 text-sm text-ink">
            <p className="font-semibold">Không dùng</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
              <li>Chẩn đoán IQ lâm sàng / khuyết tật trí tuệ</li>
              <li>Tuyển dụng high-stakes không có tool license</li>
              <li>Thay MSCEIT/EQ-i/ESCI có cert</li>
              <li>Tự điều trị trầm cảm/burnout nặng — cần chuyên gia y tế</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">4. Điều kiện để kết quả có giá trị</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
          <li>Yên tĩnh, tỉnh táo, một phiên — không multi-task.</li>
          <li>IQ: không máy tính/AI/tra cứu; tôn trọng 20 phút.</li>
          <li>EQ: chọn hành vi thật, không “đáp án đẹp”.</li>
          <li>Engage: trung bình 3–6 tháng, không tô hồng.</li>
          <li>Đủ 3 bài → brief tư vấn đầy đủ nhất.</li>
        </ol>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/#tests" className="btn-primary">
          Bắt đầu assessment
        </Link>
        <Link href="/ho-so" className="btn-secondary">
          Hồ sơ & brief
        </Link>
        <a
          href={CRT_CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Đặt CRT tư vấn
        </a>
      </div>
    </div>
  );
}
