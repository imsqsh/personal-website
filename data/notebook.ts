import articlesData from "./notebookArticles.json";

export type NotebookArticle = {
  /** URL-safe id, used for /notebook/{slug} and to identify the row when editing via /notebook/admin. */
  slug: string;
  title: string;
  /** Tags shown next to the title on the Notebook page. Leave empty for a general note. */
  tags: string[];
  /** ISO date (YYYY-MM-DD) the article was published. Only set once it's live. */
  date?: string;
  /** Explicit link override, for an article with a hand-coded page (e.g. one with video embeds). Omit to default to /notebook/{slug}. */
  href?: string;
  /** Markdown-lite body for a generic /notebook/[slug] page — see components/typography/MarkdownLite.tsx. Omit for a hand-coded page or a bodyless note. */
  body?: string;
};

export const notebookArticles: NotebookArticle[] = articlesData as NotebookArticle[];

export const topFiveSportsMoments: NotebookArticle = notebookArticles.find(
  (article) => article.slug === "top-5-sports-moments"
)!;
