import { Quote } from "./Quote";
import styles from "./MarkdownLite.module.css";

// Deliberately minimal — not a general markdown parser. Each line
// (separated by a single "\n", same convention as sportsMoments.description)
// is one block:
//   > quoted text        -> a pull-quote
//   ![alt text](src)     -> an image
//   anything else        -> a paragraph
const IMAGE_PATTERN = /^!\[([^\]]*)\]\(([^)]+)\)$/;

export function MarkdownLite({ text }: { text: string }) {
  const blocks = text.split("\n").filter((block) => block.trim().length > 0);

  return (
    <>
      {blocks.map((block, index) => {
        const imageMatch = block.match(IMAGE_PATTERN);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          return (
            // eslint-disable-next-line @next/next/no-img-element -- source dimensions aren't known ahead of time; a plain <img> preserves the file's natural aspect ratio instead of guessing width/height
            <img key={index} src={src} alt={alt} className={styles.image} />
          );
        }

        if (block.startsWith("> ")) {
          return <Quote key={index}>{block.slice(2)}</Quote>;
        }

        return (
          <p key={index} className={styles.paragraph}>
            {block}
          </p>
        );
      })}
    </>
  );
}
