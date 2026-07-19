# linkedin-sync

Turns LinkedIn post URLs into blog entries that appear in the site's Blog
section as dark, on-brand cards. Clicking a card redirects to the original
LinkedIn post — the site never rehosts LinkedIn's content, it just previews it.

## Quick start

```bash
# 1. Add one or more post URLs to linkedin-sync/posts.txt (one per line)
# 2. Generate blog entries + optimized images:
npm run linkedin:sync
# 3. Preview (restart dev server if it was already running — see Gotchas):
npm run dev
```

## How it works

1. You list LinkedIn post URLs in `posts.txt` (one per line, `#` = comment).
2. `npm run linkedin:sync` fetches each post's public **Open Graph** metadata
   (title, description, image) — the same preview data Slack/Twitter/Facebook
   read from a link. No login, no feed scraping.
3. For each post it:
   - downloads the image, resizes it (max 1000px wide) and saves it as WebP to
     `public/linkedin/<id>.webp`
   - derives the post date from the post ID (LinkedIn IDs encode a timestamp)
   - auto-cleans a title, excerpt, and tags from the post text
   - writes `src/content/blog/linkedin-<id>.md`
4. Astro renders those entries as LinkedIn cards (image cover + "LinkedIn" badge
   + "View on LinkedIn ↗") in the Blog section, newest first.

## Does re-running re-download everything?

**No.** `npm run linkedin:sync` skips any post whose `linkedin-<id>.md` already
exists (you'll see `skip (exists, edits preserved)`). So you can freely **append**
new URLs to `posts.txt` and re-run — only the new ones are fetched and downloaded.
Your existing files (including any manual edits) are left untouched.

The one exception is `--force`, which regenerates **everything** from scratch:

```bash
npm run linkedin:sync -- --force
```

Use `--force` only when you deliberately want to re-pull all posts (e.g. after
changing the generator). It **overwrites** manual title/excerpt/tag edits.

## Editing / overrides

Generated files are normal markdown. The auto-derived **title** and **excerpt**
are a decent starting point but not always perfect — edit the frontmatter of any
`linkedin-<id>.md` to polish them, add or change `tags`, etc. A normal
`npm run linkedin:sync` preserves those edits (it skips existing files).

## Gotchas

- **Restart the dev server after syncing.** Astro caches the content collection,
  so a running `npm run dev` won't show newly generated/changed posts until it's
  restarted. `npm run build` always uses fresh content.
- **Public posts only.** Private/connections-only posts expose no preview data
  and are skipped.
- **Text-only posts** (no image) fall back to a gradient cover automatically.
- Depends on LinkedIn keeping public OG tags available (it does today; it's what
  every link preview relies on). Everything runs at build time, so the live site
  has no runtime dependency on LinkedIn.
- Likes/comment counts aren't available via this route (that needs LinkedIn's
  official embed or API). This approach is **preview + redirect** only, by design.

## Files

- `posts.txt` — the list of post URLs to sync
- `sync.mjs` — the generator (Node, uses `sharp` for image optimization)
