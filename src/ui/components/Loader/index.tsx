"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

const loaderVariants = cva("", {
  variants: {
    variant: {
      circular: "",
      linear: "w-full",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "circular",
    size: "md",
  },
});

// Circular size mappings (sm, md, lg)
const circularSizeMap = {
  sm: 24,
  md: 36,
  lg: 48,
};

const circularStrokeWidthMap = {
  sm: 2,
  md: 3,
  lg: 4,
};

// Linear height mappings (sm, md only)
const linearHeightMap = {
  sm: 4,
  md: 8,
};

type LoaderSize = "sm" | "md" | "lg";
type LinearSize = "sm" | "md";

export interface LoaderProps extends VariantProps<typeof loaderVariants> {
  /**
   * Loader style variant
   * - `circular`: Spinning circle loader (supports sm, md, lg)
   * - `linear`: Horizontal progress bar (supports sm, md only)
   */
  variant?: "circular" | "linear";
  /**
   * Size of the loader
   * - Circular: sm (24px), md (36px), lg (48px)
   * - Linear: sm (4px), md (8px) - lg falls back to md
   */
  size?: LoaderSize;
  /** Progress value (0-100). When provided, shows determinate progress. When undefined, shows indeterminate animation. */
  value?: number;
  /** Text to display after the loader (horizontal, 12px gap) */
  text?: string;
  /** Accessibility label for the loader */
  "aria-label"?: string;
}

// ============================================================================
// Circular Loader
// ============================================================================

interface CircularLoaderProps {
  size: LoaderSize;
  value?: number;
  ariaLabel: string;
}

const CircularLoader = React.forwardRef<SVGSVGElement, CircularLoaderProps>(
  ({ size, value, ariaLabel }, ref) => {
    const pixelSize = circularSizeMap[size];
    const strokeWidth = circularStrokeWidthMap[size];
    const radius = (pixelSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = pixelSize / 2;

    const isDeterminate = value !== undefined;
    const clampedValue = isDeterminate ? Math.min(100, Math.max(0, value)) : 25;
    const progressLength = circumference * (clampedValue / 100);
    const gapLength = circumference - progressLength;

    return (
      <svg
        ref={ref}
        width={pixelSize}
        height={pixelSize}
        viewBox={`0 0 ${pixelSize} ${pixelSize}`}
        fill="none"
        className={cn(!isDeterminate ? "animate-tatva-spin" : "")}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={isDeterminate ? clampedValue : undefined}
        aria-valuemin={isDeterminate ? 0 : undefined}
        aria-valuemax={isDeterminate ? 100 : undefined}
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-tatva-border-secondary"
          strokeLinecap="round"
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-tatva-brand-content-primary"
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${gapLength}`}
          strokeDashoffset={circumference * 0.25}
          style={{
            transformOrigin: "center",
            transition: isDeterminate ? "stroke-dasharray 150ms ease" : "none",
          }}
        />
      </svg>
    );
  }
);

CircularLoader.displayName = "CircularLoader";

// ============================================================================
// Linear Loader
// ============================================================================

interface LinearLoaderProps {
  size: LinearSize;
  value?: number;
  ariaLabel: string;
}

const LinearLoader = React.forwardRef<HTMLDivElement, LinearLoaderProps>(
  ({ size, value, ariaLabel }, ref) => {
    const height = linearHeightMap[size];
    const isDeterminate = value !== undefined;
    const clampedValue = isDeterminate ? Math.min(100, Math.max(0, value)) : 0;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={isDeterminate ? clampedValue : undefined}
        aria-valuemin={isDeterminate ? 0 : undefined}
        aria-valuemax={isDeterminate ? 100 : undefined}
        className="w-full overflow-hidden rounded-tatva-full bg-tatva-border-secondary"
        style={{ height: `${height}px` }}
      >
        <div
          className={cn(
            "h-full rounded-tatva-full bg-tatva-brand-content-primary",
            !isDeterminate ? "animate-tatva-linear-loader" : ""
          )}
          style={{
            width: isDeterminate ? `${clampedValue}%` : "30%",
            transition: isDeterminate ? "width 150ms ease" : "none",
          }}
        />
      </div>
    );
  }
);

LinearLoader.displayName = "LinearLoader";

// ============================================================================
// Main Loader Component
// ============================================================================

const Loader = React.forwardRef<HTMLDivElement | SVGSVGElement, LoaderProps>(
  (
    {
      variant = "circular",
      size = "md",
      value,
      text,
      "aria-label": ariaLabel = "Loading",
    },
    ref
  ) => {
    const loaderElement =
      variant === "linear" ? (
        <LinearLoader
          ref={ref as React.Ref<HTMLDivElement>}
          size={size === "lg" ? "md" : size}
          value={value}
          ariaLabel={ariaLabel}
        />
      ) : (
        <CircularLoader
          ref={ref as React.Ref<SVGSVGElement>}
          size={size}
          value={value}
          ariaLabel={ariaLabel}
        />
      );

    if (text) {
      return (
        <div className="flex min-w-tatva-150 items-center gap-tatva-6">
          {loaderElement}
          <div className="whitespace-nowrap">
            <Text variant="body-md">{text}</Text>
          </div>
        </div>
      );
    }

    return loaderElement;
  }
);

Loader.displayName = "Loader";

// ============================================================================
// Exports
// ============================================================================

export { Loader, loaderVariants };
export default Loader;
