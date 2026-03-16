"use client";

import * as React from "react";
import { AvatarGroup } from "../Avatar";
import { Badge } from "../Badge";
import { Button } from "../Button";
import Icon from "../Icon";
import { Menu, type MenuOption } from "../Menu";
import { Select } from "../Select";
import { useSidebar } from "../Sidebar/context";
import { Text } from "../Text";
import type { HeaderProps } from "./types";

/** Slash separator component */
const SlashSeparator = () => (
  <Text variant="heading-xs" tone="quaternary">
    /
  </Text>
);

/** Style configs for each header type */
const headerTypeConfig = {
  main: {
    titleVariant: "heading-md" as const,
    subtitleVariant: "body-md" as const,
    gapClass: "gap-tatva-2", // 8px
    supportsSubtitle: true,
  },
  canvas: {
    titleVariant: "heading-xs" as const,
    subtitleVariant: "body-md" as const,
    gapClass: "gap-tatva-0", // no gap needed as subtitle not supported
    supportsSubtitle: false,
  },
  panel: {
    titleVariant: "heading-sm" as const,
    subtitleVariant: "body-md" as const,
    gapClass: "gap-tatva-1", // 4px
    supportsSubtitle: true,
  },
};

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      type = "main",
      onBack,
      left,
      status,
      collaborators,
      actions,
      switchConfig,
      deepSwitchConfig,
      titleDropdown,
      outsideActionsThreshold = 2,
      showMobileMenu = true,
      ...props
    },
    ref
  ) => {
    // Get sidebar context (returns null if Header is not inside SidebarProvider)
    const sidebar = useSidebar();

    // Split actions: first 2 as buttons, rest in menu
    const visibleActions = actions?.slice(0, outsideActionsThreshold) ?? [];
    const overflowActions = actions?.slice(outsideActionsThreshold) ?? [];

    // Convert overflow actions to menu options
    const menuOptions: MenuOption[] = overflowActions.map((action) => ({
      label: action.label,
      icon: action.icon,
      onClick: action.onClick,
      disabled: action.disabled,
    }));

    // Check if we have any right-side content
    const hasRightContent =
      status ||
      (collaborators && collaborators.avatars.length > 0) ||
      (actions && actions.length > 0);

    // Determine title tone based on switch state
    const titleTone = switchConfig ? "secondary" : undefined;

    // Get config for current header type
    const config = headerTypeConfig[type];

    // Show mobile menu button if: showMobileMenu is true AND we're inside a SidebarProvider
    const shouldShowMobileMenu = showMobileMenu && sidebar;

    return (
      <div ref={ref} className=" bg-tatva-surface-secondary" {...props}>
        <div className="flex items-center justify-between gap-tatva-2">
          {/* Left Section */}
          <div className="flex min-w-tatva-0 items-center gap-tatva-4">
            {/* Mobile menu button - only visible on mobile when inside SidebarProvider */}
            {shouldShowMobileMenu && (
              <button
                onClick={() => sidebar.setIsOpen(true)}
                className="flex size-tatva-14 shrink-0 items-center justify-center rounded-tatva-full hover:bg-tatva-background-secondary md:hidden"
                aria-label="Open menu"
              >
                <Icon name="sidebar-left" size="lg" tone="secondary" />
              </button>
            )}
            {onBack && (
              <button
                onClick={onBack}
                className="flex size-tatva-14 shrink-0 items-center justify-center rounded-tatva-full hover:bg-tatva-background-secondary"
              >
                <Icon name="arrow-left" size="lg" tone="secondary" />
              </button>
            )}
            {left?.icon && <div className="inline-flex ">{left.icon}</div>}
            {left && (
              <div className={`flex min-w-tatva-0 flex-col ${config.gapClass}`}>
                <div className="flex items-center gap-tatva-4">
                  <div className="flex items-center gap-tatva-4">
                    <div className="flex-1 whitespace-nowrap">
                      <Text
                        variant={config.titleVariant}
                        tone={titleTone}
                        lineClamp={1}
                      >
                        {left.title}
                      </Text>
                    </div>
                    {/* Title dropdown: Menu button next to title (canvas type only) */}
                    {type === "canvas" && titleDropdown && (
                      <Menu
                        options={titleDropdown.options}
                        selectedValue={titleDropdown.selectedValue}
                        onSelect={titleDropdown.onSelect}
                        align="start"
                      >
                        <Button
                          variant="secondary"
                          icon="chevron-down"
                          iconPosition="right"
                        >
                          {titleDropdown.options.find(
                            (option) =>
                              option.value === titleDropdown.selectedValue
                          )?.label || "Select"}
                        </Button>
                      </Menu>
                    )}
                  </div>
                  {/* Switch: slash + Select after title */}
                  {switchConfig && (
                    <>
                      <SlashSeparator />
                      <Select {...switchConfig} _forHeader />
                    </>
                  )}
                  {/* Deep Switch: slash + Select after first switch */}
                  {deepSwitchConfig && switchConfig && (
                    <>
                      <SlashSeparator />
                      <Select {...deepSwitchConfig} _forHeader />
                    </>
                  )}
                  {left.badge && <Badge {...left.badge} />}
                </div>
                {config.supportsSubtitle && left.subtitle && (
                  <Text
                    variant={config.subtitleVariant}
                    tone="secondary"
                    lineClamp={1}
                  >
                    {left.subtitle}
                  </Text>
                )}
              </div>
            )}
          </div>

          {/* Right Section */}
          {hasRightContent && (
            <div className="flex items-center gap-tatva-4">
              {/* Status */}
              {status && (
                <div className="flex shrink-0 items-center gap-tatva-4 whitespace-nowrap">
                  <Badge
                    type={status.type}
                    variant={status.variant}
                    size={status.size}
                  >
                    {status.children}
                  </Badge>
                  {status.text && (
                    <Text variant="body-xs" tone="quaternary">
                      {status.text}
                    </Text>
                  )}
                </div>
              )}

              {/* Collaborators */}
              {collaborators && collaborators.avatars.length > 0 && (
                <AvatarGroup {...collaborators} size="sm" />
              )}

              {/* Actions */}
              {visibleActions.map((action, index) => {
                const isIconOnly = !action.label;
                return (
                  <Button
                    key={index}
                    variant={
                      action.variant ?? (isIconOnly ? "outline" : "secondary")
                    }
                    size="md"
                    icon={action.icon}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    tooltip={action.tooltip}
                  >
                    {action.label || undefined}
                  </Button>
                );
              })}

              {/* Overflow Menu */}
              {overflowActions.length > 0 && (
                <Menu options={menuOptions} sideOffset={8}>
                  <Button variant="ghost" size="sm" icon="more-horizontal" />
                </Menu>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Header.displayName = "Header";

export type * from "./types";
export { Header };
export default Header;
