"use client";

import { Select } from "../../Select";
import { QuickFilterConfig } from "../types";

export interface TableQuickFiltersProps {
  /** Quick filter dropdowns */
  quickFilters?: QuickFilterConfig[];
}

export function TableQuickFilters({
  quickFilters = [],
}: TableQuickFiltersProps) {
  if (quickFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-tatva-6">
      {quickFilters.map((filter) => {
        const {
          id,
          label,
          options,
          value,
          onChange,
          placeholder,
          onOpenChange,
          ...selectProps
        } = filter;

        return (
          <div key={id} className="w-tatva-60">
            <Select
              {...selectProps}
              options={options}
              value={value || ""}
              onValueChange={(val) => onChange?.(val)}
              onOpenChange={onOpenChange}
              placeholder={placeholder || label}
            />
          </div>
        );
      })}
    </div>
  );
}
