"use client";

import { cn } from "../../lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Button, type ButtonVariants } from "../Button";
import Loader from "../Loader";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

export interface DialogAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Button variant */
  variant?: ButtonVariants["variant"];
  /** Loading state */
  isLoading?: boolean;
}

export interface DialogProps {
  /** Controls the open/closed state */
  open: boolean;
  /** Callback fired when the dialog should close */
  onOpenChange: (open: boolean) => void;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Main content */
  children?: React.ReactNode;
  /** Submit button text (shows submit button when provided) */
  submitButtonText?: string;
  /** Submit button click handler */
  onSubmit?: () => void | Promise<void>;
  /** Submit button loading state */
  isSubmitting?: boolean;
  /** Submit button disabled state */
  submitButtonDisabled?: boolean;
  /** Submit button variant */
  submitButtonVariant?: ButtonVariants["variant"];
  /** Cancel button text */
  cancelButtonText?: string;
  /** Cancel button click handler */
  onCancel?: () => void;
  /** Cancel button variant */
  cancelButtonVariant?: ButtonVariants["variant"];
  /** Show close button (X icon) in top right */
  showCloseButton?: boolean;
  /** Dialog size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Prevent closing when clicking outside */
  preventOutsideClose?: boolean;
  /** Prevent closing when pressing Escape */
  preventEscapeClose?: boolean;
  /** Image element to display */
  image?: React.ReactNode;
  /** Position of the image */
  imagePosition?: "top" | "left";
  /** Disclaimer content shown below actions (e.g., terms & conditions with links) */
  disclaimer?: React.ReactNode;
  /** Step configuration (for stepped modals) */
  stepConfig?: {
    totalSteps: number;
    currentStep: number;
  };
}

// ============================================================================
// Styles
// ============================================================================

const dialogOverlayVariants = cva([
  "fixed inset-0 z-50 bg-tatva-background-black/50 backdrop-blur-sm",
  "data-[state=open]:animate-tatva-dialog-overlay-in",
  "data-[state=closed]:animate-tatva-dialog-overlay-out",
]);

// eslint-disable-next-line tailwindcss/no-arbitrary-value
const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "flex max-h-[95vh] flex-col overflow-hidden bg-tatva-surface-secondary outline-none",
    "data-[state=open]:animate-tatva-dialog-content-in",
    "data-[state=closed]:animate-tatva-dialog-content-out",
  ],
  {
    variants: {
      size: {
        sm: "w-[95vw] rounded-tatva-md sm:w-[360px] md:w-[400px] lg:w-tatva-600 lg:max-w-md",
        md: "w-[95vw] rounded-tatva-md sm:w-[420px] md:w-[520px] lg:max-w-lg",
        lg: "w-[95vw] rounded-tatva-lg sm:w-[520px] md:w-[640px] lg:max-w-xl",
        xl: "w-[95vw] rounded-tatva-lg sm:w-[660px] md:w-[820px] lg:max-w-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to delay unmounting until exit animation completes
 */
function useDelayedMount(open: boolean, exitDelay: number = 150) {
  const [shouldMount, setShouldMount] = React.useState(open);

  React.useEffect(() => {
    if (open) {
      setShouldMount(true);
    } else {
      const timer = setTimeout(() => setShouldMount(false), exitDelay);
      return () => clearTimeout(timer);
    }
  }, [open, exitDelay]);

  return shouldMount;
}

// ============================================================================
// Component
// ============================================================================

function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  submitButtonText,
  onSubmit,
  isSubmitting = false,
  submitButtonDisabled = false,
  submitButtonVariant = "primary",
  cancelButtonText = "Cancel",
  onCancel,
  cancelButtonVariant = "secondary",
  showCloseButton = true,
  size = "md",
  preventOutsideClose = false,
  preventEscapeClose = false,
  image,
  imagePosition = "top",
  stepConfig,
  disclaimer,
}: DialogProps) {
  const hasHeader = title || description;
  const hasFooter = !!submitButtonText;
  const shouldMount = useDelayedMount(open, 150);
  const hasImage = !!image;

  // Content rendered inline to prevent re-mounting on every render
  const dialogContent = (
    <div className={cn("flex min-h-0 flex-1 flex-col")}>
      {/* Close Button */}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <div className="absolute right-tatva-8 top-tatva-8 z-10">
            <Button variant="ghost" icon="close" aria-label="Close" />
          </div>
        </DialogPrimitive.Close>
      )}

      {/* Header */}
      {hasHeader && (
        <div className="flex shrink-0 flex-col gap-tatva-2 p-tatva-12 pb-tatva-6">
          {title && (
            <DialogPrimitive.Title asChild>
              <Text variant="heading-sm">{title}</Text>
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description asChild>
              <Text variant="body-md" tone="secondary">
                {description}
              </Text>
            </DialogPrimitive.Description>
          )}
        </div>
      )}

      {!!stepConfig && (
        <div className="flex shrink-0 justify-center px-tatva-12 py-tatva-4">
          <Loader
            variant="linear"
            size="sm"
            value={(stepConfig.currentStep / stepConfig.totalSteps) * 100}
          />
        </div>
      )}

      {/* Scrollable Content */}
      {children && (
        <div
          className={cn(
            "flex-1 overflow-y-auto px-tatva-12",
            hasHeader ? "" : "pt-tatva-12"
          )}
        >
          {children}
        </div>
      )}

      {/* Footer */}
      {hasFooter && (
        <div className="shrink-0 px-tatva-12 pb-tatva-12 pt-tatva-6">
          <div className="flex items-center justify-between gap-tatva-4">
            {!!stepConfig && (
              <div className="flex justify-center gap-tatva-2 py-tatva-4">
                {Array.from({ length: stepConfig.totalSteps }).map(
                  (_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "size-tatva-3 rounded-tatva-full",
                        index + 1 <= stepConfig.currentStep
                          ? "bg-tatva-background-black"
                          : "bg-tatva-background-tertiary"
                      )}
                    />
                  )
                )}
              </div>
            )}
            <div className="ml-auto flex items-center gap-tatva-4">
              <Button
                variant={cancelButtonVariant}
                onClick={onCancel ?? (() => onOpenChange(false))}
              >
                {cancelButtonText}
              </Button>
              <Button
                variant={submitButtonVariant}
                onClick={onSubmit}
                isLoading={isSubmitting}
                disabled={submitButtonDisabled}
              >
                {submitButtonText}
              </Button>
            </div>
          </div>
        </div>
      )}

      {disclaimer && (
        <div className="flex shrink-0 items-center justify-center gap-tatva-2 px-tatva-12 pb-tatva-8 text-tatva-body-md text-tatva-content-secondary">
          {disclaimer}
        </div>
      )}
    </div>
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {shouldMount && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay
            className={dialogOverlayVariants()}
            data-state={open ? "open" : "closed"}
          />
          <DialogPrimitive.Content
            className={dialogContentVariants({ size })}
            data-state={open ? "open" : "closed"}
            onInteractOutside={(e) => {
              if (preventOutsideClose) {
                e.preventDefault();
              }
            }}
            onEscapeKeyDown={(e) => {
              if (preventEscapeClose) {
                e.preventDefault();
              }
            }}
          >
            {hasImage ? (
              imagePosition === "left" ? (
                <div className="flex min-h-0 flex-1">
                  <div className="shrink-0">{image}</div>
                  {dialogContent}
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="shrink-0">{image}</div>
                  {dialogContent}
                </div>
              )
            ) : (
              dialogContent
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </DialogPrimitive.Root>
  );
}

Dialog.displayName = "Dialog";

export { Dialog, dialogContentVariants };
export default Dialog;
