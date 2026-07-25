"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/lib/tests-meta";
import { CRT_CONSULT_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#tests", label: "Assessment" },
  { href: "/phuong-phap", label: "Phương pháp" },
  { href: "/ho-so", label: "Hồ sơ" },
  { href: "/#process", label: "Quy trình" },
  { href: "/lien-he", label: "CRT tư vấn" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm font-bold text-white">
            CP
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-ink">
              {BRAND.name}
            </span>
            <span className="hidden text-[11px] text-muted sm:block">Battery tư vấn 25+</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CRT_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hidden !px-3 !py-2 text-sm sm:inline-flex"
          >
            CRT tư vấn
          </a>
          <Link href="/#tests" className="btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex">
            Bắt đầu đo
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-line bg-[var(--bg-elevated)] md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-page flex flex-col gap-1 py-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={CRT_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-2"
            onClick={() => setOpen(false)}
          >
            CRT tư vấn
          </a>
          <Link
            href="/#tests"
            className="btn-primary mt-2"
            onClick={() => setOpen(false)}
          >
            Bắt đầu đo
          </Link>
        </div>
      </div>
    </header>
  );
}
