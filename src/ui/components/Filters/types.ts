"use client";

import { SelectOption } from "../Select";

/**
 * Filter operator types
 */
export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "starts_with"
  | "ends_with"
  | "greater_than"
  | "less_than"
  | "greater_than_or_equal"
  | "less_than_or_equal"
  | "is_empty"
  | "is_not_empty"
  | "in"
  | "not_in";

/**
 * Filter field type
 */
export type FilterFieldType = "text" | "number" | "select" | "multi-select";

/**
 * Configuration for a single filter field
 */
export interface FilterFieldConfig {
  /** Unique identifier for the field */
  id: string;
  /** Display label for the field */
  label: string;
  /** Type of field (determines available operators and input) */
  type: FilterFieldType;
  /** Available operators for this field (overrides defaults based on type) */
  operators?: FilterOperator[];
  /** Options for select/multi-select type fields */
  options?: SelectOption[];
  /** Placeholder text for the value input */
  placeholder?: string;
}

/**
 * An active filter condition
 */
export interface FilterCondition {
  /** Unique identifier for this filter instance */
  id: string;
  /** The field being filtered */
  field: string;
  /** The operator to apply */
  operator: FilterOperator;
  /** The value to filter by (comma-separated for 'in'/'not_in' operators) */
  value: string;
}

/**
 * Props for the Filters component
 */
export interface FiltersProps {
  /** Configuration for available filter fields */
  fields: FilterFieldConfig[];
  /** Currently active filters (controlled) */
  value?: FilterCondition[];
  /** Callback when filters change */
  onChange?: (filters: FilterCondition[]) => void;
  /** Whether to show operator selector (if false, defaults to 'equals') */
  showOperators?: boolean;
  /** Placeholder text for the add filter button */
  addButtonText?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Default operators for each field type
 */
export const DEFAULT_OPERATORS: Record<FilterFieldType, FilterOperator[]> = {
  text: [
    "equals",
    "not_equals",
    "contains",
    "not_contains",
    "starts_with",
    "ends_with",
    "is_empty",
    "is_not_empty",
  ],
  number: [
    "equals",
    "not_equals",
    "greater_than",
    "less_than",
    "greater_than_or_equal",
    "less_than_or_equal",
    "is_empty",
    "is_not_empty",
  ],
  select: ["equals", "not_equals", "in", "not_in", "is_empty", "is_not_empty"],
  "multi-select": ["in", "not_in", "is_empty", "is_not_empty"],
};

/**
 * Human-readable labels for operators
 */
export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  equals: "equals",
  not_equals: "not equals",
  contains: "contains",
  not_contains: "does not contain",
  starts_with: "starts with",
  ends_with: "ends with",
  greater_than: "greater than",
  less_than: "less than",
  greater_than_or_equal: "≥",
  less_than_or_equal: "≤",
  is_empty: "is empty",
  is_not_empty: "is not empty",
  in: "is one of",
  not_in: "is not one of",
};

/**
 * Short symbols for operators (used in badges)
 */
export const OPERATOR_SYMBOLS: Record<FilterOperator, string> = {
  equals: "=",
  not_equals: "≠",
  contains: "∋",
  not_contains: "∌",
  starts_with: "^",
  ends_with: "$",
  greater_than: ">",
  less_than: "<",
  greater_than_or_equal: "≥",
  less_than_or_equal: "≤",
  is_empty: "∅",
  is_not_empty: "≢∅",
  in: "∈",
  not_in: "∉",
};

/**
 * Operators that don't require a value
 */
export const VALUE_LESS_OPERATORS: FilterOperator[] = [
  "is_empty",
  "is_not_empty",
];

/**
 * Operators that support multiple values
 */
export const MULTI_VALUE_OPERATORS: FilterOperator[] = ["in", "not_in"];
