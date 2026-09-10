import type { Metadata } from "next";
import Link from "next/link";
import { sportsMoments } from "@/data/sportsMoments";
import { ClipPlayer } from "@/components/media/ClipPlayer";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Top 5 Sports Moments" };

export default function TopFiveSportsMomentsPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <Link href="/notebook" className={styles.back}>
          ← Notebook
        </Link>
        <h1 className={styles.title}>Top 5 Sports Moments</h1>
        <p className={styles.intro}>
          TODO: a couple of sentences on what this list is and why these five.
        </p>
        <ol className={styles.list}>
          {sportsMoments.map((moment) => (
            <li key={moment.rank} className={styles.moment}>
              <div className={styles.momentHeader}>
                <span className={styles.rank}>{moment.rank}</span>
                <div>
                  <h2 className={styles.momentTitle}>{moment.title}</h2>
                  <p className={styles.momentContext}>{moment.context}</p>
                </div>
              </div>
              <ClipPlayer src={moment.video} title={moment.title} />
              <p className={styles.momentDescription}>{moment.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
