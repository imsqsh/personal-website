import type { ComponentType } from "react";
import { siteConfig } from "@/data/site";
import {
  GitHubIcon,
  GmailIcon,
  GoogleDocsIcon,
  LinkedInIcon,
} from "@/components/icons/SocialIcons";
import styles from "./Footer.module.css";

const iconByLabel: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  Email: GmailIcon,
  LinkedIn: LinkedInIcon,
  Resume: GoogleDocsIcon,
};

// The Google Docs mark has more internal negative space (three cutout text
// lines) than the other solid brand silhouettes, so it reads visually
// lighter at the same nominal size — render it slightly larger to balance.
const iconClassByLabel: Record<string, string | undefined> = {
  Resume: "iconLarge",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        © {year} {siteConfig.name}
      </p>
      <ul className={styles.social}>
        {siteConfig.social.map((link) => {
          const Icon = iconByLabel[link.label];
          const iconClassKey = iconClassByLabel[link.label];
          const iconClassName = iconClassKey
            ? `${styles.icon} ${styles[iconClassKey]}`
            : styles.icon;
          return (
            <li key={link.label}>
              {link.isPlaceholder ? (
                <span
                  className={styles.placeholder}
                  title="TODO: add real link"
                  aria-label={`${link.label} (coming soon)`}
                >
                  {Icon ? <Icon className={iconClassName} /> : link.label}
                </span>
              ) : (
                <a
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Icon ? <Icon className={iconClassName} /> : link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
