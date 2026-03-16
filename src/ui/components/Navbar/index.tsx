"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Avatar, type AvatarProps } from "../Avatar";
import { Button } from "../Button";
import type { IconName } from "../Icon";
import Icon from "../Icon";
import { Menu, type MenuOption } from "../Menu";

// ============================================================================
// Types
// ============================================================================

export interface NavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: IconName;
  /** URL to navigate to */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether to show as highlighted/featured */
  featured?: boolean;
}

export interface NavbarProps {
  /** Logo element or image URL */
  logo?: React.ReactNode | string;
  /** Logo alt text (if logo is a string URL) */
  logoAlt?: string;
  /** Click handler for logo */
  onLogoClick?: () => void;
  /** Navigation items */
  navItems?: NavItem[];
  /** Right-side actions (buttons) */
  actions?: Array<{
    label?: string;
    icon?: IconName;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    onClick?: () => void;
    href?: string;
  }>;
  /** User menu (if logged in) */
  user?: {
    name: string;
    email?: string;
    avatar?: AvatarProps;
    menuOptions?: MenuOption[];
  };
  /** Whether to show mobile menu toggle */
  showMobileMenu?: boolean;
  /** Variant style */
  variant?: "default" | "transparent" | "bordered";
  /** Whether navbar is sticky */
  sticky?: boolean;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// Styles
// ============================================================================

const navbarVariants = cva(
  "w-full px-tatva-16 py-tatva-8 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-tatva-surface-secondary",
        transparent: "bg-transparent",
        bordered: "bg-tatva-surface-secondary border-b border-tatva-border",
      },
      sticky: {
        true: "sticky top-0 z-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      sticky: false,
    },
  }
);

const navItemVariants = cva(
  "relative px-tatva-4 py-tatva-2 rounded-tatva-full text-tatva-body-sm font-medium transition-all duration-150 cursor-pointer",
  {
    variants: {
      active: {
        true: "text-tatva-brand-content-primary bg-tatva-brand-primary",
        false: "text-tatva-content-secondary hover:text-tatva-content-primary hover:bg-tatva-background-secondary",
      },
      featured: {
        true: "text-tatva-brand-content-primary",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      featured: false,
    },
  }
);

// ============================================================================
// Component
// ============================================================================

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      logoAlt = "Logo",
      onLogoClick,
      navItems = [],
      actions = [],
      user,
      showMobileMenu = true,
      variant = "default",
      sticky = false,
      className,
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    // Render logo
    const renderLogo = () => {
      if (!logo) return null;

      const logoContent =
        typeof logo === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={logoAlt} className="h-tatva-12 w-auto" />
        ) : (
          logo
        );

      if (onLogoClick) {
        return (
          <button
            onClick={onLogoClick}
            className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-tatva-brand-primary focus-visible:ring-offset-2 rounded-tatva-sm"
          >
            {logoContent}
          </button>
        );
      }

      return <div className="flex shrink-0 items-center">{logoContent}</div>;
    };

    // Render nav items
    const renderNavItems = (mobile = false) => (
      <nav
        className={cn(
          "flex items-center",
          mobile ? "flex-col gap-tatva-2 w-full" : "gap-tatva-2"
        )}
      >
        {navItems.map((item) => {
          const Element = item.href ? "a" : "button";
          return (
            <Element
              key={item.id}
              href={item.href}
              onClick={item.onClick}
              className={cn(
                navItemVariants({
                  active: item.active,
                  featured: item.featured,
                }),
                mobile ? "w-full text-center" : undefined
              )}
            >
              <span className="flex items-center justify-center gap-tatva-2">
                {item.icon && <Icon name={item.icon} size="sm" />}
                {item.label}
              </span>
            </Element>
          );
        })}
      </nav>
    );

    // Render actions
    const renderActions = () => (
      <div className="flex items-center gap-tatva-3">
        {actions.map((action, index) => {
          if (action.href) {
            return (
              <a key={index} href={action.href}>
                <Button
                  variant={action.variant ?? "secondary"}
                  size="sm"
                  icon={action.icon}
                >
                  {action.label}
                </Button>
              </a>
            );
          }
          return (
            <Button
              key={index}
              variant={action.variant ?? "secondary"}
              size="sm"
              icon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          );
        })}
      </div>
    );

    // Render user menu
    const renderUserMenu = () => {
      if (!user) return null;

      const userMenuOptions: MenuOption[] = user.menuOptions ?? [
        { label: "Profile", value: "profile" },
        { label: "Settings", value: "settings" },
        { label: "", isSeparator: true },
        { label: "Sign out", value: "signout" },
      ];

      return (
        <Menu options={userMenuOptions} align="end">
          <button className="flex items-center gap-tatva-3 rounded-tatva-full p-tatva-1 hover:bg-tatva-background-secondary transition-colors">
            <Avatar
              size="sm"
              fallback={user.name}
              src={user.avatar?.src}
            />
            <Icon name="chevron-down" size="sm" tone="secondary" />
          </button>
        </Menu>
      );
    };

    return (
      <header
        ref={ref}
        className={cn(navbarVariants({ variant, sticky }), className)}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-tatva-10">
            {renderLogo()}
            {/* Desktop nav */}
            <div className="hidden md:flex">{renderNavItems()}</div>
          </div>

          {/* Right: Actions + User */}
          <div className="flex items-center gap-tatva-4">
            {/* Desktop actions */}
            <div className="hidden md:flex">{renderActions()}</div>
            {renderUserMenu()}

            {/* Mobile menu toggle */}
            {showMobileMenu && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden size-tatva-12 items-center justify-center rounded-tatva-full hover:bg-tatva-background-secondary"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <Icon
                  name={mobileMenuOpen ? "close" : "menu"}
                  size="md"
                  tone="secondary"
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && mobileMenuOpen && (
          <div className="md:hidden mt-tatva-4 pt-tatva-4 border-t border-tatva-border">
            {renderNavItems(true)}
            <div className="mt-tatva-4 pt-tatva-4 border-t border-tatva-border flex flex-col gap-tatva-2">
              {actions.map((action, index) => (
                <div key={index} className="w-full">
                  <Button
                    variant={action.variant ?? "secondary"}
                    size="md"
                    icon={action.icon}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    );
  }
);

Navbar.displayName = "Navbar";

// ============================================================================
// Exports
// ============================================================================

export { Navbar, navbarVariants, navItemVariants };
export default Navbar;
