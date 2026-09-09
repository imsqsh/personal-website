import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./PageShell.module.css";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
