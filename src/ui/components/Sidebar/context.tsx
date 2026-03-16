"use client";

import * as React from "react";

// ============================================================================
// Context
// ============================================================================

interface SidebarContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/**
 * Hook to access sidebar state and controls.
 * Returns null if used outside of SidebarProvider context (safe for use in Header, etc.)
 */
export function useSidebar() {
  return React.useContext(SidebarContext);
}

/**
 * Internal hook that throws if used outside SidebarProvider.
 * Use this in sidebar sub-components that must be within the provider.
 */
export function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a Sidebar or SidebarProvider"
    );
  }
  return context;
}

export { SidebarContext };
