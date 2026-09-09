import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const currentlyItems = [
  "Building: TODO — what you're currently building",
  "Learning: TODO — what you're currently learning",
  "Reading: TODO — what you're currently reading",
];

export default function HomePage() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.name}>{siteConfig.name}</h1>
              <p className={styles.tagline}>{siteConfig.tagline}</p>
              <p className={styles.intro}>{siteConfig.intro}</p>
              <p className={styles.location}>{siteConfig.location}</p>
              <ul className={styles.socialLine}>
                {siteConfig.social.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.portrait}>
                TODO: add portrait — public/images/profile/portrait.jpg
              </div>
              <div className={styles.currently}>
                <p className={styles.currentlyTitle}>Currently</p>
                <ul className={styles.currentlyList}>
                  {currentlyItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.explore}>
        Start with <Link href="/projects">Projects</Link>, or see what
        I&apos;m <Link href="/now">currently into</Link>.
      </p>
    </>
  );
}
