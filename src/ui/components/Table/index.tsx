"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Filters } from "../Filters";
import { Input } from "../Input";
import { Text } from "../Text";
import { TableContent } from "./components/TableContent";
import { TableQuickFilters } from "./components/TableQuickFilters";
import { TableToolbar } from "./components/TableToolbar";
import { CursorPagination } from "./pagination/CursorPagination";
import { OffsetPagination } from "./pagination/OffsetPagination";
import { TableActions } from "./states/TableActions";
import { TableProps } from "./types";

// ============================================================================
// Debounce Hook
// ============================================================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function Table<T>({
  columns,
  data,
  variant = "relaxed",
  isLoading = false,
  onRowClick,
  actions,
  defaultSorting = [],
  sorting: controlledSorting,
  onSortingChange,
  manualSorting = false,
  emptyTitle,
  emptyDescription,
  emptyImageSrc,
  emptyAction,
  currentPage = 1,
  pageSize = 20,
  totalRows,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  hasPreviousPage,
  hasNextPage,
  onNext,
  onPrevious,
  getRowId,
  maxHeight,
  showSearch = true,
  onSearchChange,
  searchPlaceholder = "Search",
  quickFilters = [],
  showAddFilter = true,
  filterFields = [],
  activeFilters = [],
  onFiltersChange,
  onClearFilters,
  showColumnFilter = true,
  onColumnVisibilityChange,
  visibleColumns,
  showExport = true,
  onExportClick,
  customActions,
  searchDebounceMs = 300,
}: TableProps<T>) {
  const [internalSorting, setInternalSorting] =
    React.useState<SortingState>(defaultSorting);
  const [internalSearchValue, setInternalSearchValue] = React.useState("");

  // Use controlled or internal sorting
  const sorting = controlledSorting ?? internalSorting;
  const setSorting = onSortingChange ?? setInternalSorting;

  // Search handling with debounce
  const debouncedSearchValue = useDebounce(
    internalSearchValue,
    searchDebounceMs
  );

  // Sync debounced value to parent
  React.useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearchValue);
    }
  }, [debouncedSearchValue, onSearchChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalSearchValue(value);
  };

  // Filter columns based on visibility
  const filteredColumns = React.useMemo(() => {
    if (!visibleColumns || visibleColumns.length === 0) {
      return columns;
    }
    return columns.filter((col) => visibleColumns.includes(col.id));
  }, [columns, visibleColumns]);

  // Convert our simplified columns to TanStack column defs
  const tanstackColumns = React.useMemo<ColumnDef<T, unknown>[]>(() => {
    const cols: ColumnDef<T, unknown>[] = filteredColumns.map((col) => ({
      id: col.id,
      header: col.header,
      accessorKey: col.accessorKey as string | undefined,
      accessorFn: col.accessorFn,
      size: col.size,
      enableSorting: col.enableSorting ?? false,
      cell: col.cell
        ? (info: { row: { original: T }; getValue: () => unknown }) => {
            const result = col.cell!(info);
            // Wrap primitive returns (string/number) in Text component with lineClamp
            if (typeof result === "string" || typeof result === "number") {
              return (
                <Text variant="body-md" lineClamp={1}>
                  {result}
                </Text>
              );
            }
            return result;
          }
        : (info: { getValue: () => unknown }) => {
            const value = info.getValue();
            return (
              <Text variant="body-md" lineClamp={1}>
                {value !== null && value !== undefined ? String(value) : "-"}
              </Text>
            );
          },
    }));

    // Add actions column if provided
    if (actions) {
      cols.push({
        id: "actions",
        header: "",
        size: 60,
        enableSorting: false,
        cell: ({ row }: { row: Row<T> }) => (
          <TableActions row={row.original} actions={actions} />
        ),
      });
    }

    return cols;
  }, [filteredColumns, actions]);

  const table = useReactTable({
    data,
    columns: tanstackColumns,
    state: {
      sorting,
    },
    onSortingChange: (
      updater: SortingState | ((prev: SortingState) => SortingState)
    ) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting,
    manualPagination: true,
    getRowId,
  });

  // Determine which pagination type to use
  // Cursor-based pagination takes precedence if onNext or onPrevious is provided
  const useCursorPagination = !!(onNext || onPrevious);
  const showOffsetPagination =
    !useCursorPagination &&
    onPageChange &&
    totalRows !== undefined &&
    totalRows > pageSize;
  const showCursorPagination = useCursorPagination;
  const totalPages = totalRows ? Math.ceil(totalRows / pageSize) : 0;
  const columnCount = tanstackColumns.length;

  // Compute column groups from columns with group property
  const columnGroups = React.useMemo(() => {
    const hasGroups = filteredColumns.some((col) => col.group);
    if (!hasGroups) return null;

    const groups: { title: string; colSpan: number }[] = [];
    let currentGroup: string | undefined;
    let currentSpan = 0;

    filteredColumns.forEach((col, index) => {
      const group = col.group || "";
      if (group !== currentGroup) {
        if (currentSpan > 0) {
          groups.push({ title: currentGroup || "", colSpan: currentSpan });
        }
        currentGroup = group;
        currentSpan = 1;
      } else {
        currentSpan++;
      }
      // Handle last column
      if (index === filteredColumns.length - 1) {
        groups.push({ title: currentGroup || "", colSpan: currentSpan });
      }
    });

    // Add span for actions column if present
    if (actions) {
      groups.push({ title: "", colSpan: 1 });
    }

    return groups;
  }, [filteredColumns, actions]);

  const isRelaxed = variant === "relaxed";
  const isCompact = variant === "compact";

  return (
    <div className="flex w-full flex-col gap-tatva-8">
      {/* Filter Bar and Toolbar */}
      <div className="flex flex-wrap items-start gap-tatva-6">
        {/* Left side: Search, Quick Filters, and Advanced Filters */}
        <div className="flex min-w-tatva-0 flex-1 flex-wrap items-center gap-tatva-6">
          {/* Search */}
          {showSearch && onSearchChange && (
            <div className="w-tatva-120">
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={internalSearchValue}
                onChange={handleSearchChange}
                icon="search"
              />
            </div>
          )}

          {/* Quick Filters */}
          <TableQuickFilters quickFilters={quickFilters} />

          {/* Advanced Filters */}
          {showAddFilter && filterFields && filterFields.length > 0 && (
            <Filters
              fields={filterFields}
              value={activeFilters}
              onChange={onFiltersChange}
              addButtonText="Add filter"
              showOperators={true}
            />
          )}
        </div>

        {/* Right side: Toolbar */}
        <div className="flex items-center">
          <TableToolbar<T>
            showColumnFilter={showColumnFilter}
            onColumnVisibilityChange={onColumnVisibilityChange}
            visibleColumns={visibleColumns}
            columns={columns}
            showExport={showExport}
            onExportClick={onExportClick}
            customActions={customActions}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className={`w-full min-w-tatva-0 overflow-hidden ${
          isCompact ? "rounded-tatva-md border border-tatva-border-primary" : ""
        }`}
      >
        <div
          className={`${
            isRelaxed ? "[&>div]:rounded-tatva-none [&>div]:border-0" : ""
          }`}
        >
          <div
            className={`w-full ${
              isRelaxed
                ? "rounded-tatva-none border-0"
                : "overflow-hidden rounded-tatva-md"
            }`}
          >
            <TableContent<T>
              table={table}
              columnGroups={columnGroups}
              columnCount={columnCount}
              isLoading={isLoading}
              pageSize={pageSize}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
              emptyImageSrc={emptyImageSrc}
              emptyAction={emptyAction}
              onRowClick={onRowClick}
              maxHeight={maxHeight}
              variant={variant}
            />

            {showCursorPagination && (
              <CursorPagination
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                onPrevious={onPrevious}
                onNext={onNext}
                pageSize={pageSize}
                pageSizeOptions={pageSizeOptions}
                onPageSizeChange={onPageSizeChange}
                dataLength={data.length}
              />
            )}
            {showOffsetPagination && (
              <OffsetPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRows={totalRows!}
                pageSize={pageSize}
                onPageChange={onPageChange!}
                pageSizeOptions={pageSizeOptions}
                onPageSizeChange={onPageSizeChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type {
  QuickFilterConfig,
  SortingState,
  TableAction,
  TableColumn,
  TableProps,
} from "./types";
export { Table };
export default Table;
