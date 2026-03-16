"use client";

import { Listbox } from "../../primitives/Listbox";
import * as React from "react";
import { IconName } from "../Icon";

// ============================================================================
// Types
// ============================================================================

export interface MenuOption {
  /** Unique value for the option (used for selection tracking) */
  value?: string;
  /** Option label */
  label: string;
  /** Icon on the left */
  icon?: IconName;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Whether this is a separator */
  isSeparator?: boolean;
}

export interface MenuProps {
  /** Menu trigger element */
  children: React.ReactNode;
  /** Menu options */
  options: MenuOption[];
  /** Controlled open state */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Menu alignment relative to trigger */
  align?: "start" | "center" | "end";
  /** Menu side relative to trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Offset from trigger element */
  sideOffset?: number;
  /** Match the width of the trigger element */
  matchTriggerWidth?: boolean;
  /** Minimum width of the menu dropdown */
  minWidth?: number;
  /** Enable search functionality */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Currently selected value(s) - single value or array for multi-select */
  selectedValue?: string | string[];
  /** Callback when selection changes */
  onSelect?: (value: string) => void;
  /** Close menu when item is selected */
  closeOnSelect?: boolean;
}

// ============================================================================
// Main Component
// ============================================================================

function Menu({
  children,
  options,
  open,
  onOpenChange,
  align = "end",
  side = "bottom",
  sideOffset,
  matchTriggerWidth = false,
  minWidth = 120,
  searchable = false,
  searchPlaceholder = "Search...",
  selectedValue,
  onSelect,
  closeOnSelect = true,
}: MenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const isOpen = open ?? internalOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      // Always update internal state if not controlled
      if (open === undefined) {
        setInternalOpen(newOpen);
      }
      // Always call onOpenChange if provided
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange]
  );

  const handleClose = () => setOpen(false);

  // Reset search when menu closes
  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;

    return options.filter((option) => {
      if (option.isSeparator) return false;
      return option.label.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [options, searchQuery]);

  // Check if a value is selected
  const isSelected = (value?: string) => {
    if (!value || !selectedValue) return false;
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  const handleItemClick = (option: MenuOption) => {
    if (option.onClick) {
      option.onClick();
    }
    if (option.value && onSelect) {
      onSelect(option.value);
    }
  };

  const nonSeparatorOptions = filteredOptions.filter((o) => !o.isSeparator);

  return (
    <Listbox.Root open={isOpen} onOpenChange={setOpen}>
      <Listbox.Trigger>{children}</Listbox.Trigger>
      <Listbox.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        matchTriggerWidth={matchTriggerWidth}
        minWidth={minWidth}
        hasItems={nonSeparatorOptions.length > 0}
        emptyMessage="No results found"
        searchInput={
          searchable ? (
            <Listbox.Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
            />
          ) : undefined
        }
      >
        {filteredOptions.map((option, index) =>
          option.isSeparator ? (
            <Listbox.Separator key={index} />
          ) : (
            <Listbox.Item
              key={option.value ?? index}
              item={{
                id: option.value ?? String(index),
                label: option.label,
                icon: option.icon,
                disabled: option.disabled,
              }}
              onSelect={() => handleItemClick(option)}
              isSelected={isSelected(option.value)}
              closeOnSelect={closeOnSelect}
              onClose={handleClose}
              multiSelect={Array.isArray(selectedValue)}
            />
          )
        )}
      </Listbox.Content>
    </Listbox.Root>
  );
}

Menu.displayName = "Menu";

export { Menu };
export default Menu;
