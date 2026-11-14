import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { TopicId } from "./topics";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export interface TocEntry {
  id: string;
  /** Stage number label, e.g. "Stage 01". Absent for unnumbered sections. */
  num?: string;
  label: string;
}

export interface GuideMeta {
  slug: string;
  /** Short title used on cards and in lists. */
  title: string;
  /** Full H1 on the guide page; falls back to title. */
  headline: string;
  summary: string;
  topic: TopicId;
  /** Short breadcrumb label on the guide page. */
  crumb: string;
  /** Full stop-tag line above the H1, e.g. "Stop 1: Data foundations. …". */
  stopTag?: string;
  readTime: number;
  /** ISO date the official documentation was last checked. */
  docsChecked: string;
  /** ISO publish date. */
  publishedAt: string;
  toc: TocEntry[];
}

export interface Guide {
  meta: GuideMeta;
  body: string;
}

export function getGuideSlugs(): string[] {
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGuide(slug: string): Guide {
  const raw = fs.readFileSync(path.join(GUIDES_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      headline: data.headline ?? data.title,
      summary: data.summary,
      topic: data.topic,
      crumb: data.crumb ?? data.title,
      stopTag: data.stopTag,
      readTime: data.readTime,
      docsChecked: data.docsChecked,
      publishedAt: data.publishedAt,
      toc: data.toc ?? [],
    },
    body: content,
  };
}

export function getAllGuides(): GuideMeta[] {
  return getGuideSlugs()
    .map((slug) => getGuide(slug).meta)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
