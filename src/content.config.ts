import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    // Native articles use a CSS gradient cover; LinkedIn posts use `image`.
    coverGradient: z.string().optional(),
    // Local path to a cover image (e.g. "/linkedin/<id>.jpg").
    image: z.string().optional(),
    // When set, the card links out to this LinkedIn post instead of a local page.
    linkedinUrl: z.string().url().optional(),
    // Origin marker: "linkedin" for generated posts.
    source: z.string().optional(),
  }),
});

export const collections = { blog };
