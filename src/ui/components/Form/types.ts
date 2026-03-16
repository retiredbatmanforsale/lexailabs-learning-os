"use client";

import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { IconName } from "../Icon";
import { SelectOption } from "../Select";

export type FormFieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"
  | "number"
  | "email"
  | "tel"
  | "password"
  | "url"
  | "custom";

/**
 * Context passed to custom render functions for advanced control
 */
export interface CustomRenderContext<TFieldValues extends FieldValues> {
  /** Current form values */
  values: TFieldValues;
  /** Set a field value programmatically */
  setValue: UseFormReturn<TFieldValues>["setValue"];
  /** Get current field values */
  getValues: UseFormReturn<TFieldValues>["getValues"];
  /** Watch specific fields for changes */
  watch: UseFormReturn<TFieldValues>["watch"];
  /** Trigger validation on specific fields */
  trigger: UseFormReturn<TFieldValues>["trigger"];
  /** Clear field errors */
  clearErrors: UseFormReturn<TFieldValues>["clearErrors"];
}

export interface FormFieldConfig<
  TFieldValues extends FieldValues = FieldValues
> {
  /** Field name - must match form schema */
  name: Path<TFieldValues>;
  /** Field type */
  type: FormFieldType;
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper/description text */
  helperText?: string;
  /** Disable the field - can be boolean or function for dynamic disabling based on other field values */
  disabled?: boolean | ((values: TFieldValues) => boolean);
  /** Make field read-only */
  readOnly?: boolean;
  /** Column span (1-4) */
  colSpan?: 1 | 2 | 3 | 4;
  /** Options for select field - can be static or dynamic based on form values */
  options?: SelectOption[] | ((values: TFieldValues) => SelectOption[]);
  /** Rows for textarea */
  rows?: number;
  /** Enable search in select */
  searchable?: boolean;
  /** Enable multi-select */
  multiple?: boolean;
  /** Max length for text inputs */
  maxLength?: number;
  /** Min value for number inputs */
  min?: number;
  /** Max value for number inputs */
  max?: number;
  /** Icon for input */
  icon?: IconName;
  /** Custom render function with extended context */
  render?: (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
    error: string | undefined,
    context: CustomRenderContext<TFieldValues>
  ) => React.ReactNode;
  /** Hide field conditionally */
  hidden?: boolean | ((values: TFieldValues) => boolean);
  /** Transform input/output values */
  transform?: {
    input?: (value: unknown) => unknown;
    output?: (value: unknown) => unknown;
  };
  /** Show error message below field (default: true). Set to false if custom component handles errors internally */
  showError?: boolean;
}

/**
 * Field effect - defines side effects when a field changes
 */
export interface FieldEffect<TFieldValues extends FieldValues = FieldValues> {
  /** Field(s) that trigger this effect when changed */
  watch: Path<TFieldValues> | Path<TFieldValues>[];
  /** Handler called when watched field(s) change */
  handler: (
    changedValue: unknown,
    allValues: TFieldValues,
    context: {
      setValue: UseFormReturn<TFieldValues>["setValue"];
      previousValues: TFieldValues | undefined;
    }
  ) => void;
}
