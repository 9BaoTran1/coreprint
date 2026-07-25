import Link from "next/link";
import { BRAND } from "@/lib/tests-meta";
import { CRT_CONSULT_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[#efeae2]">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-ink">{BRAND.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {BRAND.description}
          </p>
          <p className="mt-4 text-xs text-muted">
            * Các bài test mang tính định hướng phát triển, không thay thế đánh giá lâm sàng /
            tâm lý chuyên sâu.
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
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Hỗ trợ</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/phuong-phap" className="hover:text-ink">
                Phương pháp
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-ink">
                CRT tư vấn (trang form)
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
              <a href="mailto:hello@coreprint.vn" className="hover:text-ink">
                hello@coreprint.vn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/80">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span>Thiết kế cho người trưởng thành 25+ — rõ ràng, thực tế, actionable.</span>
        </div>
      </div>
    </footer>
  );
}
