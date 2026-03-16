"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "../../lib/utils";
import Icon, { IconName } from "../Icon";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "className"
> {
  /** Label text */
  label?: string;
  /** Show value input on the right */
  showValue?: boolean;
  /** Format value for display */
  formatValue?: (value: number) => string;
  /** Parse value from input string */
  parseValue?: (value: string) => number;
  /** Show tick marks (calculated from step) */
  showTicks?: boolean;
  /** Icon to show on the left of the slider */
  icon?: IconName;
  /** Drag start callback */
  onDragStart?: () => void;
  /** Drag end callback */
  onDragEnd?: () => void;
}

// ============================================================================
// Ticks Component
// ============================================================================

interface TicksProps {
  count: number;
}

function Ticks({ count }: TicksProps) {
  return (
    <div className="flex items-center justify-between">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="size-tatva-2 shrink-0 rounded-tatva-full bg-tatva-background-secondary-hover"
        />
      ))}
    </div>
  );
}

// ============================================================================
// Component
// ============================================================================

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      label,
      showValue = false,
      formatValue = (v) => String(v),
      parseValue = (v) => Number(v) || 0,
      showTicks = false,
      icon,
      disabled = false,
      onDragStart,
      onDragEnd,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? [0]
    );
    const [inputValue, setInputValue] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);

    const currentValue = value ?? internalValue;
    const displayValue = currentValue[0] ?? 0;

    // Sync input value with slider value (only when not editing)
    React.useEffect(() => {
      if (!isEditing) {
        setInputValue(formatValue(displayValue));
      }
    }, [displayValue, formatValue, isEditing]);

    // Calculate tick count from step: (max - min) / step + 1
    const tickCount = Math.floor((max - min) / step) + 1;

    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        if (!value) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputFocus = () => {
      setIsEditing(true);
    };

    const handleInputBlur = () => {
      setIsEditing(false);
      const parsed = parseValue(inputValue);
      const clamped = Math.min(Math.max(parsed, min), max);
      handleValueChange([clamped]);
      setInputValue(formatValue(clamped));
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
      }
    };

    const handleDragStart = React.useCallback(() => {
      if (disabled) return;
      setIsDragging(true);
      onDragStart?.();
    }, [disabled, onDragStart]);

    const handleDragEnd = React.useCallback(() => {
      setIsDragging(false);
      onDragEnd?.();
    }, [onDragEnd]);

    return (
      <div className="w-full">
        {/* Label above */}
        {label && (
          <span className="mb-tatva-4 inline-flex px-tatva-2">
            <Text as="label" variant="label-md" tone="secondary">
              {label}
            </Text>
          </span>
        )}

        {/* Main slider row: [icon] [slider] [value input] */}
        <div className="flex items-center gap-tatva-6">
          {/* Left icon */}
          <div className={cn(showTicks ? "mb-tatva-4" : "mb-tatva-2")}>
            {icon && (
              <Icon
                name={icon}
                size="md"
                tone={disabled ? "tertiary" : "secondary"}
              />
            )}
          </div>

          {/* Slider */}
          <div className="min-w-tatva-0 flex-1">
            <SliderPrimitive.Root
              ref={ref}
              min={min}
              max={max}
              step={step}
              value={currentValue}
              onValueChange={handleValueChange}
              disabled={disabled}
              onPointerDown={handleDragStart}
              onPointerUp={handleDragEnd}
              className={cn(
                "relative flex h-tatva-10 w-full touch-none select-none items-center",
                disabled ? "cursor-not-allowed opacity-25" : "cursor-pointer"
              )}
              {...props}
            >
              {/* Track Container */}
              <SliderPrimitive.Track className="relative h-tatva-4 w-full overflow-hidden rounded-tatva-full bg-tatva-background-secondary">
                {/* Filled Range - Using LMS Primary Blue */}
                <SliderPrimitive.Range className="absolute h-full rounded-tatva-full bg-tatva-indigo-500" />
              </SliderPrimitive.Track>

              {/* Thumb - Oval/Pill Shape */}
              <SliderPrimitive.Thumb
                // TODO: Fix this
                // eslint-disable-next-line tailwindcss/no-arbitrary-value
                className={cn(
                  "block h-tatva-8 w-tatva-12 rounded-tatva-full",
                  "border border-tatva-border-secondary bg-tatva-background-primary",
                  "shadow-[0px_0px_18px_0px_rgba(0,0,0,0.08)]",
                  "transition-transform focus-visible:outline-none",
                  "disabled:pointer-events-none disabled:opacity-50",
                  isDragging ? "scale-105 border-tatva-border-tertiary" : "",
                  disabled
                    ? "cursor-not-allowed"
                    : "cursor-grab active:cursor-grabbing"
                )}
              />
            </SliderPrimitive.Root>

            {/* Ticks below the track */}
            {showTicks && <Ticks count={tickCount} />}
          </div>

          {/* Value input on right */}
          {showValue && (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              className={cn(
                "h-tatva-12 w-tatva-20 rounded-tatva-md border border-tatva-border-secondary bg-tatva-background-primary px-tatva-4 text-center font-matter text-tatva-body-md text-tatva-content-primary",
                "focus:border-tatva-border-tertiary focus:outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                showTicks ? "mb-tatva-4" : ""
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
export default Slider;
