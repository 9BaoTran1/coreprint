import Link from "next/link";
import { ArrowUpRight, Clock, ListChecks } from "lucide-react";
import { TEST_LIST } from "@/lib/tests-meta";
import { TestIcon } from "@/components/TestIcon";

export function TestCards() {
  return (
    <section id="tests" className="scroll-mt-24 py-16 md:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="section-label">Ba bài free</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            IQ · EQ · Engage — đủ mở buổi CRT
          </h2>
          <p className="mt-3 text-muted">
            Làm yên tĩnh, không tra cứu. Nên đủ 3 bài để brief đầy đủ. Mỗi trục bám một chuẩn
            quốc tế (câu hỏi original).
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TEST_LIST.map((t, i) => (
            <article
              key={t.type}
              className="group glass-card flex flex-col p-6 transition hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{ background: t.color }}
              >
                <TestIcon icon={t.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{t.name}</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: t.accent }}>
                {t.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t.description}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 border border-line">
                  <Clock className="h-3.5 w-3.5" />
                  {t.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 border border-line">
                  <ListChecks className="h-3.5 w-3.5" />
                  {t.questionCount} câu
                </span>
              </div>

              <ul className="mt-4 space-y-1.5">
                {t.benefits.slice(0, 2).map((b) => (
                  <li key={b} className="text-xs leading-relaxed text-muted before:mr-2 before:text-accent before:content-['•']">
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href={`/test/${t.type}`}
                className="btn-primary mt-6 w-full"
                style={{ background: t.color }}
              >
                Làm {t.shortName}
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
