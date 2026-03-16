"use client";

import { cn } from "../../lib/utils";
import * as React from "react";
import { Text } from "../Text";

// ============================================================================
// RadioGroup Context
// ============================================================================

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
);

const useRadioGroup = () => {
  return React.useContext(RadioGroupContext);
};

// ============================================================================
// RadioGroup Component
// ============================================================================

export interface RadioGroupProps {
  /** Group name for form submission */
  name?: string;
  /** Controlled value */
  value?: string;
  /** Initial value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onValueChange?: (value: string) => void;
  /** Disables all radios in the group */
  disabled?: boolean;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Gap between radio items */
  gap?: "sm" | "md" | "lg";
  /** Radio items */
  children: React.ReactNode;
}

const gapClasses = {
  sm: "gap-tatva-4",
  md: "gap-tatva-6",
  lg: "gap-tatva-8",
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      direction = "vertical",
      gap = "md",
      children,
    },
    ref
  ) => {
    const generatedName = React.useId();
    const groupName = name || generatedName;

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name: groupName,
          value: currentValue,
          onChange: handleChange,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn(
            "flex",
            direction === "horizontal" ? "flex-row" : "flex-col",
            gapClasses[gap]
          )}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// ============================================================================
// Radio Component
// ============================================================================

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "type" | "onChange"
> {
  /** Radio value */
  value: string;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { value, label, description, id, disabled: itemDisabled, ...props },
    ref
  ) => {
    const dynamicId = React.useId();
    const radioId = id ?? dynamicId;
    const group = useRadioGroup();

    const isDisabled = itemDisabled || group?.disabled;
    const isChecked = group ? group.value === value : false;
    const name = group?.name;

    const handleChange = () => {
      if (!isDisabled) {
        group?.onChange?.(value);
      }
    };

    return (
      <label
        htmlFor={radioId}
        className={cn(
          "inline-flex select-none items-start gap-tatva-4",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <span className="relative mt-tatva-1 size-tatva-8 shrink-0">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            // eslint-disable-next-line tailwindcss/no-arbitrary-value
            className="absolute m-tatva-0 size-full cursor-[inherit] opacity-0" // TODO: Fix this
            {...props}
          />
          <span
            className={cn(
              "flex size-full items-center justify-center rounded-tatva-full transition-all duration-150",
              isChecked
                ? "border border-tatva-brand-content-primary"
                : "border border-tatva-border-tertiary"
            )}
          >
            {isChecked && (
              <span className="size-tatva-6 rounded-tatva-full bg-tatva-brand-content-primary" />
            )}
          </span>
        </span>
        {(label || description) && (
          <div className="flex flex-col gap-tatva-1">
            {label && (
              <Text
                variant="label-md"
                as="label"
                htmlFor={radioId}
                tone="secondary"
              >
                {label}
              </Text>
            )}
            {description && (
              <Text variant="body-sm" tone="tertiary">
                {description}
              </Text>
            )}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

// ============================================================================
// Exports
// ============================================================================

export { Radio, RadioGroup, useRadioGroup };
export default Radio;
