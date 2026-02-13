export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1: Beginner, 5: Expert
  icon?: string; // Devicon class name or identifier
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript", level: 5, icon: "typescript" },
      { name: "JavaScript", level: 5, icon: "javascript" },
      { name: "Go", level: 1, icon: "go" },
      { name: "PHP", level: 3, icon: "php" },
      { name: "SQL", level: 4, icon: "database" },
      { name: "Python", level: 3, icon: "python" },
      { name: "Java", level: 2, icon: "java" },
      { name: "C++", level: 2, icon: "cpp" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", level: 4, icon: "react" },
      { name: "Next.js", level: 3, icon: "nextjs" },
      { name: "Tailwind CSS", level: 4, icon: "tailwind" },
      { name: "Jest", level: 4, icon: "jest" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", level: 5, icon: "nodejs" },
      { name: "NestJS", level: 3, icon: "nestjs" },
      { name: "Express.js", level: 4, icon: "express" },
      { name: "Spring Boot", level: 2, icon: "spring" },
      { name: "gRPC", level: 3, icon: "grpc" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", level: 4, icon: "postgresql" },
      { name: "MySQL", level: 4, icon: "mysql" },
      { name: "Redis", level: 3, icon: "redis" },
      { name: "MongoDB", level: 1, icon: "mongodb" },
      { name: "Neo4j", level: 2, icon: "neo4j" },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "Docker", level: 5, icon: "docker" },
      { name: "AWS", level: 3, icon: "aws" },
      { name: "Azure", level: 2, icon: "azure" },
      { name: "GCP", level: 4, icon: "gcp" },
      { name: "Kubernetes", level: 2, icon: "kubernetes" },
      { name: "Grafana", level: 3, icon: "grafana" },
      { name: "GitHub Actions", level: 4, icon: "github" },
    ],
  },
  {
    label: "Architecture",
    skills: [
      { name: "Microservices", level: 3 },
      { name: "DDD", level: 5 },
      { name: "Event-Driven", level: 4 },
      { name: "Message Queues", level: 4 },
      { name: "REST / GraphQL", level: 4 },
      { name: "OAuth 2.0 / JWT", level: 3 },
      { name: "Observability", level: 3 },
    ],
  },
  {
    label: "Design Patterns",
    skills: [
      { name: "Strangler Pattern", level: 4 },
      { name: "CQRS", level: 4 },
      { name: "Repository Pattern", level: 4 },
      { name: "Strategy Pattern", level: 4 },
      { name: "Factory Pattern", level: 4 },
      { name: "Dependency Injection", level: 4 },
      { name: "Observer Pattern", level: 4 },
    ],
  },
];
