"use client";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Badge, type BadgeProps } from "../Badge";
import { Icon, type IconName } from "../Icon";
import { Text } from "../Text";

const tabsListVariants = cva("relative inline-flex items-center", {
  variants: {
    width: {
      growing: "w-full",
      fixed: "w-full",
    },
  },
  defaultVariants: {
    width: "growing",
  },
});

const tabsTriggerVariants = cva(
  "relative flex select-none flex-col items-center justify-center overflow-hidden transition-colors",
  {
    variants: {
      active: {
        true: "",
        false: "",
      },
      disabled: {
        true: "!cursor-not-allowed !opacity-50",
        false: "cursor-pointer",
      },
      width: {
        growing: "shrink-0",
        fixed: "min-w-tatva-0 flex-1",
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
      width: "growing",
    },
  }
);

interface IndicatorStyle {
  left: number;
  width: number;
}

export interface TabBadge {
  /** Badge type */
  type: BadgeProps["type"];
  /** Value to display inside the badge */
  value: React.ReactNode;
}

export interface TabItem {
  /** Unique value for the tab */
  value: string;
  /** Tab label */
  label: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  icon?: IconName;
  /** Badge configuration */
  badge?: TabBadge;
}

// Strip `null` from CVA's VariantProps (CVA includes null, but React props should be undefined)
type TabsVariants = {
  [K in keyof VariantProps<typeof tabsListVariants>]: Exclude<
    VariantProps<typeof tabsListVariants>[K],
    null
  >;
};

export interface TabsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "onChange">,
    TabsVariants {
  /** Tab items */
  tabs: TabItem[];
  /** Currently selected value */
  value?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, value, onValueChange, width = "growing", ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const [indicatorStyle, setIndicatorStyle] =
      React.useState<IndicatorStyle | null>(null);

    // Update indicator position when value changes or on mount
    React.useEffect(() => {
      if (!value || !containerRef.current) return;

      const activeTab = tabRefs.current.get(value);
      if (!activeTab) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }, [value, tabs]);

    // Handle ref assignment
    const setTabRef = React.useCallback(
      (value: string) => (el: HTMLButtonElement | null) => {
        if (el) {
          tabRefs.current.set(value, el);
        } else {
          tabRefs.current.delete(value);
        }
      },
      []
    );

    // Merge refs for the container
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (
          containerRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div
        ref={mergedRef}
        role="tablist"
        className={tabsListVariants({ width })}
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === value;

          return (
            <button
              key={tab.value}
              ref={setTabRef(tab.value)}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => {
                if (!tab.disabled && onValueChange) {
                  onValueChange(tab.value);
                }
              }}
              className={cn(
                tabsTriggerVariants({
                  active: isActive,
                  disabled: tab.disabled,
                  width,
                }),
                !isActive && !tab.disabled ? "group" : undefined
              )}
            >
              {/* Content Frame */}
              <div className="flex items-center gap-tatva-4 px-tatva-6 pb-tatva-6 pt-tatva-0">
                <div className="flex items-center gap-tatva-4">
                  {tab.icon && (
                    <span
                      className={
                        !isActive && !tab.disabled
                          ? "group-hover:[&_svg]:!text-tatva-content-primary"
                          : undefined
                      }
                    >
                      <Icon
                        name={tab.icon}
                        size="md"
                        tone={isActive ? "primary" : "secondary"}
                      />
                    </span>
                  )}
                  {typeof tab.label === "string" ? (
                    <span
                      className={
                        !isActive && !tab.disabled
                          ? "group-hover:[&_*]:!text-tatva-content-primary"
                          : undefined
                      }
                    >
                      <Text
                        variant="body-md"
                        tone={isActive ? "default" : "secondary"}
                      >
                        {tab.label}
                      </Text>
                    </span>
                  ) : (
                    tab.label
                  )}
                  {tab.badge && (
                    <Badge type={tab.badge.type} variant="brand" size="sm">
                      {tab.badge.value}
                    </Badge>
                  )}
                </div>
              </div>
              {/* Static border for inactive tabs */}
              <div className="h-tatva-1 w-full bg-tatva-border-secondary" />
            </button>
          );
        })}
        {/* Sliding active indicator */}
        {indicatorStyle && (
          <div
            className="absolute bottom-0 h-tatva-1 bg-tatva-brand-content-primary transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        )}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export { Tabs, tabsListVariants, tabsTriggerVariants };
export default Tabs;
