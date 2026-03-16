import * as React from "react";
import Link from "@docusaurus/Link";
import { Text, Button, Avatar, Menu, Badge } from "@/ui";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface NavItem {
  /** Navigation item label */
  label: string;
  /** Navigation item href */
  href: string;
  /** Whether this item is active */
  isActive?: boolean;
}

export interface NavbarProps {
  /** Navigation items */
  navItems?: NavItem[];
  /** Whether user is logged in */
  isLoggedIn?: boolean;
  /** User info (when logged in) */
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  /** Whether user has premium access */
  isPremium?: boolean;
  /** Handler for Get Started button */
  onGetStarted?: () => void;
  /** Handler for Login button */
  onLogin?: () => void;
  /** Handler for Logout */
  onLogout?: () => void;
  /** Navbar variant - default has background, transparent blends with content */
  variant?: "default" | "transparent";
  /** Additional class names */
  className?: string;
}

// ============================================================================
// Default Navigation Items
// ============================================================================

const defaultNavItems: NavItem[] = [
  { label: "Courses", href: "/courses" },
  { label: "Learning Paths", href: "/learning-paths" },
  { label: "Pricing", href: "/pricing" },
];

// ============================================================================
// Component
// ============================================================================

export function Navbar({
  navItems = defaultNavItems,
  isLoggedIn = false,
  user,
  isPremium = false,
  onGetStarted,
  onLogin,
  onLogout,
  variant = "default",
  className,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "w-full",
        variant === "default" && "border-b border-tatva-border bg-tatva-background-primary",
        variant === "transparent" && "bg-transparent",
        className
      )}
    >
      <div className="mx-auto w-full max-w-9xl flex items-center justify-between px-tatva-20 py-tatva-10">
      {/* Left: Logo + Nav Items */}
      <div className="flex items-center gap-tatva-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-tatva-3">
          <img
            src="/lexai-logo.png"
            alt="Lex AI"
            width={36}
            height={36}
            className="size-9"
          />
          <Text variant="heading-sm">Lex AI</Text>
        </Link>

        {/* Navigation Items */}
        <div className="hidden items-center gap-tatva-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative py-tatva-2 transition-colors duration-150",
                item.isActive
                  ? "text-tatva-content-primary"
                  : "text-tatva-content-secondary hover:text-tatva-content-primary"
              )}
            >
              <Button
                variant={item.isActive ? "secondary" : "ghost"}
                size="sm"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Auth Buttons or User Menu */}
      <div className="flex items-center gap-tatva-4">
        {isLoggedIn && user ? (
          /* Logged In State */
          <div className="flex items-center gap-tatva-4">
            {/* Premium Badge */}
            {isPremium && (
              <Badge type="label" variant="orange" size="sm">
                Premium
              </Badge>
            )}
            <Menu
              options={[
                { label: "Logout", icon: "logout", onClick: onLogout },
              ]}
              align="end"
            >
              <button className="flex items-center gap-tatva-3 rounded-tatva-full p-tatva-2 transition-colors hover:bg-tatva-background-secondary">
                <Avatar
                  src={user.avatar}
                  fallback={user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  size="sm"
                />
                <Text variant="body-sm" className="hidden sm:block">
                  {user.name}
                </Text>
              </button>
            </Menu>
          </div>
        ) : (
          /* Logged Out State */
          <div className="flex items-center gap-tatva-3">
            <Button variant="ghost" size="md" onClick={onLogin}>
              Login
            </Button>
            <Button variant="primary" size="md" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
