"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import Button from "../Button";
import Icon from "../Icon";
import { Menu, MenuOption } from "../Menu";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

// ============================================================================
// MetricCard Variants
// ============================================================================

const metricCardVariants = cva(
  "relative flex min-w-tatva-120 flex-col gap-tatva-4 rounded-tatva-lg border border-tatva-border-primary p-tatva-12",
  {
    variants: {
      showBorder: {
        true: "",
        false: "border-0",
      },
    },
    defaultVariants: {
      showBorder: true,
    },
  }
);

// ============================================================================
// MetricCard Types
// ============================================================================

export interface MetricCardProps extends VariantProps<
  typeof metricCardVariants
> {
  /** The label/heading text displayed above the value */
  heading: string;
  /** The main value to display */
  value: string | number;
  /** Menu options for the trailing icon dropdown (shows menu when provided) */
  menuOptions?: MenuOption[];
  /** Optional tooltip for the heading */
  tooltipContent?: string;
  /** Optional chart or additional content */
  children?: React.ReactNode;
}

// ============================================================================
// MetricCard Component
// ============================================================================

function MetricCard({
  heading,
  value,
  menuOptions,
  tooltipContent,
  showBorder = true,
  children,
}: MetricCardProps) {
  const hasMenu = menuOptions && menuOptions.length > 0;

  return (
    <div className={metricCardVariants({ showBorder })}>
      {/* Header section with text and trailing icon */}
      <div className="flex w-full items-start">
        {/* Text content */}
        <div className="flex min-w-tatva-0 flex-1 flex-col gap-tatva-4">
          {/* Heading/Label */}
          <div className="flex items-center gap-tatva-4">
            <span className="inline-flex whitespace-nowrap">
              <Text variant="body-md" tone="secondary">
                {heading}
              </Text>
            </span>
            {tooltipContent && (
              <Tooltip content={tooltipContent}>
                <span className="inline-flex cursor-pointer">
                  <Icon name="info" size="xs" tone="secondary" />
                </span>
              </Tooltip>
            )}
          </div>

          {/* Value */}
          <Text variant="heading-lg">{value}</Text>
        </div>

        {/* Menu (only shown if menuOptions provided) */}
        {hasMenu && (
          <Menu options={menuOptions}>
            <div className="absolute right-tatva-10 top-tatva-10">
              <Button variant="ghost" size="sm" icon="more-horizontal" />
            </div>
          </Menu>
        )}
      </div>

      {/* Children (chart, graph, etc.) */}
      {children && <div className="w-full">{children}</div>}
    </div>
  );
}

MetricCard.displayName = "MetricCard";

// ============================================================================
// Exports
// ============================================================================

export { MetricCard, metricCardVariants };
export default MetricCard;
