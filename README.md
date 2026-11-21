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
- Homepage, shop, a page per product with an image gallery, and the collagen guide
- Research section with links to the published studies; reviews section (shows a marked sample layout until real reviews exist)
- Cart drawer (saved on the device), chat launcher with the U mark, first-visit offer

## Where things live

| What | Where |
| --- | --- |
| All text, prices, products, offers | `src/content/site.ts` |
| Content access (swap to Supabase here) | `src/lib/content.ts` |
| Database schema (not applied yet) | `supabase/schema.sql` |
| Pack shots and logo | `public/img` |
| Generated images and films | `src/content/media.ts` |

## Not connected yet

- Supabase (content, sign-in, discount codes)
- Razorpay checkout and Shiprocket delivery
- Admin portal
- AI answers in the chat (it answers the fixed questions and links to WhatsApp)
- Imagery and films are AI-generated (Higgsfield) and hosted there for now; URLs are in `src/content/media.ts`

## Before launch

Items marked `placeholder: true` in `src/content/site.ts` must be replaced: prices, the launch offer and the halal certificate details. The nutrition panel is left off the site until the label is corrected.
