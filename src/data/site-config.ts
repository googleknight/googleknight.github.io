/**
 * Site-wide configuration.
 */

// Calculate years of experience dynamically
const startDate = new Date("2018-01-10");
const today = new Date();
const yearsDiff = today.getFullYear() - startDate.getFullYear();
const monthDiff = today.getMonth() - startDate.getMonth();
const totalYears =
  monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())
    ? yearsDiff - 1
    : yearsDiff;

export const siteConfig = {
  name: "Shubham Mathur",
  title: "Senior Software Engineer",
  tagline: "I build resilient systems at scale",
  email: "shubham.mathur.wrk@gmail.com",
  description: `I'm a Senior Software Engineer with ${totalYears}+ years of experience building scalable systems at Vimeo and McKinsey. I specialize in backend architecture, microservices, and security engineering.`,

  social: {
    github: "https://github.com/googleknight",
    linkedin: "https://www.linkedin.com/in/shubham-mathur-biz",
    leetcode: "https://leetcode.com/u/googleknight/",
  },

  resumePath: "/Shubham_Mathur_Resume_2026.pdf",

  /** OG / SEO defaults */
  ogImage: "/og-image.png",
  locale: "en_US",
};
