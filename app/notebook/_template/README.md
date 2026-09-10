# Writing a new Notebook article

This folder is a template, not a real page — the leading underscore
(`_template`) tells Next.js to exclude it from routing, so it's safe to
leave in the repo without it becoming a live URL.

## Steps

1. **Copy the folder.** Duplicate `app/notebook/_template/` to
   `app/notebook/<your-slug>/` (e.g. `app/notebook/learning-piano/`).
   The folder name becomes the URL: `/notebook/<your-slug>`.

2. **Register the article** in `data/notebook.ts`:

   ```ts
   export const yourArticle: NotebookArticle = {
     title: "Your Article Title",
     tags: ["Music"], // shown as pills next to the title on /notebook; [] for a general note
     href: "/notebook/your-slug",
     date: "2026-01-01", // set this when you actually publish
   };
   ```

   Add `yourArticle` to the `notebookArticles` array so it shows up on
   the Notebook page.

3. **Write the page** in `page.tsx`. Import the entry you just added
   (`import { yourArticle } from "@/data/notebook"`) instead of the
   inline placeholder object the template uses, so the byline always
   matches what's on the Notebook listing. Update `metadata.title` and
   the `<h1>` to match.

4. **Embedding things** — the template demonstrates each of these
   inline:
   - **Prose**: plain `<p className={styles.prose}>` tags.
   - **Quotes**: `<Quote cite="...">...</Quote>` from
     `@/components/typography/Quote` — omit `cite` for an unattributed
     line.
   - **Images**: `<Figure src=... alt=... width=... height=...
     caption="..." />` from `@/components/media/Figure`. Put the source
     file under `public/images/notebook/`. `alt` is required.
   - **Video**: `<ClipPlayer src=... title=... />` from
     `@/components/media/ClipPlayer` — only if the article has a
     self-hosted clip. Trim/compress with ffmpeg first (see
     `public/videos/sports/README.md` for the exact settings used
     there) and put it under `public/videos/notebook/`. Delete this
     block if the article has no video.

5. **Delete the leftover comments** (including this file, if you want —
   it's not linked from anywhere) once the real article is written.

6. **Run the checks** before committing: `npm run build`, `npx tsc
   --noEmit`, `npm test`.
