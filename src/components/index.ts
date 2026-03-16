// Re-export all UI components from the Tatva design system
// This provides a cleaner import path: import { Button, Input } from "@/components"

export * from "@/ui";

// Re-export custom components for the Lex AI LMS
export {
  CourseCard,
  type CourseCardProps,
  type NavbarProps as LmsNavbarProps,
  type LmsNavItem,
  InstructorSection,
  type InstructorSectionProps,
  Footer,
  type FooterProps,
  type FooterSection,
  type FooterLink,
  PaymentButton,
  type PaymentButtonProps,
} from "./custom";

// Export the custom Navbar with an alias to avoid conflict
export { Navbar as LmsNavbar } from "./custom";
