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
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <h1 className={styles.title}>Notebook</h1>
        <ul className={styles.list}>
          {notebookArticles.map((article, index) => (
            <li key={index} className={styles.entry}>
              <span className={styles.entryTitle}>
                <ArticleTitle article={article} />
              </span>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
