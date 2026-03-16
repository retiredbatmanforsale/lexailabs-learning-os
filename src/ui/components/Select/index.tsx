"use client";

import { inputContainerVariants } from "../../primitives/InputWrapper";
import { Listbox } from "../../primitives/Listbox";
import * as React from "react";
import Avatar, { type AvatarProps } from "../Avatar";
import { Checkbox } from "../Checkbox";
import Chip from "../Chip";
import { HeaderSelectTrigger } from "../Header/HeaderSelectTrigger";
import Icon, { IconName } from "../Icon";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

// ============================================================================
// Types
// ============================================================================

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: IconName | AvatarProps;
  disabled?: boolean;
}

export interface SelectBaseProps {
  options: SelectOption[];
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  size?: "md" | "lg" | "xl";
  // Server-side search
  onSearch?: (query: string) => void;
  // Infinite scroll
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  /** Match the width of the trigger element */
  matchTriggerWidth?: boolean;
  /**
   * @internal - For internal use only. Renders a minimal trigger for Header usage.
   * Do not use this prop in external applications.
   */
  _forHeader?: boolean;
}

interface SingleSelectProps extends SelectBaseProps {
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
  maxShow?: never;
}

interface MultiSelectProps extends SelectBaseProps {
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  maxShow?: number;
  /** Show "Select All" checkbox next to search (only for multi-select with searchable) */
  showSelectAll?: boolean;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

interface TriggerContentProps {
  hasValue: boolean;
  placeholder: string;
  multiple: boolean;
  selectedValues: string[];
  selectedOption: SelectOption | null | undefined;
  options: SelectOption[];
  maxShow: number;
  onRemoveTag: (val: string | string[]) => void;
}

function TriggerContent({
  hasValue,
  placeholder,
  multiple,
  selectedValues,
  selectedOption,
  options,
  maxShow,
  onRemoveTag,
}: TriggerContentProps) {
  if (!hasValue) {
    return (
      <Text variant="body-md" tone="tertiary">
        {placeholder}
      </Text>
    );
  }

  if (multiple) {
    const visibleValues = selectedValues.slice(0, maxShow);
    const hiddenValues = selectedValues.slice(maxShow);
    const remainingCount = hiddenValues.length;

    const hiddenLabels = hiddenValues
      .map((val) => options.find((o) => o.value === val)?.label || val)
      .join(", ");

    return (
      <div className="flex flex-1 items-center gap-tatva-2">
        {visibleValues.map((val) => {
          const opt = options.find((o) => o.value === val);
          return (
            <Chip key={val} size="sm" onRemove={() => onRemoveTag(val)}>
              {opt?.label || val}
            </Chip>
          );
        })}
        {remainingCount > 0 && (
          <Tooltip content={hiddenLabels} side="top">
            <Chip
              size="sm"
              onRemove={() => {
                onRemoveTag(hiddenValues);
              }}
            >
              +{remainingCount}
            </Chip>
          </Tooltip>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-tatva-4 overflow-hidden">
      {selectedOption?.icon && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {typeof selectedOption.icon === "string" ? (
            <Icon name={selectedOption.icon} size="md" tone="secondary" />
          ) : (
            <Avatar size="sm" {...selectedOption.icon} />
          )}
        </span>
      )}
      <span className="block min-w-0 truncate">
        <Text variant="body-md" as="span">
          {selectedOption?.label}
        </Text>
      </span>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      onOpenChange,
      placeholder = "Select an option",
      searchable = false,
      disabled = false,
      multiple = false,
      label,
      error,
      size = "md",
      onSearch,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      maxShow = 2,
      matchTriggerWidth = true,
      _forHeader = false,
      ...props
    },
    ref
  ) => {
    const showSelectAll = multiple && (props as MultiSelectProps).showSelectAll;
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const listRef = React.useRef<HTMLDivElement>(null);
    const isLoadingRef = React.useRef(false);

    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      onOpenChange?.(isOpen);
      if (!isOpen && onSearch) {
        setSearchQuery("");
        onSearch("");
      }
    };

    // Debounced server-side search
    React.useEffect(() => {
      if (!onSearch || !searchable) return;
      const timer = setTimeout(() => {
        onSearch(searchQuery);
      }, 300);
      return () => clearTimeout(timer);
    }, [searchQuery, searchable, onSearch]);

    // Reset loading ref
    React.useEffect(() => {
      isLoadingRef.current = isLoading;
    }, [isLoading]);

    // Infinite scroll
    const handleScroll = () => {
      if (!onLoadMore || !hasMore || !listRef.current || isLoadingRef.current)
        return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight - scrollTop - clientHeight < 10) {
        isLoadingRef.current = true;
        onLoadMore();
      }
    };

    // Client-side filtering
    const filteredOptions =
      !onSearch && searchable
        ? options.filter(
            (option) =>
              option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
              option.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
        : options;

    // Values handling
    const selectedValues = multiple ? (Array.isArray(value) ? value : []) : [];
    const selectedOption = !multiple
      ? options.find((opt) => opt.value === value)
      : null;
    const hasValue = multiple
      ? selectedValues.length > 0
      : !!value && !!selectedOption;

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        (onValueChange as ((value: string[]) => void) | undefined)?.(newValues);
      } else {
        (onValueChange as ((value: string) => void) | undefined)?.(optionValue);
        setOpen(false);
      }
    };

    const handleRemoveTag = (val: string | string[]) => {
      if (disabled || !multiple) return;
      if (typeof val === "string") {
        (onValueChange as ((value: string[]) => void) | undefined)?.(
          selectedValues.filter((v) => v !== val)
        );
      } else {
        (onValueChange as ((value: string[]) => void) | undefined)?.(
          selectedValues.filter((v) => !val.includes(v))
        );
      }
    };

    // Select all logic for multi-select
    const selectableOptions = filteredOptions.filter((o) => !o.disabled);
    const selectableValues = selectableOptions.map((o) => o.value);
    const allSelected =
      selectableValues.length > 0 &&
      selectableValues.every((v) => selectedValues.includes(v));
    const someSelected =
      selectableValues.some((v) => selectedValues.includes(v)) && !allSelected;

    const handleSelectAll = () => {
      if (!multiple) return;
      if (allSelected) {
        // Deselect all filtered options
        const newValues = selectedValues.filter(
          (v) => !selectableValues.includes(v)
        );
        (onValueChange as ((value: string[]) => void) | undefined)?.(newValues);
      } else {
        // Select all filtered options (add to existing)
        const newValues = [
          ...selectedValues,
          ...selectableValues.filter((v) => !selectedValues.includes(v)),
        ];
        (onValueChange as ((value: string[]) => void) | undefined)?.(newValues);
      }
    };

    // For header usage
    if (_forHeader) {
      return (
        <Listbox.Root modal open={open} onOpenChange={handleOpenChange}>
          <Listbox.Trigger>
            <HeaderSelectTrigger label={label} disabled={disabled}>
              <button
                ref={ref}
                type="button"
                disabled={disabled}
                className="flex cursor-pointer items-center gap-tatva-2 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Text
                  variant="heading-xs"
                  tone={hasValue ? "default" : "tertiary"}
                >
                  {hasValue ? selectedOption?.label : placeholder}
                </Text>
                <Icon
                  name="chevron-down"
                  size="md"
                  tone="tertiary"
                  style={{
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                />
              </button>
            </HeaderSelectTrigger>
          </Listbox.Trigger>
          <Listbox.Content
            align="start"
            side="bottom"
            sideOffset={2}
            matchTriggerWidth={matchTriggerWidth}
            minWidth={150}
            listRef={listRef}
            onScroll={handleScroll}
            isLoading={isLoading}
            hasItems={filteredOptions.length > 0}
            emptyMessage="No results found"
            searchInput={
              searchable && (
                <Listbox.Search
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search..."
                  trailing={
                    showSelectAll &&
                    selectableOptions.length > 0 && (
                      <Checkbox
                        checked={allSelected}
                        onChange={handleSelectAll}
                        variant="select-all"
                        size="md"
                        aria-label={allSelected ? "Deselect all" : "Select all"}
                      />
                    )
                  }
                />
              )
            }
          >
            {filteredOptions.map((option) => {
              const isSelected = multiple
                ? selectedValues.includes(option.value)
                : option.value === value;

              return (
                <Listbox.Item
                  key={option.value}
                  item={{
                    id: option.value,
                    label: option.label,
                    description: option.description,
                    icon: option.icon,
                    disabled: option.disabled,
                  }}
                  isSelected={isSelected}
                  onSelect={() => handleSelect(option.value)}
                  closeOnSelect={!multiple}
                  onClose={() => setOpen(false)}
                  multiSelect={multiple}
                />
              );
            })}
          </Listbox.Content>
        </Listbox.Root>
      );
    }

    // For regular usage - render label/error outside the trigger
    return (
      <div className="flex w-full flex-col gap-tatva-2">
        {label && (
          <span className="mb-tatva-2 inline-flex px-tatva-2">
            <Text as="label" variant="label-md" tone="secondary">
              {label}
            </Text>
          </span>
        )}
        <Listbox.Root modal open={open} onOpenChange={handleOpenChange}>
          <Listbox.Trigger>
            <div
              data-component="InputWrapper"
              data-error={!!error}
              data-disabled={!!disabled}
              data-active={!!open}
              className={inputContainerVariants({
                size,
                multiSelect: multiple,
              })}
            >
              <button
                ref={ref}
                type="button"
                disabled={disabled}
                className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-tatva-4 overflow-hidden text-left disabled:cursor-not-allowed"
              >
                <TriggerContent
                  hasValue={hasValue}
                  placeholder={placeholder}
                  multiple={multiple}
                  selectedValues={selectedValues}
                  selectedOption={selectedOption}
                  options={options}
                  maxShow={maxShow}
                  onRemoveTag={handleRemoveTag}
                />
                <Icon
                  name="chevron-down"
                  size="md"
                  tone="tertiary"
                  style={{
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                />
              </button>
            </div>
          </Listbox.Trigger>

          <Listbox.Content
            align="start"
            side="bottom"
            sideOffset={2}
            matchTriggerWidth={matchTriggerWidth}
            minWidth={150}
            listRef={listRef}
            onScroll={handleScroll}
            isLoading={isLoading}
            hasItems={filteredOptions.length > 0}
            emptyMessage="No results found"
            searchInput={
              searchable && (
                <Listbox.Search
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search..."
                  trailing={
                    showSelectAll &&
                    selectableOptions.length > 0 && (
                      <Checkbox
                        checked={allSelected}
                        onChange={handleSelectAll}
                        variant="select-all"
                        size="md"
                        aria-label={allSelected ? "Deselect all" : "Select all"}
                      />
                    )
                  }
                />
              )
            }
          >
            {filteredOptions.map((option) => {
              const isSelected = multiple
                ? selectedValues.includes(option.value)
                : option.value === value;

              return (
                <Listbox.Item
                  key={option.value}
                  item={{
                    id: option.value,
                    label: option.label,
                    description: option.description,
                    icon: option.icon,
                    disabled: option.disabled,
                  }}
                  isSelected={isSelected}
                  onSelect={() => handleSelect(option.value)}
                  closeOnSelect={!multiple}
                  onClose={() => setOpen(false)}
                  multiSelect={multiple}
                />
              );
            })}
          </Listbox.Content>
        </Listbox.Root>
        {error && (
          <span className="inline-flex px-tatva-2">
            <Text as="span" variant="label-sm" tone="danger">
              {error}
            </Text>
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export default Select;
