"use client";

import { cn } from "../../../lib/utils";
import Icon from "../../Icon";
import Text from "../../Text";
import { useSidebarContext } from "../context";

export interface SidebarNewChatButtonProps {
  onClick?: () => void;
}

export function SidebarNewChatButton({ onClick }: SidebarNewChatButtonProps) {
  const { isCollapsed } = useSidebarContext();

  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center p-tatva-6">
        <button
          onClick={onClick}
          className={cn(
            "flex items-center justify-center rounded-tatva-full bg-tatva-background-primary",
            "p-tatva-6 transition-colors",
            "hover:bg-tatva-background-primary-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "focus-visible:ring-tatva-border-tertiary focus-visible:ring-offset-transparent",
            "shadow-tatva-l1"
          )}
        >
          <Icon name="ai-magic" size="sm" tone="secondary" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-tatva-6">
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-tatva-4 rounded-tatva-full bg-tatva-background-primary",
          "w-full px-tatva-6 py-tatva-4 transition-colors",
          "hover:bg-tatva-background-primary-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "focus-visible:ring-tatva-border-tertiary focus-visible:ring-offset-transparent",
          "shadow-tatva-l1"
        )}
      >
        <Icon name="ai-magic" size="sm" tone="secondary" />
        <Text variant="body-md" tone="secondary">
          New chat
        </Text>
      </button>
    </div>
  );
}
