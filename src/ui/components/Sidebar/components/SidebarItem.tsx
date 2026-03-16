"use client";

import { cn } from "../../../lib/utils";
import Badge from "../../Badge";
import Icon from "../../Icon";
import Text from "../../Text";
import { useSidebarContext } from "../context";
import { SidebarLinkComponent, SidebarMenuItem } from "../types";
import { DefaultLink } from "../utils";

export interface SidebarItemProps {
  item: SidebarMenuItem;
  activePath?: string;
  linkComponent?: SidebarLinkComponent;
}

export function SidebarItem({
  item,
  activePath,
  linkComponent: Link = DefaultLink,
}: SidebarItemProps) {
  const { isCollapsed, isMobile, setIsOpen } = useSidebarContext();

  const handleClick = () => {
    // Auto-close sidebar on mobile after navigation
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const isActive =
    item.isActive ||
    (activePath &&
      item.href &&
      (item.href === "/"
        ? activePath === "/"
        : activePath === item.href || activePath.startsWith(`${item.href}/`)));

  const IconComponent = item.icon ? (
    <Icon
      name={item.icon}
      size="sm"
      tone={isActive ? "primary" : "secondary"}
    />
  ) : null;

  // Use external link target if isExternal is true
  const linkTarget = item.isExternal ? "_blank" : item.target;

  return (
    <Link
      href={item.href}
      target={linkTarget}
      onClick={handleClick}
      className={cn(
        "group flex h-tatva-18 items-center gap-tatva-4 rounded-tatva-full transition-colors",
        isCollapsed ? "justify-center px-tatva-0" : "px-tatva-6",
        isActive
          ? "bg-tatva-background-tertiary active:bg-tatva-background-tertiary"
          : "hover:bg-tatva-background-secondary active:bg-tatva-background-tertiary"
      )}
    >
      {IconComponent}
      {!isCollapsed && (
        <>
          <div
            className={cn(
              "flex min-w-tatva-0 flex-1 items-center gap-tatva-4",
              isCollapsed ? "w-0 opacity-0" : ""
            )}
          >
            <Text
              variant="body-md"
              tone={isActive ? "default" : "secondary"}
              lineClamp={1}
            >
              {item.label}
            </Text>
            {item.badge && <Badge {...item.badge} />}
          </div>
          {item.isExternal && (
            <div className="flex shrink-0 items-center opacity-0 transition-opacity group-hover:opacity-100">
              <Icon name="link-square" size="sm" tone="secondary" />
            </div>
          )}
        </>
      )}
    </Link>
  );
}
