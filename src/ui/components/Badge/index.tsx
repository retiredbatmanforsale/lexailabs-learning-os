"use client";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

/** Badge type: dot (indicator), number (count), or label (text) */
type BadgeType = "dot" | "number" | "label";

const badgeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-tatva-full font-matter",
  {
    variants: {
      variant: {
        default: "bg-tatva-background-secondary text-tatva-content-primary",
        brand: "bg-tatva-brand-primary text-tatva-brand-content-primary",
        indigo: "bg-tatva-indigo-100 text-tatva-indigo-800",
        orange: "bg-tatva-orange-100 text-tatva-orange-800",
        coral: "bg-[#FFF5F2] text-[#C85028]",
        green: "bg-tatva-green-100 text-tatva-green-800",
        pink: "bg-tatva-pink-100 text-tatva-pink-800",
        red: "bg-tatva-red-100 text-tatva-red-800",
        yellow: "bg-tatva-yellow-100 text-tatva-yellow-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/** Dot sizes - outer container */
const dotSizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "size-[6px]", // 6x6px
  md: "size-[10px]", // 10x10px
  lg: "size-[12px]", // 12x12px
};

/** Inner dot colors per variant */
const dotColorStyles: Record<string, string> = {
  default: "bg-tatva-content-primary",
  brand: "bg-tatva-brand-content-secondary",
  indigo: "bg-tatva-indigo-800",
  orange: "bg-tatva-orange-800",
  coral: "bg-[#C85028]",
  green: "bg-tatva-green-800",
  pink: "bg-tatva-pink-800",
  red: "bg-tatva-red-800",
  yellow: "bg-tatva-yellow-800",
};

/** Number badge sizes - 18px height, 5px padding, body-xs font */
const numberSizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-[18px] px-[5px] text-tatva-body-xs",
  md: "h-[18px] px-[5px] text-tatva-body-xs",
  lg: "h-[22px] px-[6px] text-tatva-body-sm", // 22px height, 6px padding, larger font
};

/** Label badge sizes */
const labelSizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-[18px] px-tatva-3 text-[10px]", // 18px height, 6px padding, smaller font
  md: "h-[20px] px-tatva-3 text-tatva-body-xs", // 20px height, 6px padding
  lg: "h-[24px] px-tatva-4 text-tatva-body-sm", // 24px height, 8px padding, larger font
};

export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    VariantProps<typeof badgeVariants> {
  /** Badge type: dot (indicator), number (count), or label (text) */
  type?: BadgeType;
  /** Badge size - sm, md, or lg */
  size?: "sm" | "md" | "lg";
  /** Badge content (for number and label types) */
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { type = "label", variant = "default", size = "md", children, ...props },
    ref
  ) => {
    // Dot type - simple circular indicator (no background on container)
    if (type === "dot") {
      return (
        <span
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center",
            dotSizeStyles[size]
          )}
          {...props}
        >
          <span
            className={cn(
              "rounded-tatva-full",
              dotSizeStyles[size],
              dotColorStyles[variant ?? "default"]
            )}
          />
        </span>
      );
    }

    // Number type - compact badge for counts
    if (type === "number") {
      return (
        <span
          ref={ref}
          className={cn(badgeVariants({ variant }), numberSizeStyles[size])}
          {...props}
        >
          {children}
        </span>
      );
    }

    // Label type - standard badge with text
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), labelSizeStyles[size])}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export default Badge;
