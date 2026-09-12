export interface ProjectDetail {
  challenge: string;
  approach: string;
  impact: string[];
  role: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  urlLabel?: string;
  repoUrl?: string; // Link for the title
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  category: "work" | "personal" | "opensource";
  period?: string;
  company?: string;
  details?: ProjectDetail;
  stats?: string;
  isMerged?: boolean;
  isOpen?: boolean;
}

export const projects: Project[] = [
  // ── Work Projects ──
  {
    title: "Bulk Photo Import & Field Notes",
    description:
      "Built a production-ready browser workflow, released to all users, that turns ZIP archives of geotagged photos into map-pinned Field Notes with resumable uploads and measured limits for customer-scale imports.",
    tags: [
      "React",
      "TypeScript",
      "Mapbox GL",
      "GIS",
      "EXIF",
      "JSZip",
      "Turf.js",
    ],
    category: "work",
    period: "2026",
    company: "CivilGrid",
    details: {
      challenge:
        "PG&E Land Ops surfaced the need to bring geotagged road-condition photos from nested OneDrive folders onto the map. The web app needed to convert a ZIP archive into image Field Notes without blocking the UI, placing photos outside a project's boundary, or creating duplicates after a retry.",
      approach:
        "I built the client-side import flow around the existing upload and geo-item APIs: it walks nested ZIP contents, extracts GPS and direction metadata, checks locations against the project boundary with a one-mile tolerance, generates 512px thumbnails, and creates image notes sequentially. The flow tracks completed items so retries skip already-created photos, applies upload and create timeouts, and warns before navigation or refresh. I also restricted imports to formats the product can render reliably and surfaced skipped files with their reason.",
      impact: [
        "Validated a 670-photo, 242 MB ZIP import in about 6 to 7 minutes while keeping the UI responsive",
        "Demonstrated that 100 to 150 photos per import fits the browser path, with a measured in-browser ZIP memory ceiling of roughly 1 to 2 GB",
        "Made interrupted imports resumable without duplicating Field Notes",
        "Captured the threshold for a future backend job: imports in the tens of thousands need server-side deduplication and pollable progress",
      ],
      role: "Software Engineer, building the web import flow, reliability safeguards, and performance validation.",
    },
  },
  {
    title: "GIS Config Promotion & Rollback Pipeline",
    description:
      "Built the workflow that promotes CivilGrid's GIS layer catalog between environments through an atomic, validated cutover with an auditable rollback path.",
    tags: [
      "CI/CD",
      "GitHub Actions",
      "Inngest",
      "PostgreSQL",
      "AWS S3",
      "TypeScript",
    ],
    category: "work",
    period: "2026",
    company: "CivilGrid",
    details: {
      challenge:
        "Engineers moved the GIS catalog with manual SQL. An empty or malformed source could leave the live map with no layers, and there was no approval gate, audit trail, or reliable path back to the previous catalog.",
      approach:
        "I implemented GitHub Actions workflows that dispatch and poll Inngest jobs. The cutover locks the catalog table, replaces it, and validates that the rows build a layer-config snapshot before the transaction commits. Source environments export manifests and row data to S3; targets verify the checksum, row count, and non-empty input before writing. Each promotion records a backup artifact, rebuilds caches after commit, and production uses a separate manually dispatched, actor-gated workflow.",
      impact: [
        "Replaced hand-run SQL with an auditable environment-promotion workflow",
        "Prevents an invalid or empty catalog from committing through transactional validation and guards",
        "Avoids sharing database credentials across environments through the S3 artifact relay",
        "Provides explicit-id rollback, including a backup of the pre-revert state",
        "Verified non-production promotion across staging and preview environments; production workflows are wired and gated, but an end-to-end production cutover remains unverified",
      ],
      role: "Software Engineer, owning the transactional cutover logic, promotion and rollback workflows, and their operational safeguards.",
    },
  },
  {
    title: "Demo Environment Reset Engine",
    description:
      "An admin-triggered engine that resets a sales demo organization to a clean golden-image snapshot, safely deleting and restoring data that shares physical tables with live customer data.",
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
    company: "CivilGrid",
    details: {
      challenge:
        "Sales demo organizations drift after each demo and share physical tables with customer data. A table-wide wipe was unsafe, and most of the roughly 30 related tables use non-cascading foreign keys, so the reset had to restore a clean baseline without deleting another tenant's data.",
      approach:
        "I built the reset and import path around a reverse foreign-key graph walk. It collects in-scope rows from the target's projects, validates parent ordering, deletes children before parents, and restores a re-keyed golden-image snapshot in the same PostgreSQL transaction. The flow is protected by super-admin authorization, type-to-confirm UI, an environment marker, a server-side demo-org check under row lock, and per-organization singleton execution. Import validation rejects stale, incomplete, or cross-organization snapshots before deletion.",
      impact: [
        "Made demo cleanup an admin-triggered, all-or-nothing restore rather than a manual database operation",
        "Deletes related rows child-before-parent while keeping the scope constrained to the selected demo organization",
        "Keeps failures from leaving the demo partially reset by combining deletion and restoration in one transaction",
        "Added defense in depth for a production-capable destructive operation",
        "Resolved missing restored media and utility-history data; a later duplicate-key fix was merged to staging, while its production release status was not verified in the record",
      ],
      role: "Software Engineer, owning the reset/import path, orchestration, safety guards, and admin UI. The golden-image export and shared foreign-key graph utility were owned by a teammate.",
    },
  },
  {
    title: "Utilities Reliability & Observability",
    description:
      "Made the Utilities tab fail clearly when external retries are exhausted, then added telemetry and a load-health dashboard to find slow and failing loads before they become customer reports.",
    tags: ["TypeScript", "React", "ConnectBase", "Datadog", "Bugsnag", "PostHog"],
    category: "work",
    period: "2026",
    company: "CivilGrid",
    details: {
      challenge:
        "When ConnectBase retries were exhausted, a project's Utilities tab could remain in pendingExternalRetry forever and poll until timeout on every visit. The product gave users no terminal state, while operators had no way to distinguish slow loads from failed ones or spot a regression in the polling window.",
      approach:
        "I added client-side load telemetry that tracks the request and polling phases separately, sends slow-load and load events to PostHog, and reports failures to Bugsnag. On the job side, each retry-exhaustion path marks the project failed and reports the outcome even if the database write itself throws; intermediate attempts stay in Datadog logs instead of generating noisy alerts. I then built a PostHog dashboard for latency, slow opens, poll cycles, outcomes, and affected projects. A follow-up derives the polling attempt cap from the timeout and interval, with an invariant test that catches mismatched edits.",
      impact: [
        "Turns exhausted external retries into a terminal failed state rather than an endless pending loop",
        "Separates request and polling telemetry so slow loads can be diagnosed by phase and outcome",
        "Adds a Utilities Tab Load Health dashboard in staging and production with ten insights for latency, error rate, and affected projects",
        "Keeps intermediate retries observable in Datadog without sending repeated Slack alerts",
        "Prevents a polling-interval change from silently shortening the five-minute timeout window",
      ],
      role: "Software Engineer, implementing the terminal failure handling, telemetry, dashboard, and regression guard.",
    },
  },
  {
    title: "Age Assurance Platform",
    description:
      "Strategic enterprise compliance platform (UK Online Safety Act, EU DSA) for 4.5M+ users. Architected a zero-trust, privacy-first solution that eliminates 100% of GDPR liability while protecting verified subscriber revenue.",
    tags: [
      "PHP",
      "Next.js",
      "Persona",
      "GCP",
      "PostgreSQL",
      "Privacy Engineering",
    ],
    category: "work",
    period: "2025",
    company: "Vimeo",
    details: {
      challenge:
        "Vimeo faced potential fines up to 10% of global revenue if it failed to verify the age of 4.5M+ users under new UK/EU laws. The challenge was to implement strict assurance gates without storing sensitive personal data (toxic for GDPR), without breaking the user experience for our highest-value subscribers, and without fragmenting the experience across Web, Mobile, and TVOS.",
      approach:
        "I spearheaded the end-to-end technical delivery, architecting a zero-trust solution where Sensitive Personal Information (SPI) is filtered at the vendor (Persona) edge, meaning we only ever store 'pass/fail' tokens. I designed the centralized 'Age Verification' middleware logic within our PHP monolith to dynamically enforce compliance gates based on region and capabilities. To solve for TVOS input constraints, I engineered a 'Device Handover' API generating QR codes for seamless mobile verification. I also collaborated with Payment Engineering to design 'exemption logic' that automatically bypasses verification for subscribers with verified credit cards, safeguarding retention.",
      impact: [
        "Shielded Vimeo from massive regulatory fines (UK Online Safety Act, EU DSA)",
        "Achieved 100% GDPR liability reduction via zero-trust SPI architecture",
        "Safeguarded retention for high-value subscribers via automated payment exemptions",
        "Authored the source-of-truth Tech Specs used by Web, Mobile, and TVOS teams",
        "Proactively identified and mitigated XSS and Open Redirect vulnerabilities in the auth flow",
      ],
      role: "Lead Engineer — I led the architecture, backend engineering, vendor integration, and cross-platform technical strategy.",
    },
  },
  {
    title: "Anumati Auth Service",
    description:
      "A high-throughput Golang microservice architected to decouple Identity from a legacy PHP monolith. I reverse-engineered 15 years of undocumented logic to design a seamless Strangler Pattern migration.",
    tags: ["Go", "gRPC", "Microservices", "System Architecture", "Auth"],
    category: "work",
    period: "2025",
    company: "Vimeo",
    details: {
      challenge:
        "Our critical authentication logic was buried inside a 15-year-old PHP monolith with zero documentation. The system was fragile, impossible to scale independently, and a nightmare for onboarding. We needed to break this out into a modern service without disrupting login for millions of active users.",
      approach:
        "I led the ground-up architecture of 'Anumati,' a production-ready Identity Service in Golang selected for its concurrency primitives. I reverse-engineered code from 2008 to create the first-ever blueprint of our auth flow. To enable a safe migration, I engineered complex backward-compatibility middleware that replicates legacy cookie generation and hashing algorithms exactly, allowing us to employ a 'Strangler Pattern' rollout where the new service takes over incrementally.",
      impact: [
        "Authored the first definitive documentation for Vimeo's 15-year-old auth flow",
        "Architected a dual-protocol (HTTP & gRPC) service for future-proof communication",
        "Implemented structured logging and distributed tracing from Day 1",
        "Led code reviews and design decisions, mentoring the team on Go and microservices",
      ],
      role: "Lead Architect — I owned the design, migration strategy, and core design decisions while guiding the team’s implementation.",
    },
  },
  {
    title: "User Deactivation Engine",
    description:
      "Architectural overhaul of Vimeo's User Deactivation engine. I replaced a non-deterministic legacy process with a DDD-based asynchronous system, solving severe GDPR risks and scaling throughput by 1000%.",
    tags: ["PHP", "Domain-Driven Design", "Async Queues", "System Design"],
    category: "work",
    period: "2024",
    company: "Vimeo",
    details: {
      challenge:
        "Vimeo's legacy deactivation system was non-deterministic and unscalable, creating severe legal (GDPR) and security risks. It choked on high-volume creators (1.6M+ clips), causing resource starvation as queues remained clogged for months. This led to a 'Zombie' state where 195,000+ users were flagged as deactivated but could still log in, violating data retention policies.",
      approach:
        "I spearheaded the end-to-end architectural overhaul (Project 'Purgatory'). Key strategies included:\n\n1. Domain-Driven Design (DDD): I established a Single Source of Truth for user status within the User object, eliminating table mismatch issues.\n2. Queue Architecture: I replaced synchronous processing with an asynchronous queue system using MD5 payload matching, enabling bulk ingestion of 50,000+ items without timeouts.\n3. Cron Optimization: I engineered a specialized scheduling algorithm that decoupled user deletion from clip deletion to maximize throughput.",
      impact: [
        "Eliminated the 'Zombie' user state, achieving 0% reported incidents post-launch",
        "Reduced average deactivation time by 99.9% (from 2 days to <5 minutes)",
        "Scaled processing capacity from <4k to >1.6 million clips per account without timeout",
        "Identified and reconciled 195,000+ inconsistent accounts to meet GDPR compliance",
      ],
      role: "Technical Lead — I owned the technical spec, architectural consensus, and final delivery.",
    },
  },
  {
    title: "VimeoIQ: Internal AI Knowledge Assistant",
    description:
      "The first version of an internal AI-powered Slack assistant at Vimeo, built to help employees quickly find answers from org-wide Google Docs. Rolled out to a few teams in the India office as a V1 to validate the experience and gather feedback.",
    tags: [
      "Python",
      "FastAPI",
      "Vertex AI",
      "Gemini",
      "GCP",
      "Cloud SQL",
      "PostgreSQL",
      "Slack API",
      "RAG",
    ],
    category: "work",
    period: "2024 — 2025",
    company: "Vimeo",
    details: {
      challenge:
        "Internal documentation at Vimeo lived in Google Docs spread across dozens of team folders. New engineers and non-engineering staff regularly pinged senior engineers on Slack for questions that were already answered somewhere in the docs. I wanted to build a V1 of an AI assistant that could surface these answers reliably, but with real constraints: internal documents could never leave GCP, any credentials accidentally pasted into docs had to be scrubbed before reaching the LLM, and Slack's 3-second webhook timeout meant the system couldn't just block while the model generated a response.",
      approach:
        "I designed and built VimeoIQ as five subsystems: an ingestion pipeline pulling from Google Docs via the Drive API, a split storage layer, the RAG engine, a Slack bot interface, and a security layer. I chose Gemini 1.5 Flash on Vertex AI over GPT-4o and Claude because it kept data inside our GCP project with no new vendor DPA, and it was roughly 17x cheaper than Gemini Pro while being more than good enough for Q&A with retrieved context. For security, I built a two-pass secret scrubber using Yelp's detect-secrets for entropy and regex patterns, then Cloud DLP as a second pass, replacing anything it caught with typed placeholders like [REDACTED_API_KEY]. Vectors go into Vertex AI Vector Search while raw chunk text lives in Cloud SQL, so even a vector DB compromise doesn't expose document content. To handle Slack's timeout, I used Cloud Tasks to immediately acknowledge the webhook, post a 'Thinking...' message, and process the query asynchronously. The chunking strategy was tuned to 800-token recursive splits with 150-token overlap after an initial 500-token pass proved too noisy, validated against a ground-truth eval set before rollout.",
      impact: [
        "Shipped the V1 in roughly 8 weeks and rolled it out to teams in the India office for validation and feedback",
        "Zero credential leaks through two-pass edge redaction plus prompt-level and response-level guardrails",
        "Cut LLM costs by approximately 17x compared to Gemini Pro by selecting Flash with precision-tuned retrieval doing the heavy lifting",
        "Every response included cited source links and a confidence score, with the bot refusing to answer below threshold instead of hallucinating",
        "Built an offline eval harness that gated every retrieval and chunking change before deployment",
      ],
      role: "Creator and Lead Developer. I owned the system design, built all five subsystems, and coordinated with security and ML platform teams for the data residency and threat model review.",
    },
  },
  {
    title: "GenAI Banking IVR",
    description:
      "Built a secure GenAI banking IVR that handles natural conversations. I focused on making sure it was safe, compliant, and kept PII private.",
    tags: ["NestJS", "OpenAI", "React", "AI/ML"],
    category: "work",
    period: "2022 — 2023",
    company: "McKinsey & Company",
    details: {
      challenge:
        "Enterprise banks needed an IVR that felt natural to talk to but didn't compromise on the incredibly strict data security rules of the financial industry.",
      approach:
        "I researched and built secure integration layers for OpenAI with aggressive PII redaction pipelines. I used NestJS to manage the state of conversations so the bot could remember context, while preventing prompt injection attacks.",
      impact: [
        "Delivered secure GenAI for enterprise banking",
        "Achieved zero data leakage with PII redaction",
        "Enabled natural, multi-turn conversations",
        "Met strict banking compliance standards",
      ],
      role: "Engineer 2 — Led the backend architecture and AI integration.",
    },
  },
  {
    title: "Medication Adherence Platform",
    description:
      "A platform helping elderly patients and caregivers track medications. I used event-driven architecture to make sure SMS reminders were always reliable.",
    tags: ["React", "Azure Functions", "Twilio", "Material UI"],
    category: "work",
    period: "Sep 2021 — Dec 2021",
    company: "McKinsey & Company",
    details: {
      challenge:
        "A major pharma company needed a reliable way to help elderly patients manage chronic conditions, ensuring they took the right meds at the right time.",
      approach:
        "I built a full-stack platform using React and Material UI. For the backend, I used Azure Functions and Twilio to build a queue-based notification system that could reliably send SMS reminders.",
      impact: [
        "Handled HIPAA-compliant data securely",
        "Helped reduce hospital readmission rates by 34%",
        "Ensured reliable SMS delivery via Twilio",
        "Successfully adopted by patients across the US",
      ],
      role: "Full Stack Developer — Built the notification service and frontend features.",
    },
  },
  {
    title: "Project Management Tool (Leap Engagements)",
    description:
      "A tool for McKinsey consultants to kick-start their projects. I built the backend features to help them find resources, set objectives, and staff talent.",
    tags: ["React", "Express", "GraphQL", "PostgreSQL", "AWS", "Okta"],
    category: "work",
    period: "Jul 2020 — Aug 2021",
    company: "McKinsey & Company",
    details: {
      challenge:
        "Consultants were wasting time manually searching for materials and talent every time they started a new engagement. They needed a central hub to get started fast.",
      approach:
        "I built the backend using Express, GraphQL, and Postgres. I implemented Role-Based Access Control (ACLs), search, and deep linking. I also integrated Okta for secure login and Box APIs so they could easily access documents.",
      impact: [
        "Helped take the product from MVP to full adoption",
        "Seamlessly integrated Box, Okta, and AWS",
        "Secured data with proper ACLs",
        "Modernized the UI with the MDS Design system",
      ],
      role: "Full Stack Developer — Handled backend features, security, and search.",
    },
  },
  {
    title: "Malaysian Banking Platform",
    description:
      "A self-service lending platform for 20M+ customers. I helped modernize the system by replacing old SOAP services with efficient REST microservices.",
    tags: ["Spring Boot", "Angular", "Alibaba Cloud"],
    category: "work",
    period: "Jul 2019 — Apr 2020",
    company: "McKinsey & Company",
    details: {
      challenge:
        "The bank's lending platform was stuck waiting on legacy government systems for credit reports. It was slow, used outdated SOAP protocols, and frustrated the relationship managers trying to close deals.",
      approach:
        "I designed a microservices architecture to break down those SOAP integrations into clean REST-based services using Spring Boot and Angular. I also built a system to fetch, normalize, and cache credit data so it was always ready when needed.",
      impact: [
        "Served over 20M+ customers reliably",
        "Boosted Relationship Manager productivity by 60%",
        "Successfully modernized the legacy stack",
        "Transferred knowledge to the client team for long-term ownership",
      ],
      role: "Backend Developer — I handled the SOAP-to-REST decomposition and feature development.",
    },
  },
  {
    title: "Insurance Product Recommendation",
    description:
      "A recommendation engine for 30+ insurance products. I automated a manual process, making it much faster and more accurate for 1.3M users.",
    tags: ["React", "Spring Boot", "Node.js", "AWS"],
    category: "work",
    period: "Feb 2019 — Apr 2019",
    company: "McKinsey & Company",
    details: {
      challenge:
        "The client had a manual process for recommending insurance products, which was slow and prone to errors. They needed to automate this for over 30 different products.",
      approach:
        "I built a recommendation engine using React, Spring Boot, and Node.js. I had to learn Spring Boot and Hibernate on the fly to meet the deadline. I deployed parts of it on AWS Lambda for better scalability.",
      impact: [
        "Improved operational efficiency by 90%",
        "Served 1.3M users effectively",
        "Automated recommendations for 30+ products",
        "Mentored 3 interns on the project",
      ],
      role: "Full Stack Developer — I built the platform and mentored our interns.",
    },
  },
  {
    title: "Skill Based Staffing Tool",
    description:
      "An internal tool for finding the right people for the job. I used a graph database to map skills and relationships.",
    tags: ["Neo4j", "Graph Database"],
    category: "work",
    period: "Nov 2018 — Feb 2019",
    company: "McKinsey & Company",
  },
  {
    title: "Self Service Telco Web App",
    description:
      "A self-service app for a major Thai telecom. I helped build a microservices architecture that served over 10M users.",
    tags: ["React", "Node.js", "Hapi", "Docker"],
    category: "work",
    period: "Apr 2018 — Oct 2018",
    company: "McKinsey & Company",
    details: {
      challenge:
        "The telecom's existing app was outdated and slow. They needed a modern replacement that could handle millions of users without breaking a sweat.",
      approach:
        "I built the new app using React and Node.js (Hapi). We used a microservices architecture with Docker to keep things modular. I also focused heavily on reliability, adding retry mechanisms and increasing test coverage.",
      impact: [
        "Served 10M+ users successfully",
        "Increased unit test coverage by 40%",
        "Improved API reliability with retry logic",
        "helped upskill the client's dev team",
      ],
      role: "Full Stack Developer — Developed features, managed Docker containers, and mentored the client team.",
    },
  },

  // ── Open Source Projects ──
  {
    title: "stripe-cli",
    company: "Stripe",
    description:
      "Fixed a stdio teardown race in the go-plugin host where stripe <plugin> --help silently truncated output: the CLI tore down the plugin client without waiting for the stdio-forwarding goroutine to drain, so bytes still in flight were lost when the process exited. Replaced the Managed client lifecycle with locally-owned io.Pipe writers and a sync.WaitGroup-coordinated pair of drain goroutines, so the deferred cleanup closes the pipe writers and blocks on full flush of stdout/stderr before client.Kill() tears down the gRPC channel.",
    tags: ["Open Source", "Go", "gRPC", "Concurrency", "CLI"],
    url: "https://github.com/stripe/stripe-cli/pull/1580",
    urlLabel: "View Pull Request",
    repoUrl: "https://github.com/stripe/stripe-cli",
    category: "opensource",
    stats: "2k+ Stars",
    isOpen: true,
  },
  {
    title: "link-cli",
    company: "Stripe",
    description:
      "Hardened the React-Ink approval polling flow for spend requests with two fixes. Introduced a shared TERMINAL_STATUSES set (approved, denied, expired, succeeded, failed, canceled) so the useApprovalPolling hook and card/SPT flows exit cleanly on every terminal state instead of polling to timeout, added a finalized UI phase to surface non-approved outcomes, and bumped the default --timeout from 300s to 600s to comfortably outlive the server's ~8-minute approval window.",
    tags: ["Open Source", "TypeScript", "React", "CLI"],
    url: "https://github.com/stripe/link-cli/pull/95",
    urlLabel: "View Pull Request",
    repoUrl: "https://github.com/stripe/link-cli",
    category: "opensource",
    stats: "479+ Stars",
    isMerged: true,
  },
  {
    title: "Password Manager Resources",
    company: "Apple",
    description:
      "Identified and mitigated a Cross-Site Scripting (XSS) vulnerability in the password resource toolkit. Refactored the character escaping logic to secure HTML generation, protecting users of the Apple Password Rules specification.",
    tags: ["Open Source", "JavaScript", "Security"],
    url: "https://github.com/apple/password-manager-resources/pull/1019",
    urlLabel: "View Pull Request",
    repoUrl: "https://github.com/apple/password-manager-resources",
    category: "opensource",
    stats: "4.6k+ Stars",
    isMerged: true,
  },
  {
    title: "PipelineWise",
    company: "Wise",
    description:
      "Resolved a critical data loss bug in the MySQL tap by fixing numeric binlog filename comparison. Corrected the logic where string-based sorting failed after 10^6 binlog files, ensuring reliable data replication for large-scale databases.",
    tags: ["Open Source", "Python", "MySQL", "Data Engineering"],
    url: "https://github.com/transferwise/pipelinewise/pull/1263",
    urlLabel: "View Pull Request",
    repoUrl: "https://github.com/transferwise/pipelinewise",
    category: "opensource",
    stats: "650+ Stars",
    isMerged: true,
  },

  {
    title: "Reactive Resume",
    description:
      "I contributed to this popular open-source project by fixing critical bugs in the CV import/export feature, making sure users could move their data around easily.",
    tags: ["Open Source", "TypeScript", "React"],
    url: "https://github.com/amruthpillai/reactive-resume/pull/1978",
    urlLabel: "View Pull Request",
    repoUrl: "https://github.com/amruthpillai/reactive-resume",
    category: "opensource",
    stats: "35k+ Stars",
    isMerged: true,
  },

  // ── Personal Projects ──
  {
    title: "SK Nursery & Garden Works",
    description:
      "A high-performance, SEO-optimized showcase site and service catalog for a landscaping nursery in Bengaluru. Built from scratch to help a local business, it features automated build-time image processing, dynamic JSON-LD structured data, and a WhatsApp lead generator.",
    tags: [
      "React",
      "Vite",
      "Vanilla CSS",
      "Node.js",
      "Sharp",
      "SEO",
    ],
    url: "https://sknursery.netlify.app",
    urlLabel: "Live Site",
    repoUrl: "https://github.com/googleknight/sk-nursery-site",
    category: "personal",
    period: "2026",
    details: {
      role: "Creator & Full Stack Engineer — I owned the system design, UI development, SEO optimization, build scripts, and deployment.",
      challenge:
        "A friend running a plant nursery and landscaping business in Bengaluru needed an online presence but was quoted 20k INR by a local developer. I offered to build it from scratch. The main challenge was ensuring high-resolution landscaping galleries loaded instantly on slow mobile connections, maintaining hands-off SEO schema synchronization, and converting visitors to leads without using heavy external dependencies, all while hosting and maintaining the site at absolute zero cost.",
      approach:
        "I built the site using React 18, Vite 5, and modular Vanilla CSS, leveraging Netlify's free hosting tier to ensure running costs remain at zero. I partnered with Google's Antigravity AI coding assistant to design, iterate, and build the entire application from scratch. To solve performance bottlenecks, I created an automated build-time optimization pipeline using Sharp that resizes and converts images to WebP (saving ~85% in payload size), along with a directory scanner that automatically generates SEO-friendly captions. I preloaded above-the-fold hero assets and lazy-loaded below-fold images. Finally, I embedded JSON-LD schemas with dynamic client-origin resolution for Search Console validation, a custom zero-dependency before-after slider, and a surface-area cost calculator exporting pre-filled messages to WhatsApp.",
      impact: [
        "Delivered a professional business platform for a local friend, keeping ongoing hosting and maintenance costs at exactly $0 via Netlify",
        "Rapidly bootstrapped and iterated the entire custom codebase from scratch in partnership with Google's Antigravity AI coding assistant",
        "Achieved an ~85% reduction in asset payloads using a custom Sharp-powered build step",
        "Automated manual image manifest creation, generating SEO-friendly captions directly from file directories",
        "Ensured perfect Search Console rich snippet validation via dynamically-resolved LocalBusiness and LandscapingService schemas",
        "Built a lightweight before-after slider and a WhatsApp lead conversion funnel that drives direct inquiries",
      ],
    },
  },
  {
    title: "Food Delivery Service",
    description:
      "A robust, production-ready REST API for a food delivery platform. Features include a comprehensive developer portal, end-to-end RBAC authentication/authorization, and extensive documentation architected through specs-driven agentic development.",
    tags: [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Swagger",
      "Agentic Workflow",
    ],
    url: "https://googleknight.github.io/Food-delivery-Service/",
    urlLabel: "Developer Portal",
    repoUrl: "https://github.com/googleknight/Food-delivery-Service",
    category: "personal",
    details: {
      challenge:
        "The goal was to build a secure, scalable food delivery backend with complex business logic (meal availability, order state machines, coupon validation) while maintaining absolute engineering rigor and a pristine developer experience.",
      approach:
        "I employed a 'specs-driven agentic development' workflow, using high-fidelity technical specifications to drive AI agents in architecting and implementing the entire system in just 3 days. The platform features an end-to-end authentication and authorization system (JWT with refresh token rotation) and a modular feature-based architecture. I authored extensive ADRs and tech specs to ensure long-term maintainability.",
      impact: [
        "Reduced implementation time from a 7-day scope to just 3 days using advanced agentic coding workflows",
        "Implemented a secure end-to-end authentication/authorization system with RBAC for Customers, Owners, and Admins",
        "Built a comprehensive developer portal with interactive Swagger documentation and Postman collections",
        "Designed a high-performance relational schema in PostgreSQL using UUIDv7 for optimal insert performance",
      ],
      role: "Creator — I owned the system design, agentic workflow orchestration, and database architecture.",
    },
  },
  {
    title: "Mini Workflow Engine",
    description:
      "A full-stack workflow automation engine (similar to Zapier) built to handle multi-step workflows triggered via HTTP. It features a robust execution engine with Transform/Filter steps, shared context mutation, and external HTTP integrations with exponential backoff retries.",
    tags: [
      "Node.js",
      "Express",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Monaco Editor",
    ],
    url: "https://github.com/googleknight/mini-workflow-engine",
    category: "personal",
    details: {
      challenge:
        "I wanted to build a reliable automation engine that could run multi-step workflows triggered by webhooks, similar to Zapier. The main challenge was ensuring it could seamlessly pass data between steps, stop early if conditions weren't met, and safely handle external integrations like Slack without breaking when APIs fail.",
      approach:
        "I built the backend with Node.js, Express, and PostgreSQL, using Prisma and JSONB to flexibly store workflows and error logs. At its core, I designed an execution engine that processes steps one by one, allowing users to transform data and make HTTP requests safely using built-in retries. For the frontend, I used Next.js and integrated the Monaco Editor to make writing JSON workflows feel natural and error-free.",
      impact: [
        "Built a robust engine that safely passes data between workflow steps and handles conditional logic",
        "Made the system resilient by adding automatic exponential backoff retries and saving detailed error logs",
        "Created a smooth, high-fidelity developer experience using React Query and the Monaco Editor",
        "Unlocked use cases like formatting webhooks, sending Discord/Slack alerts, and building custom data pipelines",
      ],
      role: "Creator — I owned the full-stack design, execution engine logic, database architecture, and UI implementation.",
    },
  },
  {
    title: "CRDT Library",
    description:
      "A TypeScript library for building distributed systems without conflicts. I implemented GCounter, PNCounter, GSet, and more, and chaos-tested them to ensure they work.",
    tags: ["TypeScript", "Distributed Systems", "Data Structures"],
    url: "https://github.com/googleknight/crdt-lib",
    category: "personal",
    details: {
      challenge:
        "I wanted to understand the math behind real-time collaboration tools like Google Docs, so I decided to build the core data structures (CRDTs) myself.",
      approach:
        "I implemented multiple CRDT types in TypeScript, including Sets and Counters. To make sure they were actually conflict-free, I designed a three-layer testing strategy: unit tests, property-based tests, and randomized simulation tests.",
      impact: [
        "Built a library with 6+ robust data types",
        "Designed a thorough chaos testing strategy",
        "Verified correctness with deterministic simulations",
        "Published the package on npm",
      ],
      role: "Creator — I did the research, implementation, and testing.",
    },
  },

  {
    title: "Fragile Watermarking",
    description:
      "A project exploring invisible digital watermarking. I implemented an algorithm to hide data in images using LSB manipulation, which I published at IEEE ICACCI-2016.",
    tags: ["Java", "Image Processing", "IEEE"],
    url: "https://github.com/googleknight/FragileWatermarking",
    category: "personal",
  },
  {
    title: "System Design Notes",
    description:
      "My personal collection of study notes on distributed systems, databases, and more. It's where I keep track of everything I learn.",
    tags: ["System Design", "Distributed Systems", "Cloud"],
    url: "https://github.com/googleknight/system-design-notes",
    category: "personal",
  },
  {
    title: "Value Time",
    description:
      "A simple Chrome extension I built to replace the new tab page. It shows you how much time is left in the day along with a motivational quote.",
    tags: ["JavaScript", "Chrome Extension"],
    url: "https://chromewebstore.google.com/detail/valuetime/badapfgpjjaagnahmlfkhpomblifhiaj",
    urlLabel: "Chrome Store",
    secondaryUrl: "https://github.com/googleknight/Value-Time",
    secondaryUrlLabel: "GitHub",
    category: "personal",
  },
];
