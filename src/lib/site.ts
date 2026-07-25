/**
 * Site / brand config — single source for domain, contact, SEO base URL.
 *
 * LIVE hiện tại (free): GitHub Pages
 * Domain đề xuất production: coreprint.online (ưu tiên) · coreprint.app · tuvancrt.vn
 */
export const SITE = {
  name: "CorePrint",
  tagline: "IQ · EQ · Engage — tư vấn CRT có dữ liệu",
  /** URL đang chạy (GitHub Pages) */
  liveUrl: "https://9baotran1.github.io/coreprint",
  /**
   * Domain production đề xuất (mua DNS rồi trỏ về Pages/Vercel).
   * Không gắn CNAME trong repo cho đến khi DNS sẵn sàng — sẽ gãy github.io.
   */
  preferredDomain: "coreprint.online",
  preferredUrl: "https://coreprint.online",
  domainAlternatives: [
    "coreprint.app",
    "coreprint.co",
    "tuvancrt.vn",
    "crtonline.vn",
  ] as const,
  /** Email brand — cập nhật mailbox thật khi có domain */
  email: "hello@coreprint.online",
  /** null = ẩn nút gọi (chưa có SĐT thật) */
  phone: null as string | null,
  phoneDisplay: null as string | null,
  locale: "vi_VN",
  defaultDescription:
    "Trắc nghiệm IQ, EQ và Engage tiếng Việt cho người 25+. Nhận báo cáo + brief, đăng ký tư vấn CRT 1:1 có dữ liệu.",
} as const;

/** metadataBase / canonical — override bằng NEXT_PUBLIC_SITE_URL khi gắn domain */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return SITE.liveUrl;
}
