"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

import Icon from "../Icon";
import type { KeyValueGroupProps, KeyValueProps } from "./types";

export type { KeyValueGroupProps, KeyValueProps };

// ============================================================================
// KeyValue Variants
// ============================================================================

const keyValueVariants = cva("font-matter", {
  variants: {
    direction: {
      horizontal: "flex items-center",
      vertical: "flex flex-col",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    direction: "vertical",
    align: "start",
  },
});

const keyValueLabelVariants = cva(
  "inline-flex shrink-0 items-center gap-tatva-2",
  {
    variants: {
      direction: {
        horizontal: "",
        vertical: "mb-tatva-2",
      },
    },
    defaultVariants: {
      direction: "vertical",
    },
  }
);

const keyValueValueVariants = cva("", {
  variants: {
    direction: {
      horizontal: "",
      vertical: "",
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

// ============================================================================
// KeyValueGroup Variants
// ============================================================================

const keyValueGroupVariants = cva("font-matter", {
  variants: {
    direction: {
      horizontal: "flex flex-wrap items-start",
      vertical: "flex flex-col",
    },
    gap: {
      xs: "gap-tatva-2",
      sm: "gap-tatva-4",
      md: "gap-tatva-8",
      lg: "gap-tatva-12",
      xl: "gap-tatva-16",
    },
    columns: {
      1: "grid grid-cols-1",
      2: "grid grid-cols-2",
      3: "grid grid-cols-3",
      4: "grid grid-cols-4",
    },
  },
  defaultVariants: {
    direction: "vertical",
    gap: "md",
  },
});

// Strip `null` from CVA's VariantProps
type KeyValueVariants = {
  [K in keyof VariantProps<typeof keyValueVariants>]: Exclude<
    VariantProps<typeof keyValueVariants>[K],
    null
  >;
};

type KeyValueGroupVariants = {
  [K in keyof VariantProps<typeof keyValueGroupVariants>]: Exclude<
    VariantProps<typeof keyValueGroupVariants>[K],
    null
  >;
};

// ============================================================================
// KeyValue Component
// ============================================================================

export interface KeyValueComponentProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className">,
    KeyValueProps,
    KeyValueVariants {}

const KeyValue = React.forwardRef<HTMLDivElement, KeyValueComponentProps>(
  (
    {
      label,
      tooltip,
      value,
      direction = "vertical",
      align = "start",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={keyValueVariants({ direction, align })}
        {...props}
      >
        {/* Label with optional tooltip */}
        <div className={keyValueLabelVariants({ direction })}>
          <Text variant="body-sm" tone="tertiary">
            {label}
          </Text>
          {tooltip && (
            <Tooltip content={tooltip}>
              <span className="inline-flex cursor-pointer">
                <Icon name="info" size="sm" tone="secondary" />
              </span>
            </Tooltip>
          )}
        </div>

        {/* Value */}
        <div className={keyValueValueVariants({ direction })}>
          {typeof value === "string" || typeof value === "number" ? (
            <Text variant="body-sm">{value}</Text>
          ) : (
            value
          )}
        </div>
      </div>
    );
  }
);

KeyValue.displayName = "KeyValue";

// ============================================================================
// KeyValueGroup Component
// ============================================================================

export interface KeyValueGroupComponentProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">,
    KeyValueGroupProps,
    KeyValueGroupVariants {
  /** KeyValue items to display */
  children: React.ReactNode;
}

const KeyValueGroup = React.forwardRef<
  HTMLDivElement,
  KeyValueGroupComponentProps
>(
  (
    {
      children,
      direction = "vertical",
      columns,
      gap = "md",
      dividers = false,
      ...props
    },
    ref
  ) => {
    // If columns is specified, use grid layout
    const useGrid = columns !== undefined;

    const childArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={
          useGrid
            ? keyValueGroupVariants({ columns, gap })
            : keyValueGroupVariants({ direction, gap })
        }
        {...props}
      >
        {dividers && !useGrid
          ? childArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childArray.length - 1 && (
                  <hr className="border-tatva-border" />
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);

KeyValueGroup.displayName = "KeyValueGroup";

// ============================================================================
// Exports
// ============================================================================

export {
  KeyValue,
  KeyValueGroup,
  keyValueGroupVariants,
  keyValueLabelVariants,
  keyValueValueVariants,
  keyValueVariants,
};
export default KeyValue;
