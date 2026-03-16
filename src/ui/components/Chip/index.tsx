"use client";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Icon, type IconName } from "../Icon";

const chipVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-tatva-full font-matter transition-colors",
  {
    variants: {
      variant: {
        secondary:
          "bg-tatva-background-secondary text-tatva-content-primary hover:bg-tatva-background-tertiary",
        brand:
          "bg-tatva-brand-primary text-tatva-brand-content-primary hover:bg-tatva-brand-secondary",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

/** Chip sizes */
const chipSizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-tatva-12 px-tatva-4 gap-tatva-2 text-tatva-body-sm", // icon 14x14, body-xs, padding 8x4px, height 24px
  md: "h-tatva-14 px-tatva-4 gap-tatva-2 text-tatva-body-sm", // icon 16x16, body-sm, padding 8x4px, height 28px
  lg: "h-tatva-18 px-tatva-6 gap-tatva-2 text-tatva-body-md", // icon 20x20, body-md, padding 12x8px, height 36px
};

/** Icon size mapping for chip sizes */
const chipIconSizeMap: Record<
  "sm" | "md" | "lg",
  NonNullable<Parameters<typeof Icon>[0]["size"]>
> = {
  sm: "xs", // 14px
  md: "sm", // 16px
  lg: "lg", // 20px
};

/** Close icon size mapping for chip sizes */
const chipCloseIconSizeMap: Record<
  "sm" | "md" | "lg",
  NonNullable<Parameters<typeof Icon>[0]["size"]>
> = {
  sm: "xs", // 14px
  md: "xs", // 14px
  lg: "xs", // 16px
};

export interface ChipProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    VariantProps<typeof chipVariants> {
  /** Chip size */
  size?: "sm" | "md" | "lg";
  /** Leading icon name from the design system */
  icon?: IconName;
  /** Chip content (text) */
  children?: React.ReactNode;
  /** Callback when close button is clicked */
  onRemove: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    { variant = "secondary", size = "md", icon, children, onRemove, ...props },
    ref
  ) => {
    const iconSize = chipIconSizeMap[size ?? "md"];
    const closeIconSize = chipCloseIconSizeMap[size ?? "md"];

    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({ variant }),
          chipSizeStyles[size],
          "cursor-pointer"
        )}
        {...props}
      >
        {icon && (
          <Icon
            name={icon}
            tone={variant === "brand" ? "brand" : "primary"}
            size={iconSize}
          />
        )}
        {children}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-tatva-1 flex shrink-0 cursor-pointer items-center justify-center rounded-tatva-full border-none bg-transparent p-tatva-0 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Remove"
        >
          <Icon
            name="close"
            tone={variant === "brand" ? "brand" : "primary"}
            size={closeIconSize}
          />
        </button>
      </span>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
export default Chip;
