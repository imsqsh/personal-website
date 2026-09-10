export type NotebookArticle = {
  title: string;
  /** Tags shown next to the title on the Notebook page. Leave empty for a general note. */
  tags: string[];
  /** Link to the full article/page, if one exists yet. */
  href?: string;
  /** ISO date (YYYY-MM-DD) the article was published. Only set once it's live. */
  date?: string;
};

// TODO: replace placeholders with real posts as they're written — see
// PRODUCT.md content-integrity rules. Add a tag to label an article on
// the Notebook page; leave `tags` empty for a general note.
export const topFiveSportsMoments: NotebookArticle = {
  title: "Top 5 Sports Moments",
  tags: ["Sports"],
  href: "/notebook/top-5-sports-moments",
  date: "2026-09-10",
};

export const notebookArticles: NotebookArticle[] = [
  { title: "TODO: post title", tags: [] },
  { title: "TODO: post title", tags: [] },
  { title: "TODO: post title", tags: [] },
  { title: "TODO: post title", tags: [] },
  topFiveSportsMoments,
];
