"use client";

import * as React from "react";
import Dropzone from "react-dropzone";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { DashedBorder } from "./components/DashedBorder";
import { FileItem, SimpleFileItem } from "./components/FileItem";
import { fileUploadVariants } from "./styles";
import type { FileUploadProps } from "./types";
import { formatFileSize } from "./utils";

// ============================================================================
// Component
// ============================================================================

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onFileSelect,
      onFilesSelect,
      onFileRemove,
      selectedFile,
      selectedFiles = [],
      fileItems = [],
      multiple = false,
      maxFiles = 10,
      layout = "horizontal",
      primaryText = "Drag and drop or",
      secondaryText = "Audio or video file, up to 100MB or 1 Hour",
      uploadButtonText,
      acceptedTypes,
      maxSize = 100 * 1024 * 1024, // 100MB default
      disabled = false,
      error,
      dropzoneOptions = {},
    },
    ref
  ) => {
    // Use fileItems if provided, otherwise use selectedFiles
    const useAdvancedMode = fileItems.length > 0 || onFileRemove !== undefined;

    // Determine if we have files based on mode
    const hasFiles = multiple
      ? useAdvancedMode
        ? fileItems.length > 0
        : selectedFiles.length > 0
      : selectedFile !== null && selectedFile !== undefined;

    const handleDrop = React.useCallback(
      (acceptedFiles: File[], rejections: unknown[]) => {
        if (rejections.length > 0) return;
        if (acceptedFiles.length === 0) return;

        if (multiple) {
          const newFiles = [...selectedFiles, ...acceptedFiles].slice(
            0,
            maxFiles
          );
          onFilesSelect?.(newFiles);
        } else {
          onFileSelect?.(acceptedFiles[0]);
        }
      },
      [multiple, selectedFiles, maxFiles, onFilesSelect, onFileSelect]
    );

    const handleRemoveFile = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
          onFilesSelect?.([]);
        } else {
          onFileSelect?.(null);
        }
      },
      [multiple, onFilesSelect, onFileSelect]
    );

    const handleRemoveSingleFile = React.useCallback(
      (index: number) => {
        if (useAdvancedMode && onFileRemove) {
          onFileRemove(index);
        } else {
          const newFiles = selectedFiles.filter((_, i) => i !== index);
          onFilesSelect?.(newFiles);
        }
      },
      [useAdvancedMode, onFileRemove, selectedFiles, onFilesSelect]
    );

    const handleUploadClick = React.useCallback(
      (e: React.MouseEvent, open: () => void) => {
        e.stopPropagation();
        open();
      },
      []
    );

    const isVertical = layout === "vertical";
    const fileCount = useAdvancedMode ? fileItems.length : selectedFiles.length;

    // In multiple mode, dropzone always shows upload state (files shown in list below)
    // In single mode, dropzone shows selected state when file is present
    const showSelectedState = !multiple && hasFiles;

    return (
      <div ref={ref} className="flex flex-col gap-tatva-4">
        {/* Dropzone */}
        <Dropzone
          onDrop={handleDrop}
          accept={acceptedTypes}
          maxFiles={multiple ? maxFiles : 1}
          maxSize={maxSize}
          disabled={disabled}
          multiple={multiple}
          {...dropzoneOptions}
        >
          {({ getRootProps, getInputProps, isDragActive, open }) => (
            <div
              {...getRootProps()}
              className={cn(
                fileUploadVariants({
                  layout,
                  isDragActive,
                  hasFile: showSelectedState,
                  disabled,
                })
              )}
            >
              <DashedBorder
                isDragActive={isDragActive}
                hasFile={showSelectedState}
              />
              <input {...getInputProps()} />

              {/* Icon Container */}
              <div
                className={cn(
                  "flex size-tatva-20 shrink-0 items-center justify-center rounded-tatva-md",
                  error
                    ? "bg-tatva-danger-background"
                    : showSelectedState || disabled
                      ? "bg-tatva-background-secondary"
                      : "bg-tatva-brand-primary"
                )}
              >
                <Icon
                  name={error ? "error" : showSelectedState ? "file" : "upload"}
                  size="lg"
                  strokeWidth={1.2}
                  tone={
                    error
                      ? "danger"
                      : showSelectedState || disabled
                        ? "primary"
                        : "brand"
                  }
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  "flex flex-col gap-tatva-1",
                  isVertical ? "items-center text-center" : " flex-1"
                )}
              >
                {showSelectedState && selectedFile ? (
                  <>
                    <Text variant="body-md" lineClamp={1}>
                      {selectedFile.name}
                    </Text>
                    <Text
                      variant="body-md"
                      tone={error ? "danger" : "secondary"}
                    >
                      {error || formatFileSize(selectedFile.size)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text variant="body-md">
                      {primaryText}{" "}
                      <span className="text-tatva-brand-content-primary">
                        click to upload
                      </span>
                    </Text>
                    <Text
                      variant="body-md"
                      tone={error ? "danger" : "secondary"}
                    >
                      {error || secondaryText}
                    </Text>
                  </>
                )}
              </div>

              {/* Action Button */}
              {uploadButtonText && (
                <div className={cn("shrink-0", isVertical ? "mt-tatva-8" : "")}>
                  {showSelectedState ? (
                    <Button
                      variant="ghost"
                      size="md"
                      icon="close"
                      onClick={handleRemoveFile}
                      disabled={disabled}
                      tooltip="Remove file"
                    />
                  ) : (
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={(e) => handleUploadClick(e, open)}
                      disabled={disabled}
                    >
                      {uploadButtonText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </Dropzone>

        {/* Selected Files List */}
        {multiple && fileCount > 0 && (
          <div className="flex flex-col">
            {useAdvancedMode
              ? fileItems.map((item, index) => (
                  <FileItem
                    key={`${item.file.name}-${index}`}
                    item={item}
                    onRemove={() => handleRemoveSingleFile(index)}
                    disabled={disabled}
                    showDivider={index < fileItems.length - 1}
                  />
                ))
              : selectedFiles.map((file, index) => (
                  <SimpleFileItem
                    key={`${file.name}-${index}`}
                    file={file}
                    onRemove={() => handleRemoveSingleFile(index)}
                    disabled={disabled}
                    showDivider={index < selectedFiles.length - 1}
                  />
                ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

// ============================================================================
// Exports
// ============================================================================

export type { FileItemData, FileUploadProps } from "./types";
export { FileUpload, fileUploadVariants };
export default FileUpload;
