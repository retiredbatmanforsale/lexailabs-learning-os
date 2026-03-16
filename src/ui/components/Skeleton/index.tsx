"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton items to render */
  count?: number;
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shimmer variant - default (neutral) or warm (coral tint) */
  variant?: "default" | "warm";
}

// ============================================================================
// Component
// ============================================================================

// Variant-based gradient classes
const shimmerVariants = {
  default: "from-tatva-background-secondary via-tatva-border to-tatva-background-secondary",
  warm: "from-tatva-orange-50 via-tatva-orange-100 to-tatva-orange-50",
};

function Skeleton({
  className,
  count = 1,
  width = "100%",
  height = "100%",
  variant = "default",
  style,
  ...props
}: SkeletonProps) {
  const skeletonStyle: React.CSSProperties = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  const shimmerClass = cn(
    "animate-tatva-skeleton-shimmer rounded-tatva-md bg-gradient-to-r bg-[length:1000px_100%]",
    shimmerVariants[variant],
    className
  );

  if (count === 1) {
    return (
      <div
        className={shimmerClass}
        style={skeletonStyle}
        {...props}
      />
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={shimmerClass}
          style={skeletonStyle}
          {...props}
        />
      ))}
    </>
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };
export default Skeleton;
