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

Add `.md` files to `src/content/blog/` with the required frontmatter:

```yaml
---
title: "Your Post Title"
excerpt: "A brief summary..."
date: 2026-02-14
tags: ["Tag1", "Tag2"]
coverGradient: "linear-gradient(135deg, #color1, #color2)"
---
```

Blog posts are paginated at 5 per page. URLs follow the pattern `/blog` (page 1), `/blog/2` (page 2), etc.

## Deployment

Deployed automatically to GitHub Pages on push to `main`/`master` via the GitHub Actions workflow in `.github/workflows/deploy.yml`.
