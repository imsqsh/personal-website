# Personal Website — Architecture & Design Spec

Date: 2026-09-08
Status: Approved for implementation planning

## Purpose

A personal website for Yash Mulimani that reads as a personal digital garden /
archive / laboratory notebook — editorial, technically sophisticated, and
unmistakably personal — rather than a generic software-engineer portfolio.
Full product framing lives in `PRODUCT.md`; this document is the technical
and design architecture that implements it.

Visual inspiration (philosophy only, not to be copied): solar.lowtechmagazine.com,
fromjason.xyz.

## Confirmed inputs

- **Stack:** Next.js, App Router, TypeScript, static export (`output: 'export'`).
- **Deploy:** GitHub Pages, custom domain `imsqsh.xyz`, remote already at
  `git@github.com:imsqsh/personal-website.git`.
- **Package manager:** npm (only one available in this environment).
- **Hobby categories to scaffold:** Music (piano/orchestral), Sports
  (football), Travel, Food, Video Games, Books. Architecture must still make
  adding/removing a category cheap — these are the initial set, not a fixed
  list.
- **Content readiness:** No real content exists yet. Every page ships with
  explicit `TODO:`-marked placeholders (copy, photos, stats) rather than
  fabricated facts. Real content is filled in incrementally after the
  structure exists.

## 1. Information architecture

```
/                    Home — identity, current focus, links, entry points
/projects            Index (filterable list, not a card grid)
/projects/[slug]     Editorial project page (MDX)
/technical           Technical interest areas overview
/technical/[area]    Area deep-dive (only areas actually supported by background)
/education           Education as narrative, not a résumé line
/experience          Professional + research + leadership timeline
/experience/[slug]   Featured story page (MDX) — e.g. HackerDevils
/hobbies             Index of personal interests
/hobbies/[slug]      Music, Sports, Travel, Food, Games, Books (MDX)
/now                 Currently building/learning/reading/listening
/writing             Index (empty-state ready; no content required at launch)
/writing/[slug]      Long-form post (MDX)
```

Primary nav stays flat: Projects, Technical, Education, Experience, Hobbies,
Writing, Now. No mega-menu, no deep nesting — matches the low-chrome
editorial reference sites.

## 2. Content model

Hybrid, decided over pure-data and full-CMS alternatives (data-block modeling
of long-form prose was judged more complex than MDX; a headless CMS was
judged unnecessary complexity for a single-owner static site).

- **MDX collections** for anything editorial/long-form:
  `content/projects/*.mdx`, `content/hobbies/*.mdx`,
  `content/experience/*.mdx` (featured stories only, e.g. HackerDevils),
  `content/writing/*.mdx`.
  - Frontmatter is the structured metadata (title, slug, dates, summary,
    tags, tech stack, links, hero image, etc.), validated against a `zod`
    schema per collection in `lib/content.ts`.
  - Parsed via `gray-matter` (frontmatter) + `next-mdx-remote` (MDX body),
    compiled at build time — compatible with static export, no server
    required at runtime.
  - A shared MDX component registry (`Figure`, `Gallery`, `CodeBlock`,
    `Callout`, `VideoEmbed`, `Marginalia`) is available inside every MDX
    body across all collections.
- **Typed data files** for genuinely structured, non-prose content:
  `data/education.ts`, `data/experience.ts` (list entries; some link out to
  a featured `content/experience` slug for the full story),
  `data/technical-interests.ts`, `data/now.ts`, `data/site.ts` (nav, social
  links, site-wide metadata).

Adding a new project, hobby, or post is: add one `.mdx` file. No routing or
page-architecture change required — `generateStaticParams` reads the
collection directory.

## 3. Component architecture

```
app/            Next.js App Router routes — one segment per IA node above
components/
  layout/       Header, Footer, PageShell, Nav
  typography/   Prose, Heading, Marginalia, Footnote, Callout
  media/        Figure, ResponsiveImage, Gallery, VideoEmbed
  project/      ProjectCard, ProjectMeta, TechList
  mdx/          MDX component registry (maps MDX tags -> components above)
content/        MDX collections (projects, hobbies, experience, writing)
data/           Typed structured data (education, experience list, technical
                interests, now, site config)
lib/
  content.ts    Collection loader + zod schemas + frontmatter parsing
  seo.ts        Metadata builders (OG/Twitter/canonical)
  images.ts     Image helpers
public/images/
  profile/, projects/, hobbies/{music,sports,travel,food,games,books}/,
  education/, experience/
```

Each `public/images/*/` directory ships with a checked-in `README.md`
documenting expected filenames, dimensions, and crop behavior, so dropping
in real photos later is unambiguous. No stock photography is used as
permanent content — only clearly labeled placeholders.

## 4. Visual system direction

- **Typography carries the design.** A distinctive serif for display/headings
  (real editorial character, not a default system serif), a clean humanist
  sans for body copy, and a monospace for metadata/tags/code/annotations.
  Self-hosted variable fonts via `next/font/local` — no external font
  requests, no layout shift.
- **Palette:** warm, paper/notebook-like light ground (off-white/cream,
  near-black ink) instead of stark white; one or two accent colors used
  sparingly (links, highlights, tags). A dark variant is defined via CSS
  custom properties and driven by `prefers-color-scheme`, not treated as a
  separate design effort.
- **Layout:** asymmetric grid with a real margin column for annotations,
  footnotes, and metadata (the shared trait of both reference sites);
  horizontal rules as structural dividers; dense-but-readable blocks;
  whitespace used with intent, not as filler.
- **Motion:** minimal and purposeful only — hover states, an expandable
  project/timeline detail here and there. No hero animations, no motion for
  its own sake. Full `prefers-reduced-motion` support is mandatory.
- **Styling implementation:** CSS Modules per component + a global
  `tokens.css` (custom properties for type scale, color, spacing). Chosen
  over Tailwind because the editorial patterns this design needs (marginalia,
  drop caps, footnotes, asymmetric grids) aren't modeled well by utility
  classes and tend to pull the visual result toward the generic SaaS look
  this project explicitly avoids.

Exact type pairing and color values are refined live via the
`frontend-design` skill during the Foundation implementation step, not
pinned pixel-for-pixel in this spec.

## 5. Responsive, accessibility, performance

- Editorial layouts recompose at breakpoints intentionally — e.g. the margin
  annotation column collapses to inline notes on mobile rather than just
  reflowing narrower.
- Semantic HTML, visible focus states, alt text enforced by the content
  schema (MDX frontmatter and the `Figure` component both require `alt`),
  correct heading hierarchy, full keyboard navigation, ARIA only where
  semantic HTML is insufficient.
- Images are authored at source resolution and processed at build time via
  `next-image-export-optimizer` (purpose-built for Next static export +
  GitHub Pages) to produce responsive `srcset` output in modern formats —
  this satisfies the static-export constraint that Next's built-in Image
  Optimization API (server-based) is unavailable.
- Static output only; MDX content is rendered at build time. Interactivity
  is opt-in per component, not a default client bundle.

## 6. SEO & deployment

- Per-route metadata via the Next Metadata API: titles, descriptions, OG and
  Twitter/X cards, canonical URLs, `sitemap.ts`, `robots.ts`.
- A GitHub Actions workflow builds the static export and deploys it to
  GitHub Pages with a `CNAME` file for `imsqsh.xyz`. Set up during
  Foundation so every push after that point is verifiably deployable.

## 7. Build order

Mirrors `CLAUDE.md`'s phase structure. Each numbered step is one or more
small, coherent commits — implement, `next build` + `tsc --noEmit` + lint,
inspect the diff, commit (no Claude co-author trailer, per `CLAUDE.md`'s
git rules), push, move on.

1. **Foundation** — Next.js + TypeScript scaffold, design tokens, typography,
   global layout/nav, image system + placeholder directories, content loader
   (`lib/content.ts`), empty-state routes for all IA nodes, GitHub Pages
   deploy workflow + `CNAME`.
2. **Homepage**
3. **Projects** — content model, index, detail page, one placeholder MDX
   project to prove the pipeline end-to-end.
4. **Education / Experience**
5. **Hobbies** — Music, Sports, Travel, Food, Games, Books
6. **Now / Writing** — architecture + empty states
7. **Media/gallery polish**
8. **Polish pass** — responsive, accessibility, performance, visual
   consistency, and SEO review; fixes land as small, separately reviewable
   commits.

## Out of scope for this spec

- Actual bio copy, project write-ups, photos, resume content — placeholders
  only until supplied.
- A backend, auth, or CMS of any kind (single-owner static site).
- Blog/writing content itself — only the architecture to support it later.
