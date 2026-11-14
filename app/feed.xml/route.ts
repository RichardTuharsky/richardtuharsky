import { getAllGuides } from "@/lib/guides";

const SITE = "https://richardtuharsky.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const dynamic = "force-static";

export function GET() {
  const guides = getAllGuides();
  const lastBuildDate = guides[0]
    ? new Date(`${guides[0].publishedAt}T00:00:00Z`).toUTCString()
    : new Date("2026-11-12T00:00:00Z").toUTCString();

  const items = guides
    .map((guide) => {
      const url = `${SITE}/guides/${guide.slug}`;
      return `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(guide.summary)}</description>
      <pubDate>${new Date(`${guide.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sync &amp; Send</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Practical notes on customer data, marketing automation and marketing-to-sales handoffs, by Richard Tuharsky.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
