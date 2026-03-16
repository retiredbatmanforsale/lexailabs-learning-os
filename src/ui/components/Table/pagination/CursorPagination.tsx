import { Button } from "../../Button";
import { Select } from "../../Select";
import { Text } from "../../Text";

export function CursorPagination({
  hasPreviousPage,
  hasNextPage,
  onPrevious,
  onNext,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  dataLength,
}: {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  dataLength?: number;
}) {
  const pageSizeSelectOptions = pageSizeOptions?.map((size) => ({
    label: size.toString(),
    value: size.toString(),
  }));

  return (
    <div className="flex items-center justify-between gap-tatva-4 border-t border-tatva-border-primary px-tatva-8 py-tatva-6">
      {/* Left side: [dropdown] Show X items */}
      <div className="flex items-center gap-tatva-4">
        {pageSizeSelectOptions && onPageSizeChange && pageSize && (
          <div className="w-tatva-34">
            <Select
              options={pageSizeSelectOptions}
              value={pageSize.toString()}
              onValueChange={(value) =>
                onPageSizeChange(Number(value as string))
              }
            />
          </div>
        )}
        {dataLength !== undefined && (
          <Text variant="body-sm" tone="tertiary">
            Show {dataLength} {dataLength === 1 ? "item" : "items"}
          </Text>
        )}
      </div>

      {/* Right side: [chevron-left] [chevron-right] */}
      <div className="flex items-center gap-tatva-4">
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasPreviousPage || !onPrevious}
          onClick={onPrevious}
          icon="chevron-left"
        />

        <Button
          variant="ghost"
          size="sm"
          disabled={!hasNextPage || !onNext}
          onClick={onNext}
          icon="chevron-right"
        />
      </div>
    </div>
  );
}
