"use client";

import { Text } from "../Text";
import * as React from "react";

// ============================================================================
// Types
// ============================================================================

export interface HeaderSelectTriggerProps {
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Children (the actual trigger content) */
  children: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Internal trigger wrapper for Select when used in Header.
 * Renders a minimal flex container with no border/padding.
 * @internal - Not intended for external use
 */
const HeaderSelectTrigger = React.forwardRef<
  HTMLDivElement,
  HeaderSelectTriggerProps
>(({ label, disabled, children }, ref) => {
  if (label) {
    return (
      <div ref={ref} className="flex flex-col gap-tatva-2">
        <Text
          as="span"
          variant="heading-xs"
          tone={disabled ? "tertiary" : "secondary"}
        >
          {label}
        </Text>
        {children}
      </div>
    );
  }

  return <>{children}</>;
});

HeaderSelectTrigger.displayName = "HeaderSelectTrigger";

export { HeaderSelectTrigger };
export default HeaderSelectTrigger;
