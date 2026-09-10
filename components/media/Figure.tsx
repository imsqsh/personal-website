import Image, { type ImageProps } from "next/image";
import styles from "./Figure.module.css";

type FigureProps = ImageProps & {
  caption?: string;
};

export function Figure({ caption, className, alt, ...imageProps }: FigureProps) {
  return (
    <figure className={styles.figure}>
      <Image
        {...imageProps}
        alt={alt}
        className={[styles.image, className].filter(Boolean).join(" ")}
      />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
