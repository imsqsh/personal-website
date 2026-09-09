import type { Metadata } from "next";
import { notebookPlaceholders } from "@/data/notebook";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Notebook" };

export default function NotebookPage() {
  return (
    <div className={styles.section}>
      <h1 className={styles.title}>Notebook</h1>
      <ul className={styles.list}>
        {notebookPlaceholders.map((title, index) => (
          <li key={index} className={styles.entry}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
