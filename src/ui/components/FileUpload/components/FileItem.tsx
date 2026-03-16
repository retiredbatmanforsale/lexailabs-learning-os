"use client";

import Loader from "../../Loader";
import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { Text } from "../../Text";
import type { FileItemProps, SimpleFileItemProps } from "../types";
import { formatFileSize } from "../utils";

/** Custom dot separator with controlled size */
const Dot: React.FC = () => (
  // eslint-disable-next-line tailwindcss/no-arbitrary-value
  <span className="relative top-[-3px] mx-tatva-2 inline-block size-[3px] rounded-tatva-full bg-current" /> // TODO: fix this
);

/**
 * File item with upload status (uploading/error/uploaded)
 */
export const FileItem: React.FC<FileItemProps> = ({
  item,
  onRemove,
  disabled,
  showDivider = true,
}) => {
  const { file, status, progress = 0, errorMessage } = item;

  const renderIcon = () => {
    switch (status) {
      case "uploading":
        return <Loader variant="circular" size="sm" value={progress} />;
      case "error":
        return (
          <div className="flex size-tatva-12 items-center justify-center rounded-tatva-full bg-tatva-danger-background">
            <Icon name="error" size="xs" tone="danger" />
          </div>
        );
      case "uploaded":
      default:
        return (
          <div className="flex size-tatva-12 items-center justify-center">
            <Icon name="file" strokeWidth={1.2} size="lg" tone="secondary" />
          </div>
        );
    }
  };

  const renderStatus = () => {
    switch (status) {
      case "uploading":
        return (
          <Text variant="body-sm" tone="secondary">
            {formatFileSize(file.size)}
            <Dot />
            {progress}% Uploading
          </Text>
        );
      case "error":
        return (
          <Text variant="body-sm" tone="danger">
            {errorMessage || "Upload failed"}
          </Text>
        );
      case "uploaded":
      default:
        return (
          <Text variant="body-sm" tone="secondary">
            {formatFileSize(file.size)}
            <Dot />
            Uploaded
          </Text>
        );
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-tatva-8 py-tatva-8",
        showDivider ? "border-b border-tatva-border-primary" : undefined
      )}
    >
      {/* Status Icon */}
      <div className="flex size-tatva-20 shrink-0 items-center justify-center">
        {renderIcon()}
      </div>

      {/* File Info */}
      <div className="flex min-w-tatva-0 flex-1 flex-col gap-tatva-1">
        <Text variant="body-md" lineClamp={1}>
          {file.name}
        </Text>
        {renderStatus()}
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="md"
        icon="delete"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        disabled={disabled}
        tooltip="Remove file"
      />
    </div>
  );
};

/**
 * Simple file item without status (for basic multiple mode)
 */
export const SimpleFileItem: React.FC<SimpleFileItemProps> = ({
  file,
  onRemove,
  disabled,
  showDivider = true,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-tatva-8 py-tatva-8",
        showDivider ? "border-b border-tatva-border-primary" : undefined
      )}
    >
      {/* File Icon */}
      <div className="flex size-tatva-20 shrink-0 items-center justify-center">
        <Icon name="file" size="lg" tone="secondary" />
      </div>

      {/* File Info */}
      <div className="flex min-w-tatva-0 flex-1 flex-col gap-tatva-1">
        <Text variant="body-md" lineClamp={1}>
          {file.name}
        </Text>
        <Text variant="body-sm" tone="secondary">
          {formatFileSize(file.size)}
        </Text>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="md"
        icon="delete"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        disabled={disabled}
        tooltip="Remove file"
      />
    </div>
  );
};
