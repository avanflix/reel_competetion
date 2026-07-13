# Troy Telugu Reels — UI Preview (TypeScript)

This is a **front-end-only preview** of the Reels Competition flow, converted
to TypeScript, for client review. No back end is wired up yet.

## What's here
- `app/page.tsx` — public site: hero, rules, entry form, payment step
- `app/admin/page.tsx` — admin sign-in (demo mode: any credentials work)
- `app/admin/dashboard/page.tsx` — admin dashboard filled with randomly
  generated sample submissions, plus a working CSV export of the sample data
- `components/*.tsx` — all UI components, typed
- `lib/mockSubmissions.ts` — random sample data generator for the admin view
- `lib/pricing.ts`, `lib/usStates.ts` — small shared helpers

## What's intentionally mocked
- Submitting the entry form and paying does **not** hit any API — it just
  advances the on-screen flow so the client can see how it feels end to end.
- The admin dashboard shows generated sample entries, not real submissions.
- `.env.local` is intentionally empty — no Stripe / database / email keys
  are required to run this preview.

## Run it
```bash
npm install
npm run dev
```
Then open http://localhost:3000 (site) and http://localhost:3000/admin (admin demo).
