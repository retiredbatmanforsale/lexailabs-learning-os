"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// ============================================================================
// Styles
// ============================================================================

const dividerVariants = cva("m-0 border-none", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px self-stretch",
    },
    variant: {
      primary: "bg-tatva-border-primary",
      secondary: "bg-tatva-border-secondary",
      tertiary: "bg-tatva-border-tertiary",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "primary",
  },
});

// ============================================================================
// Types
// ============================================================================

type DividerVariants = {
  [K in keyof VariantProps<typeof dividerVariants>]: Exclude<
    VariantProps<typeof dividerVariants>[K],
    null
  >;
};

export interface DividerProps
  extends
    Omit<React.HTMLAttributes<HTMLHRElement>, "className">,
    DividerVariants {
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical";
  /** Visual style variant */
  variant?: "primary" | "secondary" | "tertiary";
  /** Additional CSS class name */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", variant = "primary", className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        aria-orientation={orientation}
        className={[dividerVariants({ orientation, variant }), className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

// ============================================================================
// Exports
// ============================================================================

export { Divider, dividerVariants };
export default Divider;
