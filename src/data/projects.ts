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
}

export const projects: Project[] = [
  // ── Work Projects ──
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
