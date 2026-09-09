export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  /** True while the href is still a placeholder awaiting a real link. */
  isPlaceholder?: boolean;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  intro: string;
  location: string;
  nav: NavItem[];
  social: SocialLink[];
};

export const siteConfig: SiteConfig = {
  name: "Yash Mulimani",
  tagline: "Learning how to learn again",
  intro:
    "Hey! I'm Yash, a MSE CIS student at the University of Pennsylvania and a former Honors CS, Math, and Business student at Arizona State University.",
  location: "Philadelphia, Pennsylvania",
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Technical", href: "/technical" },
    { label: "Education", href: "/education" },
    { label: "Experience", href: "/experience" },
    { label: "Hobbies", href: "/hobbies" },
    { label: "Writing", href: "/writing" },
    { label: "Now", href: "/now" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/imsqsh" },
    { label: "Email", href: "mailto:mulimani@engineering.upenn.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yashmulimani/"},
  ],
};
