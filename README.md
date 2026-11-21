# UMMA Supplements

Storefront for ummasupplements.com. Next.js (App Router), Tailwind CSS, to be hosted on Vercel with Supabase for data, sign-in and media.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What is built

- Design system: colours, type and buttons in `src/app/globals.css`
- Homepage, shop, a page per product, and the halal promise page
- Cart drawer (saved on the device), chat launcher with the U mark, first-visit offer

## Where things live

| What | Where |
| --- | --- |
| All text, prices, products, offers | `src/content/site.ts` |
| Content access (swap to Supabase here) | `src/lib/content.ts` |
| Database schema (not applied yet) | `supabase/schema.sql` |
| Images | `public/img` |

## Not connected yet

- Supabase (content, sign-in, discount codes)
- Razorpay checkout and Shiprocket delivery
- Admin portal
- AI answers in the chat (it answers the fixed questions and links to WhatsApp)
- Films: every film slot shows its shot description until a video URL is supplied

## Before launch

Items marked `placeholder: true` in `src/content/site.ts` must be replaced: prices, the launch offer and the halal certificate details. The nutrition panel is left off the site until the label is corrected.
