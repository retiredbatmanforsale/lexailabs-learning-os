"use client";

import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Checkbox } from "../Checkbox";
import { IconName } from "../Icon";
import { Input } from "../Input";
import { List } from "../List";
import { Select } from "../Select";
import { Switch } from "../Switch";
import { Text } from "../Text";
import { Textarea } from "../Textarea";
import { CustomRenderContext, FormFieldConfig } from "./types";

interface FieldRendererProps<TFieldValues extends FieldValues> {
  fieldConfig: FormFieldConfig<TFieldValues>;
  formId: string;
  /** Current form values for dynamic props */
  currentValues: TFieldValues;
}

function FieldRenderer<TFieldValues extends FieldValues>({
  fieldConfig,
  formId,
  currentValues,
}: FieldRendererProps<TFieldValues>) {
  const { control, setValue, getValues, watch, trigger, clearErrors } =
    useFormContext<TFieldValues>();

  const {
    name,
    type,
    label,
    placeholder,
    helperText,
    disabled: disabledProp,
    readOnly,
    options: optionsProp,
    rows = 4,
    searchable,
    multiple,
    maxLength,
    min,
    max,
    icon,
    render,
    transform,
    showError = true,
  } = fieldConfig;

  // Resolve dynamic disabled
  const disabled =
    typeof disabledProp === "function"
      ? disabledProp(currentValues)
      : disabledProp;

  // Resolve dynamic options
  const options =
    typeof optionsProp === "function"
      ? optionsProp(currentValues)
      : (optionsProp ?? []);

  // Build context for custom render
  const renderContext: CustomRenderContext<TFieldValues> = {
    values: currentValues,
    setValue,
    getValues,
    watch,
    trigger,
    clearErrors,
  };

  const inputId = `${formId}-${String(name)}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;

        // Custom render
        if (type === "custom" && render) {
          return (
            <div className="flex flex-col gap-tatva-2">
              {label && <Text variant="body-sm">{label}</Text>}
              {render(field as never, errorMessage, renderContext)}
              {helperText && (!errorMessage || !showError) && (
                <Text variant="body-sm" tone="tertiary">
                  {helperText}
                </Text>
              )}
              {errorMessage && showError && (
                <Text variant="body-sm" tone="danger">
                  {errorMessage}
                </Text>
              )}
            </div>
          );
        }

        const rawValue = field.value;
        const transformedValue = transform?.input
          ? transform.input(rawValue)
          : rawValue;
        const handleChange = (value: unknown) => {
          const outputValue = transform?.output
            ? transform.output(value)
            : value;
          field.onChange(outputValue);
        };

        switch (type) {
          case "textarea":
            return (
              <Textarea
                id={inputId}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                rows={rows}
                maxLength={maxLength}
                value={String(transformedValue ?? "")}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                helperText={helperText}
                error={errorMessage}
              />
            );

          case "select":
            return multiple ? (
              <Select
                options={options}
                value={transformedValue as string[] | undefined}
                onValueChange={handleChange as (value: string[]) => void}
                placeholder={placeholder}
                disabled={disabled}
                searchable={searchable}
                multiple={true}
                label={label}
                error={errorMessage}
              />
            ) : (
              <Select
                options={options}
                value={transformedValue as string | undefined}
                onValueChange={handleChange as (value: string) => void}
                placeholder={placeholder}
                disabled={disabled}
                searchable={searchable}
                label={label}
                error={errorMessage}
              />
            );

          case "checkbox":
            return (
              <div className="flex flex-col gap-tatva-2">
                <Checkbox
                  id={inputId}
                  label={label}
                  checked={Boolean(transformedValue)}
                  onChange={(e) => handleChange(e.target.checked)}
                  disabled={disabled}
                  name={field.name}
                  ref={field.ref}
                />
                {helperText && (
                  <Text variant="body-sm" tone="tertiary">
                    {helperText}
                  </Text>
                )}
                {errorMessage && (
                  <Text variant="body-sm" tone="danger">
                    {errorMessage}
                  </Text>
                )}
              </div>
            );

          case "switch":
            return (
              <div className="flex flex-col gap-tatva-2 px-tatva-6 py-tatva-4">
                <List
                  title={label || ""}
                  subtitle={helperText}
                  size="sm"
                  disabled={disabled}
                >
                  <Switch
                    checked={Boolean(transformedValue)}
                    onCheckedChange={handleChange}
                    disabled={disabled}
                    name={field.name}
                    ref={field.ref}
                  />
                </List>
                {errorMessage && (
                  <Text variant="body-sm" tone="danger">
                    {errorMessage}
                  </Text>
                )}
              </div>
            );

          case "number":
            return (
              <Input
                id={inputId}
                type="number"
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                max={max}
                icon={icon as IconName}
                value={transformedValue != null ? String(transformedValue) : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  handleChange(val === "" ? undefined : Number(val));
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                helperText={helperText}
                error={errorMessage}
              />
            );

          default:
            // text, email, password, tel, url
            return (
              <Input
                id={inputId}
                type={type}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                maxLength={maxLength}
                icon={icon as IconName}
                value={String(transformedValue ?? "")}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                helperText={helperText}
                error={errorMessage}
              />
            );
        }
      }}
    />
  );
}

export default FieldRenderer;
