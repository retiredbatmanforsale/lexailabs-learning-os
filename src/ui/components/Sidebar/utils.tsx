"use client";

import * as React from "react";
import { SidebarMenuGroup, SidebarMenuItem } from "./types";

// ============================================================================
// Helper to check if item is a group (no href, just a grouping label)
// ============================================================================

export function isMenuGroup(
  item: SidebarMenuItem | SidebarMenuGroup
): item is SidebarMenuGroup {
  return "items" in item && !Object.prototype.hasOwnProperty.call(item, "href");
}

// ============================================================================
// Default link component (plain anchor)
// ============================================================================

export const DefaultLink = ({
  href,
  target,
  className,
  children,
  onClick,
}: {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <a href={href} target={target} className={className} onClick={onClick}>
    {children}
  </a>
);
