import Link from "next/link";
import { BRAND } from "@/lib/tests-meta";
import { CRT_CONSULT_URL } from "@/lib/constants";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[#efeae2]">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-ink">{BRAND.name}</p>
          <p className="mt-1 text-sm font-medium text-ink/80">{SITE.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Ba assessment free (IQ · EQ · Engage) + brief tư vấn. Đăng ký CRT 1:1 khi bạn sẵn
            sàng chốt ưu tiên 90 ngày.
          </p>
          <p className="mt-4 text-xs text-muted">
            * Định hướng phát triển — không thay đánh giá lâm sàng / bài official có license.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Khám phá</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/test/iq" className="hover:text-ink">
                IQ Profile
              </Link>
            </li>
            <li>
              <Link href="/test/eq" className="hover:text-ink">
                EQ Profile
              </Link>
            </li>
            <li>
              <Link href="/test/engage" className="hover:text-ink">
                Engage Profile
              </Link>
            </li>
            <li>
              <Link href="/ho-so" className="hover:text-ink">
                Hồ sơ & brief
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-ink">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Liên hệ & CRT</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/phuong-phap" className="hover:text-ink">
                Phương pháp
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-ink">
                Đặt CRT tư vấn
              </Link>
            </li>
            <li>
              <a
                href={CRT_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                Form Tally CRT
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-ink">
                {SITE.email}
              </a>
            </li>
            <li className="pt-1 text-xs text-muted/90">
              Domain đề xuất: <span className="font-medium text-ink">{SITE.preferredDomain}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/80">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. Live:{" "}
            <a
              href={SITE.liveUrl}
              className="underline-offset-2 hover:text-ink hover:underline"
            >
              github.io/coreprint
            </a>
          </span>
          <span>25+ · rõ ràng · actionable · CRT có dữ liệu.</span>
        </div>
      </div>
    </footer>
  );
}
