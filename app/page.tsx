import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { education, experience, type ResumeEntry } from "@/data/resume";
import styles from "./page.module.css";

const currentlyItems = [
  "Building: TODO — what you're currently building",
  "Learning: TODO — what you're currently learning",
  "Reading: TODO — what you're currently reading",
];

function ResumeSection({
  title,
  entries,
}: {
  title: string;
  entries: ResumeEntry[];
}) {
  return (
    <div className={styles.resumeSection}>
      <h2 className={styles.resumeSectionTitle}>{title}</h2>
      <ul className={styles.resumeList}>
        {entries.map((entry) => (
          <li key={entry.organization} className={styles.resumeEntry}>
            <Image
              src={entry.logo}
              alt={`${entry.organization} logo`}
              width={40}
              height={40}
              className={styles.resumeLogo}
            />
            <div>
              <div className={styles.resumeEntryHeader}>
                <span className={styles.resumeOrg}>{entry.organization}</span>
                <span className={styles.resumeMeta}>
                  {entry.role} · {entry.dates}
                </span>
              </div>
              <p className={styles.resumeBlurb}>{entry.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

              <ResumeSection title="Education" entries={education} />
              <ResumeSection title="Experience" entries={experience} />

              <ul className={styles.socialLine}>
                {siteConfig.social.map((link) =>
                  link.isPlaceholder ? (
                    <li key={link.label}>
                      <span
                        className={styles.placeholder}
                        title="TODO: add real link"
                      >
                        {link.label}
                      </span>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  )
                )}
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
        Start with the <Link href="/notebook">Notebook</Link>, or see what
        I&apos;ve been into over in <Link href="/learnings">Learnings</Link>.
      </p>
    </>
  );
}
