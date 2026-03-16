import * as React from "react";
import Link from "@docusaurus/Link";
import { Button, Text, Badge } from "@/ui";
import { usePaymentStatus, useInitiatePayment } from "../../../hooks/usePayment";
import { useAuth } from "../../../contexts/AuthContext";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface PaymentButtonProps {
  /** Variant of the button display */
  variant?: "button" | "badge" | "card";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Show loading skeleton while checking status */
  showSkeleton?: boolean;
  /** Callback when payment succeeds */
  onPaymentSuccess?: () => void;
  /** Callback when payment fails */
  onPaymentError?: (error: string) => void;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function PaymentButton({
  variant = "button",
  size = "md",
  showSkeleton = true,
  onPaymentSuccess,
  onPaymentError,
  className,
}: PaymentButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const { status, loading: statusLoading, refetch } = usePaymentStatus();
  const { initiatePayment, loading: paymentLoading } = useInitiatePayment();

  // Handle payment initiation
  const handleClick = async () => {
    const result = await initiatePayment(user?.email, user?.name);
    if (result.success) {
      await refetch();
      onPaymentSuccess?.();
    } else if (result.error && result.error !== "Payment cancelled") {
      onPaymentError?.(result.error);
    }
  };

  // Loading state
  if (statusLoading && showSkeleton) {
    return (
      <div
        className={cn(
          "h-10 w-40 animate-pulse rounded-tatva-md bg-tatva-background-secondary",
          className
        )}
      />
    );
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    if (variant === "badge") {
      return null;
    }
    return (
      <Link to="/login">
        <Button
          variant="primary"
          size={size}
          className={className}
        >
          Login to Get Premium
        </Button>
      </Link>
    );
  }

  // Already has access
  if (status?.hasAccess) {
    if (variant === "badge") {
      if (status.accessType === "premium") {
        return (
          <Badge variant="green">
            Premium Active
          </Badge>
        );
      }
      if (status.accessType === "institution") {
        return (
          <Badge variant="indigo">
            {status.organization || "Institution Access"}
          </Badge>
        );
      }
    }

    if (variant === "card") {
      return (
        <div
          className={cn(
            "rounded-tatva-lg border border-tatva-positive-border bg-tatva-positive-background p-tatva-4",
            className
          )}
        >
          <Text variant="label-sm" className="text-tatva-positive-content">
            {status.accessType === "premium"
              ? "Premium Access Active"
              : `Access via ${status.organization}`}
          </Text>
          <Text variant="body-sm" tone="secondary" className="mt-tatva-1">
            You have full access to all courses
          </Text>
        </div>
      );
    }

    // Default button variant - show access status
    return (
      <Button variant="secondary" size={size} disabled >
        {status.accessType === "premium"
          ? "Premium Active"
          : `Via ${status.organization}`}
      </Button>
    );
  }

  // Determine button label based on payment status
  let label = "Upgrade to Premium — ₹499";
  if (status?.latestPayment?.status === "created") {
    label = "Complete Payment";
  } else if (status?.latestPayment?.status === "failed") {
    label = "Payment Failed — Try Again";
  }

  // Show upgrade button
  if (variant === "badge") {
    return (
      <Button
        variant="primary"
        size={size}
        onClick={handleClick}
        isLoading={paymentLoading}
      >
        Upgrade to Premium
      </Button>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-tatva-lg border border-tatva-border bg-tatva-background-secondary p-tatva-4",
          className
        )}
      >
        <div className="mb-tatva-3">
          <Text variant="heading-sm">Unlock All Courses</Text>
          <Text variant="body-sm" tone="secondary" className="mt-tatva-1">
            One-time payment for lifetime access to all published courses
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Text variant="heading-md">₹499</Text>
          <Button
            variant="primary"
            size="md"
            onClick={handleClick}
            isLoading={paymentLoading}
          >
            {paymentLoading ? "Processing..." : "Get Premium"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size={size}
      onClick={handleClick}
      isLoading={paymentLoading}
      className={className}
    >
      {paymentLoading ? "Processing..." : label}
    </Button>
  );
}

export default PaymentButton;
