# Writing a new Notebook article

There are two ways to publish an article:

- **`/notebook/admin`** — a web form for straightforward text/quote/image
  articles. No code, no git. Use this unless you need something the form
  can't do.
- **This template** — for an article with something the admin form
  doesn't support (video embeds, custom layout, anything interactive).
  Requires editing code and committing/pushing normally.

This folder is a template, not a real page — the leading underscore
(`_template`) tells Next.js to exclude it from routing, so it's safe to
leave in the repo without it becoming a live URL.

## Steps (hand-coded article)

1. **Copy the folder.** Duplicate `app/notebook/_template/` to
   `app/notebook/<your-slug>/` (e.g. `app/notebook/learning-piano/`).
   The folder name becomes the URL: `/notebook/<your-slug>`.

2. **Register the article** in `data/notebookArticles.json`:

   ```json
   {
     "slug": "your-slug",
     "title": "Your Article Title",
     "tags": ["Music"],
     "href": "/notebook/your-slug",
     "date": "2026-01-01"
   }
   ```

   `tags` is shown as pills next to the title on `/notebook` — use `[]`
   for a general note. `href` is what makes this a hand-coded page
   instead of one rendered by the generic `/notebook/[slug]` route (that
   route only renders articles that have a `body` field instead of
   `href`, which is how `/notebook/admin` publishes articles).

3. **Write the page** in `page.tsx`. Import the entry you just added
   (`import { notebookArticles } from "@/data/notebook"` and find it by
   slug, or add a named export in `data/notebook.ts` the way
   `topFiveSportsMoments` does) instead of the inline placeholder object
   the template uses, so the byline always matches what's on the
   Notebook listing. Update `metadata.title` and the `<h1>` to match.

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
   --noEmit`, `npm test`, `npx eslint .`.
