"use client";

import * as Popover from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";
import { addDays, format, startOfDay } from "date-fns";
import * as React from "react";
import { DateRange, DayPicker, type ChevronProps } from "react-day-picker";
import { Button } from "../Button";
import { Divider } from "../Divider";
import Icon from "../Icon";
import { Select } from "../Select";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

export interface Preset {
  /** Display label for the preset */
  label: string;
  /** Number of days to go back from today */
  days: number;
}

export interface DatePickerBaseProps {
  /** Placeholder text */
  placeholder?: string;
  /** Disable the picker */
  disabled?: boolean;
  /** Show time filter (only for range mode) */
  showTimeFilter?: boolean;
  /** Show preset quick filters (only for range mode) */
  showPresets?: boolean;
  /** Custom presets for quick date range selection (only for range mode) */
  presets?: Preset[];
  /** Label for the picker */
  label?: string;
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  /** Selection mode */
  mode?: "single";
  /** Selected date */
  value?: Date;
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  /** Selection mode */
  mode: "range";
  /** Selected date range */
  value?: DateRange;
  /** Callback when date range changes */
  onChange?: (
    range: DateRange | undefined,
    fromTime?: string,
    toTime?: string
  ) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

// ============================================================================
// Styles
// ============================================================================

// Custom CSS for react-day-picker v9 - Using design system tokens
const calendarContainerStyles = `
  .rdp-root {
    --rdp-cell-size: 36px;
    --rdp-accent-color: rgb(var(--tatva-brand-primary));
    font-family: var(--tatva-family-matter);
  }
  
  /* Main container */
  .rdp-months {
    display: flex;
    gap: calc(var(--tatva-spacing-base) * 20); /* 40px */
    position: relative;
  }
  
  /* Navigation - positioned at edges */
  .rdp-nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }
  
  .rdp-button_previous,
  .rdp-button_next {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: calc(var(--tatva-radius-base) * 999); /* rounded-tatva-full */
    border: none;
    background: transparent;
    cursor: pointer;
    transition: background-color 150ms;
    pointer-events: auto;
    color: rgb(var(--tatva-content-primary));
  }
  
  .rdp-button_previous:hover,
  .rdp-button_next:hover {
    background: rgb(var(--tatva-background-secondary));
  }
  
  /* Hide default chevron SVG - we use custom Icon component */
  .rdp-chevron {
    display: none;
  }
  
  /* Month container */
  .rdp-month {
    display: flex;
    flex-direction: column;
    gap: calc(var(--tatva-spacing-base) * 6); /* 12px */
    width: 276px;
  }
  
  /* Month caption */
  .rdp-month_caption {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    font-size: calc(var(--tatva-font-size-base) + 3px); /* label-md */
    color: rgb(var(--tatva-content-primary));
  }
  
  /* Weekday headers */
  .rdp-weekdays {
    display: flex;
    gap: calc(var(--tatva-spacing-base) * 2); /* 4px */
  }
  
  .rdp-weekday {
    width: var(--rdp-cell-size);
    height: var(--rdp-cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(var(--tatva-font-size-base) + 3px); /* body-md 15px */
    font-weight: 300;
    color: rgb(var(--tatva-content-secondary));
  }
  
  /* Weeks container */
  .rdp-weeks {
    display: flex;
    flex-direction: column;
    gap: calc(var(--tatva-spacing-base) * 2); /* 4px */
  }
  
  .rdp-week {
    display: flex;
    gap: 0; /* No gap - we use pseudo-elements for continuous range background */
  }
  
  /* Day cells */
  .rdp-day {
    width: var(--rdp-cell-size);
    height: var(--rdp-cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 calc(var(--tatva-spacing-base) * 1); /* 2px margin for spacing */
  }
  
  /* First and last day in week need adjusted margins */
  .rdp-day:first-child {
    margin-left: 0;
  }
  
  .rdp-day:last-child {
    margin-right: 0;
  }
  
  .rdp-day_button {
    width: 100%;
    height: 100%;
    border-radius: calc(var(--tatva-radius-base) * 2); /* 8px - rounded-tatva-sm */
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: calc(var(--tatva-font-size-base) + 3px); /* body-md 15px */
    color: rgb(var(--tatva-content-primary));
    transition: all 150ms;
    position: relative;
    z-index: 1;
  }
  
  .rdp-day_button:hover:not(:disabled) {
    background: rgb(var(--tatva-background-secondary-hover));
  }
  
  /* Today - highlighted with brand background */
  .rdp-today .rdp-day_button {
    background: rgb(var(--tatva-background-primary-hover));
    color: rgb(var(--tatva-content-primary));
  }

  /* Single selected day - using aria-selected for reliable targeting */
  .rdp-selected:not(.rdp-range_middle) .rdp-day_button {
    background: rgb(var(--tatva-brand-content-primary)) !important;
    color: rgb(var(--tatva-content-inverse)) !important;
  }
  
  /* Range selection - continuous background using pseudo-elements */
  .rdp-range_middle::before,
  .rdp-range_start:not(.rdp-range_end)::after,
  .rdp-range_end:not(.rdp-range_start)::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgb(var(--tatva-brand-primary));
    z-index: 0;
  }
  
  /* Range middle - full width background extending into margins */
  .rdp-range_middle::before {
    left: calc(var(--tatva-spacing-base) * -1); /* -2px to cover margin */
    right: calc(var(--tatva-spacing-base) * -1);
  }
  
  /* Range start - background from center to right edge */
  .rdp-range_start:not(.rdp-range_end)::after {
    left: 50%;
    right: calc(var(--tatva-spacing-base) * -1);
  }
  
  /* Range end - background from left edge to center */
  .rdp-range_end:not(.rdp-range_start)::before {
    left: calc(var(--tatva-spacing-base) * -1);
    right: 50%;
  }
  
  /* Selected start/end buttons */
  .rdp-range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button {
    background: rgb(var(--tatva-brand-content-primary)) !important;
    color: rgb(var(--tatva-content-inverse)) !important;
  }
  
  .rdp-range_middle .rdp-day_button {
    background: transparent !important;
    color: rgb(var(--tatva-content-primary)) !important;
  }
  
  .rdp-range_middle .rdp-day_button:hover {
    background: rgb(var(--tatva-background-secondary-hover)) !important;
  }
  
  /* Outside days */
  .rdp-outside .rdp-day_button {
    color: rgb(var(--tatva-content-quaternary));
  }
  
  /* Disabled days */
  .rdp-disabled .rdp-day_button {
    color: rgb(var(--tatva-content-quaternary));
    cursor: not-allowed;
  }
  
  .rdp-hidden {
    visibility: hidden;
  }
`;

const calendarStyles = cva("font-matter");

// Custom chevron component using our Icon
function CustomChevron({ orientation }: ChevronProps) {
  return (
    <Icon
      name={orientation === "left" ? "chevron-left" : "chevron-right"}
      size="sm"
      tone="primary"
    />
  );
}

const DEFAULT_PRESETS: Preset[] = [
  { label: "Today", days: 1 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 14 days", days: 14 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 60 days", days: 60 },
  { label: "Last 90 days", days: 90 },
];

// Alias for backwards compatibility
const PRESETS = DEFAULT_PRESETS;

// Generate time options in 30-minute intervals
const TIME_OPTIONS = (() => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    const h = hour.toString().padStart(2, "0");
    options.push({ value: `${h}:00`, label: `${h}:00` });
    options.push({ value: `${h}:30`, label: `${h}:30` });
  }
  options.push({ value: "23:59", label: "23:59" });
  return options;
})();

// ============================================================================
// Helpers
// ============================================================================

function getISTDateWithTime(date: Date, hour: number, minute: number) {
  const second = hour === 23 && minute === 59 ? 59 : 0;
  const millisecond = hour === 23 && minute === 59 ? 999 : 0;
  const d = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      minute,
      second,
      millisecond
    )
  );
  return new Date(d.getTime() - (5 * 60 + 30) * 60 * 1000);
}

const presetVariants = cva(
  "w-full cursor-pointer rounded-tatva-lg px-tatva-6 py-tatva-4 text-left transition-colors",
  {
    variants: {
      selected: {
        true: "bg-tatva-background-secondary",
        false: "hover:bg-tatva-background-secondary-hover",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

// ============================================================================
// Hooks
// ============================================================================

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

// ============================================================================
// Component
// ============================================================================

function DatePicker(props: DatePickerProps) {
  const {
    mode = "single",
    placeholder,
    disabled = false,
    showTimeFilter = false,
    showPresets = true,
    presets = PRESETS,
    label,
  } = props;

  const isMobile = useIsMobile();

  const isRangeMode = mode === "range";

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    !isRangeMode ? (props as DatePickerSingleProps).value : undefined
  );
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    isRangeMode ? (props as DatePickerRangeProps).value : undefined
  );
  const [selectedPreset, setSelectedPreset] = React.useState<number | null>(
    null
  );
  const [isTimeFilterExpanded, setIsTimeFilterExpanded] = React.useState(false);
  const [startTime, setStartTime] = React.useState("00:00");
  const [endTime, setEndTime] = React.useState("23:59");

  // Sync external value
  React.useEffect(() => {
    if (isRangeMode) {
      setDateRange((props as DatePickerRangeProps).value);
    } else {
      setSelectedDate((props as DatePickerSingleProps).value);
    }
  }, [isRangeMode, props]);

  // Handle single date selection
  const handleSingleSelect = React.useCallback(
    (date: Date | undefined) => {
      setSelectedDate(date);
      (props as DatePickerSingleProps).onChange?.(date);
      if (date) {
        setIsOpen(false);
      }
    },
    [props]
  );

  // Handle range selection
  const handleRangeSelect = React.useCallback(
    (range: DateRange | undefined) => {
      setDateRange(range);
      setSelectedPreset(null);

      if (range?.from && range?.to) {
        const [fromHour, fromMinute] = startTime.split(":").map(Number);
        const [toHour, toMinute] = endTime.split(":").map(Number);
        (props as DatePickerRangeProps).onChange?.(
          {
            from: getISTDateWithTime(range.from, fromHour, fromMinute),
            to: getISTDateWithTime(range.to, toHour, toMinute),
          },
          startTime,
          endTime
        );
      } else {
        (props as DatePickerRangeProps).onChange?.(range, startTime, endTime);
      }
    },
    [props, startTime, endTime]
  );

  const selectPreset = React.useCallback(
    (days: number) => {
      const today = startOfDay(new Date());
      const from = addDays(today, -days + 1);

      const range = {
        from,
        to: today,
      };

      setDateRange(range);
      setSelectedPreset(days);

      const [fromHour, fromMinute] = startTime.split(":").map(Number);
      const [toHour, toMinute] = endTime.split(":").map(Number);
      (props as DatePickerRangeProps).onChange?.(
        {
          from: getISTDateWithTime(range.from, fromHour, fromMinute),
          to: getISTDateWithTime(range.to, toHour, toMinute),
        },
        startTime,
        endTime
      );
    },
    [props, startTime, endTime]
  );

  const handleCollapseTimeFilter = React.useCallback(() => {
    setIsTimeFilterExpanded(false);
    setStartTime("00:00");
    setEndTime("23:59");

    if (dateRange?.from && dateRange?.to) {
      (props as DatePickerRangeProps).onChange?.(
        {
          from: getISTDateWithTime(dateRange.from, 0, 0),
          to: getISTDateWithTime(dateRange.to, 23, 59),
        },
        "00:00",
        "23:59"
      );
    }
  }, [dateRange, props]);

  const handleStartTimeChange = React.useCallback(
    (time: string | string[]) => {
      const t = Array.isArray(time) ? time[0] : time;
      setStartTime(t);
      if (dateRange?.from && dateRange?.to) {
        const [fromHour, fromMinute] = t.split(":").map(Number);
        const [toHour, toMinute] = endTime.split(":").map(Number);
        (props as DatePickerRangeProps).onChange?.(
          {
            from: getISTDateWithTime(dateRange.from, fromHour, fromMinute),
            to: getISTDateWithTime(dateRange.to, toHour, toMinute),
          },
          t,
          endTime
        );
      }
    },
    [dateRange, props, endTime]
  );

  const handleEndTimeChange = React.useCallback(
    (time: string | string[]) => {
      const t = Array.isArray(time) ? time[0] : time;
      setEndTime(t);
      if (dateRange?.from && dateRange?.to) {
        const [fromHour, fromMinute] = startTime.split(":").map(Number);
        const [toHour, toMinute] = t.split(":").map(Number);
        (props as DatePickerRangeProps).onChange?.(
          {
            from: getISTDateWithTime(dateRange.from, fromHour, fromMinute),
            to: getISTDateWithTime(dateRange.to, toHour, toMinute),
          },
          startTime,
          t
        );
      }
    },
    [dateRange, props, startTime]
  );

  const displayText = React.useMemo(() => {
    if (isRangeMode) {
      if (dateRange?.from) {
        if (dateRange.to) {
          return `${format(dateRange.from, "LLL dd, y")} - ${format(
            dateRange.to,
            "LLL dd, y"
          )}`;
        }
        return format(dateRange.from, "LLL dd, y");
      }
      return placeholder || "Select date range";
    } else {
      if (selectedDate) {
        return format(selectedDate, "LLL dd, y");
      }
      return placeholder || "Select date";
    }
  }, [isRangeMode, dateRange, selectedDate, placeholder]);

  const defaultPlaceholder = isRangeMode ? "Select date range" : "Select date";

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button variant="outline" icon="calendar" size="lg" disabled={disabled}>
          {displayText}
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="z-50 overflow-hidden rounded-tatva-lg bg-tatva-background-primary px-tatva-10 py-tatva-12 font-matter shadow-tatva-l1 data-[state=closed]:animate-tatva-fade-out data-[state=open]:animate-tatva-fade-in"
        >
          <div className="flex gap-tatva-20">
            {/* Presets - only for range mode, hidden on mobile */}
            {isRangeMode && showPresets && !isMobile && (
              <div className="flex flex-col gap-tatva-1">
                {presets.map((preset) => (
                  <div
                    key={preset.label}
                    onClick={() => selectPreset(preset.days)}
                    className={presetVariants({
                      selected: selectedPreset === preset.days,
                    })}
                  >
                    <Text variant="body-md">{preset.label}</Text>
                  </div>
                ))}
              </div>
            )}

            {/* Calendar */}
            <div>
              <style>{calendarContainerStyles}</style>
              <div className="flex flex-col gap-tatva-8">
                {isRangeMode ? (
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={handleRangeSelect}
                    numberOfMonths={isMobile ? 1 : 2}
                    defaultMonth={dateRange?.from}
                    className={calendarStyles()}
                    components={{
                      Chevron: CustomChevron,
                    }}
                  />
                ) : (
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSingleSelect}
                    numberOfMonths={1}
                    defaultMonth={selectedDate}
                    className={calendarStyles()}
                    components={{
                      Chevron: CustomChevron,
                    }}
                  />
                )}

                {/* Time Filter - only for range mode */}
                {isRangeMode && showTimeFilter && (
                  <>
                    <Divider />
                    <div className="pt-tatva-2">
                      {!isTimeFilterExpanded ? (
                        <Button
                          variant="ghost"
                          icon="plus"
                          onClick={() => setIsTimeFilterExpanded(true)}
                        >
                          Add time filter
                        </Button>
                      ) : (
                        <div className="flex items-center justify-between gap-tatva-4">
                          <div className="flex w-tatva-72 items-center gap-tatva-4">
                            <Select
                              options={TIME_OPTIONS}
                              value={startTime}
                              onValueChange={handleStartTimeChange}
                              size="md"
                            />
                            <Icon
                              name="arrow-right"
                              size="xs"
                              tone="secondary"
                            />
                            <Select
                              options={TIME_OPTIONS}
                              value={endTime}
                              onValueChange={handleEndTimeChange}
                              size="md"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon="close"
                            onClick={handleCollapseTimeFilter}
                          >
                            Remove time filter
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

DatePicker.displayName = "DatePicker";

// Alias for backwards compatibility
const DateRangePicker = (props: Omit<DatePickerRangeProps, "mode">) => (
  <DatePicker {...props} mode="range" />
);

DateRangePicker.displayName = "DateRangePicker";

// ============================================================================
// Exports
// ============================================================================

export { DatePicker, DateRangePicker, DEFAULT_PRESETS };
export type { DateRange };
export default DatePicker;
