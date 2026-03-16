"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

const stepperVariants = cva("flex w-full items-center", {
  variants: {
    size: {
      sm: "gap-tatva-4", // 8px gap
      md: "gap-tatva-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const trackVariants = cva("w-full rounded-tatva-full", {
  variants: {
    size: {
      sm: "h-tatva-2",
      md: "h-tatva-4",
    },
    completed: {
      true: "bg-tatva-brand-content-primary",
      false: "bg-tatva-background-tertiary",
    },
  },
  defaultVariants: {
    size: "sm",
    completed: false,
  },
});

export interface StepperStep {
  /** Label for the step */
  label: string;
}

export interface StepperProps extends VariantProps<typeof stepperVariants> {
  /** Array of steps */
  steps: StepperStep[];
  /**
   * Current step (0-indexed). Steps up to and including this index are marked complete.
   * Use -1 or undefined for no steps complete.
   */
  currentStep?: number;
  /**
   * Size variant
   * - `sm`: 4px track height
   * - `md`: 8px track height
   */
  size?: "sm" | "md";
  /** Whether to show step labels */
  showLabels?: boolean;
}

// ============================================================================
// Component
// ============================================================================

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep = -1, size = "sm", showLabels = true }, ref) => {
    return (
      <div ref={ref} className={cn(stepperVariants({ size }))}>
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;

          return (
            <div
              key={index}
              className="flex min-w-tatva-32 flex-1 flex-col gap-tatva-4"
            >
              {showLabels && (
                <div className="w-full text-center">
                  <Text variant={size === "sm" ? "body-sm" : "body-md"}>
                    {step.label}
                  </Text>
                </div>
              )}
              <div
                className={cn(trackVariants({ size, completed: isCompleted }))}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

// ============================================================================
// Exports
// ============================================================================

export { Stepper, stepperVariants, trackVariants };
export default Stepper;
