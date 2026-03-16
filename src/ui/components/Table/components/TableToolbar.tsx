"use client";

import * as React from "react";
import { Button } from "../../Button";
import { Menu } from "../../Menu";
import { TableColumn } from "../types";

export interface TableToolbarProps<T = unknown> {
  /** Show column visibility button */
  showColumnFilter?: boolean;
  /** Column visibility change handler */
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  /** Visible column IDs */
  visibleColumns?: string[];
  /** All columns */
  columns: TableColumn<T>[];
  /** Show export button */
  showExport?: boolean;
  /** Export click handler */
  onExportClick?: () => void;
  /** Custom action buttons */
  customActions?: React.ReactNode;
}

export function TableToolbar<T = unknown>({
  showColumnFilter = true,
  onColumnVisibilityChange,
  visibleColumns,
  columns,
  showExport = true,
  onExportClick,
  customActions,
}: TableToolbarProps<T>) {
  // Helper function to check if a column is visible
  // If visibleColumns is not provided or empty, all columns are visible by default
  const isColumnVisible = React.useCallback(
    (columnId: string): boolean => {
      if (!visibleColumns || visibleColumns.length === 0) {
        return true; // All columns visible by default
      }
      return visibleColumns.includes(columnId);
    },
    [visibleColumns]
  );

  // Column visibility menu options
  const columnVisibilityOptions = React.useMemo(() => {
    return columns.map((col) => ({
      value: col.id,
      label: col.header,
    }));
  }, [columns]);

  // Get selected values (visible columns)
  const selectedColumns = React.useMemo(() => {
    if (!visibleColumns || visibleColumns.length === 0) {
      // If no visibleColumns provided, all columns are visible
      return columns.map((col) => col.id);
    }
    return visibleColumns;
  }, [visibleColumns, columns]);

  // Handle column selection toggle
  const handleSelect = React.useCallback(
    (value: string) => {
      const currentlyVisible = isColumnVisible(value);
      onColumnVisibilityChange?.(value, !currentlyVisible);
    },
    [isColumnVisible, onColumnVisibilityChange]
  );

  const showToolbar = showColumnFilter || showExport || customActions;

  if (!showToolbar) return null;

  return (
    <div className="flex items-center gap-tatva-6">
      {/* Column Filter */}
      {showColumnFilter && (
        <Menu
          options={columnVisibilityOptions}
          align="end"
          side="bottom"
          selectedValue={selectedColumns}
          onSelect={handleSelect}
          closeOnSelect={false}
        >
          <Button
            variant="outline"
            size="md"
            icon="layout-2-column"
            tooltip="Column visibility"
          />
        </Menu>
      )}

      {/* Export */}
      {showExport && (
        <Button
          variant="outline"
          size="md"
          icon="download"
          tooltip="Export"
          onClick={onExportClick}
        />
      )}

      {/* Custom Actions */}
      {customActions}
    </div>
  );
}
