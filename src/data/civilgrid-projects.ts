import type { Project } from "./projects";

export const civilGridProjects: Project[] = [
  {
    title: "Bulk Photo Import & Field Notes",
    description:
      "Designed and shipped a production-ready bulk photo import workflow for PG&E Land Ops, turning customer photo archives into map-pinned Field Notes with EXIF extraction, geospatial validation, resumable uploads, retry handling, and customer-scale browser performance validation.",
    tags: [
      "TypeScript",
      "React",
      "PostgreSQL",
      "AWS S3",
      "EXIF",
      "Geospatial",
      "PostHog",
    ],
    category: "work",
    period: "2026",
    company: "Civilgrid",
  },
  {
    title: "GIS Config Promotion & Rollback Pipeline",
    description:
      "Built a CI/CD pipeline that promotes CivilGrid's GIS layer configuration across environments as an atomic, auditable operation, replacing manual SQL with transactional cutovers, validation, S3 artifact transfer, cache rebuilds, and rollback support.",
    tags: [
      "TypeScript",
      "GitHub Actions",
      "Inngest",
      "PostgreSQL",
      "AWS S3",
      "CI/CD",
    ],
    category: "work",
    period: "2026",
    company: "Civilgrid",
  },
  {
    title: "Demo Environment Reset Engine",
    description:
      "Built an admin-triggered reset engine for sales demo organizations that restores a golden snapshot using FK-safe transactional cleanup, re-keyed imports, production-data safeguards, and independent authorization and environment checks.",
    tags: [
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "Inngest",
      "Data Integrity",
      "React",
    ],
    category: "work",
    period: "2026",
    company: "Civilgrid",
  },
  {
    title: "Utilities Reliability & Observability",
    description:
      "Improved the Utilities tab's operational visibility and failure handling with poll telemetry, Bugsnag and PostHog instrumentation, retry-exhaustion handling, health dashboards, and regression tests for timeout behavior.",
    tags: [
      "TypeScript",
      "React",
      "PostHog",
      "Bugsnag",
      "Datadog",
      "Observability",
    ],
    category: "work",
    period: "2026",
    company: "Civilgrid",
  },
];
