export type RandomArticle = {
  title: string;
  /** Link to the full article/page, if one exists yet. */
  href?: string;
};

export type RandomCategory = {
  name: string;
  articles: RandomArticle[];
};

// TODO: replace remaining placeholders with real article links once
// individual pages exist for each. Titles are placeholders — see
// PRODUCT.md content-integrity rules.
export const randomCategories: RandomCategory[] = [
  {
    name: "Music",
    articles: [
      { title: "TODO: article title" },
      { title: "TODO: article title" },
      { title: "TODO: article title" },
    ],
  },
  {
    name: "Sports",
    articles: [
      { title: "Top 5 Sports Moments", href: "/random/top-5-sports-moments" },
      { title: "TODO: article title" },
      { title: "TODO: article title" },
    ],
  },
  {
    name: "Travel",
    articles: [
      { title: "TODO: article title" },
      { title: "TODO: article title" },
      { title: "TODO: article title" },
    ],
  },
  {
    name: "Food",
    articles: [
      { title: "TODO: article title" },
      { title: "TODO: article title" },
      { title: "TODO: article title" },
    ],
  },
  {
    name: "Games",
    articles: [
      { title: "TODO: article title" },
      { title: "TODO: article title" },
      { title: "TODO: article title" },
    ],
  },
  {
    name: "Books",
    articles: [
      { title: "TODO: article title" },
      { title: "TODO: article title" },
      { title: "TODO: article title" },
    ],
  },
];
