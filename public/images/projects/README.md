# Project screenshots and media

One subdirectory per project slug matching `content/projects/<slug>.mdx`,
e.g. `public/images/projects/<slug>/`.

- Hero image: 16:9, at least 1600px wide, named `hero.jpg` (or `.png`).
- Additional screenshots/diagrams: descriptive filenames, e.g.
  `architecture-diagram.png`, `dashboard-screenshot.png`.

Reference images from MDX via the shared `Figure` component
(`components/media/Figure.tsx`), not raw `<img>` tags.
