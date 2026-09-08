import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Nav } from "./Nav";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.name}>
        {siteConfig.name}
      </Link>
      <Nav />
    </header>
  );
}
