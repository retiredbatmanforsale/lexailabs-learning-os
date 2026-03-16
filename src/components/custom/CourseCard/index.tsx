import { Text, Badge, Button, Icon } from "@/ui";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export type CourseCardState = "not-started" | "in-progress" | "completed";

export interface CourseCardProps {
  /** Course title */
  title: string;
  /** Course description */
  description: string;
  /** Course image URL */
  image: string;
  /** Badge text (e.g., "Learning Path", "Course", "Certification") */
  badge?: string;
  /** Number of courses/modules in the learning path */
  coursesCount?: number;
  /** Number of enrolled students */
  studentsCount?: number;
  /** User's progress percentage (0-100). 0 = not started, 100 = completed */
  progress?: number;
  /** Click handler for the CTA button */
  onStartLearning?: () => void;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatStudentCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`;
  }
  return count.toString();
}

function getBadgeIcon(badge: string): string {
  switch (badge.toLowerCase()) {
    case "learning path":
      return "layers";
    case "certification":
      return "briefcase";
    case "course":
    default:
      return "audio-book";
  }
}

function getCardState(progress: number): CourseCardState {
  if (progress === 0) return "not-started";
  if (progress === 100) return "completed";
  return "in-progress";
}

function getCtaConfig(state: CourseCardState): { text: string; variant: "primary" | "secondary" | "success"; icon?: string } {
  switch (state) {
    case "not-started":
      return { text: "Start learning", variant: "primary", icon: "play" };
    case "in-progress":
      return { text: "Resume learning", variant: "secondary", icon: "arrow-right" };
    case "completed":
      return { text: "Review course", variant: "success", icon: "refresh" };
  }
}

// ============================================================================
// State-specific Styling
// ============================================================================

function getCardStyles(state: CourseCardState) {
  const baseStyles = "flex h-full flex-col overflow-hidden rounded-tatva-xl border bg-tatva-background-primary p-tatva-6 transition-colors duration-200";

  switch (state) {
    case "not-started":
      return cn(baseStyles, "border-gray-300 hover:border-gray-400");
    case "in-progress":
      return cn(baseStyles, "border-blue-500/50 hover:border-blue-500");
    case "completed":
      return cn(baseStyles, "border-tatva-positive-content/50 hover:border-tatva-positive-content");
  }
}

// ============================================================================
// Component
// ============================================================================

export function CourseCard({
  title,
  description,
  image,
  badge,
  coursesCount,
  studentsCount,
  progress = 0,
  onStartLearning,
  className,
}: CourseCardProps) {
  const state = getCardState(progress);
  const ctaConfig = getCtaConfig(state);

  return (
    <div className={cn(getCardStyles(state), className)}>
      {/* Image Container - Fully rounded inside the card padding */}
      <div className="relative aspect-video w-full overflow-hidden rounded-tatva-lg bg-tatva-background-secondary">
        {image ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lms-primary-100 to-lms-primary-200">
            <Icon name="audio-book" size="xl" className="text-lms-primary-400" />
          </div>
        )}

        {/* State Indicator Overlay */}
        {state === "completed" && (
          <div className="absolute inset-0 flex items-center justify-center bg-tatva-positive-background/80">
            <div className="flex flex-col items-center gap-tatva-2">
              <div className="flex size-tatva-18 items-center justify-center rounded-full bg-tatva-positive-content">
                <Icon name="check" size="lg" tone="inverse" />
              </div>
              <Text variant="label-sm" tone="positive">
                Completed
              </Text>
            </div>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-tatva-6 pt-tatva-8">
        {/* Badge Row */}
        <div className="flex items-center justify-between">
          {badge && (
            <Badge variant="brand" size="sm">
              <span className="flex items-center gap-tatva-1">
                <Icon name={getBadgeIcon(badge) as any} size="xs" tone="brand" />
                {badge}
              </span>
            </Badge>
          )}

          {/* State Badge - Only for in-progress when no image overlay */}
          {state === "in-progress" && !badge && (
            <Badge variant="orange" size="sm">
              In Progress
            </Badge>
          )}
        </div>

        {/* Title */}
        <Text variant="heading-xs" lineClamp={2}>
          {title}
        </Text>

        {/* Stats */}
        {(coursesCount || studentsCount) && (
          <div className="flex items-center gap-tatva-4">
            {coursesCount && (
              <div className="flex items-center gap-tatva-1">
                <Icon name="audio-book" size="xs" tone="tertiary" />
                <Text variant="body-xs" tone="tertiary">
                  {coursesCount} courses
                </Text>
              </div>
            )}
            {studentsCount && (
              <div className="flex items-center gap-tatva-1">
                <Icon name="chat-multiple" size="xs" tone="tertiary" />
                <Text variant="body-xs" tone="tertiary">
                  {formatStudentCount(studentsCount)} students
                </Text>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="flex-1">
          <Text variant="body-sm" tone="secondary" lineClamp={3}>
            {description}
          </Text>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-tatva-4">
          {state === "in-progress" ? (
            <button
              onClick={onStartLearning}
              className="relative w-full overflow-hidden rounded-tatva-lg border border-blue-200 bg-white py-tatva-4 text-sm font-medium transition-all hover:border-blue-300 backdrop-blur-[3px]"
              style={{
                backdropFilter: "blur(10px) saturate(170%)",
                WebkitBackdropFilter: "blur(10px) saturate(170%)",
                background:
                  "linear-gradient(90deg, rgba(147,197,253,0.23) 0%, rgba(96,165,250,0.22) 80%, rgba(255,255,255,0.85) 100%)",
                boxShadow:
                  "0 4px 24px 0 rgba(96,165,250,0.15), 0 1.5px 10px 0 rgba(59,130,246,0.07)",
              }}
            >
              {/* Liquid blue progress */}
              <div
                className="absolute inset-y-0 left-0 z-0 pointer-events-none overflow-hidden rounded-tatva-lg"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.8s cubic-bezier(.77,0,.18,1)",
                  background:
                    "linear-gradient(90deg, rgba(96,165,250,0.44) 0%, rgba(59,130,246,0.94) 60%, rgba(147,197,253,0.45) 100%)",
                  boxShadow:
                    "0 4px 24px 0 rgba(96,165,250,0.22), 0 1.5px 10px 0 rgba(96,165,250,0.12)",
                  borderRadius: "inherit",
                  border: "1.2px solid rgba(255,255,255,0.23)",
                  opacity: 0.96,
                  maskImage:
                    "radial-gradient(ellipse 120% 75% at 50% 60%, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)",
                }}
              >
              </div>
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-2 text-blue-700">
                {ctaConfig.text}
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ) : (
            <Button
              variant={ctaConfig.variant}
              size="lg"
              width="full"
              icon={ctaConfig.icon as any}
              iconPosition="right"
              onClick={onStartLearning}
            >
              {ctaConfig.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
