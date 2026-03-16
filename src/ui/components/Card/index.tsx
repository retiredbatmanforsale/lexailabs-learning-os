"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { AssetContainer } from "../AssetContainer";
import { Badge, type BadgeProps } from "../Badge";
import { Button } from "../Button";
import { Icon, type IconName } from "../Icon";
import { Menu, type MenuOption } from "../Menu";
import { Text } from "../Text";

// ============================================================================
// Styles
// ============================================================================

const cardVariants = cva(
  "relative w-full gap-tatva-6 rounded-tatva-lg font-matter transition-all duration-200",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      direction: {
        horizontal: "flex flex-row items-center",
        vertical: "flex flex-col",
      },
      clickable: {
        true: "cursor-pointer hover:bg-tatva-surface-secondary",
        false: "",
      },
      noBorder: {
        true: "",
        false: "border border-tatva-border",
      },
      variant: {
        default: "p-tatva-6",
        compact: "p-tatva-3",
      },
    },
    compoundVariants: [
      // Hover border only makes sense when card is clickable and bordered
      {
        clickable: true,
        noBorder: false,
        class: "hover:border-tatva-border-secondary",
      },
      // Compact variant always uses horizontal layout
      {
        variant: "compact",
        class: "flex flex-row items-center",
      },
    ],
    defaultVariants: {
      size: "md",
      direction: "horizontal",
      clickable: false,
      noBorder: false,
      variant: "default",
    },
  }
);

export interface CardBadge {
  /** Badge type */
  type: BadgeProps["type"];
  /** Value to display inside the badge */
  value?: React.ReactNode;
}

export interface CardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">,
    Omit<VariantProps<typeof cardVariants>, "variant"> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Custom image element (can be IconName for icon or ReactNode for custom element) */
  image?: IconName | React.ReactNode;
  /** Card heading/title */
  heading: string;
  /** Description text */
  description?: string;
  /** Badge configuration */
  badge?: CardBadge;
  /** Action menu options */
  actions?: MenuOption[];
  /** Optional icon rendered in the top-right corner */
  topRightIcon?: IconName;
  /** Accessible label for the top-right icon button (recommended) */
  topRightIconAriaLabel?: string;
  /** Optional tooltip for the top-right icon (string recommended for icon-only button) */
  topRightIconTooltip?: React.ReactNode;
  /** Click handler for the top-right icon */
  onTopRightIconClick?: () => void;
  /** Click handler for entire card */
  onClick?: () => void;
  /** Remove border from card */
  noBorder?: boolean;
  /** Card variant: default (standard padding) or compact (reduced padding, horizontal layout) */
  variant?: "default" | "compact";
}

// ============================================================================
// Component
// ============================================================================

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      src,
      alt = "",
      image,
      heading,
      description,
      badge,
      size = "md",
      direction = "horizontal",
      noBorder = false,
      variant = "default",
      actions,
      topRightIcon,
      topRightIconAriaLabel,
      topRightIconTooltip,
      onTopRightIconClick,
      onClick,
      ...props
    },
    ref
  ) => {
    // Compact variant forces horizontal direction
    const effectiveDirection = variant === "compact" ? "horizontal" : direction;
    const hasActions = actions && actions.length > 0;
    const hasTopRightIcon = !!topRightIcon;
    const isVertical = effectiveDirection === "vertical";
    const hasImage = src || image;
    const isTopRightIconInteractive =
      !!onTopRightIconClick || !!topRightIconTooltip;

    // Render the image container
    const renderImage = () => {
      if (!hasImage) return null;

      const cardSize = size ?? "md";

      // Check if image is an IconName (string)
      const isIconName = typeof image === "string";

      // If image is an IconName, render the icon directly without container
      if (isIconName) {
        return <Icon name={image as IconName} size="2xl" strokeWidth={1.4} />;
      }

      // For vertical cards with md or lg size, use full-width image
      if (isVertical && (cardSize === "lg" || cardSize === "md")) {
        const aspectClass = cardSize === "lg" ? "aspect-square" : "aspect-video";
        return (
          <div className={cn("relative w-full shrink-0 overflow-hidden rounded-tatva-md bg-tatva-background-secondary", aspectClass)}>
            {image ? (
              image
            ) : src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 size-full object-cover"
              />
            ) : null}
          </div>
        );
      }

      // For horizontal cards with md or lg size, use larger image containers
      if (!isVertical && (cardSize === "md" || cardSize === "lg")) {
        // lg: 80x80px, md: 68x92px (landscape)
        const sizeClasses = cardSize === "lg" ? "size-tatva-40" : "h-tatva-34 w-tatva-46";
        return (
          <div
            className={cn(
              "relative shrink-0 overflow-hidden rounded-tatva-md bg-tatva-background-secondary",
              sizeClasses
            )}
          >
            {image ? (
              image
            ) : src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 size-full object-cover"
              />
            ) : null}
          </div>
        );
      }

      // For small cards, use AssetContainer
      return (
        <AssetContainer src={src} alt={alt} size="sm">
          {image}
        </AssetContainer>
      );
    };

    // Render the content section
    const renderContent = () => (
      <div className="flex min-w-tatva-0 flex-1 flex-col gap-tatva-2 px-tatva-2">
        {/* Heading with optional badge */}
        <div className="flex items-center gap-tatva-4">
          <Text variant="heading-xs" lineClamp={1}>
            {heading}
          </Text>
          {badge && (
            <Badge type={badge.type} variant="indigo" size="sm">
              {badge.value}
            </Badge>
          )}
        </div>

        {/* Description */}
        {description && (
          <Text
            variant="body-sm"
            tone="secondary"
            lineClamp={["sm", "md"].includes(size ?? "md") ? 2 : 4}
          >
            {description}
          </Text>
        )}
      </div>
    );

    // Render the top-right area (optional icon + optional action menu)
    const renderTopRight = (position: "image" | "card") => {
      if (!hasActions && !hasTopRightIcon) return null;

      const cardSize = size ?? "md";
      const isVerticalWithImage = isVertical && (cardSize === "lg" || cardSize === "md");

      // For vertical md/lg cards with image, render over the image
      // For all other cards (horizontal, sm vertical), render at card level
      const showInImage = isVerticalWithImage && hasImage && position === "image";
      const showInCard = (!isVerticalWithImage || !hasImage) && position === "card";

      if (!showInImage && !showInCard) return null;

      return (
        <div className="absolute right-tatva-6 top-tatva-6 flex items-center gap-tatva-2">
          {hasTopRightIcon &&
            (isTopRightIconInteractive ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  icon={topRightIcon}
                  tooltip={topRightIconTooltip}
                  aria-label={topRightIconAriaLabel}
                  onClick={() => onTopRightIconClick?.()}
                />
              </span>
            ) : (
              <Icon
                name={topRightIcon}
                size="sm"
                tone="secondary"
                aria-label={topRightIconAriaLabel}
              />
            ))}

          {hasActions && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Menu options={actions}>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="more-horizontal"
                  aria-label="Card actions"
                />
              </Menu>
            </span>
          )}
        </div>
      );
    };

    // For vertical cards with full-width images, wrap with actions overlay
    const renderImageWithActions = () => {
      if (!hasImage) return null;

      const cardSize = size ?? "md";

      // Vertical md/lg cards have full-width image with overlay actions
      if (isVertical && (cardSize === "lg" || cardSize === "md")) {
        return (
          <div className="relative w-full">
            {renderImage()}
            {renderTopRight("image")}
          </div>
        );
      }

      return renderImage();
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            size,
            direction: effectiveDirection,
            clickable: !!onClick,
            noBorder,
            variant,
          })
        )}
        onClick={onClick}
        {...props}
      >
        {renderImageWithActions()}
        {renderContent()}
        {renderTopRight("card")}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
export default Card;
