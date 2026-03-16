"use client";

import * as React from "react";
import { Icon } from "../Icon";
import { Text } from "../Text";

export interface AnnouncementBannerProps {
  /** Announcement content */
  children: React.ReactNode;
  /** Optional leading element (Icon, Avatar, etc.) */
  leading?: React.ReactNode;
  /** Callback when dismissed. If not provided, close button won't be shown. */
  onDismiss?: () => void;
  /** Optional click handler for the entire banner */
  onClick?: () => void;
}

const AnnouncementBanner = React.forwardRef<
  HTMLDivElement,
  AnnouncementBannerProps
>(({ children, leading, onDismiss, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        relative flex
        h-tatva-20 
        w-full items-center justify-center gap-tatva-4 
        bg-tatva-background-secondary-hover
        ${onClick ? "cursor-pointer hover:bg-tatva-background-secondary-hover" : ""}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {/* Leading element */}
      {leading && (
        <div className="flex shrink-0 items-center justify-center">
          {leading}
        </div>
      )}

      {/* Content */}
      <Text variant="body-md">{children}</Text>

      {/* Close button */}
      {onDismiss && (
        <button
          type="button"
          className="absolute right-tatva-4 top-1/2 -translate-y-1/2 p-tatva-2 opacity-50 transition-opacity hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          aria-label="Dismiss announcement"
        >
          <Icon name="close" size="xxs" tone="tertiary" />
        </button>
      )}
    </div>
  );
});

AnnouncementBanner.displayName = "AnnouncementBanner";

export { AnnouncementBanner };
export default AnnouncementBanner;
