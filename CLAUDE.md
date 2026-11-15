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

Visual review: `.screenshots/` (gitignored) holds Playwright scripts. `shoot.mjs` takes full-page shots of home, /articles and the guide at 390, 768 and 1440px and reports horizontal overflow; `sections.mjs` takes viewport shots of each homepage section; `motion.mjs` checks reduced-motion end states and the stop-grid light. They default to **port 3100**; override with `BASE=http://localhost:3000 node .screenshots/shoot.mjs`. Run them from inside the project so they resolve the `playwright` package. Full-page shots enlarge the viewport, so count-ups and lazy images can look mid-animation there; use `sections.mjs` to judge those.

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

Two extra themes, LTV and Retention, are used for upcoming articles that sit outside the four stops. They get a neutral hollow marker, never a route colour.

### Platforms covered

Shown in the "Platforms covered here" row and in the Resources menu:

1. **Marketing Cloud Engagement** (SFMC): journeys, automations, data extensions.
2. **Marketing Cloud Next**: core-platform journeys and migration.
3. **Data 360 and other CDPs** (formerly Data Cloud): ingestion, segments, activation.
4. **Braze**: data feeds, audiences, identifiers.
5. **Sales Cloud and Service Cloud**: leads, routing, Flow, handoffs. (Shown on the homepage, but has no Resources menu filter.)

### Global elements (every page)

**Header** (navy band, sticky from 768px up):
- A thin four-stop route line along its bottom edge: one segment per topic, filling in that topic's colour as the page scrolls. On phones the header scrolls away and the line pins to the top of the screen.
- Left: the "Sync & Send" wordmark with "by Richard Tuharsky" beneath; links home.
- Right navigation:
  - **Resources** dropdown, filtering by platform: Marketing Cloud Engagement, MC Next, Data 360, Braze.
  - **Articles** dropdown, filtering by theme: All articles, Customer Data, Retention, LTV.
  - **About**: jumps to the About section on the homepage (hidden below 400px wide).
  - **Subscribe**: amber pill button; jumps to the homepage signup band.
- Every dropdown item opens the separate `/articles` page with that filter applied.

**Footer** (navy band):
- The "Sync & Send" wordmark set huge, spanning the full column, with the italic amber "&".
- "© 2026 Richard Tuharsky".
- Trademark notice: "Salesforce, Marketing Cloud, Sales Cloud, Service Cloud and Data 360 are trademarks of Salesforce, Inc. Braze is a trademark of Braze, Inc. This site is independent and not affiliated with or endorsed by Salesforce or Braze."
- A collapsible **Privacy** disclosure: email addresses are stored to send new issues; emails are sent through Kit, which stores the address on Richard's behalf; one-click unsubscribe; deletion requests by email. **The contact email is still the placeholder `[YOUR CONTACT EMAIL]`** in `components/PrivacyDetails.tsx`. The disclosure opens automatically when any "Privacy" link (under each signup form) is clicked.

### Homepage (`/`)

The page reads like riding one line past stops: a single thin route line runs down the left gutter (768px and up), and every section opens with a small **stop marker** (roundel plus uppercase label) that branches off it. Sections, top to bottom:

1. **Hero** (navy, with a faint route-map grid and grain). Marker: "Start · Sync & Send".
   - Headline: "Your campaign is only as fresh as the data behind it." Each word arrives grey and blurred and settles crisp, then a small amber "synced" tick appears.
   - Beside it: subhead "Practical notes on customer data, automation and marketing-to-sales handoffs, for the people who keep marketing and CRM systems running." and the **site search** (placeholder "Search guides, topics and platforms"; searches the published guide, upcoming articles, five platforms, About and Subscribe; up to 8 results labelled Guide, Article, Platform, About or Page; no-match hint "Data 360", "audiences" or "automation"; Enter opens the top result).
   - Below: a **system window** labelled "Sample record · fictional data" that lies back in perspective and sits up as it scrolls in. A fictional contact (Alex Example, alex@example.com) has its status changed in the CRM, then travels to Data 360, Audience and Send along a route track, with an event log, a fictional "Last changed" clock time that updates each cycle, and "In sync across all four systems" at the end.
2. **Latest** (paper). Heading "Latest articles and resources", intro "The first guide is out. Subscribe to get the rest when they're published.", an "All articles" link, the featured guide card (stop label in its topic's text colour, read time, docs-checked date, title, summary, "Read the guide"), then a night **departure board** titled "Coming up" with the six upcoming titles: columns Line (topic dot plus "Stop 0N", or a neutral ring for LTV and Retention), Destination, Topic and Status ("Coming up"). No dates.
3. **The four stops** (navy). Heading "One line, four stops", intro "Each guide belongs to one stop on the route from customer data to a sales conversation. Find the symptom you recognise." A 2×2 grid of tiles, each with its stop number, topic name, "For when [symptom]" and a working mini-screen of fictional data:
   - Stop 01: the same contact in CRM and marketing; email and lifecycle drift apart, then reconcile under a "Source of truth: CRM" badge.
   - Stop 02: a "Renewal due in 30 days" segment; rows change, "Last changed" moves past "Last synced", the count recalculates from 1,284 to 1,286 and the times agree again.
   - Stop 03: an overnight run log; "Build send list" fails at 03:00, an alert goes to on-call, and the 03:15 retry passes.
   - Stop 04: a lead moves Form fill → CRM lead → Routed → Sales task, picking up source, interest, owner and next step, ending with "Task created with its context".
   A tile links to its topic's guide ("Read the guide") or to Subscribe ("Coming up · get it by email"). A soft light follows the mouse across the grid, catching tile edges, and tiles lean gently toward it; without a mouse the light drifts with scroll.
4. **How a guide works** (paper). Heading "Start where you are. Stop when it passes." Three steps (Find your starting point; Work through the stages; Confirm a passing result) beside a pinned panel that switches between real guide components: the StartTable, Stage 01 with its Goal and Steps, and Stage 01's green passing result.
5. **About** (paper). Richard's photo, his line "The part I like most is the technical layer…" as a big pull quote, his five-years paragraph and "Sync & Send is where I write down…", then four counting figures: 5 years on enterprise Salesforce and Marketing Cloud projects, 4 stops, 5 platforms, 6 guides coming up (the last three are computed from the data). Small print: "Views here are my own and don't represent any employer or client."
6. **Platforms** (navy). One giant sentence: "Guides cover Marketing Cloud Engagement, Marketing Cloud Next, Data 360 and other CDPs, Braze, and Sales Cloud and Service Cloud." Hovering, focusing or tapping a name shows its one-line description below, with a "See articles" link where a filter exists. No vendor logos.
7. **How guides are written** (paper). Heading "Five rules every guide follows": official vendor docs only, with the date checked; evidence, not proof; exact UI paths; every stage ends in a passing result; independent of Salesforce and Braze. Beside it, a live example of Stage 03 from the Data 360 guide that fills in its steps and ends on its passing result, with official links and the docs-checked date.
8. **Subscribe** (navy). One hairline-divided panel: "Catch the next issue", "Subscribe to get the latest news, guides and practical notes you can apply to your own setup.", the Kit form, consent "New issues of Sync & Send. Unsubscribe anytime. Privacy".
9. **Questions** (paper). Who is it for; which platforms; affiliation; how email is handled (mentions `[YOUR CONTACT EMAIL]`); how often issues go out (`[HOW OFTEN ISSUES GO OUT]`); is it free (`[IS IT FREE]`). Bracketed values are placeholders still to fill in.
10. **End of the line** (navy). The closing line "Check the data before you send.", followed by the footer wordmark.

Every looping demo has a pause button, pauses when off screen, and shows its finished state under reduced motion.

### Articles page (`/articles`)

- Navy masthead (grid and grain) with breadcrumb "Home / Articles", an "Articles" stop marker, heading "Articles and resources" and the line "The first guide is out. Subscribe to get the rest when they're published."
- Below it, the same guide card and departure board as the homepage, then the subscribe panel. The page sits inside the route line.
- Opened from a menu item, it is filtered (for example `/articles?filter=data-360`) and shows a "Showing: Data 360 ×" chip; the × clears the filter.
- If nothing matches: "Nothing published under that topic yet. Subscribe and it'll land in your inbox first."
- Filter values: `mce`, `mc-next`, `data-360`, `braze` (platforms) and `customer-data`, `retention`, `ltv` (themes).

### Guide pages (`/guides/<slug>`)

Every guide page has the same frame:

1. **Navy masthead** (grid and grain): breadcrumb (Home / Articles / short guide name); a stop marker with the topic-coloured roundel and the stop tag (for example "Stop 1: Data foundations. Data 360 and Salesforce CRM"); the full headline; the summary; and a meta line: "By Richard Tuharsky · N min read · N stages · Documentation checked [date]".
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
5. **Subscribe panel**: "Get the next guide by email", "Subscribe to get the latest guides and practical notes for CRM, Data 360 and Marketing Cloud data.", email form and "Unsubscribe anytime. Privacy".

Guide bodies stay calm: no motion inside them.

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

- A quiet, premium night-route publication: navy "night" bands alternate with a light "paper" middle where reading happens. One thin neutral route line joins the sections.
- Signal amber (`#ffb703`) is reserved for primary actions (Subscribe buttons, focus rings, nav underline), plus the brand "&" and the hero's "synced" tick.
- The four route-line colours are reserved for the four topics and are never reused for anything else.
- Typography: Archivo, extra-wide and tightly tracked, for headlines; Source Serif 4 for anything people read; small uppercase Archivo labels with tabular figures for markers, times and counts (the `label` utility).
- Accessibility: on paper, coloured text uses each topic's darkened `labelColor` (WCAG AA); on night, the raw line colours pass. Amber focus rings, 44px tap targets, nothing that depends on hover, full `prefers-reduced-motion` support (animations show their end state), pause buttons on looping demos.

---

## Architecture

**Content pipeline.** Guides live in `content/guides/<slug>.mdx` with frontmatter (title, headline, summary, topic, crumb, stopTag, readTime, docsChecked, publishedAt, toc). `lib/guides.ts` reads them with gray-matter at build time. The guide page (`app/guides/[slug]/page.tsx`, via `generateStaticParams`), the article lists, the sitemap and the RSS feed (`app/feed.xml/route.ts`) all derive from it, so adding a guide means adding one MDX file (plus its tags in `GUIDE_TAGS`).

**MDX rendering.** Guide bodies render through `next-mdx-remote/rsc` with the custom component set in `components/guide/mdx.tsx`. MDX files use these components directly; styling lives in the components, not the MDX. `blockJS: false` is set deliberately because content is local and trusted (expression attributes like `items={[…]}` are needed).

**Topic registry.** `lib/topics.ts` is the single source of truth for the four topics and their colours, including darkened `labelColor` variants because the raw line colours fail WCAG AA as text. Never assign topic colours anywhere else.

**Articles, filtering and search.** Guide→tag mapping (`GUIDE_TAGS`) and the `UPCOMING` list live in `lib/articles.ts`, which is server-only because it pulls in `lib/guides.ts` (uses `fs`). Filter labels and the `articlesHref()` link builder live in `lib/filters.ts`, which client components can import. Platform data lives in `lib/platforms.ts` (client-safe). `ArticlesSection` is the `/articles` list only: a client component wrapped in `Suspense` because it uses `useSearchParams`. The homepage uses `components/home/Latest.tsx`; both render `DepartureBoard`. `app/page.tsx` builds the search index for `SiteSearch`. New tags must stay consistent across `GUIDE_TAGS`, `UPCOMING`, the Header dropdown lists and `FILTER_LABELS`.

**Homepage sections.** Each section is a component in `components/home/` (the stop tiles are in `components/home/stops/`), assembled in order in `app/page.tsx` inside `<Route>`. Server components by default; only interactive or animated pieces are client components.

**Route system.** `components/route/`: `Route` wraps a page with the gutter line (`.route-scope` / `.route-line` in `globals.css`); `StopMarker` opens each section and branches to the line (pass `branch={false}` for nested markers); `useLoop` drives the demo screens (server and reduced-motion render the last step, runs only while on screen, pausable); `MotionToggle` is the pause button. Demo screens lay out every state up front and only toggle opacity or transform, so nothing shifts.

**Motion without libraries.** Headline sync, tick and menus use CSS keyframes. The hero window's sit-up is a scroll-driven CSS animation (`animation-timeline: view()`), shown flat where unsupported. The header progress, the stop-grid light and lean, and the demos write CSS variables or small state from rAF-throttled listeners. The reduced-motion block in `globals.css` also zeroes animation delays, so delayed elements appear immediately.

**Real guide components on the homepage.** "How a guide works" and the live stage example render `StartTable`, `Stage`, `Goal`, `Steps`, `Pass` and `Resources` from `components/guide/mdx.tsx`. `Stage` takes an optional `level={3}` so its heading fits the homepage outline; MDX usage is unchanged.

**Sticky header.** The header is sticky from `md` up; `html` has `scroll-padding-top: 5.5rem` there, and the guide TOC sticks at `top-28`. Keep `scroll-mt` on targets small, because it adds to the scroll padding.

**Design tokens.** All colour and spacing tokens are in the `@theme` blocks of `app/globals.css`, along with the `wrap`, `label`, `night-texture` and `wdth-*` utilities; fonts load in `app/layout.tsx`. Use token classes (`bg-night`, `text-ink`, `wrap`, `wdth-125`, …), not raw hex values, except where a one-off is already established. Grids that only declare columns at a breakpoint need `grid-cols-1` at the base, or min-content children overflow on phones.

**Images.** Images live in `assets/` and are imported statically into components (`import photo from "@/assets/rt.png"`) for `next/image`; there is no `public/` folder.

**Redirects.** Legacy GitHub Pages URLs are redirected in `next.config.ts`.
