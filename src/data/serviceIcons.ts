/**
 * Icon names ServiceIcon.astro can render. Shared by every service list so an
 * invalid name is a compile-time error rather than a silently blank icon.
 * Adding an icon means adding it here AND to ServiceIcon.astro.
 */
export type ServiceIconName =
  | "compass"
  | "document"
  | "people"
  | "institution"
  | "chart"
  | "search";
