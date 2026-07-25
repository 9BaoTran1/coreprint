"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Download,
  FileText,
  RefreshCw,
  Share2,
} from "lucide-react";
import { CRT_CONSULT_URL } from "@/lib/constants";
import type { TestResult, TestType } from "@/lib/types";
import { TESTS, TEST_LIST } from "@/lib/tests-meta";
import { loadAllResults, loadResult } from "@/lib/storage";
import {
  buildConsultBrief,
  saveBrief,
  type ConsultBrief,
} from "@/lib/consultation/brief";
import { BriefPanel } from "@/components/consultation/BriefPanel";
import { ConsultCta } from "@/components/consultation/ConsultCta";
import { TestIcon } from "@/components/TestIcon";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const copied = document.execCommand("copy");
    textarea.remove();

    if (!copied) {
      throw new Error("Copy command failed");
    }
  }
}

export function ResultView({ type }: { type: TestType }) {
  const meta = TESTS[type];
  const [result, setResult] = useState<TestResult | null>(null);
  const [brief, setBrief] = useState<ConsultBrief | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState<"ref" | "summary" | null>(null);
  const copyResetTimer = useRef<number | null>(null);

  useEffect(() => {
    const r = loadResult(type);
    setResult(r);
    if (r) {
      const all = loadAllResults();
      const b = buildConsultBrief(all);
      saveBrief(b);
      setBrief(b);
    }
    setReady(true);

    return () => {
      if (copyResetTimer.current) {
        window.clearTimeout(copyResetTimer.current);
      }
    };
  }, [type]);

  if (!ready) {
    return (
      <div className="container-page py-20 text-center text-muted">Đang tải kết quả…</div>
    );
  }

  if (!result) {
    return (
      <div className="container-page max-w-lg py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Chưa có kết quả {meta.shortName}
        </h1>
        <p className="mt-2 text-muted">
          Bạn chưa hoàn thành assessment này trên thiết bị hiện tại (điều kiện đo nghiêm túc).
        </p>
        <Link href={`/test/${type}`} className="btn-primary mt-6 inline-flex">
          Bắt đầu {meta.shortName}
        </Link>
      </div>
    );
  }

  const others = TEST_LIST.filter((t) => t.type !== type);
  const ref = `${type.toUpperCase()}-${result.percent}-${result.band}`;
  const summary = `${result.bandLabel} · ${result.displayScore}\nREF: ${ref}\nTư vấn CRT: ${CRT_CONSULT_URL}`;

  const handleCopy = async (value: string, target: "ref" | "summary") => {
    await copyText(value);
    setCopied(target);
    if (copyResetTimer.current) {
      window.clearTimeout(copyResetTimer.current);
    }
    copyResetTimer.current = window.setTimeout(() => {
      setCopied((current) => (current === target ? null : current));
    }, 2000);
  };

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-6 rounded-2xl border border-teal/25 bg-teal-soft/50 px-4 py-3 text-sm text-ink">
        <strong>Assessment — không phải quiz giải trí.</strong> Kết quả + brief bên dưới dùng
        để mở buổi tư vấn. Đọc{" "}
        <Link href="/phuong-phap" className="font-semibold underline">
          phương pháp & chuẩn tham chiếu
        </Link>
        .
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="glass-card overflow-hidden">
            <div className="px-6 py-6 text-white md:px-8" style={{ background: meta.color }}>
              <div className="flex items-center gap-2 text-sm text-white/75">
                <TestIcon icon={meta.icon} className="h-4 w-4" />
                {meta.name} · Báo cáo
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                {result.bandLabel}
              </h1>
              <p className="mt-2 max-w-2xl text-white/80 leading-relaxed">{result.summary}</p>
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div className="inline-flex flex-col rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <span className="font-display text-2xl font-semibold md:text-3xl">
                    {result.displayScore}
                  </span>
                  <span className="text-xs text-white/70">điểm hồ sơ</span>
                </div>
                {result.protocolLabel && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                    {result.protocolLabel}
                  </span>
                )}
                {typeof result.timeUsedSeconds === "number" && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                    Thời gian: {Math.floor(result.timeUsedSeconds / 60)}:
                    {(result.timeUsedSeconds % 60).toString().padStart(2, "0")}
                    {result.timedOut ? " · hết giờ" : ""}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className="text-lg font-semibold text-ink">Phân tích theo chiều / index</h2>
                <p className="text-xs text-muted">
                  Điểm thô: {result.rawScore}/{result.maxScore}
                </p>
              </div>
              <div className="mt-4 space-y-4">
                {result.dimensions.map((d) => (
                  <div key={d.key}>
                    <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                      <span className="font-medium text-ink">{d.label}</span>
                      <span className="shrink-0 text-right text-muted">
                        {d.mean != null
                          ? `M=${d.mean}/6`
                          : d.indexScore != null
                            ? `Index ~${d.indexScore}`
                            : `${d.percent}%`}
                        <span className="ml-1 text-[11px] opacity-70">
                          ({d.percent}% · {d.score}/{d.max})
                        </span>
                      </span>
                    </div>
                    <div className="dim-bar">
                      <span style={{ width: `${d.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {result.frameworkNote && (
                <p className="mt-6 rounded-xl bg-[#f3efe8] px-3 py-3 text-xs leading-relaxed text-muted">
                  {result.frameworkNote}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-ink">Insight (cho coach & bạn)</h3>
              <ul className="mt-3 space-y-2.5">
                {result.insights.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-muted before:mr-2 before:text-accent before:content-['✦']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-ink">Gợi ý phát triển</h3>
              <ul className="mt-3 space-y-2.5">
                {result.growthTips.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-muted before:mr-2 before:text-teal before:content-['→']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {brief && <BriefPanel brief={brief} compact />}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="glass-card p-6">
            <h3 className="font-display text-xl font-semibold text-ink">Bước tiếp: CRT tư vấn</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Mang REF + brief. Coach sẽ không bắt đầu từ con số không — đã có priority & câu hỏi
              sẵn.
            </p>
            <ConsultCta source={`ket-qua-${type}`} className="mt-5 w-full" />
            <Link href="/ho-so" className="btn-secondary mt-3 w-full">
              <FileText className="h-4 w-4" />
              Hồ sơ tổng + brief đầy đủ
            </Link>
            <Link href={`/test/${type}`} className="btn-secondary mt-3 w-full">
              <RefreshCw className="h-4 w-4" />
              Đo lại (sau khi luyện)
            </Link>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Bổ sung để brief chính xác hơn
            </h3>
            <div className="mt-3 space-y-2">
              {others.map((t) => (
                <Link
                  key={t.type}
                  href={`/test/${t.type}`}
                  className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-3 text-sm font-medium text-ink transition hover:border-ink/30"
                >
                  <span className="inline-flex items-center gap-2">
                    <TestIcon icon={t.icon} className="h-4 w-4" />
                    {t.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-line bg-white/50 p-4 text-xs text-muted">
            <p className="inline-flex items-center gap-1.5 font-medium text-ink">
              <Share2 className="h-3.5 w-3.5" />
              Giá trị & giới hạn
            </p>
            <p className="mt-1.5 leading-relaxed">
              Dùng được cho coaching career / EI / energy. Không thay WAIS·MSCEIT·EQ-i·ESCI official
              hay chẩn đoán lâm sàng.{" "}
              <span className="inline-flex items-center gap-1">
                <Download className="h-3 w-3" /> Chụp màn hình REF khi tư vấn.
              </span>
            </p>
            <p className="mt-3 font-mono text-[11px] text-ink/70">
              REF: {ref}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                type="button"
                className="btn-secondary w-full !px-3 !py-2 text-xs"
                onClick={() => void handleCopy(ref, "ref")}
              >
                <Copy className="h-3.5 w-3.5" />
                {copied === "ref" ? "Đã sao chép" : "Sao chép REF"}
              </button>
              <button
                type="button"
                className="btn-secondary w-full !px-3 !py-2 text-xs"
                onClick={() => void handleCopy(summary, "summary")}
              >
                <Copy className="h-3.5 w-3.5" />
                {copied === "summary" ? "Đã sao chép" : "Sao chép tóm tắt"}
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Đã sao chép vào bộ nhớ tạm" : ""}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
