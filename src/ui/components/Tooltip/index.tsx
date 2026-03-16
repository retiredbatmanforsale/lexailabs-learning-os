"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva } from "class-variance-authority";
import * as React from "react";

// ============================================================================
// Types
// ============================================================================

export interface TooltipProviderProps {
  /** Delay before showing tooltips (ms) */
  delayDuration?: number;
  /** Delay before hiding when moving between tooltips (ms) */
  skipDelayDuration?: number;
  children: React.ReactNode;
}

export interface TooltipProps {
  /** Tooltip content. Pass null/undefined to disable tooltip. */
  content: React.ReactNode;
  /** Trigger element */
  children: React.ReactNode;
  /** Side to display tooltip */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment relative to trigger */
  align?: "start" | "center" | "end";
  /** Delay before showing (ms) - only works if TooltipProvider is not used */
  delayDuration?: number;
}

// ============================================================================
// Styles
// ============================================================================

const tooltipContentVariants = cva(
  "z-50 max-w-tatva-140 rounded-tatva-sm bg-tatva-background-black px-tatva-6 py-tatva-4 font-matter text-tatva-body-xs text-tatva-content-inverse shadow-tatva-l2 data-[state=closed]:animate-tatva-fade-out data-[state=delayed-open]:animate-tatva-fade-in"
);

const tooltipArrowVariants = cva("fill-tatva-background-black");

// ============================================================================
// Context to track if Provider exists
// ============================================================================

const TooltipProviderContext = React.createContext(false);

// ============================================================================
// Provider Component (should wrap app once)
// ============================================================================

function TooltipProvider({
  delayDuration = 300,
  skipDelayDuration = 300,
  children,
}: TooltipProviderProps) {
  return (
    <TooltipProviderContext.Provider value={true}>
      <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
      >
        {children}
      </TooltipPrimitive.Provider>
    </TooltipProviderContext.Provider>
  );
}

// ============================================================================
// Tooltip Component
// ============================================================================

function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 300,
}: TooltipProps) {
  const hasProvider = React.useContext(TooltipProviderContext);

  // Don't render tooltip if content is empty
  const isEmpty =
    content === null ||
    content === undefined ||
    (typeof content === "string" && content.trim() === "");

  if (isEmpty) {
    return <>{children}</>;
  }

  const tooltipContent = (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={6}
          className={tooltipContentVariants()}
        >
          {content}
          <TooltipPrimitive.Arrow className={tooltipArrowVariants()} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );

  // If no provider exists, wrap with one (backwards compatible)
  if (!hasProvider) {
    return (
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        {tooltipContent}
      </TooltipPrimitive.Provider>
    );
  }

  return tooltipContent;
}

Tooltip.displayName = "Tooltip";
TooltipProvider.displayName = "TooltipProvider";

export { Tooltip, tooltipContentVariants, TooltipProvider };
export default Tooltip;
