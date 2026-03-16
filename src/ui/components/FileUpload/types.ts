import { type DropzoneOptions } from "react-dropzone";

// ============================================================================
// File Item Types
// ============================================================================

/** File item with upload status */
export interface FileItemData {
  /** The file object */
  file: File;
  /** Upload status */
  status: "uploading" | "error" | "uploaded";
  /** Upload progress percentage (0-100) for uploading status */
  progress?: number;
  /** Error message for error status */
  errorMessage?: string;
}

// ============================================================================
// Component Props
// ============================================================================

export interface FileUploadProps {
  /** Callback when files are selected or removed (single file mode) */
  onFileSelect?: (file: File | null) => void;
  /** Callback when files are selected or removed (multiple file mode) */
  onFilesSelect?: (files: File[]) => void;
  /** Callback when a file item is removed (multiple mode with status) */
  onFileRemove?: (index: number) => void;
  /** Currently selected file (single mode) */
  selectedFile?: File | null;
  /** Currently selected files (multiple mode - simple) */
  selectedFiles?: File[];
  /** File items with status (multiple mode - advanced) */
  fileItems?: FileItemData[];
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum number of files (only for multiple mode) */
  maxFiles?: number;
  /** Layout direction */
  layout?: "horizontal" | "vertical";
  /** Primary instruction text */
  primaryText?: string;
  /** Secondary helper text (file type/size info) */
  secondaryText?: string;
  /** Upload button text - shows button when provided */
  uploadButtonText?: string;
  /** Accepted file types (MIME type to extensions) */
  acceptedTypes?: Record<string, string[]>;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Disable the upload */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Additional dropzone options */
  dropzoneOptions?: Partial<DropzoneOptions>;
}

// ============================================================================
// Internal Component Props
// ============================================================================

export interface DashedBorderProps {
  isDragActive: boolean;
  hasFile: boolean;
}

export interface ProgressCircleProps {
  progress: number;
  size?: number;
}

export interface FileItemProps {
  item: FileItemData;
  onRemove: () => void;
  disabled?: boolean;
  showDivider?: boolean;
}

export interface SimpleFileItemProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
  showDivider?: boolean;
}
