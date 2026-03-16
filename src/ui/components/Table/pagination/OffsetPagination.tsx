import { Button } from "../../Button";
import { Select } from "../../Select";
import { Text } from "../../Text";

export function OffsetPagination({
  currentPage,
  totalPages,
  totalRows,
  pageSize,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
}: {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}) {
  const startIndex = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalRows);

  const pageSizeSelectOptions = pageSizeOptions?.map((size) => ({
    label: size.toString(),
    value: size.toString(),
  }));

  return (
    <div className="flex items-center justify-between gap-tatva-4 border-t border-tatva-border-primary px-tatva-8 py-tatva-6">
      {/* Left side: Show [dropdown] Per page */}
      <div className="flex items-center gap-tatva-4">
        {pageSizeSelectOptions && onPageSizeChange && (
          <>
            <Text variant="body-sm" tone="tertiary">
              Show
            </Text>
            <div className="w-tatva-34">
              <Select
                options={pageSizeSelectOptions}
                value={pageSize.toString()}
                onValueChange={(value) =>
                  onPageSizeChange(Number(value as string))
                }
              />
            </div>
            <Text variant="body-sm" tone="tertiary">
              Per page
            </Text>
          </>
        )}
      </div>

      {/* Right side: [chevron-left] 1-5 of 10 [chevron-right] */}
      <div className="flex items-center gap-tatva-4">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon="chevron-left"
        />

        <Text variant="body-sm" tone="secondary">
          {startIndex}-{endIndex} of {totalRows}
        </Text>

        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon="chevron-right"
        />
      </div>
    </div>
  );
}
