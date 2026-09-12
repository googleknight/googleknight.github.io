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
  title: "Staff Software Engineer",
  email: "shubham.mathur.wrk@gmail.com",
  description: `I'm a Staff Software Engineer with ${totalYears}+ years of experience building backend-heavy products and distributed systems. Currently at Civilgrid, I work across GIS, data platforms, reliability, and customer-facing product features, while helping build the India engineering team. Previously at Vimeo and McKinsey.`,

  social: {
    github: "https://github.com/googleknight",
    linkedin: "https://www.linkedin.com/in/shubham-mathur-biz",
    leetcode: "https://leetcode.com/u/googleknight/",
  },

  resumePath:
    "https://googleknight.github.io/Resume/Shubham_Mathur_Resume.pdf",

  /** OG / SEO defaults */
  ogImage: "/og-image.png",
  locale: "en_US",
};
