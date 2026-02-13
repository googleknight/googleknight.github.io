export interface Achievement {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  type: "certification" | "publication" | "award";
  url?: string;
  certificateUrl?: string;
}

export const achievements: Achievement[] = [
  {
    title: "Pat on the Back Award",
    subtitle: "Vimeo",
    description:
      "Vimeo's initiative to celebrate and spotlight colleagues for their valuable contribution to the organisation, such as leading and delivering a high-impact project with the highest standards.",
    year: "2024",
    type: "award",
    certificateUrl: "/certificates/potb-award-2024.png",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    subtitle: "Amazon Web Services (AWS)",
    description:
      "Foundational cloud certification validating knowledge of AWS services, architecture, security, and pricing.",
    year: "2021",
    type: "certification",
    url: "https://www.credly.com/badges/3eb879eb-e2fe-4429-88b7-654fd0bbca60/public_url",
    certificateUrl:
      "https://www.credly.com/badges/3eb879eb-e2fe-4429-88b7-654fd0bbca60/public_url",
  },
  {
    title:
      "Efficient Spatial Domain Image Watermarking using Shell Based Pixel Selection",
    subtitle: "IEEE ICACCI-2016",
    description:
      "Implemented a new algorithm in spatial domain with shell-based pixel selection for watermark embedding and extraction. Evaluated with benchmark datasets and obtained favorable results in PSNR and BER.",
    year: "2016",
    type: "publication",
    url: "https://ieeexplore.ieee.org/document/7732468/",
    certificateUrl: "/certificates/ieee-paper.pdf",
  },
  {
    title: "Static Load Balancing Using ASA Max-Min Algorithm",
    subtitle: "IJRASET, Volume 5, Issue VI",
    description:
      "Optimized Max-Min load balancing algorithm to generate an overall better makespan of tasks in grid computing. Results compared by plotting Gantt Charts of the makespan.",
    year: "2017",
    type: "publication",
    url: "http://www.ijraset.com/fileserve.php?FID=8525",
    certificateUrl: "/certificates/ijraset-paper.pdf",
  },
];
