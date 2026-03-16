"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useIconContext } from "../../lib/icon-context";
import {
  getIconComponent,
  iconNames,
  LOADER_ICONS,
  resolveIcon,
  type BuiltInIconName,
  type IconName,
} from "../../lib/icons";
import { cn } from "../../lib/utils";

// Re-export from icons registry
export { getIconComponent, iconNames, type BuiltInIconName, type IconName };

// ============================================================================
// Styles
// ============================================================================

const iconVariants = cva("inline-flex shrink-0", {
  variants: {
    size: {
      xxs: "size-tatva-6",
      xs: "size-tatva-7",
      sm: "size-tatva-8",
      md: "size-tatva-9",
      lg: "size-tatva-10",
      xl: "size-tatva-12",
      "2xl": "size-tatva-14",
      "3xl": "size-tatva-16",
    },
    tone: {
      primary: "text-tatva-content-primary",
      brand: "text-tatva-brand-content-primary",
      secondary: "text-tatva-content-secondary",
      tertiary: "text-tatva-content-tertiary",
      success: "text-tatva-positive-content",
      warning: "text-tatva-warning-content",
      danger: "text-tatva-danger-content",
      inverse: "text-white",
    },
  },
  defaultVariants: {
    size: "sm",
    tone: "primary",
  },
});

// Strip `null` from CVA's VariantProps (CVA includes null, but React props should be undefined)
type IconVariants = {
  [K in keyof VariantProps<typeof iconVariants>]: Exclude<
    VariantProps<typeof iconVariants>[K],
    null
  >;
};

/** Pixel size mapping for each size variant */
export const iconSizeMap: Record<NonNullable<IconVariants["size"]>, number> = {
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
};

// ============================================================================
// Component
// ============================================================================

export interface IconProps
  extends Omit<React.SVGAttributes<SVGElement>, "className">, IconVariants {
  /**
   * Icon name from the design system or extended via IconProvider.
   * Built-in icons have autocomplete. Extended icons accept any string.
   */
  name: IconName;
  /** Stroke width of the icon */
  strokeWidth?: number;
  /**
   * Accessibility label for meaningful icons.
   * When not provided, icon is treated as decorative (aria-hidden="true").
   */
  "aria-label"?: string;
  /** Additional CSS class name */
  className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = "sm",
      tone = "primary",
      strokeWidth = 2,
      "aria-label": ariaLabel,
      className: userClassName,
      ...props
    },
    ref
  ) => {
    // Check context for extended icons, then fall back to built-in icons
    const extendedIcons = useIconContext();
    const iconData = resolveIcon(name, extendedIcons);

    if (!iconData) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[Icon] "${name}" is not a valid icon name. ` +
            `Make sure it exists in the built-in icons or is provided via IconProvider.`
        );
      }
      return null;
    }

    const pixelSize = iconSizeMap[size ?? "sm"];
    const isLoader = LOADER_ICONS.includes(name as BuiltInIconName);

    // If aria-label is provided, icon is meaningful; otherwise it's decorative
    const isDecorative = !ariaLabel;

    return (
      <HugeiconsIcon
        ref={ref}
        icon={iconData}
        size={pixelSize}
        strokeWidth={strokeWidth}
        className={cn(
          iconVariants({ size, tone }),
          isLoader ? "animate-tatva-spin" : "",
          userClassName
        )}
        aria-hidden={isDecorative ? "true" : undefined}
        aria-label={ariaLabel}
        role={ariaLabel ? "img" : undefined}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants };
export default Icon;
