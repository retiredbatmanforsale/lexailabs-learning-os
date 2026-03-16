"use client";

import * as Popover from "@radix-ui/react-popover";
import * as React from "react";
import { cn } from "../lib/utils";
import Icon from "../components/Icon";
import { Text } from "../components/Text";
import { Checkbox } from "../components/Checkbox";
import Loader from "../components/Loader";

// ============================================================================
// Types
// ============================================================================

interface ListboxRootProps {
  children: React.ReactNode;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ListboxTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface ListboxContentProps {
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  matchTriggerWidth?: boolean;
  minWidth?: number;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasItems?: boolean;
  emptyMessage?: string;
  searchInput?: React.ReactNode;
  listRef?: React.RefObject<HTMLDivElement | null>;
  onScroll?: () => void;
}

interface ListboxSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  trailing?: React.ReactNode;
}

interface ListboxItemData {
  id: string;
  label: string;
  description?: string;
  icon?: string | Record<string, any>;
  disabled?: boolean;
}

interface ListboxItemProps {
  item: ListboxItemData;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onClose?: () => void;
  multiSelect?: boolean;
  closeOnSelect?: boolean;
}

// ============================================================================
// Components
// ============================================================================

function Root({ children, modal, open, onOpenChange }: ListboxRootProps) {
  return (
    <Popover.Root modal={modal} open={open} onOpenChange={onOpenChange}>
      {children}
    </Popover.Root>
  );
}

function Trigger({ children, asChild = true }: ListboxTriggerProps) {
  return <Popover.Trigger asChild={asChild}>{children}</Popover.Trigger>;
}

function Content({
  children,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  matchTriggerWidth,
  minWidth = 200,
  onLoadMore,
  isLoading,
  hasItems = true,
  emptyMessage = "No items found",
  searchInput,
  listRef,
  onScroll: externalOnScroll,
}: ListboxContentProps) {
  const internalRef = React.useRef<HTMLDivElement>(null);
  const contentRef = listRef || internalRef;

  const handleScroll = React.useCallback(() => {
    externalOnScroll?.();
    if (!onLoadMore || isLoading || !contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading, externalOnScroll, contentRef]);

  return (
    <Popover.Portal>
      <Popover.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 overflow-hidden rounded-tatva-md border border-tatva-border bg-tatva-background-primary shadow-lg",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          matchTriggerWidth ? "w-[var(--radix-popover-trigger-width)]" : ""
        )}
        style={{ minWidth }}
      >
        <div className="flex flex-col">
          {searchInput && (
            <div className="border-b border-tatva-border p-tatva-8">
              {searchInput}
            </div>
          )}
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="max-h-[300px] overflow-y-auto p-tatva-4"
          >
            {!hasItems && !isLoading ? (
              <div className="py-tatva-12 text-center">
                <Text variant="body-sm" tone="tertiary">
                  {emptyMessage}
                </Text>
              </div>
            ) : (
              children
            )}
            {isLoading && (
              <div className="flex items-center justify-center py-tatva-8">
                <Loader size="sm" />
              </div>
            )}
          </div>
        </div>
      </Popover.Content>
    </Popover.Portal>
  );
}

function Search({ value, onChange, placeholder, trailing }: ListboxSearchProps) {
  return (
    <div className="flex items-center gap-tatva-8">
      <div className="relative flex-1">
        <span className="absolute left-tatva-8 top-1/2 -translate-y-1/2">
          <Icon
            name="search"
            size="sm"
            tone="tertiary"
          />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-tatva-xs border border-tatva-border bg-tatva-background-primary py-tatva-8 pl-tatva-32 pr-tatva-8 text-tatva-body-sm text-tatva-content-primary placeholder:text-tatva-content-tertiary focus:border-tatva-content-primary focus:outline-none"
        />
      </div>
      {trailing}
    </div>
  );
}

function Item({
  item,
  isSelected,
  onSelect,
  onClose,
  multiSelect,
  closeOnSelect = true,
}: ListboxItemProps) {
  const handleClick = () => {
    if (item.disabled) return;
    onSelect?.(item.id);
    if (!multiSelect && closeOnSelect) {
      onClose?.();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={item.disabled}
      className={cn(
        "flex w-full items-center gap-tatva-4 rounded-tatva-md px-tatva-4 py-tatva-3 text-left transition-colors",
        "hover:bg-tatva-background-secondary",
        isSelected ? "bg-tatva-background-secondary" : "",
        item.disabled ? "cursor-not-allowed opacity-50" : ""
      )}
    >
      {multiSelect && (
        <Checkbox
          checked={isSelected}
          onChange={() => {}}
          disabled={item.disabled}
        />
      )}
      {item.icon && typeof item.icon === 'string' && (
        <Icon name={item.icon as any} size="sm" tone="secondary" />
      )}
      <div className="flex flex-1 flex-col">
        <Text variant="body-md">{item.label}</Text>
        {item.description && (
          <Text variant="body-sm" tone="tertiary">
            {item.description}
          </Text>
        )}
      </div>
      {!multiSelect && isSelected && (
        <Icon name="check" size="sm" tone="primary" />
      )}
    </button>
  );
}

function Separator() {
  return <div className="my-tatva-4 h-px bg-tatva-border" />;
}

// ============================================================================
// Exports
// ============================================================================

export const Listbox = {
  Root,
  Trigger,
  Content,
  Search,
  Item,
  Separator,
};

export default Listbox;
