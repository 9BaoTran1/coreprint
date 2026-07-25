# Task board — chia việc tăng tốc

**Scale target:** 300–500 users · free hosting (GitHub Pages) · form CRT trên Tally.

Cập nhật status: `todo` | `claimed:Grok|Codex|Antigravity` | `done` | `blocked`.

---

## Track A — Online & rải link (Grok lead)

| ID | Task | Owner | Status | Note |
|----|------|-------|--------|------|
| A1 | Static export + GH Actions Pages | Grok | done | workflow `.github/workflows/deploy-pages.yml` |
| A2 | Push repo `9BaoTran1/coreprint` | Grok | done | public |
| A3 | Verify URL live + smoke click CRT | Grok | done | 200 OK home / lien-he / test/iq |
| A4 | Copy link rải (landing + Tally) | Grok | done | xem SHARE_COPY.md |
| A5 | Custom domain đề xuất coreprint.online | Grok | done | docs DOMAIN.md — mua DNS rồi gắn |

## Track B — Sản phẩm / UX (Codex lead, Antigravity review UI)

| ID | Task | Owner | Status | Paths an toàn |
|----|------|-------|--------|----------------|
| B1 | Mobile polish Header + CTA sticky | Grok | done | Sticky bottom CTA + header mobile lock-scroll |
| B2 | Loading/empty states quiz mượt hơn | Codex | done | Thêm màn khởi động pulse, fallback khi thiếu câu hỏi và tiến độ an toàn. |
| B3 | Trang kết quả: nút share kết quả (copy REF) | Codex | done | Thêm sao chép REF/tóm tắt, có fallback clipboard và phản hồi 2 giây. |
| B4 | Visual polish + FAQ + 404 | Grok | done | FAQ section, not-found, touch CSS |
| B5 | SEO meta + OG image đơn giản | Codex | done | Thêm SEO IQ/EQ/Engage/CRT, metadataBase GitHub Pages và ảnh OG 1200×630. |

## Track C — Nội dung & funnel CRT (Grok + Antigravity)

| ID | Task | Owner | Status | Paths |
|----|------|-------|--------|-------|
| C1 | Copy tiếng Việt gọn cho 25+ | Grok | done | Hero/Why/Tests/Audience/Process gọn hơn |
| C2 | Checklist mang REF vào form Tally | Grok | done | checklist /lien-he + tip trên BriefPanel |
| C3 | SĐT/email | Grok | done | email brand @coreprint.online; ẩn SĐT giả |

## Track D — Chất lượng (Codex)

| ID | Task | Owner | Status |
|----|------|-------|--------|
| D1 | `codex review` sau mỗi PR nhỏ | Codex | todo |
| D2 | Mở rộng `scripts/smoke-score.ts` | Codex | todo |
| D3 | Kiểm tra basePath `/coreprint` không gãy link | Grok | done | routes 200 với prefix /coreprint/ |

---

## Đang chạy song song (template)

Khi bắt đầu sprint 30–60 phút:

1. **Grok:** A3 + D3 + push nếu cần  
2. **Codex:** `codex exec` B1 hoặc B3  
3. **Antigravity:** mở repo → B4/C1 (không đụng constants/deploy)

## Claim rule

Trước khi làm, sửa 1 dòng status → `claimed:<tên>`. Xong → `done` + 1 câu note.
