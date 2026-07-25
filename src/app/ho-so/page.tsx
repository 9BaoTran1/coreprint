"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BriefPanel } from "@/components/consultation/BriefPanel";
import { TestIcon } from "@/components/TestIcon";
import {
  buildConsultBrief,
  saveBrief,
  type ConsultBrief,
} from "@/lib/consultation/brief";
import { loadAllResults } from "@/lib/storage";
import { TESTS, TEST_LIST } from "@/lib/tests-meta";
import type { TestResult, TestType } from "@/lib/types";

export default function ProfilePage() {
  const [results, setResults] = useState<Partial<Record<TestType, TestResult>>>({});
  const [brief, setBrief] = useState<ConsultBrief | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const r = loadAllResults();
    setResults(r);
    if (Object.keys(r).length) {
      const b = buildConsultBrief(r);
      saveBrief(b);
      setBrief(b);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="container-page py-20 text-center text-muted">Đang tải hồ sơ…</div>;
  }

  const count = Object.keys(results).length;

  return (
    <div className="container-page py-10 md:py-14">
      <div className="max-w-2xl">
        <span className="section-label">Hồ sơ CorePrint</span>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Tổng hợp battery — nền cho tư vấn
        </h1>
        <p className="mt-3 text-muted leading-relaxed">
          Đây không phải trang giải trí. Mỗi bài bám cấu trúc công cụ chuẩn (WAIS-aligned ·
          MSCEIT/ESCI · UWES-17). Brief bên dưới dùng trực tiếp trong buổi 1:1.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TEST_LIST.map((t) => {
          const r = results[t.type];
          return (
            <div key={t.type} className="glass-card p-5">
              <div className="flex items-center gap-2">
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-white"
                  style={{ background: t.color }}
                >
                  <TestIcon icon={t.icon} className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{t.shortName}</p>
                  <p className="text-[11px] text-muted">{t.framework}</p>
                </div>
              </div>
              {r ? (
                <>
                  <p className="mt-4 font-display text-xl font-semibold text-ink">
                    {r.displayScore}
                  </p>
                  <p className="text-sm text-muted">{r.bandLabel}</p>
                  <Link
                    href={`/ket-qua/${t.type}`}
                    className="mt-3 inline-block text-sm font-medium text-accent"
                  >
                    Chi tiết →
                  </Link>
                </>
              ) : (
                <>
                  <p className="mt-4 text-sm text-muted">Chưa đo</p>
                  <Link href={`/test/${t.type}`} className="btn-primary mt-3 !py-2 text-sm">
                    Làm {t.shortName}
                  </Link>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        {count === 0 || !brief ? (
          <div className="glass-card p-8 text-center">
            <p className="font-semibold text-ink">Chưa có dữ liệu trên thiết bị này</p>
            <p className="mt-2 text-sm text-muted">
              Hoàn thành ít nhất 1 bài (khuyến nghị cả 3) trong điều kiện đo nghiêm túc.
            </p>
            <Link href="/#tests" className="btn-primary mt-6 inline-flex">
              Chọn bài assessment
            </Link>
          </div>
        ) : (
          <BriefPanel brief={brief} />
        )}
      </div>

      {count > 0 && count < 3 && (
        <p className="mt-6 text-center text-sm text-muted">
          Còn {3 - count} bài — hồ sơ full cho tư vấn chính xác hơn.{" "}
          <Link href="/#tests" className="font-medium text-ink underline">
            Bổ sung ngay
          </Link>
        </p>
      )}
    </div>
  );
}
