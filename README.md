# Portfolio — [googleknight.github.io](https://googleknight.github.io/)

Personal portfolio website built with [Astro](https://astro.build), live at [googleknight.github.io](https://googleknight.github.io/).

## Tech Stack

- **Framework**: Astro v5 (static site generation, zero JS by default)
- **Styling**: Vanilla CSS with CSS Custom Properties (fully themeable)
- **Blog**: Astro Content Collections (Markdown-based with Zod schema validation)
- **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Astro components (Navbar, Hero, Timeline, etc.)
├── content/
│   └── blog/       # Blog posts as .md files (Content Collections)
├── content.config.ts  # Content collection schema definition
├── data/           # Content data files (experience, projects, skills)
├── layouts/        # Page layouts
├── pages/          # Routes (index, blog, 404)
└── styles/         # Design system (global.css)
```

## Customisation

### Theme / Colors

Edit CSS custom properties in `src/styles/global.css`. All colors, fonts, spacing, and transitions are tokenised — changing variables re-themes the entire site.

### Content

Edit TypeScript files in `src/data/`:

- `site-config.ts` — name, title, social links, email
- `experience.ts` — work experience timeline
- `projects.ts` — project cards
- `skills.ts` — skill categories
- `achievements.ts` — certifications and publications

### Blog

The Blog section holds two kinds of entries, both living in `src/content/blog/`:

**1. Hand-written articles** — a `.md` file with your content below the frontmatter:

```yaml
---
title: "Your Post Title"
excerpt: "A brief summary..."
date: 2026-02-14
tags: ["Tag1", "Tag2"]
coverGradient: "linear-gradient(135deg, #color1, #color2)"
---

Your markdown article body goes here…
```

These render as a normal card that opens a full on-site article page at `/blog/<slug>`.

**2. LinkedIn posts** — generated automatically from post URLs (see below). These render
as cards that redirect to the original LinkedIn post; they have no local article page.

Blog posts are paginated at 5 per page and sorted newest-first. URLs follow the pattern
`/blog` (page 1), `/blog/2` (page 2), etc.

### LinkedIn posts → Blog cards

To surface a LinkedIn post in the Blog section:

```bash
# 1. Add the post URL(s) to linkedin-sync/posts.txt (one per line)
# 2. Generate the blog entries + optimized images:
npm run linkedin:sync

# 3. If the dev server is running, restart it so it re-syncs content.
```

The script reads each post's public Open Graph data, downloads and optimizes the image,
and writes a `linkedin-<id>.md` into `src/content/blog/`. Re-running it **skips posts that
already exist**, so appending new URLs only fetches the new ones and never clobbers edits.
Full details in [`linkedin-sync/README.md`](./linkedin-sync/README.md).

## Deployment

Deployed automatically to GitHub Pages on push to `main`/`master` via the GitHub Actions workflow in `.github/workflows/deploy.yml`.
