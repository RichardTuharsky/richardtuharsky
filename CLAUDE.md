# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Sync & Send" is Richard Tuharsky's personal publication site (live at richardtuharsky.com, deployed on Vercel). It is built with Next.js App Router, TypeScript and Tailwind CSS v4, and is fully static: guides are MDX files rendered at build time, with no database or API routes.

## Commands

```
npm run dev     # dev server (default port 3000)
npm run build   # production build — also the type/correctness check; there is no lint or test setup
npm run start   # serve the production build
```

Visual review: `.screenshots/` (gitignored) holds Playwright scripts (`shoot.mjs`, `hover.mjs`, `interact.mjs`) that screenshot the home and guide pages at 1440px and 390px and report horizontal overflow. They expect a server on **port 3100** (`npx next dev -p 3100`), then `node .screenshots/shoot.mjs`. Playwright scripts must be run from inside the project so they can resolve the `playwright` package.

---

## Site content brief

This section describes what the site is, who it is for, and what every page says, in enough detail to brief another writer, designer or agent without them opening the code.

### What the site is

- **Name:** Sync & Send (written with an ampersand; the "&" is set in italic serif, amber, in the wordmark).
- **Byline:** "by Richard Tuharsky".
- **One-line description (used in metadata and RSS):** "Practical notes on customer data, marketing automation and marketing-to-sales handoffs."
- **Format:** a small publication of long-form, step-by-step troubleshooting guides plus a newsletter. One guide is published so far; six more are announced as "Coming up".
- **Author:** Richard Tuharsky, five years on enterprise Salesforce and Marketing Cloud projects at large consulting companies, in testing, technical and client-facing roles. His interest is "the technical layer: the syncs, queries and automations that decide whether a campaign reaches the right person at the right time."
- **Audience:** "the people who keep marketing and CRM systems running": marketing operations, CRM administrators, Marketing Cloud and Data 360 practitioners, and consultants.
- **Core idea (homepage headline):** "Your campaign is only as fresh as the data behind it."
- **Independence:** the site is independent and not affiliated with or endorsed by Salesforce or Braze. Views are Richard's own, not any employer's or client's.

### Voice and editorial style (as seen in the published copy)

- Plain, practical, second person ("you'll need…", "open…, then…").
- Careful about claims: separates evidence from proof ("Treat this as evidence to investigate, rather than proof of the cause"), and says "observed symptom" until a defect is confirmed.
- Each step names exact UI paths (for example "Setup → Data 360 Setup → Salesforce Integrations → Salesforce CRM").
- Every stage ends with a concrete "Passing result" so the reader knows when to move on.
- Links only to official vendor documentation (Salesforce Help, Trailhead, Salesforce Trust status), and states the date the documentation was last checked.
- Acknowledges vendor renames (for example "Some screens and permission-set names still use 'Data Cloud'").
- Headings are sentence case. No hype, no marketing superlatives.

### The four topics ("stops")

The site's organising metaphor is a transit route at night: each topic is a numbered "stop" on the line, and each has a reserved route-line colour (defined only in `lib/topics.ts`).

| Stop | Topic | Colour | What it covers | The symptom it fixes |
|---|---|---|---|---|
| 1 | Data foundations | coral `#ff5d73` | Where customer data originates, how it moves between CRM and marketing systems, and whether you can trust it when it gets there. | Records don't match between systems, or nobody can say which one is the source of truth. |
| 2 | Usable audiences | amber `#ffb703` | Segments that reflect today's customers; queries and filters that stay correct as the data underneath them changes. | Audiences are rebuilt by hand or start life as a spreadsheet export. |
| 3 | Dependable automation | teal `#2ec4b6` | Scheduling dependencies, error handling, monitoring and recovery, so a failed step gets noticed and fixed before the send. | Automations fail quietly and campaigns go out late, or not at all. |
| 4 | Marketing-to-sales handoffs | violet `#8c7cff` | Getting engaged leads into the CRM with the context a salesperson needs to act on them, and proving that it happened. | Sales says marketing leads never arrive, or arrive without context. |

Two extra themes, LTV (teal) and Retention (coral), are used for upcoming articles that sit outside the four stops.

### Platforms covered

Shown in the "Platforms covered here" row and in the Resources menu:

1. **Marketing Cloud Engagement** (SFMC): journeys, automations, data extensions.
2. **Marketing Cloud Next**: core-platform journeys and migration.
3. **Data 360 and other CDPs** (formerly Data Cloud): ingestion, segments, activation.
4. **Braze**: data feeds, audiences, identifiers.
5. **Sales Cloud and Service Cloud**: leads, routing, Flow, handoffs. (Shown in the platform row, but has no Resources menu filter.)

### Global elements (every page)

**Header** (navy band):
- Left: the "Sync & Send" wordmark with "by Richard Tuharsky" beneath; links home.
- Right navigation:
  - **Resources** dropdown, filtering by platform: Marketing Cloud Engagement, MC Next, Data 360, Braze.
  - **Articles** dropdown, filtering by theme: All articles, Customer Data, Retention, LTV.
  - **About**: jumps to the About section on the homepage.
  - **Subscribe**: amber pill button; jumps to the homepage signup band.
- Every dropdown item opens the separate `/articles` page with that filter applied.

**Footer** (navy band):
- "© 2026 Richard Tuharsky".
- Trademark notice: "Salesforce, Marketing Cloud, Sales Cloud, Service Cloud and Data 360 are trademarks of Salesforce, Inc. Braze is a trademark of Braze, Inc. This site is independent and not affiliated with or endorsed by Salesforce or Braze."
- A collapsible **Privacy** disclosure: email addresses are stored to send new issues; emails are sent through Kit, which stores the address on Richard's behalf; one-click unsubscribe; deletion requests by email. **The contact email is still the placeholder `[YOUR CONTACT EMAIL]`** in `components/PrivacyDetails.tsx`. The disclosure opens automatically when any "Privacy" link (under each signup form) is clicked.

### Homepage (`/`)

Sections, top to bottom:

1. **Hero** (navy, centred)
   - Headline: "Your campaign is only as fresh as the data behind it."
   - Subhead: "Practical notes on customer data, automation and marketing-to-sales handoffs, for the people who keep marketing and CRM systems running."
   - **Site search** box, placeholder "Search guides, topics and platforms". It searches instantly in the browser across the published guide, the upcoming articles, the five platforms, About and Subscribe, and shows up to 8 results labelled Guide, Article, Platform, About or Page. With no matches it suggests trying "Data 360", "audiences" or "automation". Pressing Enter opens the top result.
2. **Latest articles and resources** (paper background)
   - Intro: "The first guide is out. Subscribe to get the rest when they're published."
   - A featured card for each published guide: topic name in its colour, read time, "Documentation checked [date]", title, summary and "Read the guide →". The card has a coloured stripe on the left in the topic colour.
   - A "Coming up" list of the six upcoming articles (title plus a coloured dot and topic label).
3. **About Richard**
   - Richard's photo (`assets/rt.png`, rounded corners).
   - "I've spent five years on enterprise Salesforce and Marketing Cloud projects at large consulting companies, in testing, technical and client-facing roles."
   - "The part I like most is the technical layer: the syncs, queries and automations that decide whether a campaign reaches the right person at the right time. Sync & Send is where I write down what I've learned about keeping that layer reliable."
   - Small print: "Views here are my own and don't represent any employer or client."
4. **Platforms covered here** (navy): five platforms with icons and one-line descriptions (see above).
5. **Subscribe band** (navy)
   - Heading: "Catch the next issue".
   - "Subscribe to get the latest news, guides and practical notes you can apply to your own setup."
   - Email field ("Email address", placeholder "name@company.com") and amber "Subscribe" button.
   - Consent line: "New issues of Sync & Send. Unsubscribe anytime. Privacy".

### Articles page (`/articles`)

- Navy masthead with breadcrumb "Home / Articles", heading "Articles and resources" and the line "The first guide is out. Subscribe to get the rest when they're published."
- Below it, the same guide cards and "Coming up" list as the homepage.
- Opened from a menu item, it is filtered (for example `/articles?filter=data-360`) and shows a "Showing: Data 360 ×" chip; the × clears the filter.
- If nothing matches: "Nothing published under that topic yet. Subscribe and it'll land in your inbox first."
- Filter values: `mce`, `mc-next`, `data-360`, `braze` (platforms) and `customer-data`, `retention`, `ltv` (themes).

### Guide pages (`/guides/<slug>`)

Every guide page has the same frame:

1. **Navy masthead**: breadcrumb (Home / Articles / short guide name); a coloured dot plus the stop tag (for example "Stop 1: Data foundations. Data 360 and Salesforce CRM"); the full headline; the summary; and a meta line: "By Richard Tuharsky · N min read · N stages · Documentation checked [date]".
2. **Body with table of contents**: on desktop, a sticky "In this guide" list on the left drawn as a route line in the topic colour with a stop marker per section; on mobile, a collapsible "In this guide" box.
3. **Guide content**, built from these blocks:
   - **Intro**: opening paragraphs, the first one larger.
   - **Block**: an unnumbered section (for example "Find your starting point").
   - **StartTable**: a two-column "What you see / Start here" table that sends readers to the right stage based on their symptom.
   - **Stage**: a numbered section ("Stage 01" …) with a roundel marker.
   - **Goal**: a "Goal:" line at the top of each stage.
   - **Steps**: a numbered list of actions.
   - **Path**: inline bold UI paths, such as "Setup → Object Manager".
   - **Note**: an info callout (navy "i") or a warning callout (amber "!").
   - **Pass**: a green "Passing result:" box with a tick.
   - **Resources**: an "Official resource(s)" row of links to vendor docs.
   - **Resolved**: a closing checklist of acceptance checks with tickable boxes.
4. "Back to all articles" and "Back to top" links.
5. **Navy subscribe band**: "Get the next guide by email", "Subscribe to get the latest guides and practical notes for CRM, Data 360 and Marketing Cloud data.", email form and "Unsubscribe anytime. Privacy".

### Published guide

**"Data 360 is connected, but CRM data won't load"**
- URL: `/guides/data-360-crm-data-stream-troubleshooting` (the old GitHub Pages `.html` URL redirects here).
- Full headline: "Data 360 Is Connected, but CRM Data Won't Load: A Troubleshooting Guide".
- Summary: "A practical guide to finding where Salesforce CRM data stops reaching Data 360."
- Stop 1, Data foundations. 9-minute read. Published 12 November 2026; documentation checked 31 October 2026. Tags: Data 360, Customer Data.
- Scope: the Salesforce CRM connector into Data 360 (Sales Cloud and Service Cloud data, including problems after a Data Kit deployment). It explicitly excludes Marketing Cloud Connect for SFMC Engagement. Reader needs access to the affected stream, a CRM admin and one safe validation record.
- Structure:
  - Find your starting point (symptom → stage table)
  - Stage 01: Capture the actual failure
  - Stage 02: Verify the correct CRM connection
  - Stage 03: Check source objects, fields and connector permissions
  - Stage 04: Check Data Kit deployment dependencies
  - Stage 05: Check whether the stream is batch or streaming
  - Stage 06: Trace a record through the DLO and DMO
  - Stage 07: Recover, then verify a real update
  - Stage 08: Record ownership or escalate with evidence
  - What "resolved" should mean (six acceptance checks)

### Upcoming articles (announced, not written)

| Title | Topic / theme | Summary | Tags |
|---|---|---|---|
| Synced isn't the same as fresh | Usable audiences | How to tell when your audience data last changed, and why a successful sync can still leave you with yesterday's customers. | MCE, Data 360, Customer Data |
| The automation that failed at 3am | Dependable automation | Who finds out first when an overnight step breaks, and how to make sure it's you and not your customers. | MCE, MC Next |
| The lead nobody followed up | Marketing-to-sales handoffs | Tracing one lead from form fill to sales task, and the places it usually disappears. | MCE, Customer Data |
| One person, three IDs | Data foundations | How duplicate records and mismatched identifiers creep in between CRM and marketing, and how to stop them. | Data 360, Braze, Customer Data |
| The segments that actually move LTV | LTV | Turning order and engagement history into audiences worth expanding, and measuring whether the expansion paid for itself. | Data 360, MCE, LTV |
| Churn signals you already have | Retention | The drop-off patterns sitting in your existing event data, and how to act on them before the unsubscribe. | Braze, MCE, Retention |

### Newsletter

- Provider: **Kit** (formerly ConvertKit). Forms post to the URL in `NEXT_PUBLIC_KIT_FORM_ACTION`. Without it, forms show "Sign-up isn't connected yet."
- Invalid email message: "Enter an email address, like name@company.com."
- Signup forms appear in the homepage subscribe band and at the end of every guide.

### SEO and feeds

- Page titles follow "[Page] | Sync & Send"; the homepage title is "Sync & Send".
- Guides publish Open Graph article metadata (author Richard Tuharsky, publish date) and canonical URLs.
- `/sitemap.xml` (home, /articles, every guide), `/robots.txt`, and an RSS feed at `/feed.xml` listing every guide.

### Visual design ("Night run")

- Navy "night" bands (header, hero, platform row, subscribe bands, footer) frame a light "paper" middle where reading happens.
- Signal amber (`#ffb703`) is reserved for primary actions (Subscribe buttons, focus rings, nav underline).
- The four route-line colours are reserved for the four topics and are never reused for anything else.
- Typography: Archivo (headings and interface, set extra-wide for headlines) and Source Serif 4 (body text).
- Accessibility is a stated priority: darkened topic colours for text (WCAG AA), reduced-motion support, 44px minimum tap targets, labelled landmarks.

---

## Architecture

**Content pipeline.** Guides live in `content/guides/<slug>.mdx` with frontmatter (title, headline, summary, topic, crumb, stopTag, readTime, docsChecked, publishedAt, toc). `lib/guides.ts` reads them with gray-matter at build time. The guide page (`app/guides/[slug]/page.tsx`, via `generateStaticParams`), the article lists, the sitemap and the RSS feed (`app/feed.xml/route.ts`) all derive from it, so adding a guide means adding one MDX file (plus its tags in `GUIDE_TAGS`).

**MDX rendering.** Guide bodies render through `next-mdx-remote/rsc` with the custom component set in `components/guide/mdx.tsx`. MDX files use these components directly; styling lives in the components, not the MDX. `blockJS: false` is set deliberately because content is local and trusted (expression attributes like `items={[…]}` are needed).

**Topic registry.** `lib/topics.ts` is the single source of truth for the four topics and their colours, including darkened `labelColor` variants because the raw line colours fail WCAG AA as text. Never assign topic colours anywhere else.

**Articles, filtering and search.** Guide→tag mapping (`GUIDE_TAGS`) and the `UPCOMING` list live in `lib/articles.ts`, which is server-only because it pulls in `lib/guides.ts` (uses `fs`). Filter labels and the `articlesHref()` link builder live in `lib/filters.ts`, which client components can import. `ArticlesSection` is a client component wrapped in `Suspense` because it uses `useSearchParams`; it renders unfiltered on the homepage (`variant="home"`) and honours `?filter=` on `/articles` (`variant="page"`). `app/page.tsx` builds the search index for `SiteSearch`. New tags must stay consistent across `GUIDE_TAGS`, `UPCOMING`, the Header dropdown lists and `FILTER_LABELS`.

**Design tokens.** All colour and spacing tokens are in the `@theme` blocks of `app/globals.css`; fonts load in `app/layout.tsx`. Use token classes (`bg-night`, `text-ink`, `wrap`, `wdth-125`, …), not raw hex values, except where a one-off is already established.

**Images.** Images live in `assets/` and are imported statically into components (`import photo from "@/assets/rt.png"`) for `next/image`; there is no `public/` folder.

**Redirects.** Legacy GitHub Pages URLs are redirected in `next.config.ts`.
