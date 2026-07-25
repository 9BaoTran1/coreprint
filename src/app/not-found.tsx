import Link from "next/link";
import { Home, LayoutList } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex max-w-lg flex-col items-center py-20 text-center md:py-28">
      <p className="section-label">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
        Không tìm thấy trang
      </h1>
      <p className="mt-3 text-muted leading-relaxed">
        Liên kết có thể sai hoặc trang đã đổi. Bạn có thể về trang chủ hoặc chọn một bài khác.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" />
          Trang chủ
        </Link>
        <Link href="/#tests" className="btn-secondary">
          <LayoutList className="h-4 w-4" />
          Chọn bài đo
        </Link>
      </div>
    </div>
  );
}
