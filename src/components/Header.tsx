"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/tests-meta";
import { CRT_CONSULT_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#tests", label: "Assessment" },
  { href: "/phuong-phap", label: "Phương pháp" },
  { href: "/ho-so", label: "Hồ sơ" },
  { href: "/#faq", label: "FAQ" },
  { href: "/lien-he", label: "CRT tư vấn" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when menu open (mobile)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between sm:h-16">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-ink text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
            CP
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
              {BRAND.name}
            </span>
            <span className="hidden text-[11px] text-muted sm:block">Battery tư vấn 25+</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-7 md:flex">
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={CRT_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hidden !px-3 !py-2 text-sm md:inline-flex"
          >
            CRT tư vấn
          </a>
          <Link
            href="/#tests"
            className="btn-primary hidden !px-4 !py-2.5 text-sm md:inline-flex"
          >
            Bắt đầu đo
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line transition active:scale-95 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
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
        <div className="container-page flex max-h-[min(70vh,28rem)] flex-col gap-1 overflow-y-auto py-3 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-3 text-sm font-medium text-ink active:bg-white hover:bg-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={CRT_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-2 min-h-11"
            onClick={() => setOpen(false)}
          >
            CRT tư vấn
          </a>
          <Link
            href="/#tests"
            className="btn-primary mt-2 min-h-11"
            onClick={() => setOpen(false)}
          >
            Bắt đầu đo
          </Link>
        </div>
      </div>
    </header>
  );
}
