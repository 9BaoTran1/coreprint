import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { BRAND } from "@/lib/tests-meta";
import { SITE, getSiteUrl } from "@/lib/site";
import "./globals.css";

const SITE_URL = `${getSiteUrl()}/`;
const META_TITLE = `${SITE.name} | Hiểu tư duy, cảm xúc và năng lượng công việc`;
const META_DESCRIPTION = SITE.defaultDescription;

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
    "bài IQ tiếng Việt",
    "bài EQ tiếng Việt",
    "đánh giá gắn kết công việc",
    "tư vấn CRT",
    "tư vấn CRT Việt Nam",
    "phát triển bản thân",
    "CorePrint",
    "coreprint.online",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
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
        alt: "CorePrint — hiểu tư duy, cảm xúc, năng lượng công việc và tư vấn CRT",
      },
    ],
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ["og.png"],
  },
  robots: {
    index: true,
    follow: true,
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
