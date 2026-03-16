import { Text, Badge, Button } from "@/ui";
import { cn } from "@/lib/utils";
import type { IconName } from "@/ui/lib/icons";

// Helper to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ============================================================================
// Types
// ============================================================================

export type SocialPlatform = "linkedin" | "twitter" | "github" | "email" | "website" | "instagram" | "youtube";

export interface InstructorSocial {
  platform: SocialPlatform;
  url: string;
}

export interface InstructorSectionProps {
  /** Instructor name */
  name: string;
  /** Instructor role/title */
  role: string;
  /** Instructor bio/description */
  bio: string;
  /** Bio bullet points for better readability */
  bioPoints?: string[];
  /** Instructor avatar URL */
  avatar?: string;
  /** Company/Organization (e.g., "Co-founder of Lex AI Labs") */
  company?: string;
  /** Credentials list */
  credentials?: string[];
  /** Social links */
  socials?: InstructorSocial[];
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Credential badge colors - rotating through available Badge variants
// ============================================================================

const credentialVariants: Array<"indigo" | "orange" | "green" | "pink" | "coral" | "yellow"> = [
  "indigo",
  "green",
  "orange",
  "pink",
  "coral",
  "yellow",
];

function getCredentialVariant(index: number) {
  return credentialVariants[index % credentialVariants.length];
}

// ============================================================================
// Social Icon Mapping
// ============================================================================

function getSocialIconName(platform: SocialPlatform): IconName {
  switch (platform) {
    case "linkedin":
      return "linkedin";
    case "twitter":
      return "twitter";
    case "github":
      return "github";
    case "email":
      return "email";
    case "instagram":
      return "instagram";
    case "youtube":
      return "youtube";
    case "website":
      return "external-link";
    default:
      return "external-link";
  }
}

// ============================================================================
// Component
// ============================================================================

export function InstructorSection({
  name,
  role,
  bio,
  bioPoints = [],
  avatar,
  company,
  credentials = [],
  socials = [],
  className,
}: InstructorSectionProps) {
  return (
    <section
      className={cn(
        "bg-tatva-background-primary px-tatva-8 py-tatva-24",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-tatva-16 text-center">
          <Text variant="heading-lg">
            Meet Your Instructor
          </Text>
          <Text variant="body-lg" tone="secondary">
            Learn from industry experts with real-world experience
          </Text>
        </div>

        {/* Instructor Card */}
        <div className="flex flex-col items-center gap-tatva-12 rounded-tatva-xl bg-tatva-background-secondary/50 p-tatva-12 md:flex-row md:items-center">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative size-44 overflow-hidden rounded-full bg-tatva-background-tertiary/50 ring-4 ring-tatva-background-primary/50">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-medium text-tatva-content-secondary">
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Name and Role */}
            <div className="mb-tatva-3 flex flex-col items-center gap-tatva-4 md:flex-row">
              <Text variant="heading-md">{name}</Text>
              <Badge variant="brand" size="md">
                {role}
              </Badge>
            </div>

            {/* Company/Organization */}
            {company && (
              <div className="mb-tatva-5">
                <Text variant="body-md" tone="tertiary">
                  {company}
                </Text>
              </div>
            )}

            {/* Bio */}
            <div className="my-tatva-8">
              {bioPoints.length > 0 ? (
                <ul className="space-y-3">
                  {bioPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gray-400" />
                      <Text variant="body-md" tone="secondary">
                        {point}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text variant="body-md" tone="secondary">
                  {bio}
                </Text>
              )}
            </div>

            {/* Credentials - Colorful badges */}
            {credentials.length > 0 && (
              <div className="mb-tatva-8">
                <div className="mb-tatva-4 uppercase tracking-wide">
                  <Text variant="label-sm" tone="tertiary">
                    Credentials
                  </Text>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-tatva-4 md:justify-start">
                  {credentials.map((credential, index) => (
                    <Badge
                      key={index}
                      variant={getCredentialVariant(index)}
                      size="lg"
                    >
                      {credential}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links - Using Button component with icon-only */}
            {socials.length > 0 && (
              <div>
                <div className="mb-tatva-4 uppercase tracking-wide">
                  <Text variant="label-sm" tone="tertiary">
                    Connect
                  </Text>
                </div>
                <div className="flex flex-wrap justify-center gap-tatva-3 md:justify-start">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="md"
                        icon={getSocialIconName(social.platform)}
                        tooltip={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstructorSection;
