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

## Hosting (free)

- **GitHub Pages** (auto): push `master` → Actions deploy  
  URL: `https://9BaoTran1.github.io/coreprint/`
- Scale **300–500 users/tháng**: dư sức free tier (static only + Tally form)
- Local build uses no `basePath`; CI sets `GH_PAGES=true` for project site path

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
