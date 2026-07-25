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
            Ba bài miễn phí giúp bạn hiểu khả năng tư duy, cách xử lý cảm xúc và mức
            năng lượng trong công việc. Đăng ký tư vấn CRT khi bạn muốn lập kế hoạch 90 ngày.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Kết quả chỉ hỗ trợ định hướng phát triển. Đây không phải chẩn đoán sức khỏe
            tâm lý và không thay thế bài đánh giá chuyên sâu do chuyên gia thực hiện.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Khám phá</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/test/iq" className="hover:text-ink">
                Hồ sơ tư duy (IQ)
              </Link>
            </li>
            <li>
              <Link href="/test/eq" className="hover:text-ink">
                Hồ sơ cảm xúc (EQ)
              </Link>
            </li>
            <li>
              <Link href="/test/engage" className="hover:text-ink">
                Hồ sơ năng lượng (Engage)
              </Link>
            </li>
            <li>
              <Link href="/ho-so" className="hover:text-ink">
                Hồ sơ tổng hợp
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-ink">
                Câu hỏi thường gặp
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Hỗ trợ</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/phuong-phap" className="hover:text-ink">
                Phương pháp đo
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-ink">
                Đặt tư vấn CRT
              </Link>
            </li>
            <li>
              <a
                href={CRT_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                Biểu mẫu đăng ký tư vấn
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-ink">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/80">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. Bảo lưu mọi quyền.
          </span>
          <span>Thiết kế cho người trưởng thành 25+ — rõ ràng, thực tế, dùng được ngay.</span>
        </div>
      </div>
    </footer>
  );
}
