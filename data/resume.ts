export type ResumeEntry = {
  organization: string;
  logo: string;
  role: string;
  dates: string;
  blurb: string;
};

// Brief snippets condensed from docs/reference/resume-source.md — not the
// full resume. See PRODUCT.md: this site doesn't rehash a resume/CV; the
// full document is linked via siteConfig.social's "Resume" entry instead.
export const education: ResumeEntry[] = [
  {
    organization: "University of Pennsylvania",
    logo: "/images/logos/upenn.svg",
    role: "M.S.E., Computer and Information Science",
    dates: "2026 – 2028",
    blurb: "GPA: 4.0",
  },
  {
    organization: "Arizona State University",
    logo: "/images/logos/asu.svg",
    role: "B.S. Computer Science, Minors in Mathematics and Business",
    dates: "2022 – 2026",
    blurb:
      "Barrett, the Honors College | GPA 3.88 \n Honors Thesis: Designing Accessible Interactive Software for Space Science Exhibits: Enhancing Inclusivity in the NASA Psyche Mission Display",
  },
];

export const experience: ResumeEntry[] = [
  {
    organization: "Amazon Web Services",
    logo: "/images/logos/aws.svg",
    role: "Software Development Engineering Intern",
    dates: "Summer 2026",
    blurb:
      "Built an agentic form-autofill feature for AWS Partner Central using a multi-agent LLM pipeline.",
  },
  {
    organization: "Garmin",
    logo: "/images/logos/garmin.svg",
    role: "Software Engineering Intern",
    dates: "Summer 2025",
    blurb:
      "Built low-latency communication protocols in C for avionics telemetry and cabin display systems.",
  },
  {
    organization: "Interplanetary Initiative",
    logo: "/images/logos/asu.svg",
    role: "Embedded Systems Software Developer",
    dates: "2023 – 2025",
    blurb:
      "Developed C/C++ CubeSat communication drivers and telemetry pipelines for a NASA JPL–ASU mission.",
  },
  {
    organization: "Citizens",
    logo: "/images/logos/citizens.svg",
    role: "Software Engineering Intern",
    dates: "Summer 2024",
    blurb:
      "Built a Java rule engine for KYC verification and Kafka-based async document processing.",
  },
];
