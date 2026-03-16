"use client";

import { cn } from "../../../lib/utils";
import Button from "../../Button";
import { useSidebarContext } from "../context";
import { SidebarHeaderProps } from "../types";

const DEFAULT_LOGO =
  "https://cdn.prod.website-files.com/66a90e7788df6d0dc5ef83dd/68a41915d9a9c63069a06277_sarvam-new-wordmark-grey.png";

export function SidebarHeader({ logo, logoAlt = "Logo" }: SidebarHeaderProps) {
  const { isCollapsed, setIsOpen } = useSidebarContext();

  const logoSrc = logo || DEFAULT_LOGO;

  return (
    <div
      className={cn(
        "flex w-full items-center py-tatva-4 transition-all duration-200",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      <div className="flex h-10 items-center">
        {!isCollapsed && (
          <div className="flex items-center gap-tatva-4 pl-tatva-5">
            <img src={logoSrc} alt={logoAlt} className="h-tatva-8 w-auto" />
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="md"
        icon="sidebar-left"
        onClick={() => setIsOpen(isCollapsed)}
      />
    </div>
  );
}
