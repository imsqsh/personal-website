export type NotebookArticle = {
  title: string;
  /** Tags group this article under a category on the Notebook page. Leave empty for general/untagged notes. */
  tags: string[];
  /** Link to the full article/page, if one exists yet. */
  href?: string;
};

// TODO: replace placeholders with real posts as they're written — see
// PRODUCT.md content-integrity rules. Add a tag to group an article under
// a category on the Notebook page; leave `tags` empty for general notes.
export const notebookArticles: NotebookArticle[] = [
  { title: "TODO: post title", tags: [] },
  { title: "TODO: post title", tags: [] },
  { title: "TODO: post title", tags: [] },
  { title: "TODO: post title", tags: [] },
  {
    title: "Top 5 Sports Moments",
    tags: ["Sports"],
    href: "/notebook/top-5-sports-moments",
  },
  { title: "TODO: article title", tags: ["Sports"] },
  { title: "TODO: article title", tags: ["Sports"] },
  { title: "TODO: article title", tags: ["Music"] },
  { title: "TODO: article title", tags: ["Music"] },
  { title: "TODO: article title", tags: ["Music"] },
  { title: "TODO: article title", tags: ["Travel"] },
  { title: "TODO: article title", tags: ["Travel"] },
  { title: "TODO: article title", tags: ["Travel"] },
  { title: "TODO: article title", tags: ["Food"] },
  { title: "TODO: article title", tags: ["Food"] },
  { title: "TODO: article title", tags: ["Food"] },
  { title: "TODO: article title", tags: ["Games"] },
  { title: "TODO: article title", tags: ["Games"] },
  { title: "TODO: article title", tags: ["Games"] },
  { title: "TODO: article title", tags: ["Books"] },
  { title: "TODO: article title", tags: ["Books"] },
  { title: "TODO: article title", tags: ["Books"] },
];
