export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    period: "Jan 2024 — Present",
    role: "Senior Software Engineer",
    company: "Vimeo",
    location: "Remote, India",
    highlights: [
      "Architected an Age Assurance platform for 4.5M+ users ensuring compliance with the UK Online Safety Act and EU Digital Services Act, with zero-trust SPI filtering that eliminates GDPR liability.",
      "Led the architectural design of 'Anumati,' a Golang microservice to decouple authentication from a legacy PHP monolith. Reverse-engineered 15 years of undocumented auth logic, implemented core flows, and guided engineers through development with code reviews.",
      "Re-architected the user deactivation system using DDD and async queueing, scaling from 4K to 50K+ accounts per batch and reducing processing time by 99.9% (2 days → under 5 minutes).",
      "Identified a critical MFA bypass flaw and authored the design specification for a Backup Recovery Code system. Hardened auth flows against XSS and Open Redirect attacks.",
      "Defined SLOs and built custom Grafana dashboards, achieving 0% data inconsistencies post-launch. Authored source-of-truth technical specifications used by Web, Mobile, and TVOS teams.",
    ],
  },
  {
    period: "Nov 2021 — Jan 2024",
    role: "Engineer 2",
    company: "McKinsey & Company",
    location: "Bengaluru, India",
    highlights: [
      "Architected GenAI-powered backend services for enterprise banking IVR, designing secure OpenAI integration layers with PII redaction and stateful conversation orchestration using NestJS.",
      "Built an event-driven medication adherence platform using Azure Functions and Twilio with HIPAA-compliant healthcare data handling, enabling reliable patient engagement at scale.",
      "Optimized NestJS microservices serving 500K+ monthly users by tuning caching and database indexing strategies, improving API response times by 50%.",
      "Led architecture reviews, mentored 4 junior engineers, established API design standards, and drove CI/CD automation adoption across engineering teams.",
    ],
  },
  {
    period: "Jul 2019 — Nov 2021",
    role: "Engineer 1",
    company: "McKinsey & Company",
    location: "Bengaluru, India",
    highlights: [
      "Built key backend features for a project management tool used by McKinsey consultants, including ACLs, cross-platform search, and deep linking using Express.js, GraphQL, and PostgreSQL. Integrated Okta for authentication and Box APIs for curated material submission.",
      "Designed microservices for a Malaysian banking platform serving 20M+ customers. Decomposed legacy SOAP integrations into REST-based services, boosting RM productivity by 60%.",
      "Led capability building with the client's development team, conducting code reviews and knowledge transfers to ensure long-term maintainability. Published articles on API development best practices in internal publications.",
    ],
  },
  {
    period: "Jul 2018 — Jul 2019",
    role: "Junior Engineer",
    company: "McKinsey & Company",
    location: "Bengaluru, India",
    highlights: [
      "Developed an insurance recommendation engine for 1.3M users in Singapore, replacing manual processes and improving operational efficiency by 90%.",
      "Built a skill-based staffing tool using Neo4j graph database for relationship mapping between skills, people, and project requirements.",
      "Mentored 3 interns, guiding them with tech stack fundamentals and cultivating a culture of ownership and high-quality code.",
    ],
  },
  {
    period: "Jan 2018 — Jul 2018",
    role: "Software Intern",
    company: "McKinsey & Company",
    location: "Bengaluru, India",
    highlights: [
      "Built a consumer-facing self-service telecom app for 10M+ users in Thailand using React, Node.js, and Hapi with Docker-based microservices.",
      "Led capability building with the client's development team, conducting code reviews, aiding in debugging, and establishing best practices.",
    ],
  },
  {
    period: "Jun 2016 — Jul 2016",
    role: "Summer Intern",
    company: "ONGC (Oil & Natural Gas Corporation)",
    location: "Dehradun, India",
    highlights: [
      "Developed 'Well Projections,' a 3D modelling program in C++ using COIN3D and SOWIN API to visualize oil and gas well coordinates from field data.",
      "Gained exposure to enterprise systems and industrial-scale data processing at India's largest oil & gas exploration company.",
    ],
  },
  {
    period: "2014 — 2018",
    role: "B.Tech, Information Technology",
    company: "VIT University",
    location: "Vellore, India",
    highlights: [
      "Graduated with honors, focusing on Distributed Systems and Image Processing.",
      "Published research at IEEE ICACCI-2016 on 'Efficient Spatial Domain Image Watermarking' and IJRASET on 'ASA Max-Min Load Balancing'.",
    ],
  },
];
