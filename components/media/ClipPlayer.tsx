import styles from "./ClipPlayer.module.css";

type ClipPlayerProps = {
  src: string;
  title: string;
};

// Self-hosted clip, trimmed to length ahead of time — plays inline with the
// browser's native controls, no external player or JS required.
export function ClipPlayer({ src, title }: ClipPlayerProps) {
  return (
    <video className={styles.video} src={src} controls preload="metadata" aria-label={title}>
      Your browser doesn&apos;t support embedded video. <a href={src}>Download the clip</a>{" "}
      instead.
    </video>
  );
}
