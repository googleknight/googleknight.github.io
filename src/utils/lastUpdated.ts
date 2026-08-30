import { execFileSync } from "node:child_process";

/**
 * Date of the most recent git commit, resolved at build time.
 * Falls back to the build date when git history isn't available
 * (e.g. a source checkout without .git, or a non-git environment).
 */
export function getLastUpdated(): string {
  let date = new Date();
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI"])
      .toString()
      .trim();
    if (iso) date = new Date(iso);
  } catch {
    // keep the build-date fallback
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
