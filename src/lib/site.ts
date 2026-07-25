/**
 * Site / brand config — single source for domain, contact, SEO base URL.
 *
 * LIVE hiện tại (free): GitHub Pages
 * Domain đề xuất production: coreprint.online (ưu tiên) · coreprint.app · tuvancrt.vn
 */
export const SITE = {
  name: "CorePrint",
  tagline: "Hiểu rõ tư duy, cảm xúc và năng lượng trong công việc",
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
    "Ba bài miễn phí bằng tiếng Việt giúp người từ 25 tuổi hiểu khả năng tư duy (IQ), cách xử lý cảm xúc (EQ) và mức năng lượng trong công việc (Engage), kèm lựa chọn tư vấn CRT 1:1.",
} as const;

/** metadataBase / canonical — override bằng NEXT_PUBLIC_SITE_URL khi gắn domain */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return SITE.liveUrl;
}
