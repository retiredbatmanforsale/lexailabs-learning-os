"use client";

import * as React from "react";
import { Button } from "../Button";
import Icon from "../Icon";
import { Menu, MenuOption } from "../Menu";
import { Text } from "../Text";
import {
  DEFAULT_OPERATORS,
  FilterCondition,
  FilterFieldConfig,
  FilterFieldType,
  FilterOperator,
  FiltersProps,
  MULTI_VALUE_OPERATORS,
  OPERATOR_LABELS,
  VALUE_LESS_OPERATORS,
} from "./types";

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Get operators for a field
const getOperatorsForField = (
  field: FilterFieldConfig
): { value: FilterOperator; label: string }[] => {
  const operators = field.operators || DEFAULT_OPERATORS[field.type];
  return operators.map((op) => ({
    value: op,
    label: OPERATOR_LABELS[op],
  }));
};

// Check if operator needs a value
const operatorNeedsValue = (operator: FilterOperator): boolean => {
  return !VALUE_LESS_OPERATORS.includes(operator);
};

// Check if operator supports multiple values
const operatorSupportsMultiple = (operator: FilterOperator): boolean => {
  return MULTI_VALUE_OPERATORS.includes(operator);
};

const Filters = React.forwardRef<HTMLDivElement, FiltersProps>(
  (
    {
      fields,
      value = [],
      onChange,
      showOperators = true,
      addButtonText = "Add filter",
      disabled = false,
    },
    ref
  ) => {
    // State for filter creation flow
    const [fieldMenuOpen, setFieldMenuOpen] = React.useState(false);
    const [operatorMenuOpen, setOperatorMenuOpen] = React.useState(false);
    const [isBuildingFilter, setIsBuildingFilter] = React.useState(false);

    // Selected values during filter creation
    const [selectedFieldId, setSelectedFieldId] = React.useState<string>("");
    const [selectedOperator, setSelectedOperator] =
      React.useState<FilterOperator | null>(null);
    const [inputValue, setInputValue] = React.useState<string>("");
    const [multiValue, setMultiValue] = React.useState<string[]>([]);

    // Refs for positioning menus
    const fieldButtonRef = React.useRef<HTMLDivElement>(null);
    const operatorButtonRef = React.useRef<HTMLDivElement>(null);
    const valueInputRef = React.useRef<HTMLInputElement>(null);

    // Get field config
    const selectedFieldConfig = fields.find((f) => f.id === selectedFieldId);
    const operators = selectedFieldConfig
      ? getOperatorsForField(selectedFieldConfig)
      : [];
    const needsValue = selectedOperator
      ? operatorNeedsValue(selectedOperator)
      : false;
    const supportsMultiple = selectedOperator
      ? operatorSupportsMultiple(selectedOperator) ||
        selectedFieldConfig?.type === "multi-select"
      : false;

    // Get field label by id
    const getFieldLabel = (fieldId: string): string => {
      const field = fields.find((f) => f.id === fieldId);
      return field?.label || fieldId;
    };

    // Format filter value for display
    const formatFilterValue = (filter: FilterCondition): string => {
      const field = fields.find((f) => f.id === filter.field);

      // Handle value-less operators
      if (VALUE_LESS_OPERATORS.includes(filter.operator)) {
        return "";
      }

      // Handle select fields - show labels instead of values
      if (field?.type === "select" || field?.type === "multi-select") {
        const values = filter.value.split(",");
        const labels = values.map((v) => {
          const option = field.options?.find((opt) => opt.value === v);
          return option?.label || v;
        });
        return labels.join(", ");
      }

      return filter.value;
    };

    // Handle field selection
    const handleFieldSelect = (fieldId: string) => {
      setSelectedFieldId(fieldId);
      setSelectedOperator(null); // Reset operator selection
      setFieldMenuOpen(false);
      setIsBuildingFilter(true);

      const field = fields.find((f) => f.id === fieldId);
      if (field && !showOperators) {
        // No operators, use default
        const defaultOp = "equals";
        setSelectedOperator(defaultOp);
        if (!operatorNeedsValue(defaultOp)) {
          handleAddFilter({
            field: fieldId,
            operator: defaultOp,
            value: "",
          });
          resetFilterState();
        } else {
          // Auto-open value menu for select/multi-select fields
          if (field.type === "select" || field.type === "multi-select") {
            setTimeout(() => setValueMenuOpen(true), 50);
          } else {
            setTimeout(() => valueInputRef.current?.focus(), 50);
          }
        }
      } else if (showOperators) {
        // Auto-open operator menu after field selection
        setTimeout(() => setOperatorMenuOpen(true), 50);
      }
    };

    // Handle operator selection
    const handleOperatorSelect = (operator: FilterOperator) => {
      setSelectedOperator(operator);
      setOperatorMenuOpen(false);

      // If operator doesn't need value, add filter immediately
      if (!operatorNeedsValue(operator)) {
        handleAddFilter({
          field: selectedFieldId,
          operator: operator,
          value: "",
        });
        resetFilterState();
      } else {
        // Auto-open value menu for select/multi-select fields, or focus input for text fields
        const field = fields.find((f) => f.id === selectedFieldId);
        if (field?.type === "select" || field?.type === "multi-select") {
          setTimeout(() => setValueMenuOpen(true), 50);
        } else {
          setTimeout(() => valueInputRef.current?.focus(), 50);
        }
      }
    };

    // Handle value input keydown
    const handleValueKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isValidValue) {
        handleValueSubmit();
      }
      // For multi-select, also submit on Enter when menu is open
      if (
        e.key === "Enter" &&
        supportsMultiple &&
        multiValue.length > 0 &&
        selectedOperator &&
        valueMenuOpen
      ) {
        handleAddFilter({
          field: selectedFieldId,
          operator: selectedOperator,
          value: multiValue.join(","),
        });
        resetFilterState();
        setValueMenuOpen(false);
      }
    };

    // Handle value submission
    const handleValueSubmit = () => {
      if (!selectedFieldId) return;

      // Validate value for operators that need it
      if (needsValue) {
        if (supportsMultiple && multiValue.length === 0) return;
        if (!supportsMultiple && !inputValue.trim()) return;
      }

      const filterValue = supportsMultiple ? multiValue.join(",") : inputValue;

      handleAddFilter({
        field: selectedFieldId,
        operator:
          showOperators && selectedOperator ? selectedOperator : "equals",
        value: filterValue,
      });

      resetFilterState();
    };

    // Reset filter creation state
    const resetFilterState = () => {
      setSelectedFieldId("");
      setSelectedOperator(null);
      setInputValue("");
      setMultiValue([]);
      setIsBuildingFilter(false);
      setFieldMenuOpen(false);
      setOperatorMenuOpen(false);
    };

    // Add a new filter
    const handleAddFilter = (newFilter: Omit<FilterCondition, "id">) => {
      const filterWithId: FilterCondition = {
        ...newFilter,
        id: generateId(),
      };
      onChange?.([...value, filterWithId]);
    };

    // Remove a filter
    const handleRemoveFilter = (filterId: string) => {
      onChange?.(value.filter((f) => f.id !== filterId));
    };

    // Clear all filters
    const handleClearAll = () => {
      onChange?.([]);
    };

    // Field menu options
    const fieldMenuOptions: MenuOption[] = fields.map((field) => ({
      value: field.id,
      label: field.label,
      onClick: () => handleFieldSelect(field.id),
    }));

    // Operator menu options
    const operatorMenuOptions: MenuOption[] = operators.map((op) => ({
      value: op.value,
      label: op.label,
      onClick: () => handleOperatorSelect(op.value),
    }));

    const isValidValue =
      !needsValue ||
      (supportsMultiple ? multiValue.length > 0 : inputValue.trim().length > 0);

    // Value menu state
    const [valueMenuOpen, setValueMenuOpen] = React.useState(false);

    // Handle value selection from menu
    const handleValueSelect = (value: string) => {
      if (supportsMultiple) {
        const newMultiValue = multiValue.includes(value)
          ? multiValue.filter((v) => v !== value)
          : [...multiValue, value];
        setMultiValue(newMultiValue);
        // Don't auto-submit for multi-select - let user select multiple values
        // Filter will be submitted when menu closes (onBlur) or when user presses Enter
      } else {
        setInputValue(value);
        if (value && selectedOperator) {
          handleAddFilter({
            field: selectedFieldId,
            operator: selectedOperator,
            value: value,
          });
          resetFilterState();
        }
      }
    };

    // Get selected value label(s) for display
    const getSelectedValueLabel = () => {
      if (!selectedFieldConfig) return "";

      if (supportsMultiple) {
        if (multiValue.length === 0) {
          return selectedFieldConfig.placeholder || "Select value...";
        }
        const labels = multiValue.map((v) => {
          const option = selectedFieldConfig.options?.find(
            (opt) => opt.value === v
          );
          return option?.label || v;
        });
        return labels.join(", ");
      } else {
        if (!inputValue) {
          return selectedFieldConfig.placeholder || "Select value...";
        }
        const option = selectedFieldConfig.options?.find(
          (opt) => opt.value === inputValue
        );
        return option?.label || inputValue;
      }
    };

    // Common Menu props
    const commonMenuProps = {
      side: "bottom" as const,
      align: "start" as const,
      closeOnSelect: true,
    };

    // Common pill container class
    const pillContainerClass =
      "flex items-center h-[36px] rounded-tatva-full border border-tatva-border-secondary box-border";

    // Render filter pill section (field, operator, or value)
    const renderFilterPillSection = (
      content: React.ReactNode,
      showBorder = true
    ) => (
      <div
        className={`flex h-full items-center px-tatva-6 ${
          showBorder ? "border-r border-tatva-border-secondary" : ""
        }`}
      >
        {content}
      </div>
    );

    // Render pill button with text
    const renderPillButton = (
      label: string,
      isSelected: boolean,
      onClick?: () => void,
      className = ""
    ) => (
      <button
        type="button"
        onClick={onClick}
        className={`flex h-full items-center px-tatva-6 transition-colors ${className}`}
      >
        <Text
          variant="body-md"
          tone={isSelected ? "default" : "tertiary"}
          lineClamp={1}
        >
          {label}
        </Text>
      </button>
    );

    // Render value input based on field type
    const renderValueInput = () => {
      if (!selectedFieldConfig || !needsValue) return null;

      if (
        selectedFieldConfig.type === "select" ||
        selectedFieldConfig.type === "multi-select"
      ) {
        const valueMenuOptions: MenuOption[] =
          selectedFieldConfig.options?.map((option) => ({
            value: option.value,
            label: option.label,
            onClick: () => handleValueSelect(option.value),
          })) || [];

        const selectedLabel = getSelectedValueLabel();
        const isPlaceholder = supportsMultiple
          ? multiValue.length === 0
          : !inputValue;

        return (
          <Menu
            {...commonMenuProps}
            options={valueMenuOptions}
            open={valueMenuOpen}
            onOpenChange={(open) => {
              setValueMenuOpen(open);
              // When menu closes for multi-select, submit if we have values
              if (
                !open &&
                supportsMultiple &&
                multiValue.length > 0 &&
                selectedOperator
              ) {
                handleAddFilter({
                  field: selectedFieldId,
                  operator: selectedOperator,
                  value: multiValue.join(","),
                });
                resetFilterState();
              }
            }}
            closeOnSelect={!supportsMultiple}
            searchable={(selectedFieldConfig.options?.length || 0) > 5}
            searchPlaceholder="Search..."
            selectedValue={supportsMultiple ? multiValue : inputValue}
          >
            <button
              type="button"
              className={`flex h-full items-center text-tatva-body-md transition-colors ${
                isPlaceholder
                  ? "text-tatva-content-tertiary"
                  : "text-tatva-content-primary"
              }`}
            >
              <span className="truncate text-left">{selectedLabel}</span>
            </button>
          </Menu>
        );
      }

      return (
        <input
          ref={valueInputRef}
          type={selectedFieldConfig.type === "number" ? "number" : "text"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleValueKeyDown}
          onBlur={() => {
            if (isValidValue && inputValue.trim()) {
              handleValueSubmit();
            }
          }}
          placeholder={selectedFieldConfig.placeholder || "Enter value..."}
          className="w-tatva-60 border-none bg-transparent text-tatva-body-md text-tatva-content-primary placeholder:text-tatva-content-tertiary focus-visible:outline-none"
        />
      );
    };

    return (
      <div ref={ref} className="flex flex-wrap items-center gap-tatva-6">
        {/* Active Filter Pills - Show first */}
        {value.length > 0 && (
          <>
            {value.map((filter) => {
              const displayValue = formatFilterValue(filter);
              const operatorLabel = OPERATOR_LABELS[filter.operator];

              return (
                <div key={filter.id} className={pillContainerClass}>
                  {/* Field */}
                  {renderFilterPillSection(
                    <Text variant="body-md" tone="default" lineClamp={1}>
                      {getFieldLabel(filter.field)}
                    </Text>
                  )}

                  {/* Operator */}
                  {showOperators &&
                    renderFilterPillSection(
                      <Text variant="body-md" tone="default" lineClamp={1}>
                        {operatorLabel}
                      </Text>
                    )}

                  {/* Value */}
                  {displayValue && (
                    <div className="flex h-full max-w-tatva-100 items-center pl-tatva-6 pr-tatva-4">
                      <Text variant="body-md" tone="default" lineClamp={1}>
                        {displayValue}
                      </Text>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveFilter(filter.id)}
                    className="flex h-full w-tatva-18 items-center justify-center rounded-r-tatva-full pr-tatva-6 text-tatva-content-tertiary transition-colors hover:text-tatva-content-primary"
                    aria-label="Remove filter"
                  >
                    <Icon name="close" size="xs" />
                  </button>
                </div>
              );
            })}
          </>
        )}

        {/* Add Filter Button or Building Filter Pill - Show after filters or on left if no filters */}
        {!isBuildingFilter ? (
          <div className="inline-flex w-fit shrink-0">
            <Menu
              {...commonMenuProps}
              options={fieldMenuOptions}
              open={fieldMenuOpen}
              onOpenChange={setFieldMenuOpen}
              searchable={fields.length > 5}
              searchPlaceholder="Search..."
            >
              <div ref={fieldButtonRef}>
                <Button
                  variant="outline"
                  size="md"
                  icon="filter-horizontal"
                  disabled={disabled}
                  width="fit"
                >
                  {value.length > 0 ? "" : addButtonText}
                </Button>
              </div>
            </Menu>
          </div>
        ) : (
          <div className={pillContainerClass}>
            {/* Field Section */}
            <div
              ref={fieldButtonRef}
              className="flex h-full items-center border-r border-tatva-border-secondary"
            >
              <Menu
                {...commonMenuProps}
                options={fieldMenuOptions}
                open={fieldMenuOpen}
                onOpenChange={setFieldMenuOpen}
                searchable={fields.length > 5}
                searchPlaceholder="Search..."
              >
                {renderPillButton(
                  selectedFieldId
                    ? getFieldLabel(selectedFieldId)
                    : "Select Filter",
                  !!selectedFieldId,
                  undefined,
                  "rounded-l-tatva-full"
                )}
              </Menu>
            </div>

            {/* Operator Section */}
            {selectedFieldId && showOperators && (
              <>
                <div
                  ref={operatorButtonRef}
                  className={`flex h-full items-center ${
                    selectedOperator
                      ? "border-r border-tatva-border-secondary"
                      : ""
                  }`}
                >
                  <Menu
                    {...commonMenuProps}
                    options={operatorMenuOptions}
                    open={operatorMenuOpen}
                    onOpenChange={setOperatorMenuOpen}
                    sideOffset={8}
                  >
                    {renderPillButton(
                      selectedOperator
                        ? OPERATOR_LABELS[selectedOperator]
                        : "Select Condition",
                      !!selectedOperator
                    )}
                  </Menu>
                </div>
              </>
            )}

            {/* Value Section */}
            {selectedFieldId && selectedOperator && needsValue && (
              <div className="flex h-full items-center px-tatva-6">
                {renderValueInput()}
              </div>
            )}
          </div>
        )}

        {/* Clear All Button */}
        {value.length > 1 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex min-h-tatva-18 items-center justify-center rounded-tatva-full px-tatva-8 font-matter text-tatva-body-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tatva-border-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <Text variant="body-sm" tone="brand">
              Clear All
            </Text>
          </button>
        )}
      </div>
    );
  }
);

Filters.displayName = "Filters";

export { Filters };
export type {
  FilterCondition,
  FilterFieldConfig,
  FilterFieldType,
  FilterOperator,
  FiltersProps,
};
export default Filters;
