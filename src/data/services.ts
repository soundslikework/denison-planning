import type { ServiceIconName } from "./serviceIcons";

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: ServiceIconName;
}

/**
 * Short service summary for the homepage grid.
 *
 * Deliberately SEPARATE from the fuller list in `./servicesPage.ts` used by
 * /services, which has its own titles and wording. The two are intentionally
 * allowed to differ — if you revise a service here, check whether the
 * /services entry should change too.
 */
export const services: Service[] = [
  {
    number: "01",
    title: "Planning & Development Advisory",
    description: "Advice on development opportunities, municipal processes, approvals pathways and next steps.",
    icon: "compass",
  },
  {
    number: "02",
    title: "Development Applications",
    description: "Planning support for development applications and municipal approvals.",
    icon: "document",
  },
  {
    number: "03",
    title: "Community & Stakeholder Engagement",
    description: "Meaningful engagement that builds understanding and supports better decisions.",
    icon: "people",
  },
  {
    number: "04",
    title: "Planning Research & Policy Analysis",
    description: "Research, policy analysis and strategic planning support for public and private sector clients.",
    icon: "institution",
  },
  {
    number: "05",
    title: "Planning Reports & Justification",
    description: "Clear, evidence-based reports to support proposals and planning decisions.",
    icon: "chart",
  },
  {
    number: "06",
    title: "Project Management & Coordination",
    description: "Coordination of planning projects, consultants, stakeholders and municipal processes from start to finish.",
    icon: "people",
  },
];
