import type { Metadata } from "next";
import Link from "next/link";
import { randomCategories } from "@/data/random";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Random" };

export default function RandomPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <h1 className={styles.title}>Random</h1>
        <div className={styles.grid}>
          {randomCategories.map((category) => (
            <div key={category.name} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <ul className={styles.articleList}>
                {category.articles.map((article, index) => (
                  <li key={index} className={styles.article}>
                    {article.href ? (
                      <Link href={article.href}>{article.title}</Link>
                    ) : (
                      article.title
                    )}
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
