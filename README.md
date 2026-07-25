# CorePrint — IQ · EQ · Engage (25+)

Landing + multi-test platform inspired by [Personal Test](https://personaltest-rho.vercel.app/), expanded for adults 25+: cognitive profile (IQ), emotional intelligence (EQ), and engagement/drive (Engage), with a consultation lead funnel.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Client-side scoring & localStorage results
- Vietnamese UI, mature visual system

## Scripts

```bash
npm run dev      # http://localhost:3000
npm run build    # static export → /out (local, no basePath)
npm run start    # not used for static export; serve /out with any static host
```

## Hosting (free) — LIVE

**Website:** https://9baotran1.github.io/coreprint/

> Đúng URL có `/coreprint/` (không mở `github.com/...` raw repo).

- Auto deploy: mỗi `git push master` → GitHub Actions → Pages  
- Actions: https://github.com/9BaoTran1/coreprint/actions  
- Scale **300–500 users/tháng**: free tier đủ (static + form Tally)  
- Local build: no `basePath`; CI set `GH_PAGES=true` → prefix `/coreprint`

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing |
| `/test/iq` · `/test/eq` · `/test/engage` | Quiz engines |
| `/ket-qua/[type]` | Results + CTA CRT tư vấn |
| `/lien-he` | Embed form CRT tư vấn (Tally) |

## CRT tư vấn

Primary booking form (Tally):

**https://tally.so/r/81WAjP**

Configured in `src/lib/constants.ts` (`CRT_CONSULT_URL`). All “Đặt lịch tư vấn” CTAs open this link.

## Notes

- Tests are **developmental profiles**, not clinical assessments.
- Booking leads go to Tally (CRT). Local `ContactForm` is unused legacy demo.
- Update phone / email in `Footer` and `CtaSection` as needed.
