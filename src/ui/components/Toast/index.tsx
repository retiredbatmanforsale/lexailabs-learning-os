"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { Icon, type IconName } from "../Icon";
import { Text } from "../Text";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastOptions {
  /** Toast title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Duration in milliseconds. Set to Infinity for persistent toast. */
  duration?: number;
  /** Custom icon name from the design system. Set to false to hide icon. */
  icon?: IconName | false;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Callback when toast is auto-removed */
  onAutoClose?: () => void;
  /** Unique ID for the toast (for programmatic dismissal) */
  id?: string | number;
  /** Whether to show the close button */
  dismissible?: boolean;
}

export interface ToastProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Position of toasts on screen */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  /** Maximum number of toasts visible at once */
  visibleToasts?: number;
  /** Gap between toasts in pixels */
  gap?: number;
  /** Default duration for toasts in milliseconds */
  duration?: number;
  /** Whether toasts should expand on hover */
  expand?: boolean;
  /** Close button aria label */
  closeButtonAriaLabel?: string;
}

const toastContainerVariants = cva(
  "relative flex w-tatva-160 min-w-tatva-140 items-start gap-tatva-4 rounded-tatva-md border border-tatva-border-primary bg-tatva-background-primary p-tatva-6 shadow-tatva-l1",
  {
    variants: {
      variant: {
        info: "",
        success: "",
        warning: "",
        error: "",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const toastIconContainerVariants = cva(
  "flex size-tatva-12 shrink-0 items-center justify-center rounded-tatva-full",
  {
    variants: {
      variant: {
        info: "",
        success: "bg-tatva-positive-background",
        warning: "bg-tatva-warning-background",
        error: "bg-tatva-danger-background",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// Map toast variants to Icon tone props
const variantToIconTone: Record<
  ToastVariant,
  "primary" | "success" | "warning" | "danger"
> = {
  info: "primary",
  success: "success",
  warning: "warning",
  error: "danger",
};

// ============================================================================
// Default Icons per Variant
// ============================================================================

const defaultIcons: Record<ToastVariant, IconName> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

// ============================================================================
// Toast Content Component (Internal)
// ============================================================================

interface ToastContentProps extends VariantProps<
  typeof toastContainerVariants
> {
  title: string;
  description?: string;
  /** Custom icon name. Set to false to hide icon entirely. */
  icon?: IconName | false;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const ToastContent = React.forwardRef<HTMLDivElement, ToastContentProps>(
  (
    {
      variant = "info",
      title,
      description,
      icon,
      dismissible = true,
      onDismiss,
    },
    ref
  ) => {
    const selectedVariant = variant ?? "info";
    // icon: false = no icon, icon: undefined = default icon, icon: string = custom icon
    const iconName =
      icon === false ? null : (icon ?? defaultIcons[selectedVariant]);

    const hasDescription = !!description;

    return (
      <div
        ref={ref}
        className={toastContainerVariants({ variant: selectedVariant })}
      >
        {/* Leading Icon */}
        {iconName && (
          <div
            className={toastIconContainerVariants({ variant: selectedVariant })}
          >
            <Icon
              name={iconName}
              size="xs"
              tone={variantToIconTone[selectedVariant]}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex min-w-tatva-0 flex-1 flex-col gap-tatva-1">
          <div className="flex min-h-tatva-12 items-center">
            <Text variant={"label-sm"} tone="default">
              {title}
            </Text>
          </div>
          {description && (
            <Text variant="body-sm" tone="secondary">
              {description}
            </Text>
          )}
        </div>

        {/* Close Button */}
        {dismissible && (
          <button
            type="button"
            className={`pointer-events-auto flex size-tatva-8 items-center justify-center opacity-50 transition-opacity hover:opacity-100 ${
              !hasDescription ? "absolute right-3 top-1/2 -translate-y-1/2" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            aria-label="Dismiss toast"
          >
            <Icon name="close" size="xxs" tone="tertiary" />
          </button>
        )}
      </div>
    );
  }
);

ToastContent.displayName = "ToastContent";

// ============================================================================
// Toaster Component
// ============================================================================

export interface ToasterProps {
  /** Position of toasts on screen */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  /** Maximum number of toasts visible at once */
  visibleToasts?: number;
  /** Gap between toasts in pixels */
  gap?: number;
  /** Default duration for toasts in milliseconds */
  duration?: number;
  /** Whether toasts should expand on hover */
  expand?: boolean;
  /** Close button aria label */
  closeButtonAriaLabel?: string;
}

const Toaster: React.FC<ToasterProps> = ({
  position = "top-right",
  visibleToasts = 3,
  gap = 8,
  duration = 4000,
  expand = true,
  closeButtonAriaLabel = "Close toast",
}) => {
  return (
    <SonnerToaster
      position={position}
      visibleToasts={visibleToasts}
      gap={gap}
      duration={duration}
      expand={expand}
      closeButton={false}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "!bg-transparent !border-none !shadow-none !p-tatva-0 pointer-events-auto",
        },
      }}
      aria-label="Notifications"
    />
  );
};

Toaster.displayName = "Toaster";

/**
 * @deprecated Use `Toaster` instead. `ToastProvider` is misleading as it doesn't provide context.
 */
const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      {children}
      <Toaster {...props} />
    </>
  );
};

ToastProvider.displayName = "ToastProvider";

// ============================================================================
// Toast Function API
// ============================================================================

/** Normalize string or options to ToastOptions */
const normalizeOptions = (
  titleOrOptions: string | ToastOptions
): ToastOptions => {
  if (typeof titleOrOptions === "string") {
    return { title: titleOrOptions };
  }
  return titleOrOptions;
};

/**
 * Internal function to show a toast with a specific variant
 */
const showToast = (
  variant: ToastVariant,
  titleOrOptions: string | ToastOptions
): string | number => {
  const {
    title,
    description,
    duration,
    icon,
    onDismiss,
    onAutoClose,
    id,
    dismissible = true,
  } = normalizeOptions(titleOrOptions);

  // Generate a unique ID if not provided
  const toastId =
    id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  sonnerToast.custom(
    () => (
      <ToastContent
        variant={variant}
        title={title}
        description={description}
        icon={icon}
        dismissible={dismissible}
        onDismiss={() => {
          sonnerToast.dismiss(toastId);
          onDismiss?.();
        }}
      />
    ),
    {
      id: toastId,
      duration,
      onDismiss: onDismiss,
      onAutoClose: onAutoClose,
    }
  );

  return toastId;
};

/**
 * Toast API - Library-agnostic interface for showing toast notifications
 *
 * @example
 * ```tsx
 * // Simple usage with just a string
 * toast("Hello world");
 * toast.success("Changes saved");
 * toast.error("Something went wrong");
 *
 * // With options
 * toast.success({ title: "Saved", description: "Your changes have been saved" });
 *
 * // Dismiss programmatically
 * const id = toast.info("Loading...");
 * toast.dismiss(id);
 * ```
 */
const toastMethods = {
  /** Show an info toast */
  info: (titleOrOptions: string | ToastOptions) =>
    showToast("info", titleOrOptions),

  /** Show a success toast */
  success: (titleOrOptions: string | ToastOptions) =>
    showToast("success", titleOrOptions),

  /** Show a warning toast */
  warning: (titleOrOptions: string | ToastOptions) =>
    showToast("warning", titleOrOptions),

  /** Show an error toast */
  error: (titleOrOptions: string | ToastOptions) =>
    showToast("error", titleOrOptions),

  /** Dismiss a specific toast by ID */
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),

  /** Dismiss all toasts */
  dismissAll: () => sonnerToast.dismiss(),

  /** Show a promise-based toast */
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
      description?: string;
    }
  ) => {
    const { loading, success, error, description } = options;

    return sonnerToast.promise(promise, {
      loading: (
        <ToastContent
          variant="info"
          title={loading}
          description={description}
          icon="loader"
          dismissible={false}
        />
      ),
      success: (data: T) => (
        <ToastContent
          variant="success"
          title={typeof success === "function" ? success(data) : success}
          description={description}
          dismissible={true}
          onDismiss={() => sonnerToast.dismiss()}
        />
      ),
      error: (err: unknown) => (
        <ToastContent
          variant="error"
          title={typeof error === "function" ? error(err) : error}
          description={description}
          dismissible={true}
          onDismiss={() => sonnerToast.dismiss()}
        />
      ),
    });
  },
};

// Create callable toast function with methods attached
type ToastFunction = ((
  titleOrOptions: string | ToastOptions
) => string | number) &
  typeof toastMethods;

const toast = ((titleOrOptions: string | ToastOptions) =>
  showToast("info", titleOrOptions)) as ToastFunction;

// Attach methods to the function
Object.assign(toast, toastMethods);

// ============================================================================
// Exports
// ============================================================================

export {
  ToastContent,
  Toaster,
  toast,
  toastContainerVariants,
  toastIconContainerVariants,
};

export type { ToastContentProps };
