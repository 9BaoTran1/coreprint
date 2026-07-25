import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { BRAND } from "@/lib/tests-meta";
import "./globals.css";

const SITE_URL = "https://9baotran1.github.io/coreprint/";
const META_TITLE = "CorePrint | Trắc nghiệm IQ, EQ, Engage & tư vấn CRT";
const META_DESCRIPTION =
  "Khám phá hồ sơ IQ, EQ và mức độ gắn kết Engage bằng bộ trắc nghiệm tiếng Việt, nhận kết quả rõ ràng và đăng ký tư vấn CRT dành cho người Việt.";

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: META_TITLE,
    template: `%s | ${BRAND.name}`,
  },
  description: META_DESCRIPTION,
  keywords: [
    "trắc nghiệm IQ",
    "trắc nghiệm EQ",
    "trắc nghiệm Engage",
    "test IQ tiếng Việt",
    "test EQ tiếng Việt",
    "đánh giá gắn kết công việc",
    "tư vấn CRT",
    "tư vấn CRT Việt Nam",
    "phát triển bản thân",
    "CorePrint",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: "./",
    siteName: BRAND.name,
    images: [
      {
        url: "og.png",
        width: 1200,
        height: 630,
        alt: "CorePrint — Trắc nghiệm IQ, EQ, Engage và tư vấn CRT",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ["og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
