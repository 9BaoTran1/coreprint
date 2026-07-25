# Domain cho CorePrint

## Đang live (free)

https://9baotran1.github.io/coreprint/

Dùng được ngay để rải link. Không cần domain trả phí.

---

## Domain đề xuất (chốt)

| Ưu tiên | Domain | Vì sao |
|--------:|--------|--------|
| **1 (chọn)** | **coreprint.online** | Khớp brand CorePrint, dễ nhớ, .online rẻ, hợp web assessment online |
| 2 | **coreprint.app** | Ngắn, “app/web tool”, global |
| 3 | **coreprint.co** | Ngắn, professional |
| 4 | **tuvancrt.vn** | Nhấn CRT + Việt Nam (nếu brand CRT quan trọng hơn CorePrint) |
| 5 | **crtonline.vn** | Funnel tư vấn CRT thuần |

**Không ưu tiên `coreprint.vn` / `coreprint.com` mù quáng:**  
tên “CorePrint” đã dùng cho app máy in / web-to-print quốc tế → dễ trùng SEO & nhầm brand.  
`.online` / `.app` tách biệt rõ “web assessment + CRT”.

### Quyết định mặc định trong code

- Preferred: **`coreprint.online`**
- Email brand: `hello@coreprint.online` (cấu hình sau khi mua domain + mailbox)

---

## Cách gắn domain vào GitHub Pages (sau khi mua)

1. Mua domain (Namecheap / Cloudflare / Nhà đăng ký .vn).
2. DNS:
   - `A` @ → `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153`
   - `AAAA` @ → `2606:50c0:8000::153` … (theo docs GitHub Pages)
   - hoặc `CNAME` `www` → `9baotran1.github.io`
3. Repo **Settings → Pages → Custom domain** → nhập `coreprint.online` → bật HTTPS.
4. Thêm file `public/CNAME` nội dung một dòng: `coreprint.online`
5. **Quan trọng:** khi dùng custom domain root, build **không** dùng `basePath=/coreprint`:
   - Sửa workflow: bỏ `GH_PAGES=true` **hoặc** set `GH_PAGES=false`
   - Set secret/env: `NEXT_PUBLIC_SITE_URL=https://coreprint.online`
6. Cập nhật `public/robots.txt` + `public/sitemap.xml` sang domain mới.
7. Push → Actions deploy → đợi DNS (vài phút–48h).

### Vercel (tuỳ chọn, cũng free)

Import repo → add domain `coreprint.online` → DNS theo hướng dẫn Vercel.  
Với Vercel **không cần** `basePath` GitHub Pages.

---

## Checklist mua domain

- [ ] Chọn **coreprint.online** (hoặc phương án 2–5)
- [ ] Mua 1 năm (~100–300k VND tùy nhà cung cấp / TLD)
- [ ] Bật DNS + HTTPS trên Pages/Vercel
- [ ] Tạo email `hello@…` (ImprovMX free / Google Workspace / Zoho)
- [ ] Cập nhật SĐT thật trong `src/lib/site.ts` nếu muốn nút “Gọi”
