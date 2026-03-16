"use client";

import { cn } from "../../lib/utils";
import * as React from "react";
import { Text } from "../Text";

const TEXTAREA_BASE =
  "font-matter min-h-tatva-20 w-full px-tatva-6 py-tatva-4 rounded-tatva-sm border bg-transparent text-tatva-body-md text-tatva-content-primary placeholder:text-tatva-content-tertiary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const TEXTAREA_DEFAULT =
  "border-tatva-border-secondary hover:border-tatva-border-primary focus-visible:border-tatva-border-tertiary focus-visible:hover:border-tatva-border-tertiary";

const TEXTAREA_ERROR =
  "border-tatva-danger-content hover:border-tatva-danger-content focus-visible:border-tatva-danger-content";

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, id, disabled, resize = true, ...props },
    ref
  ) => {
    const dynamicId = React.useId();
    const textareaId = id || dynamicId;
    const hasWrapper = label || error || helperText;
    const bottomText = error || helperText;

    const textareaElement = (
      <textarea
        id={textareaId}
        className={cn(
          TEXTAREA_BASE,
          error ? TEXTAREA_ERROR : TEXTAREA_DEFAULT,
          resize ? "resize-y" : "resize-none"
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );

    if (!hasWrapper) return textareaElement;

    return (
      <div className="flex w-full flex-col gap-tatva-2">
        {label && (
          <span
            className={cn(
              "mb-tatva-2 inline-flex px-tatva-2",
              disabled ? "opacity-50" : ""
            )}
          >
            <Text
              as="label"
              htmlFor={textareaId}
              variant="label-md"
              tone="secondary"
            >
              {label}
            </Text>
          </span>
        )}
        {textareaElement}
        {bottomText && (
          <span
            className={cn(
              "inline-flex px-tatva-2",
              disabled ? "opacity-50" : ""
            )}
          >
            <Text
              as="span"
              variant="label-sm"
              tone={error ? "danger" : "quaternary"}
            >
              {bottomText}
            </Text>
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
