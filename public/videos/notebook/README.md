# Notebook article videos

Self-hosted clips for hand-coded Notebook articles (ones with a custom
`app/notebook/<slug>/page.tsx`, like `top-5-sports-moments`) that embed
video via `ClipPlayer`. Not available through `/notebook/admin` — the
admin tool only publishes text/quote/image articles. Trim and compress
with ffmpeg before committing; see `public/videos/sports/README.md` for
the settings used there.
