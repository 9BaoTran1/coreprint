# CorePrint — IQ · EQ · Engage + CRT tư vấn

Landing + multi-test platform for adults 25+: cognitive profile (IQ), emotional intelligence (EQ), and engagement/drive (Engage), with CRT consultation funnel (Tally).

## Live

**https://9baotran1.github.io/coreprint/**

> Mở đúng URL có `/coreprint/`.

| | |
|--|--|
| Repo | https://github.com/9BaoTran1/coreprint |
| CRT form | https://tally.so/r/81WAjP |
| Domain đề xuất | **coreprint.online** — xem [DOMAIN.md](./DOMAIN.md) |

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Static export → GitHub Pages (free)
- Client-side scoring & localStorage
- Vietnamese UI

## Scripts

```bash
npm run dev      # http://localhost:3000
npm run build    # static → /out
```

## Routes

| Path | Mô tả |
|------|--------|
| `/` | Landing + FAQ |
| `/test/iq` · `/eq` · `/engage` | Quiz |
| `/ket-qua/[type]` | Kết quả + copy REF + CRT |
| `/ho-so` | Hồ sơ + brief |
| `/lien-he` | Embed form CRT (Tally) |
| `/phuong-phap` | Methodology |

## Domain

Chốt đề xuất: **`coreprint.online`**.  
Hướng dẫn DNS + Pages: [DOMAIN.md](./DOMAIN.md).

Hiện **chưa gắn CNAME** (tránh gãy github.io trước khi mua DNS).

## Notes

- Assessment định hướng — không thay WAIS/MSCEIT/EQ-i official hay chẩn đoán lâm sàng.
- Lead CRT → Tally. SĐT: set trong `src/lib/site.ts` khi có số thật.
- Copy rải link: [SHARE_COPY.md](./SHARE_COPY.md)
