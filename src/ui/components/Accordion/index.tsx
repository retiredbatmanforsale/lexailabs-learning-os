"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Badge, type BadgeProps } from "../Badge";
import Icon from "../Icon";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

/** Badge configuration for Accordion */
interface AccordionBadge {
  /** Badge type: dot, number, or label */
  type: BadgeProps["type"];
  /** Value to display inside the badge */
  value?: React.ReactNode;
  /** Badge variant */
  variant?: BadgeProps["variant"];
}

export interface AccordionItemProps {
  /** Unique value for the accordion item */
  value: string;
  /** Heading text or custom content */
  heading: React.ReactNode;
  /** Collapsible content */
  children?: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md";
  /** Visual variant - normal has heading typography, heading-only has body/label typography */
  variant?: "normal" | "heading-only";
  /** Show bottom divider */
  divider?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Optional badge to show next to heading (e.g., progress indicator) */
  badge?: AccordionBadge;
  /** Secondary text next to heading */
  subtitle?: string;
}

export interface AccordionProps {
  /** Accordion items */
  children: React.ReactNode;
  /** Type of accordion - single allows one item open, multiple allows many */
  type?: "single" | "multiple";
  /** Default expanded value(s) */
  defaultValue?: string | string[];
  /** Controlled value(s) */
  value?: string | string[];
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void;
  /** Allow collapsing all items in single mode */
  collapsible?: boolean;
}

export interface SingleAccordionProps {
  /** Heading text or custom content */
  heading: React.ReactNode;
  /** Collapsible content */
  children?: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md";
  /** Visual variant - normal has heading typography, heading-only has body/label typography */
  variant?: "normal" | "heading-only";
  /** Show bottom divider */
  divider?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Default expanded state */
  defaultExpanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
}

// ============================================================================
// Accordion Group
// ============================================================================

function AccordionRoot({
  children,
  type = "single",
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
}: AccordionProps) {
  if (type === "single") {
    return (
      <AccordionPrimitive.Root
        type="single"
        defaultValue={defaultValue as string | undefined}
        value={value as string | undefined}
        onValueChange={onValueChange as ((value: string) => void) | undefined}
        collapsible={collapsible}
        className="w-full"
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultValue as string[] | undefined}
      value={value as string[] | undefined}
      onValueChange={onValueChange as ((value: string[]) => void) | undefined}
      className="w-full"
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

// ============================================================================
// Accordion Item (for use inside AccordionRoot)
// ============================================================================

function AccordionItem({
  value,
  heading,
  children,
  size = "sm",
  variant = "normal",
  divider = true,
  disabled = false,
  badge,
  subtitle,
}: AccordionItemProps) {
  // Title typography based on variant and size
  // normal: sm -> heading-xs, md -> heading-sm (default tone)
  // heading-only: sm -> body-sm, md -> label-md (secondary tone)
  const getTitleVariant = () => {
    if (variant === "heading-only") {
      return size === "sm" ? "body-sm" : "label-md";
    }
    return size === "sm" ? "heading-xs" : "heading-sm";
  };

  const titleVariant = getTitleVariant();
  const titleTone = variant === "heading-only" ? "secondary" : "default";
  const bodyVariant = size === "sm" ? "body-sm" : "body-md";
  const iconSize = size === "sm" ? "sm" : "md";

  return (
    <AccordionPrimitive.Item
      value={value}
      disabled={disabled}
      className={cn(
        "w-full transition-colors",
        variant !== "heading-only"
          ? "hover:bg-tatva-background-primary-hover data-[state=open]:hover:bg-tatva-background-primary-hover"
          : "",
        divider ? "border-b border-tatva-border-primary" : ""
      )}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            "flex flex-1 items-center justify-between gap-tatva-4 px-tatva-4 py-tatva-8",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tatva-brand-primary focus-visible:ring-offset-2",
            "group",
            disabled ? "cursor-not-allowed opacity-50" : ""
          )}
        >
          <div className="flex items-center gap-tatva-4">
            <Text variant={titleVariant} tone={titleTone}>
              {heading}
            </Text>
            {subtitle && (
              <Text variant="body-sm" tone="secondary">
                {subtitle}
              </Text>
            )}
            {badge && (
              <Badge
                type={badge.type}
                variant={badge.variant ?? "default"}
                size="sm"
              >
                {badge.value}
              </Badge>
            )}
          </div>
          <span className="transition-transform duration-300 ease-out group-data-[state=open]:rotate-180">
            <Icon name="chevron-down" size={iconSize} tone="secondary" />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        className={cn(
          "overflow-hidden",
          "data-[state=open]:animate-tatva-accordion-down",
          "data-[state=closed]:animate-tatva-accordion-up"
        )}
      >
        <div className="px-tatva-4 pb-tatva-8">
          <Text variant={bodyVariant} tone="default">
            {children}
          </Text>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

// ============================================================================
// Single Accordion (standalone, without group)
// ============================================================================

function Accordion({
  heading,
  children,
  size = "sm",
  variant = "normal",
  divider = true,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  disabled = false,
}: SingleAccordionProps) {
  const [internalExpanded, setInternalExpanded] =
    React.useState(defaultExpanded);

  const isExpanded = expanded ?? internalExpanded;
  const setExpanded = onExpandedChange ?? setInternalExpanded;

  // Title typography based on variant and size
  // normal: sm -> heading-xs, md -> heading-sm (default tone)
  // heading-only: sm -> body-sm, md -> label-md (secondary tone)
  const getTitleVariant = () => {
    if (variant === "heading-only") {
      return size === "sm" ? "body-sm" : "label-md";
    }
    return size === "sm" ? "heading-xs" : "heading-sm";
  };

  const titleVariant = getTitleVariant();
  const titleTone = variant === "heading-only" ? "secondary" : "default";
  const bodyVariant = size === "sm" ? "body-sm" : "body-md";
  const iconSize = size === "sm" ? "sm" : "md";

  const handleToggle = () => {
    if (disabled) return;
    setExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "w-full transition-colors",
        variant !== "heading-only"
          ? "hover:bg-tatva-background-primary-hover"
          : "",
        divider ? "border-b border-tatva-border-primary" : ""
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-tatva-4 py-tatva-8",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tatva-brand-primary focus-visible:ring-offset-2",
          disabled ? "cursor-not-allowed opacity-50" : "",
          variant === "heading-only" ? "px-tatva-2" : "px-tatva-4"
        )}
        aria-expanded={isExpanded}
      >
        <Text variant={titleVariant} tone={titleTone}>
          {heading}
        </Text>
        <span
          className={cn(
            "transition-transform duration-300 ease-out",
            isExpanded ? "rotate-180" : ""
          )}
        >
          <Icon name="chevron-down" size={iconSize} tone="secondary" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "pb-tatva-8",
              variant === "heading-only" ? "" : "px-tatva-4"
            )}
          >
            <Text variant={bodyVariant} tone="default">
              {children}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export { Accordion, AccordionItem, AccordionRoot };
export type { AccordionBadge };

export default Accordion;
