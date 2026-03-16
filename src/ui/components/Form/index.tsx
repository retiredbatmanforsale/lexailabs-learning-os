"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { Button } from "../Button";
import FieldRenderer from "./FieldRenderer";
import { FieldEffect, FormFieldConfig } from "./types";

// ============================================================================
// Types
// ============================================================================

export interface FormProps<TFieldValues extends FieldValues> {
  /** Field configurations */
  fields: FormFieldConfig<TFieldValues>[];
  /** Submit handler */
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  /** External form instance (for controlled usage) */
  form?: UseFormReturn<TFieldValues>;
  /** Zod validation schema */
  schema?: ZodSchema<TFieldValues>;
  /** Default form values */
  defaultValues?: Partial<TFieldValues>;
  /** Number of columns (1-4) */
  columns?: 1 | 2 | 3 | 4;
  /** Custom grid template */
  gridTemplate?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Cancel handler */
  onCancel?: () => void;
  /** External loading state */
  isSubmitting?: boolean;
  /** Show action buttons */
  showActions?: boolean;
  /** Actions alignment */
  actionsPosition?: "left" | "center" | "right";
  /** Reset form after submit */
  resetOnSubmit?: boolean;
  /** Validation mode */
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  /** Additional content */
  children?: React.ReactNode;
  /** Form ID */
  id?: string;
  /**
   * Field effects - define side effects when specific fields change.
   * Useful for mutual exclusivity, clearing dependent fields, etc.
   *
   * @example
   * effects={[
   *   {
   *     watch: "isAgentUpdateable",
   *     handler: (value, allValues, { setValue }) => {
   *       if (value) setValue("update_post_interaction", false);
   *     }
   *   }
   * ]}
   */
  effects?: FieldEffect<TFieldValues>[];
  /**
   * Callback when any field value changes.
   * Useful for external side effects or debugging.
   */
  onValuesChange?: (
    values: TFieldValues,
    changedField?: Path<TFieldValues>
  ) => void;
}

// ============================================================================
// Constants
// ============================================================================

const GRID_COLS_MAP = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const;

const COL_SPAN_MAP = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
} as const;

const ACTIONS_JUSTIFY_MAP = {
  left: "start",
  center: "center",
  right: "end",
} as const;

// ============================================================================
// Component
// ============================================================================

function FormComponent<TFieldValues extends FieldValues>({
  fields,
  onSubmit,
  form: externalForm,
  schema,
  defaultValues,
  columns = 1,
  gridTemplate,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onCancel,
  isSubmitting: externalIsSubmitting,
  showActions = true,
  actionsPosition = "right",
  resetOnSubmit = false,
  mode = "onSubmit",
  children,
  id,
  effects,
  onValuesChange,
}: FormProps<TFieldValues>) {
  const formId = React.useId();
  const finalFormId = id ?? formId;

  const internalForm = useForm<TFieldValues>({
    resolver: schema ? zodResolver(schema as any) as any : undefined,
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
    mode,
  });

  const form = externalForm ?? internalForm;

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting: formIsSubmitting },
  } = form;

  const isSubmitting = externalIsSubmitting ?? formIsSubmitting;
  const watchedValues = watch();

  // Track previous values for effects
  const previousValuesRef = React.useRef<TFieldValues | undefined>(undefined);

  // Handle field effects
  React.useEffect(() => {
    if (!effects || effects.length === 0) return;

    const previousValues = previousValuesRef.current;

    effects.forEach((effect) => {
      const watchFields = Array.isArray(effect.watch)
        ? effect.watch
        : [effect.watch];

      // Check if any watched field changed
      const hasChanged = watchFields.some((fieldName) => {
        const currentValue = watchedValues[fieldName];
        const prevValue = previousValues?.[fieldName];
        return currentValue !== prevValue;
      });

      if (hasChanged && previousValues !== undefined) {
        // Get the first changed field's value for the handler
        const changedField = watchFields.find(
          (fieldName) =>
            watchedValues[fieldName] !== previousValues?.[fieldName]
        );
        const changedValue = changedField
          ? watchedValues[changedField]
          : undefined;

        effect.handler(changedValue, watchedValues, {
          setValue,
          previousValues,
        });
      }
    });

    previousValuesRef.current = { ...watchedValues };
  }, [watchedValues, effects, setValue]);

  // Call onValuesChange when values change
  React.useEffect(() => {
    if (onValuesChange) {
      onValuesChange(watchedValues);
    }
  }, [watchedValues, onValuesChange]);

  const handleFormSubmit = React.useCallback(
    async (data: TFieldValues) => {
      await onSubmit(data);
      if (resetOnSubmit) {
        reset();
      }
    },
    [onSubmit, reset, resetOnSubmit]
  );

  const visibleFields = React.useMemo(() => {
    return fields.filter((fieldConfig) => {
      if (fieldConfig.hidden === undefined) return true;
      if (typeof fieldConfig.hidden === "function") {
        return !fieldConfig.hidden(watchedValues);
      }
      return !fieldConfig.hidden;
    });
  }, [fields, watchedValues]);

  const gridClassName = GRID_COLS_MAP[columns];

  return (
    <FormProvider {...form}>
      <form
        id={finalFormId}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full font-matter"
      >
        <div
          className={`grid gap-tatva-8 ${!gridTemplate ? gridClassName : ""}`}
          style={
            gridTemplate ? { gridTemplateColumns: gridTemplate } : undefined
          }
        >
          {visibleFields.map((fieldConfig) => {
            const colSpan = fieldConfig.colSpan ?? 1;
            const colSpanClassName = !gridTemplate
              ? COL_SPAN_MAP[colSpan]
              : undefined;

            return (
              <div key={String(fieldConfig.name)} className={colSpanClassName}>
                <FieldRenderer<TFieldValues>
                  fieldConfig={fieldConfig}
                  formId={finalFormId}
                  currentValues={watchedValues}
                />
              </div>
            );
          })}
        </div>

        {children}

        {showActions && (
          <div
            className={`mt-tatva-12 flex gap-tatva-4${ACTIONS_JUSTIFY_MAP[actionsPosition]}`}
          >
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" isLoading={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

// Memoize component while preserving generics
const Form = React.memo(FormComponent) as typeof FormComponent;

export type {
  CustomRenderContext,
  FieldEffect,
  FormFieldConfig,
  FormFieldType,
} from "./types";
export { Form, useFormContext };
export default Form;
