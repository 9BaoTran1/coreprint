import { ExternalLink, MessageCircle } from "lucide-react";
import { CRT_CONSULT_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

type ConsultCtaProps = {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "link";
  showIcon?: boolean;
  /** UTM / context note — only shown as title tooltip */
  source?: string;
};

/**
 * Primary CTA → form CRT tư vấn trên Tally.
 * External link, opens new tab.
 */
export function ConsultCta({
  label = "Đặt tư vấn CRT",
  className,
  variant = "primary",
  showIcon = true,
  source,
}: ConsultCtaProps) {
  const href = source
    ? `${CRT_CONSULT_URL}${CRT_CONSULT_URL.includes("?") ? "&" : "?"}source=${encodeURIComponent(source)}`
    : CRT_CONSULT_URL;

  const base =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : "inline-flex items-center gap-1.5 font-medium text-accent underline-offset-2 hover:underline";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, className)}
      title="Mở biểu mẫu đăng ký tư vấn CRT"
    >
      {showIcon && variant !== "link" && <MessageCircle className="h-4 w-4" />}
      {label}
      {variant === "link" && <ExternalLink className="h-3.5 w-3.5" />}
    </a>
  );
}
