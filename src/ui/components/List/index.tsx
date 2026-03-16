"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge, type BadgeProps } from "../Badge";
import { Icon } from "../Icon";
import { Text, type TextVariant } from "../Text";

// ============================================================================
// List Item Variants
// ============================================================================

const listItemVariants = cva(
  "flex w-full select-none items-center justify-between text-left",
  {
    variants: {
      size: {
        xs: "gap-tatva-4 px-tatva-5 py-tatva-5",
        sm: "gap-tatva-6 px-tatva-6 py-tatva-4",
        md: "gap-tatva-8 px-tatva-8 py-tatva-6",
        lg: "gap-tatva-10 px-tatva-10 py-tatva-8",
      },
      clickable: {
        true: "cursor-pointer hover:bg-tatva-background-secondary",
        false: "",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-50",
        false: "",
      },
      rounded: {
        none: "",
        sm: "rounded-tatva-sm",
        md: "rounded-tatva-md",
        lg: "rounded-tatva-lg",
        full: "rounded-tatva-full",
      },
      active: {
        true: "bg-tatva-brand-primary rounded-tatva-md",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      clickable: false,
      disabled: false,
      rounded: "none",
      active: false,
    },
  }
);

// Size to text variant mapping
const sizeToTextVariant: Record<NonNullable<ListProps["size"]>, TextVariant> = {
  xs: "heading-xs",
  sm: "heading-sm",
  md: "heading-sm",
  lg: "heading-md",
};

// Size to gap mapping for icon and text
const sizeToGap: Record<NonNullable<ListProps["size"]>, string> = {
  xs: "gap-tatva-4",
  sm: "gap-tatva-6",
  md: "gap-tatva-8",
  lg: "gap-tatva-10",
};

// Size to badge size mapping
const sizeToBadgeSize: Record<NonNullable<ListProps["size"]>, "sm" | "md"> = {
  xs: "sm",
  sm: "sm",
  md: "sm",
  lg: "md",
};

// ============================================================================
// Types
// ============================================================================

interface ListBadge {
  /** Badge type: dot, number, or label */
  type: BadgeProps["type"];
  /** Value to display inside the badge */
  value: React.ReactNode;
  /** Badge variant */
  variant?: BadgeProps["variant"];
}

/** Status indicator types for list items (e.g., lesson progress) */
type ListStatus = "completed" | "in-progress" | "locked";

type ListElement = "div" | "button";

export interface ListProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
      "className" | "title"
    >,
    Omit<VariantProps<typeof listItemVariants>, "clickable" | "active"> {
  /** Element to render as */
  as?: ListElement;
  /** Title text displayed in the list item */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Icon or avatar element to display on the left */
  icon?: React.ReactNode;
  /** Badge configuration displayed next to the title */
  badge?: ListBadge;
  /** Action element(s) to display on the right (e.g., Switch, Button, Badge) */
  children?: React.ReactNode;
  /** Click handler - automatically enables hover state */
  onClick?: () => void;
  /** Whether the item is selected (shows checkmark) */
  selected?: boolean;
  /** Whether the item is in active/current state (light indigo background) */
  active?: boolean;
  /** Status indicator - auto-renders appropriate icon (completed: checkmark, in-progress: play, locked: lock) */
  status?: ListStatus;
}

export interface ListGroupProps {
  /** List items to display */
  children: React.ReactNode;
  /** Whether to show dividers between items */
  dividers?: boolean;
  /** Visual variant: default/outline (bordered), seamless (no border/dividers, for sidebars) */
  variant?: "default" | "outline" | "elevated" | "seamless";
}

// ============================================================================
// List Component
// ============================================================================

// Status to icon mapping
const statusIconMap: Record<ListStatus, { name: "check" | "play" | "lock"; tone: "success" | "primary" | "tertiary" }> = {
  completed: { name: "check", tone: "success" },
  "in-progress": { name: "play", tone: "primary" },
  locked: { name: "lock", tone: "tertiary" },
};

const List = React.forwardRef<HTMLDivElement | HTMLButtonElement, ListProps>(
  (
    {
      as: Component = "div",
      title,
      subtitle,
      icon,
      badge,
      children,
      size = "xs",
      disabled,
      rounded = "none",
      onClick,
      selected,
      active = false,
      status,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onClick;
    const selectedSize = size ?? "xs";

    // Determine the icon to display: status icon takes precedence if provided
    const statusIcon = status ? statusIconMap[status] : null;
    const displayIcon = statusIcon ? (
      <Icon name={statusIcon.name} size="sm" tone={statusIcon.tone} />
    ) : icon;

    // If status is locked, apply disabled styling
    const isDisabled = disabled || status === "locked";

    const content = (
      <>
        {/* Left side: Icon + Title/Subtitle */}
        <div
          className={cn(
            "flex min-w-tatva-0 flex-1 items-center",
            sizeToGap[selectedSize]
          )}
        >
          {displayIcon && (
            <div className="flex shrink-0 items-center justify-center">
              {displayIcon}
            </div>
          )}
          <div className="flex min-w-tatva-0 flex-1 flex-col gap-tatva-1">
            <div className="flex items-center gap-tatva-4">
              <Text variant={sizeToTextVariant[selectedSize]} lineClamp={1}>
                {title}
              </Text>
              {badge && (
                <Badge
                  type={badge.type}
                  variant={badge.variant ?? "default"}
                  size={sizeToBadgeSize[selectedSize]}
                >
                  {badge.value}
                </Badge>
              )}
            </div>
            {subtitle && (
              <Text variant={"body-sm"} tone="secondary" lineClamp={1}>
                {subtitle}
              </Text>
            )}
          </div>
        </div>

        {/* Right side: Selected checkmark or Action/children */}
        {(selected || children) && (
          <div
            className="flex shrink-0 items-center"
            onClick={children ? (e) => e.stopPropagation() : undefined}
          >
            {children}
            {selected && <Icon name="check" size="md" />}
          </div>
        )}
      </>
    );

    if (Component === "button") {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          data-component="List"
          className={cn(
            listItemVariants({
              size: selectedSize,
              clickable: isClickable,
              disabled: isDisabled,
              rounded,
              active,
            })
          )}
          onClick={isDisabled ? undefined : onClick}
          disabled={isDisabled}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        data-component="List"
        className={cn(
          listItemVariants({
            size: selectedSize,
            clickable: isClickable,
            disabled: isDisabled,
            rounded,
            active,
          })
        )}
        onClick={isDisabled ? undefined : onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !isDisabled ? 0 : undefined}
        onKeyDown={
          onClick && !isDisabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {content}
      </div>
    );
  }
);

List.displayName = "List";

// ============================================================================
// ListGroup Component
// ============================================================================

const ListGroup = React.forwardRef<HTMLDivElement, ListGroupProps>(
  ({ children, dividers = true, variant = "outline" }, ref) => {
    const isSeamless = variant === "seamless";

    // Seamless variant: no border, no dividers, just stacked items
    if (isSeamless) {
      return (
        <div
          ref={ref}
          data-component="ListGroup"
          className="flex flex-col"
        >
          {children}
        </div>
      );
    }

    return (
      <div
        className="overflow-hidden rounded-tatva-md border border-tatva-border"
        ref={ref}
        data-component="ListGroup"
      >
        <div
          className={cn(
            dividers ? "space-y-tatva-2 divide-y divide-tatva-border" : ""
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

ListGroup.displayName = "ListGroup";

// ============================================================================
// Exports
// ============================================================================

export { List, ListGroup, listItemVariants };
export type { ListBadge, ListStatus };
export default List;
