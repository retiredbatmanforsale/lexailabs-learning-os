import * as React from "react";
import Link from "@docusaurus/Link";

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavbarProps {
  navItems?: NavItem[];
  isLoggedIn?: boolean;
  user?: { name: string; email: string; avatar?: string };
  isPremium?: boolean;
  onGetStarted?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  variant?: "default" | "transparent";
  className?: string;
}

export function Navbar({
  navItems = [],
  isLoggedIn = false,
  user,
  onGetStarted,
  onLogin,
  variant = "default",
  className = "",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full ${
        variant === "default"
          ? "border-b border-gray-200 bg-white/95 backdrop-blur-md"
          : "bg-transparent"
      } ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 no-underline hover:no-underline">
            <img
              src="/lexai-logo.png"
              alt="Lex AI"
              width={36}
              height={36}
              className="size-9 rounded-lg"
            />
            <span className="text-xl font-bold text-gray-900">Lex AI</span>
          </Link>

          {/* Desktop Nav Items */}
          {navItems.length > 0 && (
            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium no-underline transition-colors ${
                    item.isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isLoggedIn && user ? (
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:inline-flex"
              >
                Login
              </button>
              <button
                onClick={onGetStarted}
                className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Get Started
              </button>
            </>
          )}

          {/* Mobile menu button */}
          {navItems.length > 0 && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && navItems.length > 0 && (
        <div className="border-t border-gray-100 px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block py-2 text-sm font-medium text-gray-600 no-underline hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
