import { siteConfig } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.name}>{siteConfig.name}</p>
      <ul className={styles.social}>
        {siteConfig.social.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={link.isPlaceholder ? styles.placeholder : undefined}
              title={link.isPlaceholder ? "TODO: add real link" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
