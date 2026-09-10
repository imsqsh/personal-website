import type { ReactNode } from "react";
import styles from "./Quote.module.css";

type QuoteProps = {
  children: ReactNode;
  /** Who said it / where it's from, e.g. "Joan Didion". Optional. */
  cite?: string;
};

export function Quote({ children, cite }: QuoteProps) {
  return (
    <blockquote className={styles.quote}>
      <p className={styles.text}>{children}</p>
      {cite ? <cite className={styles.cite}>— {cite}</cite> : null}
    </blockquote>
  );
}
