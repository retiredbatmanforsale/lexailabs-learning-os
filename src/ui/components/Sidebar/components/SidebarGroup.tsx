"use client";

import * as React from "react";
import Icon from "../../Icon";
import Text from "../../Text";
import { useSidebarContext } from "../context";
import { SidebarLinkComponent, SidebarMenuGroup } from "../types";
import { SidebarItem } from "./SidebarItem";

export interface SidebarGroupProps {
  group: SidebarMenuGroup;
  activePath?: string;
  linkComponent?: SidebarLinkComponent;
}

export function SidebarGroup({
  group,
  activePath,
  linkComponent,
}: SidebarGroupProps) {
  const { isCollapsed } = useSidebarContext();
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleToggle = () => {
    if (group.collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  // Always show items if not collapsible
  const shouldShowItems = group.collapsible ? isExpanded : true;

  return (
    <div className="flex flex-col gap-tatva-4">
      {!isCollapsed ? (
        <div
          onClick={handleToggle}
          className={`flex items-center justify-between px-tatva-6 ${
            group.collapsible ? "cursor-pointer" : ""
          }`}
        >
          <div className="tracking-wide">
            <Text variant="body-md" tone="tertiary">
              {group.label}
            </Text>
          </div>
          {group.collapsible && (
            <Icon
              name={isExpanded ? "arrow-up" : "arrow-down"}
              size="sm"
              tone="tertiary"
            />
          )}
        </div>
      ) : (
        // Empty spacer to maintain height when collapsed
        <div className="h-tatva-10" />
      )}
      {shouldShowItems && (
        <div className="flex flex-col gap-tatva-2">
          {group.items.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              activePath={activePath}
              linkComponent={linkComponent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
