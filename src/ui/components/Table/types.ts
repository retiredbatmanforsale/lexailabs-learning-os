import { SortingState } from "@tanstack/react-table";
import * as React from "react";
import { FilterCondition, FilterFieldConfig } from "../Filters";
import { SelectBaseProps, SelectOption } from "../Select";

export interface TableColumn<T> {
  /** Unique column identifier */
  id: string;
  /** Column header text */
  header: string;
  /** Accessor key to get cell value */
  accessorKey?: keyof T;
  /** Accessor function to get cell value */
  accessorFn?: (row: T) => unknown;
  /** Column width */
  size?: number;
  /** Enable sorting for this column */
  enableSorting?: boolean;
  /** Custom cell renderer */
  cell?: (info: {
    row: { original: T };
    getValue: () => unknown;
  }) => React.ReactNode;
  /** Column group name - columns with same group will be grouped under a header */
  group?: string;
}

export interface TableAction<T> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface QuickFilterConfig
  extends Omit<
    SelectBaseProps,
    "options" | "value" | "onValueChange" | "onOpenChange" | "size" | "label"
  > {
  /** Unique identifier for the filter */
  id: string;
  /** Label text for the filter */
  label: string;
  /** Options for the Select dropdown */
  options: SelectOption[];
  /** Current selected value */
  value?: string;
  /** Change handler when value changes */
  onChange?: (value: string) => void;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
}

export interface TableProps<T> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Table data */
  data: T[];
  /** Table variant */
  variant?: "relaxed" | "compact";
  /** Loading state */
  isLoading?: boolean;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Row actions */
  actions?: (row: T) => TableAction<T>[];
  /** Default sorting state */
  defaultSorting?: SortingState;
  /** Controlled sorting state */
  sorting?: SortingState;
  /** Sort change handler (for controlled sorting) */
  onSortingChange?: (sorting: SortingState) => void;
  /** Manual sorting (server-side) */
  manualSorting?: boolean;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Empty state image source URL */
  emptyImageSrc?: string;
  /** Empty state action */
  emptyAction?: { label: string; onClick: () => void };
  /** Pagination - current page (1-indexed) */
  currentPage?: number;
  /** Pagination - page size */
  pageSize?: number;
  /** Pagination - total rows */
  totalRows?: number;
  /** Pagination - page change handler */
  onPageChange?: (page: number) => void;
  /** Pagination - page size options */
  pageSizeOptions?: number[];
  /** Pagination - page size change handler */
  onPageSizeChange?: (pageSize: number) => void;
  /** Cursor-based pagination - whether there's a previous page */
  hasPreviousPage?: boolean;
  /** Cursor-based pagination - whether there's a next page */
  hasNextPage?: boolean;
  /** Cursor-based pagination - handler for going to next page */
  onNext?: () => void;
  /** Cursor-based pagination - handler for going to previous page */
  onPrevious?: () => void;
  /** Row key accessor */
  getRowId?: (row: T) => string;
  /** Max height for scrollable table body (e.g., "400px", "50vh") */
  maxHeight?: string | number;
  /** Show search input */
  showSearch?: boolean;
  /** Search change handler (will be debounced) */
  onSearchChange?: (value: string) => void;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Quick filter dropdowns */
  quickFilters?: QuickFilterConfig[];
  /** Show "Add filter" button */
  showAddFilter?: boolean;
  /** Filter fields config for advanced filters */
  filterFields?: FilterFieldConfig[];
  /** Active filter conditions */
  activeFilters?: FilterCondition[];
  /** Filter change handler */
  onFiltersChange?: (filters: FilterCondition[]) => void;
  /** Clear all filters handler */
  onClearFilters?: () => void;
  /** Show column visibility button */
  showColumnFilter?: boolean;
  /** Column visibility change handler */
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  /** Visible column IDs */
  visibleColumns?: string[];
  /** Show export button */
  showExport?: boolean;
  /** Export click handler */
  onExportClick?: () => void;
  /** Custom action buttons */
  customActions?: React.ReactNode;
  /** Debounce delay for search (ms) */
  searchDebounceMs?: number;
}

export type { SortingState };
