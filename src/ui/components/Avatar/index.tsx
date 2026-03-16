"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// ============================================================================
// Avatar Styles
// ============================================================================

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-tatva-full bg-tatva-background-secondary font-matter font-medium text-tatva-content-primary",
  {
    variants: {
      size: {
        xs: "size-tatva-10 text-tatva-body-xs", // 20px
        sm: "size-tatva-14 text-tatva-body-xs", // 28px
        md: "size-tatva-18 text-tatva-body-sm", // 36px
      },
      showRing: {
        true: "bg-tatva-surface-secondary ring-2 ring-tatva-border-primary", // HACK: overwrite background color for group case.
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      showRing: false,
    },
  }
);

// ============================================================================
// Avatar Types
// ============================================================================

// Strip `null` from CVA's VariantProps (CVA includes null, but React props should be undefined)
type AvatarVariants = {
  [K in keyof VariantProps<typeof avatarVariants>]: Exclude<
    VariantProps<typeof avatarVariants>[K],
    null
  >;
};

export interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    Omit<AvatarVariants, "showRing"> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (first 2 characters shown) */
  fallback?: string;
  /** @internal Used by AvatarGroup to show ring */
  _showRing?: boolean;
}

// ============================================================================
// Avatar Component
// ============================================================================

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size, src, alt, fallback, _showRing = false, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const getFallbackText = () => {
      if (fallback) return fallback.slice(0, 2).toUpperCase();
      if (alt) return alt.slice(0, 2).toUpperCase();
      return "?";
    };

    const showImage = src && !imageError;

    return (
      <span
        ref={ref}
        className={avatarVariants({ size, showRing: _showRing })}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || fallback || "Avatar"}
            onError={() => setImageError(true)}
            className="size-full object-cover"
          />
        ) : (
          <span className="select-none">{getFallbackText()}</span>
        )}
      </span>
    );
  }
);

Avatar.displayName = "Avatar";

// ============================================================================
// AvatarGroup Styles
// ============================================================================

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    size: {
      xs: "-space-x-tatva-2", // 4px overlap for 20px avatars
      sm: "-space-x-tatva-4", // 8px overlap for 28px avatars
      md: "-space-x-tatva-6", // 12px overlap for 36px avatars
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// AvatarGroup Types
// ============================================================================

export interface AvatarGroupItem {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (first 2 characters shown) */
  fallback?: string;
}

export interface AvatarGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className">,
    Omit<AvatarVariants, "showRing"> {
  /** Array of avatar items to display */
  avatars: AvatarGroupItem[];
  /** Maximum number of avatars to show before +N indicator */
  max?: number;
}

// ============================================================================
// AvatarGroup Component
// ============================================================================

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 4, size = "md", ...props }, ref) => {
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
      <div
        ref={ref}
        className={avatarGroupVariants({ size })}
        role="group"
        aria-label={`Group of ${avatars.length} avatars`}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            size={size}
            _showRing
          />
        ))}
        {remainingCount > 0 && (
          <Avatar size={size} fallback={`+${remainingCount}`} _showRing />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

// ============================================================================
// Exports
// ============================================================================

export { Avatar, AvatarGroup, avatarGroupVariants, avatarVariants };
export default Avatar;
