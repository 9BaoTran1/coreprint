"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Play } from "lucide-react";
import { CRT_CONSULT_URL } from "@/lib/constants";

/**
 * Mobile-only sticky bottom bar — quick start assessment or CRT consult.
 * Hidden on desktop and on quiz flow (full focus).
 */
export function MobileStickyCta() {
  const pathname = usePathname() ?? "";
  const hide =
    pathname.startsWith("/test/") ||
    pathname.includes("/test/");

  if (hide) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-[color-mix(in_srgb,var(--bg-elevated)_94%,transparent)] px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(20,32,51,0.08)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href="/#tests"
          className="btn-primary min-h-11 flex-1 !px-3 !py-2.5 text-sm"
        >
          <Play className="h-4 w-4" />
          Làm bài
        </Link>
        <a
          href={CRT_CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary min-h-11 flex-1 !px-3 !py-2.5 text-sm"
        >
          <MessageCircle className="h-4 w-4" />
          Tư vấn CRT
        </a>
      </div>
    </div>
  );
}
