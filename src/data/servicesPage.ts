import type { ServiceIconName } from "./serviceIcons";

export interface DetailedService {
  number: string;
  title: string;
  description: string;
  icon: ServiceIconName;
}

/**
 * Full service list for the /services page.
 *
 * Deliberately SEPARATE from the homepage summary in `./services.ts`, which
 * carries its own shorter list and wording. The two are intentionally allowed
 * to differ — if you revise a service here, check whether the homepage entry
 * should change too.
 */
export const servicesPage: DetailedService[] = [
  {
    number: "01",
    title: "Planning & Development Advisory",
    description:
      "Advice on development opportunities, planning considerations, municipal processes, approvals pathways and next steps.",
    icon: "compass",
  },
  {
    number: "02",
    title: "Planning Research & Due Diligence",
    description:
      "Research and analysis of Official Plans, zoning, planning policies, development opportunities and site-specific planning considerations.",
    icon: "search",
  },
  {
    number: "03",
    title: "Development Applications",
    description:
      "Planning support for development applications and municipal approvals.",
    icon: "document",
  },
  {
    number: "04",
    title: "Planning Reports & Justification",
    description:
      "Clear, evidence-based planning analysis to support development proposals and planning decisions.",
    icon: "chart",
  },
  {
    number: "05",
    title: "Project Management & Coordination",
    description:
      "Coordination of planning projects, consultants, stakeholders and municipal processes from initial strategy through approvals.",
    icon: "people",
  },
  {
    number: "06",
    title: "Community & Stakeholder Engagement",
    description:
      "Planning and engagement support for projects involving communities and stakeholders.",
    icon: "people",
  },
  {
    number: "07",
    title: "Municipal & Policy Planning",
    description:
      "Planning research, policy analysis and strategic planning support.",
    icon: "institution",
  },
];
