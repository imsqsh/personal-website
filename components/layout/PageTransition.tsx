"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./PageTransition.module.css";

// Keying on pathname remounts this wrapper on every route change, which
// restarts the CSS fade-in below — no router event listener needed.
// prefers-reduced-motion is handled globally in app/globals.css.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className={styles.transition}>
      {children}
    </div>
  );
}
