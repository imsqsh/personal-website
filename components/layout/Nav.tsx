import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav aria-label="Primary" className={styles.nav}>
      <ul className={styles.list}>
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
