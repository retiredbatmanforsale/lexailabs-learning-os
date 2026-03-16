"use client";

import { InputWrapper } from "../../primitives/InputWrapper";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Chip } from "../Chip";
import { BadgeProps } from "../Badge";

const tagInputContainerVariants = cva(
  [
    "flex w-full flex-wrap items-center border bg-tatva-background-primary font-matter transition-all",
    "border-tatva-border-secondary",
    "hover:border-tatva-border-primary",
    "focus-within:border-tatva-border-tertiary focus-within:hover:border-tatva-border-tertiary",
  ],
  {
    variants: {
      size: {
        md: "min-h-tatva-18 gap-tatva-2 px-tatva-6",
        lg: "min-h-tatva-22 gap-tatva-2 px-tatva-8",
        xl: "min-h-tatva-26 gap-tatva-3 px-tatva-10",
      },
      error: {
        true: "border-tatva-danger-content focus-within:border-tatva-danger-content hover:border-tatva-danger-content",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:border-tatva-border-secondary",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
      disabled: false,
    },
  }
);

export interface TagInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "value" | "onChange" | "size"
> {
  /** Current tags */
  value?: string[];
  /** Called when tags change */
  onChange?: (tags: string[]) => void;
  /** Label above the input */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Input size */
  size?: "md" | "lg" | "xl";
  /** Maximum number of tags allowed */
  maxTags?: number;
  /** Allow duplicate tags */
  allowDuplicates?: boolean;
  /** Custom validation function for tags */
  validateTag?: (tag: string) => boolean | string;
  /** Badge variant for tags */
  tagVariant?: BadgeProps["variant"];
  /** Delimiter keys to add tag (default: Enter, comma) */
  delimiters?: string[];
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value = [],
      onChange,
      label,
      error,
      helperText,
      size = "md",
      id,
      disabled,
      placeholder = "Type and press Enter",
      maxTags,
      allowDuplicates = false,
      validateTag,
      tagVariant = "default",
      delimiters = ["Enter", ","],
      ...props
    },
    ref
  ) => {
    const dynamicId = React.useId();
    const inputId = id || dynamicId;
    const [inputValue, setInputValue] = React.useState("");
    const [validationError, setValidationError] = React.useState<string | null>(
      null
    );
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = React.useState(false);

    // Merge refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Detect if container has wrapped to multiple lines
    React.useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      if (typeof window === "undefined" || !("ResizeObserver" in window)) {
        return;
      }

      const checkExpanded = () => {
        // Get the min-height value and compare with actual height
        const style = getComputedStyle(container);
        const minHeight = parseFloat(style.minHeight) || 0;
        const actualHeight = container.offsetHeight;
        setIsExpanded(actualHeight > minHeight + 4); // 4px threshold for rounding
      };

      checkExpanded();

      const resizeObserver = new ResizeObserver(checkExpanded);
      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    }, [value.length]);

    const displayError = error || validationError;

    const addTag = React.useCallback(
      (tag: string) => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;

        // Check max tags
        if (maxTags && value.length >= maxTags) {
          setValidationError(`Maximum ${maxTags} tags allowed`);
          return;
        }

        // Check duplicates
        if (!allowDuplicates && value.includes(trimmedTag)) {
          setValidationError("Tag already exists");
          return;
        }

        // Custom validation
        if (validateTag) {
          const result = validateTag(trimmedTag);
          if (result !== true) {
            setValidationError(
              typeof result === "string" ? result : "Invalid tag"
            );
            return;
          }
        }

        setValidationError(null);
        onChange?.([...value, trimmedTag]);
        setInputValue("");
      },
      [value, onChange, maxTags, allowDuplicates, validateTag]
    );

    const removeTag = React.useCallback(
      (index: number) => {
        if (disabled) return;
        const newTags = value.filter((_, i) => i !== index);
        onChange?.(newTags);
        setValidationError(null);
      },
      [value, onChange, disabled]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Add tag on delimiter key
        if (delimiters.includes(e.key)) {
          e.preventDefault();
          addTag(inputValue);
          return;
        }

        // Remove last tag on Backspace when input is empty
        if (e.key === "Backspace" && !inputValue && value.length > 0) {
          removeTag(value.length - 1);
        }
      },
      [delimiters, inputValue, addTag, value.length, removeTag]
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData("text");
        // Check if pasted text contains delimiters (comma or newline)
        if (pastedText.includes(",") || pastedText.includes("\n")) {
          e.preventDefault();
          const tags = pastedText
            .split(/[,\n]/)
            .map((t) => t.trim())
            .filter(Boolean);
          tags.forEach((tag) => addTag(tag));
        }
      },
      [addTag]
    );

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    return (
      <InputWrapper
        label={label}
        error={displayError || undefined}
        helperText={helperText}
        disabled={disabled}
        id={inputId}
        showContainer={false}
      >
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          className={cn(
            tagInputContainerVariants({
              size,
              error: !!displayError,
              disabled: !!disabled,
            }),
            isExpanded ? "rounded-tatva-xl" : "rounded-tatva-full"
          )}
        >
          {value.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              variant={tagVariant === "brand" ? "brand" : "secondary"}
              size={size === "xl" ? "md" : "sm"}
              onRemove={disabled ? () => {} : () => removeTag(index)}
            >
              {tag}
            </Chip>
          ))}

          <input
            ref={inputRef}
            type="text"
            id={inputId}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setValidationError(null);
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : ""}
            className={cn(
              "min-w-tatva-40 flex-1 bg-transparent font-matter text-tatva-content-primary placeholder:text-tatva-content-tertiary focus-visible:outline-none disabled:cursor-not-allowed",
              size === "xl" ? "text-tatva-body-lg" : "text-tatva-body-md"
            )}
            {...props}
          />
        </div>
      </InputWrapper>
    );
  }
);

TagInput.displayName = "TagInput";

export { TagInput, tagInputContainerVariants };
export default TagInput;
