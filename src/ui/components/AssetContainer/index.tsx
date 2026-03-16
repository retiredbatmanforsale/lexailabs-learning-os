"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * Asset Container Sizes (from Figma):
 * - xs: 20×20px
 * - sm: 44×44px
 * - md: 68×68px
 * - md-landscape: 91×68px (4:3)
 * - lg: 160×160px
 */
const assetContainerVariants = cva(
  "relative shrink-0 overflow-hidden rounded-tatva-md",
  {
    variants: {
      size: {
        xs: "size-tatva-10", // 20px
        sm: "size-tatva-28", // 56px
        md: "size-tatva-34", // 68px square
        "md-landscape": "h-tatva-34 w-tatva-46", // 4:3 aspect
        lg: "size-tatva-80", // 160px
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Strip null from CVA's VariantProps
type AssetContainerVariants = {
  [K in keyof VariantProps<typeof assetContainerVariants>]: Exclude<
    VariantProps<typeof assetContainerVariants>[K],
    null
  >;
};

export interface AssetContainerProps extends AssetContainerVariants {
  /** Image source URL (used if children not provided) */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Custom image element (e.g., Next.js Image) - overrides src */
  children?: React.ReactNode;
}

const AssetContainer = React.forwardRef<HTMLDivElement, AssetContainerProps>(
  ({ src, alt = "", children, size = "md" }, ref) => {
    return (
      <div ref={ref} className={assetContainerVariants({ size })}>
        {children ? (
          children
        ) : src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
      </div>
    );
  }
);

AssetContainer.displayName = "AssetContainer";

export { AssetContainer, assetContainerVariants };
export default AssetContainer;
