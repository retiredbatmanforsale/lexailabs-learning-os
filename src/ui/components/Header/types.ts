import type { AvatarGroupProps } from "../Avatar";
import type { BadgeProps } from "../Badge";
import type { ButtonProps } from "../Button";
import type { IconName } from "../Icon";
import type { MenuOption } from "../Menu";
import type { SelectProps } from "../Select";

/**
 * Header type variants:
 * - main: heading-md title, body-md subtitle, 8px gap
 * - canvas: heading-xs title, subtitle not supported
 * - panel: heading-sm title, body-md subtitle, 4px gap
 */
export type HeaderType = "main" | "canvas" | "panel";

/** Status indicator with text */
export interface HeaderStatus extends BadgeProps {
  /** Status text (e.g., "Last Saved 5m ago") */
  text?: string;
}

/** Action item - first 2 render as buttons, rest go to overflow menu */
export interface HeaderAction {
  /** Button text or menu item label */
  label: string;
  /** Icon name */
  icon?: IconName;
  /** Click handler */
  onClick: () => void;
  /** Button variant (for visible actions only) */
  variant?: ButtonProps["variant"];
  /** Disabled state */
  disabled?: boolean;
  /** Tooltip content (for visible actions only) */
  tooltip?: React.ReactNode;
}

/** Switch config - inherits from Select props */
export type HeaderSwitchConfig = SelectProps;

/** Title dropdown config for canvas type */
export interface HeaderTitleDropdown {
  /** Menu options */
  options: MenuOption[];
  /** Currently selected value */
  selectedValue?: string;
  /** Callback when selection changes */
  onSelect?: (value: string) => void;
}

/** Left section props */
export interface HeaderLeftProps {
  /** Title text */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Icon element */
  icon?: React.ReactNode;

  badge?: BadgeProps;
}

/** Collaborators props - inherits from AvatarGroup */
export type HeaderCollaboratorsProps = Omit<AvatarGroupProps, "size">;

/** Header component props */
export interface HeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "title"
> {
  /**
   * Header type variant
   * - main: heading-md title, body-md subtitle, 8px gap
   * - canvas: heading-xs title, subtitle not supported
   * - panel: heading-sm title, body-md subtitle, 4px gap
   * @default "main"
   */
  type?: HeaderType;
  /** Back button handler */
  onBack?: () => void;
  /** Left section - title, subtitle, icon */
  left?: HeaderLeftProps;
  /** Status indicator with dot and text */
  status?: HeaderStatus;
  /** Collaborators - uses AvatarGroup props (avatars, max) */
  collaborators?: HeaderCollaboratorsProps;
  /** Actions - first 2 as buttons, rest in overflow menu */
  actions?: HeaderAction[];
  /** Switch config - shows title in secondary color with slash, followed by a Select */
  switchConfig?: HeaderSwitchConfig;
  /** Deep switch config - shows another Select after the first switch with a slash separator */
  deepSwitchConfig?: HeaderSwitchConfig;
  /** Title dropdown config - shows a dropdown button next to title (only for canvas type) */
  titleDropdown?: HeaderTitleDropdown;
  /** Outside Actions Threshold */
  outsideActionsThreshold?: number;
  /** Show mobile menu button - appears on mobile (<768px) when Header is inside SidebarProvider */
  showMobileMenu?: boolean;
}
