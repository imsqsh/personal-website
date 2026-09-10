// TEMPLATE — not a real route (the leading underscore excludes this
// folder from routing). Copy this whole folder to
// app/notebook/<your-slug>/ to start a new article. See ./README.md
// for the full workflow (registering the article in data/notebook.ts,
// picking a slug, etc.) — this file only covers what goes in the JSX.

import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "@/components/media/Figure";
import { Quote } from "@/components/typography/Quote";
import { ClipPlayer } from "@/components/media/ClipPlayer";
import { formatDate } from "@/lib/formatDate";
// Import the article's own entry from data/notebook.ts once you've added
// it there — this is what drives the byline below. See README.md.
// import { yourArticle } from "@/data/notebook";
import styles from "./page.module.css";

// Update the title to match the one you use in data/notebook.ts.
export const metadata: Metadata = { title: "Your Article Title" };

export default function TemplateArticlePage() {
  // Replace with `yourArticle` imported above.
  const article = {
    tags: ["TODO: tag"],
    date: "2026-01-01",
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <Link href="/notebook" className={styles.back}>
          ← Notebook
        </Link>

        <h1 className={styles.title}>Your Article Title</h1>

        {/* Byline: tag(s) + publish date, same pattern every article uses. */}
        <p className={styles.byline}>
          {article.tags.join(", ")} · Published {formatDate(article.date)}
        </p>

        {/* Ordinary prose. Use as many paragraphs as you need — plain <p>
            tags inherit the site's serif/sans body styles automatically. */}
        <p className={styles.prose}>
          Regular paragraph text goes here. Write normally — no special
          markup needed for plain prose.
        </p>

        {/* Pull quote. `cite` is optional — omit it for an unattributed
            line. */}
        <Quote cite="Attribution, if any">
          The quoted text goes here, set in italic serif with a left rule.
        </Quote>

        <p className={styles.prose}>More prose can follow a quote.</p>

        {/* Image. `Figure` wraps next/image and adds a captioned figure —
            alt text is required (accessibility, not optional), caption is
            not. Put the source file under public/images/notebook/. */}
        <Figure
          src="/images/notebook/your-image.jpg"
          alt="Describe what's actually in the image."
          width={1200}
          height={800}
          caption="Optional caption shown under the image."
        />

        {/* Video. Only include this if the article has a self-hosted
            clip — trim/compress it with ffmpeg first (see
            public/videos/sports/README.md for the pattern) and drop it
            under public/videos/notebook/. Omit this block entirely for
            articles with no video. */}
        <ClipPlayer
          src="/videos/notebook/your-clip.mp4"
          title="Describe what's in the clip"
        />
      </div>
    </div>
  );
}
