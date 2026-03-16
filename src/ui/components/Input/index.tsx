"use client";

import { cn } from "../../lib/utils";
import {
  InputWrapper,
  inputContainerVariants,
  type InputContainerVariants,
} from "../../primitives/InputWrapper";
import * as React from "react";
import Icon, { IconName } from "../Icon";
import Text from "../Text";

// ============================================================================
// Types
// ============================================================================

export interface InputProps
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "className" | "prefix" | "size" | "variant"
    >,
    Omit<InputContainerVariants, "variant"> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: IconName;
  prefix?: string;
}

// ============================================================================
// Styles
// ============================================================================

const INPUT_CLASSES =
  "font-matter flex-1 min-w-tatva-0 bg-transparent text-tatva-body-md text-tatva-content-primary placeholder:text-tatva-content-tertiary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const NUMBER_INPUT_CLASSES =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const SEARCH_INPUT_CLASSES =
  "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none";

const sizeToIconSizeMap = {
  md: "xs",
  lg: "sm",
  xl: "md",
} as const;

// ============================================================================
// Component
// ============================================================================

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      id,
      icon,
      prefix,
      type,
      size = "md",
      disabled,
      readOnly,
      step = 1,
      min,
      max,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const dynamicId = React.useId();
    const inputId = id ?? dynamicId;
    const internalRef = React.useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ""
    );
    const currentValue = value !== undefined ? value : internalValue;

    const [showPassword, setShowPassword] = React.useState(false);

    const isNumberType = type === "number";
    const isSearchType = type === "search";
    const isPasswordType = type === "password";
    const isTelType = type === "tel";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // For tel type, only allow valid phone number characters
      if (isTelType) {
        // Allow numbers, spaces, hyphens, parentheses, plus sign, and dots
        newValue = newValue.replace(/[^0-9\s\-()+.]/g, "");

        // Update the input value if it was modified
        if (newValue !== e.target.value) {
          e.target.value = newValue;
        }
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (disabled || !inputRef.current) return;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, "");
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      if (value === undefined) {
        setInternalValue("");
      }
      inputRef.current.focus();
    };

    const handleIncrement = () => {
      if (disabled || !inputRef.current) return;
      inputRef.current.stepUp();
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const handleDecrement = () => {
      if (disabled || !inputRef.current) return;
      inputRef.current.stepDown();
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const iconSize = sizeToIconSizeMap[size as keyof typeof sizeToIconSizeMap];

    return (
      <InputWrapper
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        readOnly={readOnly}
        id={inputId}
        size={size}
      >
        {prefix && (
          <div className="-ml-tatva-6 flex h-full shrink-0 items-center pl-tatva-6 text-tatva-body-md text-tatva-content-tertiary">
            <Text variant="body-md" tone="tertiary">
              {prefix}
            </Text>
          </div>
        )}
        {icon && (
          <Icon
            name={icon}
            size={iconSize as NonNullable<Parameters<typeof Icon>[0]["size"]>}
            tone="secondary"
          />
        )}
        <input
          type={isPasswordType ? (showPassword ? "text" : "password") : type}
          id={inputId}
          ref={inputRef}
          className={cn(
            INPUT_CLASSES,
            isNumberType ? NUMBER_INPUT_CLASSES : "",
            isSearchType ? SEARCH_INPUT_CLASSES : ""
          )}
          disabled={disabled}
          readOnly={readOnly}
          step={step}
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />
        {isPasswordType && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex items-center justify-center text-tatva-content-tertiary hover:text-tatva-content-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name={showPassword ? "eye-off" : "eye"} size={iconSize} />
          </button>
        )}
        {isSearchType && currentValue && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleClear}
            disabled={disabled}
            className="flex items-center justify-center text-tatva-content-tertiary hover:text-tatva-content-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="close" size="xs" />
          </button>
        )}
        {isNumberType && (
          <div className="flex flex-col">
            <button
              type="button"
              tabIndex={-1}
              onClick={handleIncrement}
              disabled={disabled}
              className="flex h-tatva-4 w-tatva-6 items-center justify-center text-tatva-content-tertiary hover:text-tatva-content-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="chevron-up" size="xs" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={handleDecrement}
              disabled={disabled}
              className="flex h-tatva-4 w-tatva-6 items-center justify-center text-tatva-content-tertiary hover:text-tatva-content-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="chevron-down" size="xs" />
            </button>
          </div>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";

export default Input;
export { Input, inputContainerVariants };
