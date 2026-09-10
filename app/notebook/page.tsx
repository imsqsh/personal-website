import type { Metadata } from "next";
import Link from "next/link";
import { notebookArticles, type NotebookArticle } from "@/data/notebook";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Notebook" };

function ArticleTitle({ article }: { article: NotebookArticle }) {
  return article.href ? (
    <Link href={article.href}>{article.title}</Link>
  ) : (
    <>{article.title}</>
  );
}

export default function NotebookPage() {
  const general = notebookArticles.filter((article) => article.tags.length === 0);

  const tags: string[] = [];
  for (const article of notebookArticles) {
    for (const tag of article.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <h1 className={styles.title}>Notebook</h1>

        {general.length > 0 ? (
          <ul className={styles.generalList}>
            {general.map((article, index) => (
              <li key={index} className={styles.generalEntry}>
                <ArticleTitle article={article} />
              </li>
            ))}
          </ul>
        ) : null}

        <div className={styles.grid}>
          {tags.map((tag) => (
            <div key={tag} className={styles.category}>
              <h2 className={styles.categoryTitle}>{tag}</h2>
              <ul className={styles.articleList}>
                {notebookArticles
                  .filter((article) => article.tags.includes(tag))
                  .map((article, index) => (
                    <li key={index} className={styles.article}>
                      <ArticleTitle article={article} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
