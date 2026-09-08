import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./PageShell.module.css";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
