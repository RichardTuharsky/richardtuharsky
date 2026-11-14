# Sync & Send

Personal publication site of Richard Tuharsky — practical notes on customer
data, marketing automation and marketing-to-sales handoffs.
Live at [richardtuharsky.com](https://richardtuharsky.com).

## Stack

Next.js (App Router, TypeScript), Tailwind CSS, MDX guides in
`content/guides/`. Deployed on Vercel.

## Development

```
npm install
npm run dev
```

## Kit signup forms

Forms post to the Kit form action URL from the `NEXT_PUBLIC_KIT_FORM_ACTION`
environment variable (set it in Vercel → Project → Settings → Environment
Variables, then redeploy). Without it, forms show a "not connected yet"
notice instead of submitting.

## Adding a guide

Add `content/guides/<slug>.mdx` with the frontmatter fields read by
`lib/guides.ts` (title, headline, summary, topic, crumb, stopTag, readTime,
docsChecked, publishedAt, toc). The guide page, home list, sitemap and RSS
feed pick it up at build time.
