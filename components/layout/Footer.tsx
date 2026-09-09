import type { ComponentType } from "react";
import { siteConfig } from "@/data/site";
import {
  DocumentIcon,
  GitHubIcon,
  GmailIcon,
  LinkedInIcon,
} from "@/components/icons/SocialIcons";
import styles from "./Footer.module.css";

const iconByLabel: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  Email: GmailIcon,
  LinkedIn: LinkedInIcon,
  Resume: DocumentIcon,
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
          return (
            <li key={link.label}>
              {link.isPlaceholder ? (
                <span
                  className={styles.placeholder}
                  title="TODO: add real link"
                  aria-label={`${link.label} (coming soon)`}
                >
                  {Icon ? <Icon className={styles.icon} /> : link.label}
                </span>
              ) : (
                <a href={link.href} aria-label={link.label}>
                  {Icon ? <Icon className={styles.icon} /> : link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
