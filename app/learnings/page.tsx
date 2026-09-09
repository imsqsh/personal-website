import type { Metadata } from "next";
import { learningCategories } from "@/data/learnings";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Learnings" };

export default function LearningsPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <h1 className={styles.title}>Learnings</h1>
        <div className={styles.grid}>
          {learningCategories.map((category) => (
            <div key={category.name} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <ul className={styles.articleList}>
                {category.articles.map((article, index) => (
                  <li key={index} className={styles.article}>
                    {article}
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
