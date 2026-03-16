"use client";

import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import Text from "../components/Text";

// ============================================================================
// Styles
// ============================================================================

export const inputContainerVariants = cva(
  "flex items-center gap-tatva-6 rounded-tatva-md border bg-tatva-background-primary",
  {
    variants: {
      size: {
        md: "min-h-tatva-18 px-tatva-6",    /* 36px height, 12px padding */
        lg: "min-h-tatva-22 px-tatva-6",    /* 44px height, 12px padding */
        xl: "min-h-tatva-26 px-tatva-8",    /* 52px height, 16px padding */
      },
      variant: {
        default:
          "border-tatva-border hover:border-tatva-content-quaternary focus-within:border-tatva-content-tertiary",
        error:
          "border-tatva-danger-content",
        disabled:
          "border-tatva-border bg-tatva-background-secondary cursor-not-allowed opacity-50",
        readOnly:
          "border-tatva-border bg-tatva-background-secondary cursor-default",
      },
      multiSelect: {
        true: "flex-wrap min-h-auto py-tatva-4",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      multiSelect: false,
    },
  }
);

export type InputContainerVariants = VariantProps<typeof inputContainerVariants>;

// ============================================================================
// Types
// ============================================================================

export interface InputWrapperProps extends InputContainerVariants {
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  children?: React.ReactNode;
  showContainer?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function InputWrapper({
  label,
  error,
  helperText,
  disabled,
  readOnly,
  id,
  size,
  children,
  showContainer = true,
}: InputWrapperProps) {
  const variant = error
    ? "error"
    : disabled
    ? "disabled"
    : readOnly
    ? "readOnly"
    : "default";

  return (
    <div className="flex w-full flex-col gap-tatva-4">
      {label && (
        <label htmlFor={id}>
          <Text variant="label-md" tone="secondary">
            {label}
          </Text>
        </label>
      )}
      {showContainer ? (
        <div className={cn(inputContainerVariants({ size, variant }))}>
          {children}
        </div>
      ) : (
        children
      )}
      {(error || helperText) && (
        <Text
          variant="body-sm"
          tone={error ? "danger" : "tertiary"}
        >
          {error || helperText}
        </Text>
      )}
    </div>
  );
}

export default InputWrapper;
