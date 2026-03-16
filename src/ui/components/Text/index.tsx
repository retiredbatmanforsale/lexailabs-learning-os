/* eslint-disable tailwindcss/no-arbitrary-value */
/* eslint-disable tailwindcss/no-contradicting-classname */
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Tooltip, TooltipProps } from "../Tooltip";

const textVariants = cva("cursor-[inherit]", {
  variants: {
    variant: {
      "display-sm":
        "font-season text-tatva-display-sm font-[500] leading-[120%]",
      "heading-lg":
        "font-season text-tatva-heading-lg font-[500] leading-[120%]",
      "heading-md":
        "font-season text-tatva-heading-md font-[500] leading-[120%]",
      "heading-sm":
        "font-matter text-tatva-heading-sm font-[500] leading-[120%]",
      "heading-xs":
        "font-season text-tatva-heading-xs font-[420] leading-[120%]",
      "body-xl": "font-matter text-tatva-heading-lg font-[400] leading-[145%]",
      "body-lg": "font-matter text-tatva-body-lg font-[400] leading-[145%]",
      "body-md": "font-matter text-tatva-body-md font-[400] leading-[145%]",
      "body-sm": "font-matter text-tatva-body-sm font-[400] leading-[150%]",
      "body-xs": "font-matter text-tatva-body-xs font-[400] leading-[150%]",
      "label-md": "font-matter text-tatva-label-md font-[450] leading-[120%]",
      "label-sm": "font-matter text-tatva-label-sm font-[400] leading-[120%]",
    },
    tone: {
      default: "text-tatva-content-primary",
      secondary: "text-tatva-content-secondary",
      tertiary: "text-tatva-content-tertiary",
      quaternary: "text-tatva-content-quaternary",
      inverse: "text-white",
      // Brand colors
      brand: "text-tatva-brand-content-primary",
      "brand-secondary": "text-tatva-brand-content-secondary",
      // Semantic colors
      positive: "text-tatva-positive-content",
      warning: "text-tatva-warning-content",
      danger: "text-tatva-danger-content",
    },
  },
  defaultVariants: {
    variant: "body-md",
    tone: "default",
  },
});

type VariantType = NonNullable<VariantProps<typeof textVariants>["variant"]>;
type ToneType = NonNullable<VariantProps<typeof textVariants>["tone"]>;

type TextElement =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "div"
  | "label"
  | "pre";

const defaultElementMap: Record<VariantType, TextElement> = {
  "display-sm": "h1",
  "heading-lg": "h1",
  "heading-md": "h2",
  "heading-sm": "h3",
  "heading-xs": "h4",
  "body-xl": "p",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  "body-xs": "span",
  "label-md": "label",
  "label-sm": "label",
};

// Line clamp classes (Tailwind's line-clamp-*)
const lineClampClasses: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

// Polymorphic props - automatically includes correct attributes based on `as` prop
type TextProps<E extends TextElement = "span"> = {
  as?: E;
  /** Format number children to Indian locale (e.g., 1,23,456) */
  format?: boolean;
  /** Number of lines to clamp text to. Shows full text in tooltip when truncated. */
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Tooltip position */
  tooltipPosition?: TooltipProps["side"];
  /** Additional CSS class name */
  className?: string;
} & VariantProps<typeof textVariants> &
  Omit<React.ComponentPropsWithoutRef<E>, "as" | "className">;

const formatToIndianLocale = (value: React.ReactNode): React.ReactNode => {
  if (typeof value === "number") {
    return value.toLocaleString("en-IN");
  }
  return value;
};

const Text = React.forwardRef(function TextComponent<
  E extends TextElement = "span",
>(
  {
    variant = "body-md",
    tone = "default",
    as,
    format = true,
    lineClamp,
    tooltipPosition = "top",
    className: userClassName,
    children,
    ...props
  }: TextProps<E>,
  ref: React.Ref<HTMLElement>
) {
  const selectedVariant = variant ?? "body-md";
  const selectedTone = tone ?? "default";
  const Component = (as ||
    defaultElementMap[selectedVariant]) as React.ElementType;

  const internalRef = React.useRef<HTMLElement>(null);
  const [isTruncated, setIsTruncated] = React.useState(false);

  // Check if text is actually truncated
  React.useEffect(() => {
    const element = internalRef.current;
    if (!element || !lineClamp) return;

    // SSR guard - ResizeObserver doesn't exist on server
    if (typeof window === "undefined" || !("ResizeObserver" in window)) {
      // Fallback: just check once without resize observation
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setIsTruncated(isOverflowing);
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;

    const checkTruncation = () => {
      // Only check if element has valid dimensions
      if (element.clientWidth === 0 || element.clientHeight === 0) {
        return;
      }

      const isOverflowing = element.scrollHeight > element.clientHeight;
      setIsTruncated(isOverflowing);
    };

    // Initial check with delay to ensure layout is complete
    timeoutId = setTimeout(() => {
      checkTruncation();
    }, 100);

    // Create ResizeObserver to handle container size changes
    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize checks - only check if element has dimensions
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkTruncation();
      }, 50);
    });
    resizeObserver.observe(element);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [children, lineClamp]);

  // Merge refs
  const mergedRef = React.useCallback(
    (node: HTMLElement | null) => {
      (internalRef as React.MutableRefObject<HTMLElement | null>).current =
        node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [ref]
  );

  const baseClassName = textVariants({
    variant: selectedVariant,
    tone: selectedTone,
  });

  const className = [
    baseClassName,
    lineClamp ? lineClampClasses[lineClamp] : undefined,
    userClassName,
  ].filter(Boolean).join(" ");

  const textElement = (
    <Component ref={mergedRef} className={className} {...props}>
      {format ? formatToIndianLocale(children) : children}
    </Component>
  );

  // Wrap in tooltip if truncated
  if (lineClamp && isTruncated) {
    return (
      <Tooltip content={children} side={tooltipPosition}>
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
}) as <E extends TextElement = "span">(
  props: TextProps<E> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;

(Text as React.FC).displayName = "Text";

export { Text, textVariants };
export type { TextProps, ToneType as TextTone, VariantType as TextVariant };
export default Text;
