"use client";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Icon, type IconName } from "../Icon";

const tagVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-tatva-full font-matter outline-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-tatva-background-secondary text-tatva-content-primary hover:bg-tatva-background-tertiary",
        brand:
          "bg-tatva-brand-primary text-tatva-brand-content-primary hover:bg-tatva-brand-secondary",
        indigo:
          "bg-tatva-indigo-100 text-tatva-indigo-800 hover:bg-tatva-indigo-200",
        orange:
          "bg-tatva-orange-100 text-tatva-orange-800 hover:bg-tatva-orange-200",
        green:
          "bg-tatva-green-100 text-tatva-green-800 hover:bg-tatva-green-200",
        pink: "bg-tatva-pink-100 text-tatva-pink-800 hover:bg-tatva-pink-200",
        red: "bg-tatva-red-100 text-tatva-red-800 hover:bg-tatva-red-200",
        yellow:
          "bg-tatva-yellow-100 text-tatva-yellow-800 hover:bg-tatva-yellow-200",
      },
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    compoundVariants: [
      // Selected states override hover
      {
        variant: "default",
        selected: true,
        class:
          "bg-tatva-background-tertiary hover:bg-tatva-background-tertiary",
      },
      {
        variant: "brand",
        selected: true,
        class: "bg-tatva-brand-secondary hover:bg-tatva-brand-secondary",
      },
      {
        variant: "indigo",
        selected: true,
        class: "bg-tatva-indigo-200 hover:bg-tatva-indigo-200",
      },
      {
        variant: "orange",
        selected: true,
        class: "bg-tatva-orange-200 hover:bg-tatva-orange-200",
      },
      {
        variant: "green",
        selected: true,
        class: "bg-tatva-green-200 hover:bg-tatva-green-200",
      },
      {
        variant: "pink",
        selected: true,
        class: "bg-tatva-pink-200 hover:bg-tatva-pink-200",
      },
      {
        variant: "red",
        selected: true,
        class: "bg-tatva-red-200 hover:bg-tatva-red-200",
      },
      {
        variant: "yellow",
        selected: true,
        class: "bg-tatva-yellow-200 hover:bg-tatva-yellow-200",
      },
    ],
    defaultVariants: {
      variant: "default",
      selected: false,
      disabled: false,
    },
  }
);

/** Tag sizes */
const tagSizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "h-tatva-10 px-tatva-4 gap-tatva-2 text-tatva-body-xs", // icon 12x12, body-xs, padding 8x4px, height 20px
  md: "h-tatva-12 px-tatva-4 gap-tatva-2 text-tatva-body-xs", // icon 14x14, body-xs, padding 8x4px, height 24px
  lg: "h-tatva-14 px-tatva-4 gap-tatva-2 text-tatva-body-sm", // icon 16x16, body-sm, padding 8x4px, height 28px
};

/** Icon-only tag sizes - width equals height (square) */
const iconOnlySizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "w-tatva-10 h-tatva-10 p-tatva-0", // 20x20px square
  md: "w-tatva-12 h-tatva-12 p-tatva-0", // 24x24px square
  lg: "w-tatva-14 h-tatva-14 p-tatva-0", // 28x28px square
};

/** Icon size mapping for tag sizes */
const tagIconSizeMap: Record<
  "sm" | "md" | "lg",
  NonNullable<Parameters<typeof Icon>[0]["size"]>
> = {
  sm: "xxs", // 12px
  md: "xs", // 14px
  lg: "sm", // 16px
};

export interface TagProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    Omit<VariantProps<typeof tagVariants>, "selected" | "disabled"> {
  /** Tag size */
  size?: "sm" | "md" | "lg";
  /** Icon name from the design system */
  icon?: IconName;
  /** Tag content (text) */
  children?: React.ReactNode;
  /** Whether the tag is selected */
  selected?: boolean;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Click handler (enables interactive mode) */
  onClick?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = "default",
      size = "md",
      icon,
      children,
      selected,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const iconSize = tagIconSizeMap[size ?? "md"];

    const isInteractive = !!onClick && !disabled;
    const isIconOnly = !!icon && !children;

    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({
            variant,
            selected: selected ?? false,
            disabled: disabled ?? false,
          }),
          isIconOnly ? iconOnlySizeStyles[size] : tagSizeStyles[size],
          isInteractive
            ? "focus:ring-tatva-border-focus cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1"
            : undefined
        )}
        onClick={isInteractive ? onClick : undefined}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {icon && <Icon name={icon} size={iconSize} />}
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
export default Tag;
