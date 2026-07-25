"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  ListChecks,
  Shield,
} from "lucide-react";
import type { AnswerMap, TestType } from "@/lib/types";
import { TESTS } from "@/lib/tests-meta";
import { PROTOCOLS } from "@/lib/protocols";
import { getQuestionBank, scoreTest } from "@/lib/scoring";
import { saveResult } from "@/lib/storage";
import { cn } from "@/lib/cn";
import { TestIcon } from "@/components/TestIcon";
import { IQ_DIMENSIONS } from "@/data/iq-questions";
import { EQ_DIMENSIONS } from "@/data/eq-questions";
import { ENGAGE_DIMENSIONS } from "@/data/engage-questions";

const DIM_LABELS: Record<string, Record<string, string>> = {
  iq: IQ_DIMENSIONS,
  eq: EQ_DIMENSIONS,
  engage: ENGAGE_DIMENSIONS,
};

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type QuizPhase = "intro" | "starting" | "quiz";

export function QuizEngine({ type }: { type: TestType }) {
  const meta = TESTS[type];
  const protocol = PROTOCOLS[type];
  const questions = useMemo(() => getQuestionBank(type), [type]);
  const router = useRouter();

  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    protocol.timeLimitSeconds,
  );
  const [elapsed, setElapsed] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const answersRef = useRef(answers);
  const elapsedRef = useRef(0);
  const finishingRef = useRef(false);

  const q = questions[index];
  const answeredCount = Object.keys(answers).length;
  const selected = q ? answers[q.id] : undefined;
  const isLast = questions.length > 0 && index === questions.length - 1;
  const progress =
    questions.length > 0
      ? Math.min(100, Math.round(((index + 1) / questions.length) * 100))
      : 0;

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const finish = useCallback(
    (finalAnswers: AnswerMap, timed = false, timeUsed?: number) => {
      if (finishingRef.current) return;
      finishingRef.current = true;
      setSubmitting(true);
      const used = timeUsed ?? elapsedRef.current;
      const result = scoreTest(type, finalAnswers, {
        timeUsedSeconds: used,
        timedOut: timed,
      });
      saveResult(result);
      router.push(`/ket-qua/${type}`);
    },
    [router, type],
  );

  // Timer (IQ) — stable effect; answers via ref
  useEffect(() => {
    if (phase !== "quiz" || protocol.timeLimitSeconds == null) return;
    const start = Date.now();
    const total = protocol.timeLimitSeconds;
    const id = window.setInterval(() => {
      const used = Math.floor((Date.now() - start) / 1000);
      elapsedRef.current = used;
      setElapsed(used);
      const left = Math.max(0, total - used);
      setSecondsLeft(left);
      if (left <= 0) {
        window.clearInterval(id);
        setTimedOut(true);
        finish(answersRef.current, true, total);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [phase, protocol.timeLimitSeconds, finish]);

  // Untimed elapsed clock
  useEffect(() => {
    if (phase !== "quiz" || protocol.timeLimitSeconds != null) return;
    const start = Date.now();
    const id = window.setInterval(() => {
      const used = Math.floor((Date.now() - start) / 1000);
      elapsedRef.current = used;
      setElapsed(used);
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, protocol.timeLimitSeconds]);

  useEffect(() => {
    if (phase !== "starting") return;
    const id = window.setTimeout(() => setPhase("quiz"), 350);
    return () => window.clearTimeout(id);
  }, [phase]);

  function startQuiz() {
    setIndex(0);
    setAnswers({});
    setSecondsLeft(protocol.timeLimitSeconds);
    setElapsed(0);
    setTimedOut(false);
    elapsedRef.current = 0;
    finishingRef.current = false;
    setPhase("starting");
  }

  function selectOption(optionId: string) {
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
  }

  function goNext() {
    if (!selected) return;
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    finish(answers, false, elapsed);
  }

  function goPrev() {
    if (!protocol.allowBack || index === 0) return;
    setIndex((i) => i - 1);
  }

  if (phase === "intro") {
    return (
      <div className="container-page max-w-2xl py-10 md:py-14">
        <div className="mb-6 flex items-center gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-xl text-white"
            style={{ background: meta.color }}
          >
            <TestIcon icon={meta.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-muted">{meta.name}</p>
            <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Hướng dẫn trước khi làm bài
            </h1>
          </div>
        </div>

        <div className="glass-card space-y-6 p-6 md:p-8">
          <p className="text-sm leading-relaxed text-muted">
            {protocol.standardizationNote}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-white px-3 py-3 text-center">
              <ListChecks className="mx-auto h-4 w-4 text-accent" />
              <p className="mt-1 font-semibold text-ink">
                {questions.length > 0 ? `${questions.length} câu` : "Đang chuẩn bị"}
              </p>
              <p className="text-[11px] text-muted">Toàn bộ câu hỏi</p>
            </div>
            <div className="rounded-xl border border-line bg-white px-3 py-3 text-center">
              <Clock className="mx-auto h-4 w-4 text-accent" />
              <p className="mt-1 font-semibold text-ink">
                {protocol.timeLimitSeconds
                  ? formatTime(protocol.timeLimitSeconds)
                  : protocol.estimatedMinutes + "’"}
              </p>
              <p className="text-[11px] text-muted">
                {protocol.timeLimitSeconds ? "Thời gian tối đa" : "Thời gian ước tính"}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white px-3 py-3 text-center">
              <Shield className="mx-auto h-4 w-4 text-accent" />
              <p className="mt-1 font-semibold text-ink">
                {protocol.format === "binary"
                  ? "Một đáp án đúng"
                  : protocol.format === "sjt"
                    ? "Chọn cách ứng xử"
                    : "Chọn mức thường xuyên"}
              </p>
              <p className="text-[11px] text-muted">Dạng câu hỏi</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Hướng dẫn
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink">
              {protocol.instructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            {type === "engage" && (
              <ul className="mt-3 space-y-1 rounded-xl bg-[#f3efe8] px-4 py-3 text-xs text-muted">
                <li>0 = Không bao giờ · 1 = Hầu như không · 2 = Hiếm khi</li>
                <li>3 = Thỉnh thoảng · 4 = Thường · 5 = Rất thường · 6 = Luôn</li>
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Điều kiện để kết quả có giá trị
            </h2>
            <ul className="mt-3 space-y-2">
              {protocol.rules.map((r) => (
                <li
                  key={r}
                  className="flex gap-2 text-sm text-ink before:text-accent before:content-['✓']"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="btn-primary w-full"
            style={{ background: meta.color }}
            onClick={startQuiz}
          >
            Tôi đã hiểu — Bắt đầu
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "starting") {
    return (
      <div
        className="container-page max-w-3xl py-10 md:py-14"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="animate-pulse">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-xl text-white"
                style={{ background: meta.color }}
              >
                <TestIcon icon={meta.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Đang chuẩn bị bài…</p>
                <p className="mt-1 text-xs text-muted">Câu hỏi đầu tiên sắp hiện ra.</p>
              </div>
            </div>
            <div className="h-8 w-16 rounded-full bg-line/70" />
          </div>
          <div className="progress-track mb-8">
            <div className="progress-fill w-1/4 opacity-50" />
          </div>
          <div className="glass-card space-y-5 p-6 md:p-8">
            <div className="h-3 w-28 rounded-full bg-line/70" />
            <div className="h-7 w-4/5 rounded-lg bg-line/70" />
            <div className="space-y-3 pt-2">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-14 rounded-xl border border-line bg-white/70" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="container-page max-w-2xl py-10 md:py-14">
        <div className="glass-card p-6 text-center md:p-8" role="status">
          <span
            className="mx-auto grid h-12 w-12 place-items-center rounded-xl text-white"
            style={{ background: meta.color }}
          >
            <ListChecks className="h-5 w-5" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
            Chưa thể tải câu hỏi
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Bộ câu hỏi hiện chưa sẵn sàng. Bạn có thể thử khởi động lại hoặc chọn
            một bài khác.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" className="btn-secondary" onClick={() => setPhase("intro")}>
              <ArrowLeft className="h-4 w-4" />
              Quay lại hướng dẫn
            </button>
            <button type="button" className="btn-primary" onClick={() => router.push("/ho-so")}>
              Chọn bài khác
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const timerUrgent =
    secondsLeft != null && secondsLeft <= 60 && secondsLeft > 0;

  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg text-white"
              style={{ background: meta.color }}
            >
              <TestIcon icon={meta.icon} className="h-4 w-4" />
            </span>
            {meta.name}
            {q.subtest && (
              <span className="hidden rounded-full border border-line bg-white px-2 py-0.5 text-[11px] sm:inline">
                {q.subtest}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-muted">
            Câu {index + 1}/{questions.length} · Đã trả lời {answeredCount}
            {timedOut && " · Hết giờ"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {secondsLeft != null ? (
            <p
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold tabular-nums",
                timerUrgent
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line bg-white text-ink",
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              {formatTime(secondsLeft)}
            </p>
          ) : (
            <p className="rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-ink">
              {Math.min(progress, 100)}%
            </p>
          )}
        </div>
      </div>

      <div className="progress-track mb-8">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="glass-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {q.dimension
            ? DIM_LABELS[type][q.dimension] ?? q.dimension
            : "Câu hỏi"}
          {protocol.format === "sjt" && " · Câu hỏi tình huống"}
          {protocol.format === "likert" && " · Mức độ thường xuyên từ 0 đến 6"}
        </p>

        {q.scenario && (
          <div className="mt-3 rounded-xl border border-line bg-[#faf8f4] px-4 py-3 text-sm leading-relaxed text-ink">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Tình huống
            </span>
            <p className="mt-1">{q.scenario}</p>
          </div>
        )}

        <h2 className="mt-4 text-xl font-semibold leading-snug text-ink md:text-2xl">
          {q.prompt}
        </h2>
        {q.hint && (
          <p className="mt-2 text-sm italic text-muted">Gợi ý: {q.hint}</p>
        )}

        <div className="mt-6 space-y-3">
          {q.options.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={cn("option-btn", active && "selected")}
                onClick={() => selectOption(opt.id)}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold",
                      active
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white text-muted",
                    )}
                  >
                    {active ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      opt.id.toUpperCase()
                    )}
                  </span>
                  <span className="text-sm leading-relaxed text-ink md:text-[15px]">
                    {opt.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0 || !protocol.allowBack}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Trước
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!selected || submitting}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: meta.color }}
          >
            {isLast ? (submitting ? "Đang chấm…" : "Nộp bài & xem kết quả") : "Tiếp"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        {protocol.standardizationNote}
      </p>
    </div>
  );
}
