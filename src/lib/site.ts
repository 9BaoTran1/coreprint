/**
 * Site / brand config — single source for domain, contact, SEO base URL.
 *
 * LIVE hiện tại (free): GitHub Pages
 * Domain đề xuất production: coreprint.online (ưu tiên) · coreprint.app · tuvancrt.vn
 */
export const SITE = {
  name: "CorePrint",
  tagline: "Hiểu rõ ba trục: tư duy · cảm xúc · năng lượng",
  /** URL đang chạy (GitHub Pages) */
  liveUrl: "https://9baotran1.github.io/coreprint",
  /** Domain production đề xuất — xem DOMAIN.md */
  preferredDomain: "coreprint.online",
  preferredUrl: "https://coreprint.online",
  domainAlternatives: [
    "coreprint.app",
    "coreprint.co",
    "tuvancrt.vn",
    "crtonline.vn",
  ] as const,
  email: "hello@coreprint.online",
  phone: null as string | null,
  phoneDisplay: null as string | null,
  locale: "vi_VN",
  defaultDescription:
    "Đo IQ, EQ và mức gắn kết công việc bằng tiếng Việt. Nhận báo cáo rõ ràng và đặt tư vấn CRT 1:1 có dữ liệu — dành cho người 25+.",
} as const;

/** metadataBase / canonical — override bằng NEXT_PUBLIC_SITE_URL khi gắn domain */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return SITE.liveUrl;
}
