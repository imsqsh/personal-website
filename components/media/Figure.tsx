import Image, { type ImageProps } from "next/image";
import styles from "./Figure.module.css";

type FigureProps = ImageProps & {
  caption?: string;
};

export function Figure({ caption, className, ...imageProps }: FigureProps) {
  return (
    <figure className={styles.figure}>
      <Image {...imageProps} className={className ?? styles.image} />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
