import * as React from "react";
import { BadgeProps } from "../Badge";
import { IconName } from "../Icon";

export interface SidebarMenuItem {
  /** Menu item label */
  label: string;
  /** Icon component */
  icon?: IconName;
  /** Navigation href */
  href: string;
  /** Link target */
  target?: "_blank" | "_self";
  /** Whether this item is active */
  isActive?: boolean;
  /** Badge configuration */
  badge?: BadgeProps;
  /** Whether this is an external link (shows link icon on hover) */
  isExternal?: boolean;
}

export interface SidebarMenuGroup {
  /** Group label */
  label: string;
  /** Group items */
  items: SidebarMenuItem[];
  /** Show collapse/expand icon */
  collapsible?: boolean;
}

export interface SidebarProfileAction {
  /** Action label */
  label: string;
  /** Action icon */
  icon: IconName;
  /** Click handler */
  onClick: () => void;
}

export interface SidebarAccount {
  /** Account ID */
  id: string;
  /** Account name */
  name: string;
  /** Account email */
  email?: string;
  /** Account avatar */
  avatar?: React.ReactNode;
  /** Whether this account is currently active */
  isActive?: boolean;
}

export interface SidebarProfileProps {
  /** Profile avatar image source */
  avatar?: string;
  /** Profile name */
  name: string;
  /** Profile email */
  email?: string;
  /** Profile actions dropdown */
  actions?: SidebarProfileAction[];
  /** Switchable accounts */
  accounts?: SidebarAccount[];
  /** Handler when an account is switched */
  onAccountSwitch?: (account: SidebarAccount) => void;
}

export interface SidebarHeaderProps {
  /** Logo image URL (defaults to Sarvam logo) */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
}

export interface SidebarProps {
  /** Header configuration (optional) */
  header?: SidebarHeaderProps;
  /** Profile configuration */
  profile?: SidebarProfileProps;
  /** Menu items - can be flat items or grouped */
  menuItems: (SidebarMenuItem | SidebarMenuGroup)[];
  /** Footer menu items - individual items rendered above the profile (no groups) */
  footerMenuItems?: SidebarMenuItem[];
  /** Default open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Current active path (for auto-highlighting) */
  activePath?: string;
  /** Custom link component (e.g., Next.js Link) */
  linkComponent?: React.ComponentType<{
    href: string;
    target?: string;
    className?: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
  }>;
  /** Show "New Chat" button */
  showNewChat?: boolean;
  /** Handler for "New Chat" button click */
  onNewChatClick?: () => void;
  /** Additional className */
  className?: string;
}

export type SidebarLinkComponent = React.ComponentType<{
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}>;
