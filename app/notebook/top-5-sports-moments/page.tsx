import type { Metadata } from "next";
import Link from "next/link";
import { sportsMoments } from "@/data/sportsMoments";
import { topFiveSportsMoments } from "@/data/notebook";
import { ClipPlayer } from "@/components/media/ClipPlayer";
import { formatDate } from "@/lib/formatDate";
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
        <p className={styles.byline}>
          {topFiveSportsMoments.tags.join(", ")}
          {topFiveSportsMoments.date
            ? ` · Published ${formatDate(topFiveSportsMoments.date)}`
            : null}
        </p>
        <p className={styles.intro}>
          I&apos;ve been a fanatic of sports since before I can remember, growing up playing soccer, flag football, swimming, squash, tennis, and so much more. These are the 5 moments that mean the most to me.
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
              {moment.description.split("\n").map((paragraph, index) => (
                <p key={index} className={styles.momentDescription}>
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
