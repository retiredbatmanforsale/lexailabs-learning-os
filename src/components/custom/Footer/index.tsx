import Link from "@docusaurus/Link";
import { Text, Button } from "@/ui";
import { cn } from "@/lib/utils";
import type { IconName } from "@/ui/lib/icons";

// ============================================================================
// Types
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  email?: string;
  phone?: string;
}

export type SocialPlatform = "linkedin" | "twitter" | "instagram" | "youtube" | "github";

export interface FooterSocial {
  platform: SocialPlatform;
  url: string;
}

export interface FooterProps {
  /** Footer sections with links */
  sections?: FooterSection[];
  /** Contact information */
  contact?: FooterContact;
  /** Social media links */
  socials?: FooterSocial[];
  /** Copyright text */
  copyright?: string;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Default Data - LMS Specific
// ============================================================================

const platformLinks: FooterLink[] = [
  { label: "All Courses", href: "/courses" },
  { label: "Engineering", href: "/courses?category=engineering" },
  { label: "Non-Engineering", href: "/courses?category=non-engineering" },
  { label: "My Learning", href: "/my-learning" },
];

const resourceLinks: FooterLink[] = [
  { label: "Help Center", href: "/help" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks: FooterLink[] = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const defaultSections: FooterSection[] = [
  { title: "Platform", links: platformLinks },
  { title: "Resources", links: resourceLinks },
  { title: "Legal", links: legalLinks },
];

const defaultContact: FooterContact = {
  email: "learn@lexailabs.com",
};

const defaultSocials: FooterSocial[] = [
  { platform: "linkedin", url: "https://linkedin.com/company/lexailabs" },
  { platform: "twitter", url: "https://twitter.com/lexailabs" },
  { platform: "youtube", url: "https://youtube.com/@lexailabs" },
  { platform: "instagram", url: "https://instagram.com/lexailabs" },
];

// ============================================================================
// Helper Functions
// ============================================================================

function getSocialIconName(platform: SocialPlatform): IconName {
  switch (platform) {
    case "linkedin":
      return "linkedin";
    case "twitter":
      return "twitter";
    case "instagram":
      return "instagram";
    case "youtube":
      return "youtube";
    case "github":
      return "github";
    default:
      return "external-link";
  }
}

// ============================================================================
// Component
// ============================================================================

export function Footer({
  sections = defaultSections,
  contact = defaultContact,
  socials = defaultSocials,
  copyright = `© ${new Date().getFullYear()} Lex AI Labs. All rights reserved.`,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-tatva-background-primary border-t border-tatva-border",
        className
      )}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-tatva-8 py-tatva-16">
        {/* Desktop Layout - Grid with brand on left, links on right */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-tatva-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="mb-tatva-8">
              <Link to="/" className="inline-block">
                <img
                  src="/lexai-logo.png"
                  alt="Lex AI Labs"
                  width={140}
                  height={140}
                  className="size-32 object-contain"
                />
              </Link>
            </div>
            <div className="mb-tatva-6 max-w-xs">
              <Text variant="body-sm" tone="secondary">
                Master AI skills with industry experts. Learn at your own pace with real-world courses.
              </Text>
            </div>

            {/* Social Icons */}
            <div className="group/socials flex gap-tatva-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 transition-opacity duration-200 hover:!opacity-100 group-hover/socials:opacity-40"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={getSocialIconName(social.platform)}
                    tooltip={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <div className="mb-tatva-4 uppercase tracking-wider">
                <Text variant="label-sm" tone="default">
                  {section.title}
                </Text>
              </div>
              <ul className="group/links space-y-tatva-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="inline-block text-tatva-content-secondary opacity-70 transition-all duration-200 hover:!opacity-100 hover:text-tatva-content-primary group-hover/links:opacity-40"
                    >
                      <Text variant="body-sm" tone="secondary">
                        {link.label}
                      </Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Layout - All Centered */}
        <div className="flex flex-col items-center text-center lg:hidden">
          {/* Logo */}
          <div className="mb-6 flex justify-center w-full">
            <Link to="/">
              <img
                src="/lexai-logo.png"
                alt="Lex AI Labs"
                width={80}
                height={80}
                className="size-20 object-contain"
              />
            </Link>
          </div>

          {/* Tagline */}
          <div className="mb-8 max-w-md text-center">
            <Text variant="body-sm" tone="secondary">
              Master AI skills with industry experts. Learn at your own pace with real-world courses.
            </Text>
          </div>

          {/* Social Icons */}
          <div className="group/socials flex justify-center gap-2 mb-12 w-full">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 transition-opacity duration-200 hover:!opacity-100 group-hover/socials:opacity-40"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  icon={getSocialIconName(social.platform)}
                  tooltip={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                />
              </a>
            ))}
          </div>

          {/* All Sections - Stacked vertically, centered */}
          <div className="w-full space-y-10 mb-12">
            {sections.map((section, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 uppercase tracking-wider">
                  <Text variant="label-sm" tone="default">
                    {section.title}
                  </Text>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Text variant="body-sm" tone="secondary">
                          {link.label}
                        </Text>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-tatva-border">
        <div className="mx-auto max-w-7xl px-tatva-8 py-tatva-5">
          <div className="flex flex-col items-center justify-between gap-tatva-4 sm:flex-row">
            {/* Copyright */}
            <Text variant="body-xs" tone="tertiary">
              {copyright}
            </Text>

            {/* Contact */}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-tatva-content-tertiary transition-colors hover:text-tatva-content-secondary"
              >
                <Text variant="body-xs" tone="tertiary">
                  {contact.email}
                </Text>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
