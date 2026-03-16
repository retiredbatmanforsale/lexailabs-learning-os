"use client";

import { Button, type ButtonProps } from "../Button";
import { Text } from "../Text";

export interface EmptyStateAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Button variant */
  variant?: ButtonProps["variant"];
}

export interface EmptyStateProps {
  /** Main heading text */
  heading: string;
  /** Description text (optional) */
  body?: string;
  /** Image source URL */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Action buttons - uses full ButtonProps */
  actions?: ButtonProps[];
}

function EmptyState({
  heading,
  body,
  imageSrc,
  imageAlt = "Empty state illustration",
  actions,
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-1 items-center justify-center p-tatva-6">
      <div className="flex flex-col items-center gap-tatva-12">
        {/* Image/Illustration */}
        {imageSrc && (
          <div className="relative flex size-tatva-80 items-center justify-center overflow-hidden rounded-tatva-md">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="size-full object-contain"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="flex max-w-tatva-300 flex-col items-center gap-tatva-6 text-center">
          <Text variant="heading-md">{heading}</Text>
          {body && (
            <Text variant="body-md" tone="secondary" as="p">
              <span className="whitespace-pre-line">{body}</span>
            </Text>
          )}
        </div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-tatva-6">
            {actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };
export default EmptyState;
