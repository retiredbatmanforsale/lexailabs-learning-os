"use client";

import { cva } from "class-variance-authority";
import * as React from "react";
import { Text } from "../Text";

const switchVariants = cva(
  "inline-flex w-tatva-20 shrink-0 items-center rounded-tatva-full border-none p-tatva-2 transition-all duration-200 ease-in-out active:scale-95",
  {
    variants: {
      checked: {
        true: "bg-tatva-brand-content-primary",
        false: "bg-tatva-background-secondary",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

const thumbVariants = cva(
  "size-tatva-8 rounded-tatva-full bg-tatva-background-primary shadow-tatva-l2 transition-all duration-200 ease-out",
  {
    variants: {
      checked: {
        true: "translate-x-full",
        false: "translate-x-tatva-0",
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  name?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      label,
      name,
    },
    ref
  ) => {
    const switchId = React.useId();
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);

    // Controlled vs uncontrolled
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleClick = () => {
      if (disabled) return;

      const newChecked = !isChecked;

      // Update internal state for uncontrolled mode
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
    };

    const switchButton = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={label ? `${switchId}-label` : undefined}
        id={switchId}
        disabled={disabled}
        onClick={handleClick}
        data-state={isChecked ? "checked" : "unchecked"}
        className={switchVariants({ checked: isChecked, disabled })}
      >
        {/* Thumb */}
        <span
          data-state={isChecked ? "checked" : "unchecked"}
          className={thumbVariants({ checked: isChecked })}
        />
        {/* Hidden input for form submission */}
        {name && (
          <input type="hidden" name={name} value={isChecked ? "on" : "off"} />
        )}
      </button>
    );

    if (label) {
      return (
        <div className="flex items-center gap-tatva-4">
          <label
            id={`${switchId}-label`}
            htmlFor={switchId}
            className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
          >
            <Text
              variant="label-md"
              as="label"
              htmlFor={switchId}
              tone="secondary"
            >
              {label}
            </Text>
          </label>
          {switchButton}
        </div>
      );
    }

    return switchButton;
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants };
export default Switch;
