import { siteConfig } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.name}>{siteConfig.name}</p>
      <ul className={styles.social}>
        {siteConfig.social.map((link) =>
          link.isPlaceholder ? (
            <li key={link.label}>
              <span className={styles.placeholder} title="TODO: add real link">
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
    </footer>
  );
}
