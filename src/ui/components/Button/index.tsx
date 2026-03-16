"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Icon, type IconName } from "../Icon";
import Text from "../Text";
import { Tooltip } from "../Tooltip";

// ============================================================================
// Button Styles
// ============================================================================

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-tatva-4 whitespace-nowrap rounded-tatva-full font-matter text-tatva-body-sm font-normal leading-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-black text-white hover:bg-gray-800 focus-visible:ring-gray-500 data-[state=open]:bg-gray-800",
        secondary:
          "bg-tatva-background-tertiary text-tatva-content-primary hover:bg-tatva-background-tertiary-hover focus-visible:ring-tatva-border-tertiary data-[state=open]:bg-tatva-background-tertiary-hover",
        destructive:
          "bg-tatva-danger-background text-tatva-danger-content hover:bg-tatva-danger-background-hover focus-visible:ring-tatva-danger-content/50 data-[state=open]:bg-tatva-danger-background-hover",
        success:
          "bg-tatva-positive-background text-tatva-positive-content hover:bg-tatva-positive-background/80 focus-visible:ring-tatva-positive-content/50 data-[state=open]:bg-tatva-positive-background/80",
        outline:
          "border border-tatva-border-primary bg-transparent text-tatva-content-primary hover:border-tatva-border-secondary focus-visible:ring-tatva-border-tertiary data-[state=open]:border-tatva-border-secondary",
        ghost:
          "text-tatva-content-primary hover:bg-tatva-background-secondary data-[state=open]:bg-tatva-background-secondary",
        inverse:
          "bg-tatva-background-primary text-tatva-content-primary focus-visible:ring-tatva-border-tertiary",
      },
      size: {
        sm: "min-h-tatva-14 px-tatva-6 text-tatva-body-sm",
        md: "min-h-tatva-18 px-tatva-8 text-tatva-body-sm",
        lg: "min-h-tatva-22 px-tatva-8 text-tatva-body-md",
      },
      width: {
        fit: "w-fit",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "fit",
    },
  }
);

// Strip `null` from CVA's VariantProps (CVA includes null, but React props should be undefined)
type ButtonVariants = {
  [K in keyof VariantProps<typeof buttonVariants>]: Exclude<
    VariantProps<typeof buttonVariants>[K],
    null
  >;
};

// ============================================================================
// Size mappings
// ============================================================================

/** Icon size mapping for button sizes */
const buttonIconSizeMap: Record<
  NonNullable<ButtonVariants["size"]>,
  NonNullable<Parameters<typeof Icon>[0]["size"]>
> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

/** Icon-only button size classes */
const iconOnlySizeMap: Record<NonNullable<ButtonVariants["size"]>, string> = {
  sm: "min-w-tatva-14 min-h-tatva-14 !px-tatva-0",
  md: "min-w-tatva-18 min-h-tatva-18 !px-tatva-0",
  lg: "min-w-tatva-22 min-h-tatva-22 !px-tatva-0",
};

// ============================================================================
// Types
// ============================================================================

interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "children"
    >,
    ButtonVariants {
  /** Shows a loading spinner and disables the button */
  isLoading?: boolean;
  /** Button text */
  children?: string;
  /** Icon name from the design system (e.g., 'plus', 'arrow-right', 'search') */
  icon?: IconName;
  /** Position of the icon relative to the button text */
  iconPosition?: "left" | "right";
  /** Tooltip content (renders tooltip on hover) */
  tooltip?: React.ReactNode;
  /** Button type - defaults to "button" */
  type?: "button" | "submit" | "reset";
  /** Additional CSS class names */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      width,
      icon,
      iconPosition = "left",
      isLoading,
      children,
      onClick,
      tooltip,
      type = "button",
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = React.useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading) return;
        await onClick?.(event);
      },
      [onClick, isLoading]
    );

    const textTone = React.useMemo(() => {
      return variant === "primary"
        ? "inverse"
        : variant === "destructive"
          ? "danger"
          : variant === "success"
            ? "positive"
            : "default";
    }, [variant]);

    const iconTone = React.useMemo(() => {
      return variant === "primary"
        ? "inverse"
        : variant === "destructive"
          ? "danger"
          : variant === "success"
            ? "success"
            : "primary";
    }, [variant]);

    const textVariant = React.useMemo(() => {
      return size === "lg" ? "body-md" : "body-sm";
    }, [size]);

    const isIconOnly = !!icon && !children;
    const iconSize = buttonIconSizeMap[size ?? "md"];

    // For icon-only buttons, use tooltip as aria-label for accessibility
    const ariaLabel =
      isIconOnly && tooltip && typeof tooltip === "string"
        ? tooltip
        : props["aria-label"];

    const renderContent = () => {
      // Loading with text: centered loader, invisible content to preserve width
      if (isLoading && children) {
        return (
          <>
            <span className="invisible flex items-center gap-tatva-4">
              {icon && iconPosition === "left" && (
                <Icon name={icon} size={iconSize} tone={iconTone} />
              )}
              {children && (
                <Text variant={textVariant} tone={textTone}>
                  {children}
                </Text>
              )}
              {icon && iconPosition === "right" && (
                <Icon name={icon} size={iconSize} tone={iconTone} />
              )}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Icon name="loader" size={iconSize} tone={iconTone} />
            </span>
          </>
        );
      }

      // Loading icon-only: just the loader
      if (isLoading) {
        return <Icon name="loader" size={iconSize} tone={iconTone} />;
      }

      // Normal state
      return (
        <>
          {icon && iconPosition === "left" && (
            <Icon name={icon} size={iconSize} tone={iconTone} />
          )}
          {children && (
            <Text variant={textVariant} tone={textTone}>
              {children}
            </Text>
          )}
          {icon && iconPosition === "right" && (
            <Icon name={icon} size={iconSize} tone={iconTone} />
          )}
        </>
      );
    };

    const isDisabled = isLoading || props.disabled;

    const buttonElement = (
      <button
        className={cn(
          buttonVariants({ variant, size, width }),
          isIconOnly ? iconOnlySizeMap[size ?? "md"] : "",
          isLoading ? "cursor-not-allowed opacity-70" : "",
          isLoading && children ? "relative" : "",
          props.disabled ? "cursor-not-allowed opacity-50" : "",
          className
        )}
        ref={ref}
        disabled={isDisabled}
        type={type}
        aria-label={ariaLabel}
        {...props}
        onClick={handleClick}
      >
        {renderContent()}
      </button>
    );

    if (tooltip) {
      // Wrap disabled buttons in a span so tooltip still works
      // (disabled elements don't fire pointer events)
      if (isDisabled) {
        return (
          <Tooltip content={tooltip}>
            <span className="inline-flex cursor-not-allowed">
              {buttonElement}
            </span>
          </Tooltip>
        );
      }
      return <Tooltip content={tooltip}>{buttonElement}</Tooltip>;
    }

    return buttonElement;
  }
);

Button.displayName = "Button";

// ============================================================================
// ButtonGroup Types
// ============================================================================

interface ButtonGroupItem {
  /** Unique value for this button */
  value: string;
  /** Button label text */
  label: string;
  /** Icon name from the design system */
  icon?: IconName;
  /** Whether this button is disabled */
  disabled?: boolean;
}

interface ButtonGroupProps {
  /** Array of button items */
  items: ButtonGroupItem[];
  /** Currently selected value */
  value?: string;
  /** Callback when a button is clicked */
  onValueChange?: (value: string) => void;
  /** Whether the group is disabled */
  disabled?: boolean;
}

// ============================================================================
// ButtonGroup Component
// ============================================================================

interface IndicatorStyle {
  left: number;
  width: number;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, value, onValueChange, disabled = false }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const [indicatorStyle, setIndicatorStyle] =
      React.useState<IndicatorStyle | null>(null);

    // Update indicator position when value changes
    React.useEffect(() => {
      if (!value || !containerRef.current) return;

      const activeButton = buttonRefs.current.get(value);
      if (!activeButton) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }, [value, items]);

    // Handle ref assignment for buttons
    const setButtonRef = React.useCallback(
      (itemValue: string) => (el: HTMLButtonElement | null) => {
        if (el) {
          buttonRefs.current.set(itemValue, el);
        } else {
          buttonRefs.current.delete(itemValue);
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
        role="group"
        className="relative inline-flex items-center gap-tatva-1 rounded-tatva-full bg-tatva-background-secondary p-tatva-2"
      >
        {/* Sliding indicator */}
        {indicatorStyle && (
          <div
            className="absolute rounded-tatva-full bg-tatva-background-primary transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: "calc(100% - 8px)",
              top: "4px",
            }}
          />
        )}
        {items.map((item) => {
          const isActive = value === item.value;
          const isDisabled = disabled || item.disabled;

          return (
            <span
              key={item.value}
              className="relative z-10 [&>button]:hover:bg-transparent"
            >
              <Button
                ref={setButtonRef(item.value)}
                variant="ghost"
                size="sm"
                icon={item.icon}
                disabled={isDisabled}
                onClick={() => onValueChange?.(item.value)}
                aria-pressed={isActive}
              >
                {item.label}
              </Button>
            </span>
          );
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonGroup, buttonVariants };
export type { ButtonGroupItem, ButtonGroupProps, ButtonProps, ButtonVariants };
export default Button;
