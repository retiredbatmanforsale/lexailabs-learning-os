"use client";

import { cn } from "../../lib/utils";
import * as React from "react";
import Icon from "../Icon";
import { Text } from "../Text";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "type" | "size"
> {
  label?: string;
  /** "single" = check icon, "select-all" = minus icon */
  variant?: "single" | "select-all";
  /** Checkbox size - sm (16px) or md (20px) */
  size?: "sm" | "md";
}

const sizeConfig = {
  sm: {
    box: "size-tatva-8",
    icon: "xxs" as const,
  },
  md: {
    box: "size-tatva-10",
    icon: "xs" as const,
  },
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      id,
      disabled,
      checked,
      defaultChecked,
      variant = "single",
      size = "md",
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId();
    const internalRef = React.useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked ?? false
    );

    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "inline-flex select-none items-center gap-tatva-4",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <span className={cn(sizeConfig[size].box, "relative shrink-0")}>
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            className="absolute m-tatva-0 size-full cursor-pointer opacity-0"
            {...props}
          />
          <span
            className={cn(
              "flex size-full items-center justify-center rounded-tatva-xs border-2 transition-all duration-150 active:scale-90",
              isChecked
                ? "border-tatva-brand-content-primary bg-tatva-brand-content-primary"
                : "border-tatva-border-primary hover:border-tatva-border-secondary"
            )}
          >
            <span
              className={cn(
                "inline-flex transition-all duration-150",
                isChecked ? "scale-100 opacity-100" : "scale-50 opacity-0"
              )}
            >
              <Icon
                name={variant === "select-all" ? "minus" : "check"}
                size={sizeConfig[size].icon}
                tone="inverse"
              />
            </span>
          </span>
        </span>
        {label && (
          <Text
            variant="label-md"
            as="label"
            htmlFor={checkboxId}
            tone="secondary"
          >
            {label}
          </Text>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export default Checkbox;
