# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Sync & Send" — Richard Tuharsky's personal publication site (live at richardtuharsky.com, deployed on Vercel). Next.js App Router + TypeScript + Tailwind CSS v4, fully static: guides are MDX files rendered at build time, with no database or API routes.

## Commands

```
npm run dev     # dev server (default port 3000)
npm run build   # production build — also the type/correctness check; there is no lint or test setup
npm run start   # serve the production build
```

Visual review: `.screenshots/` (gitignored) holds Playwright scripts (`shoot.mjs`, `hover.mjs`, `interact.mjs`) that screenshot the home and guide pages at 1440px and 390px and report horizontal overflow. They expect the dev server on **port 3100** (`npx next dev -p 3100`), then `node .screenshots/shoot.mjs`.

## Architecture

**Content pipeline.** Guides live in `content/guides/<slug>.mdx` with frontmatter (title, headline, summary, topic, crumb, stopTag, readTime, docsChecked, publishedAt, toc). `lib/guides.ts` reads them with gray-matter at build time; the guide page (`app/guides/[slug]/page.tsx`, via `generateStaticParams`), home list, sitemap, robots and RSS feed (`app/feed.xml/route.ts`) all derive from it. Adding a guide = adding one MDX file; everything else picks it up.

**MDX rendering.** Guide bodies render through `next-mdx-remote/rsc` with the custom component set in `components/guide/mdx.tsx` (`Stage`, `Block`, `Goal`, `Steps`, `Note`, `Pass`, `Resources`, `StartTable`, `Resolved`, …). MDX files use these components directly; prose styling lives in the components, not in the MDX. `blockJS: false` is set deliberately because content is local and trusted (expression attributes like `items={[…]}` are needed).

**Topic registry.** `lib/topics.ts` is the single source of truth for the four topics ("stops") and their reserved route-line colours, including darkened `labelColor` variants because the raw line colours fail WCAG AA as text. Topic colours must never be assigned anywhere else — cards, route map and guide pages all read from this registry.

**Filtering and search.** Guide→tag mapping (`GUIDE_TAGS`) and the `UPCOMING` articles list are hardcoded in `app/page.tsx`, which also builds the client-side search index for `SiteSearch`. Header dropdowns link to `/?filter=<tag>#articles`; `ArticlesSection` (a client component, wrapped in `Suspense` because it uses `useSearchParams`) filters client-side. New tags must stay consistent across `GUIDE_TAGS`, `UPCOMING`, the Header dropdown lists and `FILTER_LABELS` in `ArticlesSection`.

**Design system ("Night run").** All colour/spacing tokens are defined in the `@theme` blocks of `app/globals.css` (navy `night` bands, `paper` middle, `signal` amber reserved for primary actions, four `line-*` colours reserved for topics). Fonts: Archivo (display, with a `wdth` variation axis via the `wdth-112`/`wdth-125` utilities) and Source Serif 4 (body), loaded in `app/layout.tsx`. Use the token classes (`bg-night`, `text-ink`, `wrap`, …), not raw hex values, except where a one-off is already established.

**Signup forms.** `SignupForm` posts to Kit via `NEXT_PUBLIC_KIT_FORM_ACTION` (set in Vercel). Without the env var, submits are intercepted with a "not connected yet" notice — this is intended dev behaviour, not a bug.

**Redirects.** Legacy GitHub Pages URLs are redirected in `next.config.ts`.
