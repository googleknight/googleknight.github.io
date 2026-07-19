#!/usr/bin/env node
// Generate blog entries from LinkedIn post URLs by reading their public
// Open Graph metadata. See linkedin-sync/README.md for details.

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_FILE = join(__dirname, "posts.txt");
const BLOG_DIR = join(ROOT, "src", "content", "blog");
const IMG_DIR = join(ROOT, "public", "linkedin");

// LinkedIn serves preview metadata to link crawlers; identify as one.
const CRAWLER_UA = "facebookexternalhit/1.1";
const FORCE = process.argv.includes("--force");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function decodeEntities(str = "") {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

// Extract the numeric post id (ugcPost-<id> or activity-<id>) from a URL.
function extractId(url) {
  const m = url.match(/(?:ugcPost|activity|share)[-:](\d{6,})/i);
  return m ? m[1] : null;
}

// LinkedIn post ids are snowflake-like: the high bits are a ms timestamp.
function dateFromId(id) {
  try {
    const ms = Number(BigInt(id) >> 22n);
    const d = new Date(ms);
    const yr = d.getUTCFullYear();
    if (yr < 2010 || yr > 2100) return null;
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  } catch {
    return null;
  }
}

function parseOg(html) {
  const meta = {};
  const re = /<meta[^>]+(?:property|name)=["'](og:[^"']+|twitter:[^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const key = m[1];
    // Match content up to the SAME quote it opened with (backreference \1),
    // so apostrophes/quotes inside the value don't truncate it.
    const content = tag.match(/content=(["'])([\s\S]*?)\1/i);
    if (content && meta[key] === undefined) meta[key] = decodeEntities(content[2].trim());
  }
  return meta;
}

// Remove URLs but preserve any trailing sentence punctuation that follows them,
// so sentence boundaries survive (e.g. "using AI https://x. Next" -> "using AI. Next").
const stripUrls = (t) =>
  t
    .replace(/https?:\/\/\S+?(?=[).,!?;:'"]*(?:\s|$))/g, "")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

function cleanTitle(og) {
  // og:title is usually "#tag #tag | Name" — if it's just hashtags, use the text.
  const base = (og["og:title"] || "").split(" | ")[0].trim();
  const withoutTags = base.replace(/#[^\s#]+/g, "").trim();
  let candidate =
    withoutTags.length >= 12
      ? withoutTags
      : stripUrls(og["og:description"] || "").replace(/^tl;?\s*dr\s*:?\s*/i, "").trim();

  candidate = stripUrls(candidate);
  // Take the first sentence, drop a trailing period (keep ? and !).
  let title = (candidate.split(/(?<=[.!?])\s/)[0] || candidate)
    .replace(/\.+$/, "")
    .trim();
  if (title.length > 80) {
    const cut = title.slice(0, 80);
    title = cut.slice(0, cut.lastIndexOf(" ")).trim() + "…";
  }
  return title || "LinkedIn post";
}

function cleanExcerpt(og) {
  let d = stripUrls(og["og:description"] || "");
  // Drop a leading "tl;dr : ...." lead-in so the excerpt starts with the story.
  d = d.replace(/^tl;?\s*dr\s*:?[^.!?]*[.!?]\s*/i, "").trim();
  if (d.length <= 220) return d;
  const cut = d.slice(0, 220);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (lastStop > 120) return cut.slice(0, lastStop + 1).trim();
  return cut.slice(0, cut.lastIndexOf(" ")).trim() + "…";
}

function extractTags(og) {
  const src = `${og["og:title"] || ""} ${og["og:description"] || ""}`;
  const seen = new Set();
  const tags = [];
  for (const m of src.matchAll(/#(\w{2,30})/g)) {
    const t = m[1];
    const key = t.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      tags.push(t);
    }
    if (tags.length >= 4) break;
  }
  return tags;
}

function yamlEscape(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

async function downloadImage(imgUrl, id) {
  if (!imgUrl) return null;
  try {
    const res = await fetch(imgUrl, { headers: { "User-Agent": CRAWLER_UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    await mkdir(IMG_DIR, { recursive: true });
    const file = join(IMG_DIR, `${id}.webp`);
    // Cards render small; cap width and convert to WebP to cut payload.
    await sharp(input)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(file);
    return `/linkedin/${id}.webp`;
  } catch (err) {
    console.warn(`  ! image processing failed: ${err.message}`);
    return null;
  }
}

async function processUrl(url) {
  const id = extractId(url);
  if (!id) {
    console.warn(`- skip (no post id found): ${url}`);
    return;
  }
  const outFile = join(BLOG_DIR, `linkedin-${id}.md`);
  if ((await exists(outFile)) && !FORCE) {
    console.log(`- skip (exists, edits preserved): linkedin-${id}.md`);
    return;
  }

  console.log(`- fetching ${id} …`);
  const res = await fetch(url, {
    headers: { "User-Agent": CRAWLER_UA },
    redirect: "follow",
  });
  if (!res.ok) {
    console.warn(`  ! fetch failed: HTTP ${res.status}`);
    return;
  }
  const html = await res.text();
  const og = parseOg(html);

  if (!og["og:title"] && !og["og:description"]) {
    console.warn(`  ! no preview metadata (post may be private) — skipping`);
    return;
  }

  const title = cleanTitle(og);
  const excerpt = cleanExcerpt(og);
  const tags = extractTags(og);
  const date = dateFromId(id) || new Date().toISOString().slice(0, 10);
  const image = await downloadImage(og["og:image"], id);
  const canonical = og["og:url"] || url;

  const fm = [
    "---",
    `title: ${yamlEscape(title)}`,
    `excerpt: ${yamlEscape(excerpt)}`,
    `date: ${date}`,
    `tags: [${tags.map(yamlEscape).join(", ")}]`,
    image ? `image: ${yamlEscape(image)}` : null,
    `linkedinUrl: ${yamlEscape(canonical)}`,
    "source: linkedin",
    "---",
    "",
    `> Originally posted on [LinkedIn](${canonical}).`,
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  await writeFile(outFile, fm);
  console.log(`  ✓ wrote linkedin-${id}.md  (${date}) — "${title}"`);
}

async function main() {
  const raw = await readFile(POSTS_FILE, "utf8");
  const urls = raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  if (!urls.length) {
    console.log("No URLs in posts.txt — nothing to do.");
    return;
  }
  console.log(`linkedin-sync: ${urls.length} URL(s)${FORCE ? " (force)" : ""}`);
  for (const url of urls) {
    try {
      await processUrl(url);
    } catch (err) {
      console.warn(`  ! error: ${err.message}`);
    }
  }
  console.log("Done. Run `npm run dev` to preview.");
}

main();
