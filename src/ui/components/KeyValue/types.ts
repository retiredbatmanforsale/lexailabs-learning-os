export interface KeyValueProps {
  /** The label/key text */
  label: string;
  /** Tooltip content - shows info icon when provided */
  tooltip?: string;
  /** The value to display */
  value: React.ReactNode;
}

export interface KeyValueGroupProps {
  /** Whether to show dividers between items */
  dividers?: boolean;
}

