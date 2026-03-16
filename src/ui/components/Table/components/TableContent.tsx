"use client";

import {
  Cell,
  flexRender,
  Header,
  HeaderGroup,
  Row,
  Table as TanStackTable,
} from "@tanstack/react-table";
import { EmptyState } from "../../EmptyState";
import Icon from "../../Icon";
import { Text } from "../../Text";
import { TableLoading } from "../states/TableLoading";
import {
  tableCellVariants,
  tableRowVariants
} from "../styles";

export interface TableContentProps<T> {
  table: TanStackTable<T>;
  columnGroups: { title: string; colSpan: number }[] | null;
  columnCount: number;
  isLoading: boolean;
  pageSize: number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyImageSrc?: string;
  emptyAction?: { label: string; onClick: () => void };
  onRowClick?: (row: T) => void;
  maxHeight?: string | number;
  variant?: "compact" | "relaxed";
}

export function TableContent<T>({
  table,
  columnGroups,
  columnCount,
  isLoading,
  pageSize,
  emptyTitle,
  emptyDescription,
  emptyImageSrc,
  emptyAction,
  onRowClick,
  maxHeight,
  variant = "relaxed",
}: TableContentProps<T>) {
  const scrollStyle = maxHeight
    ? {
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }
    : undefined;

  return (
    <div className="overflow-x-auto " style={scrollStyle}>
      <table
        className="border-collapse"
        style={{ borderSpacing: 0, minWidth: "100%" }}
      >
        <thead
          className={`bg-tatva-surface-secondary ${
            maxHeight ? "sticky top-0 z-10" : ""
          }`}
        >
          {columnGroups && (
            <tr>
              {columnGroups.map((group, index) => (
                <th
                  key={index}
                  colSpan={group.colSpan}
                  className="border-b border-tatva-border-primary p-tatva-4 text-left font-normal"
                >
                  <Text variant="body-sm" tone="default">
                    {group.title}
                  </Text>
                </th>
              ))}
            </tr>
          )}
          {table
            .getHeaderGroups()
            .map((headerGroup: HeaderGroup<T>, groupIndex) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(
                  (header: Header<T, unknown>, headerIndex, headers) => {
                    const isActionsHeader = header.column.id === "actions";
                    const showRoundedCorners = variant === "compact" && groupIndex === 0 && !columnGroups;
                    const headerWidth = isActionsHeader ? "60px" : header.getSize() || "auto";
                    
                    return (
                      <th
                        key={header.id}
                        className={`overflow-hidden border-b border-tatva-border-secondary ${
                          isActionsHeader ? "py-tatva-8" : "p-tatva-8"
                        } text-left font-normal ${
                          header.column.getCanSort() ? "cursor-pointer select-none" : ""
                        } ${
                          showRoundedCorners && headerIndex === 0 ? "rounded-tl-tatva-md" : ""
                        } ${
                          showRoundedCorners && headerIndex === headers.length - 1 ? "rounded-tr-tatva-md" : ""
                        }`}
                        style={{
                          width: headerWidth,
                          minWidth: headerWidth,
                          ...(isActionsHeader && { maxWidth: "60px" }),
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div
                          className={`flex min-w-tatva-0 items-center gap-tatva-4 ${
                            isActionsHeader ? "justify-center" : "justify-start"
                          }`}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="w-fit min-w-tatva-0 overflow-hidden">
                              <Text
                                variant="body-md"
                                tone="secondary"
                                lineClamp={1}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </Text>
                            </div>
                          )}
                          {header.column.getCanSort() && (
                            <div className="flex h-tatva-8 shrink-0 flex-col items-center justify-center">
                              {header.column.getIsSorted() === "asc" ? (
                                <Icon
                                  name="arrow-up"
                                  size="xs"
                                  tone="secondary"
                                />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <Icon
                                  name="arrow-down"
                                  size="xs"
                                  tone="secondary"
                                />
                              ) : (
                                <div className="flex h-tatva-8 flex-col items-center justify-center -space-y-tatva-2">
                                  <Icon
                                    name="arrow-up"
                                    size="xs"
                                    tone="tertiary"
                                  />
                                  <Icon
                                    name="arrow-down"
                                    size="xs"
                                    tone="tertiary"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  }
                )}
              </tr>
            ))}
        </thead>

        <tbody className="[&>tr:last-child>td]:border-b-0">
          {isLoading ? (
            <TableLoading columns={columnCount} pageSize={pageSize} />
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columnCount}>
                <div className="min-w-tatva-15 py-tatva-14">
                  <EmptyState
                    heading={emptyTitle || "No data"}
                    body={emptyDescription || "There are no items to display."}
                    imageSrc={emptyImageSrc || "/images/empty-table.png"}
                    actions={emptyAction ? [emptyAction] : undefined}
                  />
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row: Row<T>) => (
              <tr
                key={row.id}
                className={tableRowVariants({
                  clickable: !!onRowClick,
                })}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell: Cell<T, unknown>) => {
                  const isActionsCell = cell.column.id === "actions";
                  const isRelaxed = variant === "relaxed";
                  const cellWidth = isActionsCell ? "60px" : cell.column.getSize() || "auto";
                  
                  return (
                    <td
                      key={cell.id}
                      className={`border-b border-tatva-border-primary ${
                        isActionsCell
                          ? isRelaxed ? "" : "py-tatva-8"
                          : tableCellVariants({
                              variant: isRelaxed ? "relaxed" : "compact",
                            })
                      } overflow-hidden`}
                      style={{
                        width: cellWidth,
                        minWidth: cellWidth,
                        ...(isActionsCell && { maxWidth: "60px" }),
                        ...(isRelaxed && { minHeight: "60px", verticalAlign: "center" }),
                      }}
                    >
                      {isRelaxed ? (
                        <div
                          className={`flex min-h-tatva-30 min-w-tatva-0 items-center ${
                            isActionsCell ? "justify-center" : "justify-start"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ) : (
                        <div
                          className={`min-w-tatva-0 ${
                            isActionsCell ? "flex justify-center" : ""
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
