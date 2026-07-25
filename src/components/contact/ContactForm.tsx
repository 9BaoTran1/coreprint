"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import type { TestType } from "@/lib/types";
import { TEST_LIST } from "@/lib/tests-meta";
import { getCompletedTypes, loadContactDraft, saveContactDraft } from "@/lib/storage";
import { cn } from "@/lib/cn";

const goals = [
  "Định hướng sự nghiệp / chuyển việc",
  "Nâng EQ & leadership",
  "Burnout / phục hồi năng lượng",
  "Quan hệ & giao tiếp",
  "Xây kế hoạch 90 ngày",
  "Khác",
];

const channels = ["Zalo", "Điện thoại", "Email", "Google Meet / Zoom"];

export function ContactForm() {
  const params = useSearchParams();
  const from = params.get("from") as TestType | null;
  const goalParam = params.get("goal");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ageRange, setAgeRange] = useState("25–29");
  const [goal, setGoal] = useState(goals[0]);
  const [channel, setChannel] = useState(channels[0]);
  const [note, setNote] = useState("");
  const [tests, setTests] = useState<TestType[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [refCodes, setRefCodes] = useState("");

  useEffect(() => {
    const completed = getCompletedTypes();
    const draft = loadContactDraft();
    if (draft) {
      setName(draft.name ?? "");
      setPhone(draft.phone ?? "");
      setEmail(draft.email ?? "");
      setAgeRange(draft.ageRange ?? "25–29");
      setGoal(draft.goal ?? goals[0]);
      setChannel(draft.channel ?? channels[0]);
      setNote(draft.note ?? "");
    }
    if (goalParam && goals.includes(goalParam)) {
      setGoal(goalParam);
    } else if (goalParam) {
      // allow brief-suggested goal even if not in list
      setGoal(goalParam);
    }
    try {
      const briefRaw = localStorage.getItem("coreprint_consult_brief");
      if (briefRaw) {
        const b = JSON.parse(briefRaw) as { refCodes?: string[]; executiveSummary?: string };
        if (b.refCodes?.length) setRefCodes(b.refCodes.join(" · "));
        if (b.executiveSummary && !draft?.note) {
          setNote(`Brief: ${b.executiveSummary}`);
        }
      }
    } catch {
      /* ignore */
    }
    const initial = new Set<TestType>(completed);
    if (from && from !== ("brief" as TestType)) initial.add(from);
    setTests(Array.from(initial));
  }, [from, goalParam]);

  function toggleTest(t: TestType) {
    setTests((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim()) {
      setError("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      ageRange,
      goal,
      channel,
      note: note.trim(),
      tests: tests.join(","),
      refCodes,
      at: new Date().toISOString(),
    };
    saveContactDraft(payload);
    // Demo: store leads locally. Wire to Formspree / API / Zalo OA later.
    const leads = JSON.parse(localStorage.getItem("coreprint_leads") || "[]") as unknown[];
    leads.push(payload);
    localStorage.setItem("coreprint_leads", JSON.stringify(leads));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center md:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-teal">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Đã nhận thông tin</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Cảm ơn {name}. Team sẽ liên hệ qua <strong>{channel}</strong> trong thời gian sớm nhất.
          Hãy giữ kết quả test trên trình duyệt hoặc chụp màn hình REF code để buổi tư vấn hiệu quả hơn.
        </p>
        <p className="mt-4 text-xs text-muted">
          (Demo local — tích hợp CRM / email webhook khi deploy production.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-sm font-medium text-ink">Họ và tên *</span>
          <input
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-ink/20 focus:ring-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Số điện thoại / Zalo *</span>
          <input
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-ink/20 focus:ring-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xx xxx xxx"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-ink/20 focus:ring-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@email.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Độ tuổi</span>
          <select
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-ink/20 focus:ring-2"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
          >
            {["25–29", "30–34", "35–39", "40–44", "45+", "Dưới 25"].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-ink">Mục tiêu tư vấn</span>
          <select
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-ink/20 focus:ring-2"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            {goals.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-ink">Kênh liên hệ ưa thích</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {channels.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChannel(c)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  channel === c
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-muted hover:border-ink/30",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </label>
        <div className="sm:col-span-2">
          <span className="text-sm font-medium text-ink">Bài test đã / muốn mang theo</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TEST_LIST.map((t) => {
              const on = tests.includes(t.type);
              return (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => toggleTest(t.type)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    on ? "border-teal bg-teal-soft text-teal" : "border-line bg-white text-muted",
                  )}
                >
                  {t.shortName}
                </button>
              );
            })}
          </div>
        </div>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-ink">Ghi chú thêm</span>
          <textarea
            className="mt-1.5 min-h-[110px] w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none ring-ink/20 focus:ring-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bối cảnh hiện tại, câu hỏi bạn muốn làm rõ trong buổi tư vấn…"
          />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        <Send className="h-4 w-4" />
        Gửi yêu cầu tư vấn
      </button>
      <p className="mt-3 text-xs text-muted">
        Thông tin chỉ dùng để liên hệ tư vấn. Không spam, không chia sẻ bên thứ ba.
      </p>
    </form>
  );
}
