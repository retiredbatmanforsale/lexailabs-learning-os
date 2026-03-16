"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Button, type ButtonVariants } from "../Button";
import { Divider } from "../Divider";
import { IconName } from "../Icon";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

export interface SheetAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: ButtonVariants["variant"];
  /** Disabled state */
  disabled?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
}

export interface SheetProps {
  /** Controls the open/closed state */
  open: boolean;
  /** Callback fired when the sheet should close */
  onOpenChange: (open: boolean) => void;
  /** Sheet title */
  title: string;
  /** Main content */
  children: React.ReactNode;
  /** Header actions (rendered next to title) */
  headerActions?: React.ReactNode;
  /** Footer actions (buttons) */
  footerActions?: SheetAction[];
  /** Sheet size variant */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

// ============================================================================
// Styles
// ============================================================================

const sheetOverlayVariants = cva(
  "fixed inset-0 z-50 bg-tatva-background-black/50 backdrop-blur-sm data-[state=closed]:animate-tatva-fade-out data-[state=open]:animate-tatva-fade-in"
);

const sheetContentVariants = cva(
  "fixed inset-y-0 right-0 z-50 m-tatva-4 flex flex-col rounded-tatva-md border-l border-tatva-border bg-tatva-surface-secondary font-matter data-[state=closed]:animate-tatva-slide-out-to-right data-[state=open]:animate-tatva-slide-in-from-right",
  {
    variants: {
      size: {
        sm: "w-tatva-160",
        md: "w-tatva-210",
        lg: "w-tatva-300",
        xl: "w-tatva-400",
        full: "w-tatva-300 max-w-tatva-600",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Component
// ============================================================================

function Sheet({
  open,
  onOpenChange,
  title,
  children,
  headerActions,
  footerActions,
  size = "md",
}: SheetProps) {
  const hasFooter = footerActions && footerActions.length > 0;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={sheetOverlayVariants()} />
        <DialogPrimitive.Content className={sheetContentVariants({ size })}>
          {/* Header */}
          <div className="shrink-0">
            <div className="p-tatva-4">
              <div className="flex items-center justify-between gap-tatva-4">
                <DialogPrimitive.Title asChild>
                  <div className="p-tatva-4">
                    <Text variant="heading-sm">{title}</Text>
                  </div>
                </DialogPrimitive.Title>

                <div className="flex h-tatva-16 items-center gap-tatva-4">
                  {headerActions}
                  {headerActions && <Divider orientation="vertical" />}
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" aria-label="Close" icon="close" />
                  </DialogPrimitive.Close>
                </div>
              </div>
            </div>
            <Divider />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-tatva-12 py-tatva-10">
            {children}
          </div>

          {/* Footer */}
          {hasFooter && (
            <div className="flex shrink-0 items-center justify-end gap-tatva-4 p-tatva-8">
              {footerActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "primary"}
                  onClick={action.onClick}
                  width="full"
                  disabled={action.disabled}
                  icon={action.icon as IconName}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

Sheet.displayName = "Sheet";

export { Sheet, sheetContentVariants };
export default Sheet;
