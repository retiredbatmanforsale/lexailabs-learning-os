"use client";

import { cn } from "../../../lib/utils";
import * as React from "react";
import { Avatar } from "../../Avatar";
import Icon from "../../Icon";
import { Menu, MenuOption } from "../../Menu";
import Text from "../../Text";
import { useSidebarContext } from "../context";
import { SidebarProfileProps } from "../types";

// Non-navigating link component for profile
const ProfileLink = ({
  href,
  className,
  children,
}: {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={className} role="button" tabIndex={0}>
    {children}
  </div>
);

export function SidebarProfile({
  avatar,
  name,
  actions,
  accounts,
  onAccountSwitch,
}: SidebarProfileProps) {
  const { isCollapsed } = useSidebarContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Get first 2 characters of name for fallback
  const fallback = name.slice(0, 2).toUpperCase();

  // Create menu options
  const menuOptions: MenuOption[] = [];

  // Add accounts section if accounts exist
  if (accounts && accounts.length > 0) {
    accounts.forEach((account) => {
      menuOptions.push({
        label: account.name,
        onClick: () => onAccountSwitch?.(account),
      });
    });

    // Add separator if there are also actions
    if (actions && actions.length > 0) {
      menuOptions.push({
        label: "",
        onClick: () => {},
        isSeparator: true,
      });
    }
  }

  // Add profile actions
  if (actions) {
    actions.forEach((action) => {
      menuOptions.push({
        label: action.label,
        icon: action.icon,
        onClick: action.onClick,
      });
    });
  }

  // Profile trigger content
  const triggerContent = (
    <ProfileLink
      href="#"
      className={cn(
        "group flex h-tatva-18 items-center justify-center gap-tatva-4 rounded-tatva-full transition-colors hover:bg-tatva-background-secondary active:bg-tatva-background-tertiary",
        isCollapsed ? "px-tatva-0" : "px-tatva-2"
      )}
    >
      <Avatar src={avatar} fallback={fallback} size="sm" />
      {!isCollapsed && (
        <>
          <div className="flex min-w-tatva-0 flex-1 items-center">
            <Text variant="body-md" tone="secondary" lineClamp={1}>
              {name}
            </Text>
          </div>
          {menuOptions.length > 0 && (
            <div
              className={cn(
                "flex shrink-0 items-center transition-opacity",
                isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              <Icon
                name={isMenuOpen ? "chevron-up" : "chevron-down"}
                size="sm"
                tone="secondary"
              />
            </div>
          )}
        </>
      )}
    </ProfileLink>
  );

  // Always render with Menu (even if no options, content is still shown)
  return (
    <div className="py-tatva-6">
      <Menu
        options={menuOptions}
        side="top"
        align="start"
        matchTriggerWidth={!isCollapsed}
        onOpenChange={setIsMenuOpen}
      >
        <div className={menuOptions.length > 0 ? "cursor-pointer" : ""}>
          {triggerContent}
        </div>
      </Menu>
    </div>
  );
}
