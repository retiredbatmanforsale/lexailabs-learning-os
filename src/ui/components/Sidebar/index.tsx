"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import {
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarNewChatButton,
  SidebarProfile,
} from "./components";
import { SidebarContext, useSidebar, useSidebarContext } from "./context";
import { SidebarProps } from "./types";
import { isMenuGroup } from "./utils";

// ============================================================================
// Main Components
// ============================================================================

function SidebarProvider({
  children,
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile screen size
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;
  const isCollapsed = !isOpen;

  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen, isCollapsed, isMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function SidebarContent({
  header,
  profile,
  menuItems,
  footerMenuItems,
  activePath,
  linkComponent,
  showNewChat,
  onNewChatClick,
  className,
}: Omit<SidebarProps, "defaultOpen" | "open" | "onOpenChange">) {
  const { isOpen, setIsOpen, isCollapsed, isMobile } = useSidebarContext();

  // Handle escape key to close sidebar on mobile
  React.useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobile, isOpen, setIsOpen]);

  // Prevent body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (!isMobile) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const handleSidebarClick = (e: React.MouseEvent) => {
    // On desktop, clicking collapsed sidebar expands it
    if (!isMobile && isCollapsed) {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, [role='button']");
      if (!isInteractive) {
        setIsOpen(true);
      }
    }
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const sidebarContent = (
    <aside
      className={cn(
        "flex h-full flex-col bg-tatva-surface-primary px-tatva-6 transition-all duration-200",
        // Mobile: always full width when open
        // Desktop: collapsed or expanded width
        "w-tatva-120 md:w-auto",
        !isMobile ? (isCollapsed ? "md:w-tatva-30" : "md:w-tatva-120") : "",
        className
      )}
      onClick={handleSidebarClick}
    >
      {/* Header */}
      <div className="py-tatva-6">
        <SidebarHeader {...header} />
      </div>

      {/* New Chat Button */}
      {showNewChat && <SidebarNewChatButton onClick={onNewChatClick} />}

      {/* Content */}
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto py-tatva-6">
        <div className="flex flex-col gap-tatva-10">
          {menuItems.map((item, index) =>
            isMenuGroup(item) ? (
              <SidebarGroup
                key={index}
                group={item}
                activePath={activePath}
                linkComponent={linkComponent}
              />
            ) : (
              <div key={index}>
                <SidebarItem
                  item={item}
                  activePath={activePath}
                  linkComponent={linkComponent}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer Menu Items */}
      {footerMenuItems && footerMenuItems.length > 0 && (
        <div className="mt-auto flex shrink-0 flex-col py-tatva-6">
          {footerMenuItems.map((item, index) => (
            <div key={index}>
              <SidebarItem
                item={item}
                activePath={activePath}
                linkComponent={linkComponent}
              />
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      {profile && (
        <div
          className={cn(
            "shrink-0",
            !footerMenuItems?.length ? "mt-auto" : undefined
          )}
        >
          <SidebarProfile {...profile} />
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Mobile: Overlay backdrop (hidden on desktop) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-tatva-background-black/50 transition-opacity duration-200 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Mobile: Fixed positioned sidebar that slides in/out */}
      {/* Desktop: Static sidebar that collapses/expands */}
      <div
        className={cn(
          // Mobile styles
          "fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out md:relative md:inset-auto md:z-auto md:h-full md:translate-x-0 md:transition-none",
          // Mobile: slide in/out based on isOpen
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}

function Sidebar({
  header,
  profile,
  menuItems,
  footerMenuItems,
  defaultOpen = true,
  open,
  onOpenChange,
  activePath,
  linkComponent,
  showNewChat,
  onNewChatClick,
  className,
}: SidebarProps) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <SidebarContent
        header={header}
        profile={profile}
        menuItems={menuItems}
        footerMenuItems={footerMenuItems}
        activePath={activePath}
        linkComponent={linkComponent}
        showNewChat={showNewChat}
        onNewChatClick={onNewChatClick}
        className={className}
      />
    </SidebarProvider>
  );
}

Sidebar.displayName = "Sidebar";

export type {
  SidebarAccount,
  SidebarHeaderProps,
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarProfileAction,
  SidebarProfileProps,
  SidebarProps,
} from "./types";
export { Sidebar, SidebarProvider, useSidebar };
export default Sidebar;
