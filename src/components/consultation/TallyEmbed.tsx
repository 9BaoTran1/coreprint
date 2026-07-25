"use client";

import { useEffect } from "react";
import { CRT_CONSULT_EMBED_URL, CRT_CONSULT_URL } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

/**
 * Embed form CRT tư vấn (Tally). Loads Tally widget script for dynamic height.
 */
export function TallyEmbed({ title = "Biểu mẫu đăng ký tư vấn CRT" }: { title?: string }) {
  useEffect(() => {
    const id = "tally-embed-script";
    if (document.getElementById(id)) {
      // re-init if script already present (client nav)
      // @ts-expect-error Tally global
      if (typeof window !== "undefined" && window.Tally?.loadEmbeds) {
        // @ts-expect-error Tally global
        window.Tally.loadEmbeds();
      }
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://tally.so/widgets/embed.js";
    s.async = true;
    s.onload = () => {
      // @ts-expect-error Tally global
      if (window.Tally?.loadEmbeds) window.Tally.loadEmbeds();
    };
    document.body.appendChild(s);
  }, []);

  return (
    <div className="glass-card overflow-hidden p-2 md:p-4">
      <iframe
        src={CRT_CONSULT_EMBED_URL}
        data-tally-src={CRT_CONSULT_EMBED_URL}
        loading="lazy"
        width="100%"
        height={520}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title={title}
        allow="clipboard-write"
        className="min-h-[520px] w-full rounded-xl bg-white"
      />
      <p className="mt-3 px-2 pb-1 text-center text-xs text-muted">
        Biểu mẫu không tải?{" "}
        <a
          href={CRT_CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-ink underline-offset-2 hover:underline"
        >
          Mở biểu mẫu đăng ký
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}
