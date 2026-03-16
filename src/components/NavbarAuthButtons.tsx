import React from 'react';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useAuth } from '../hooks/useAuth';

function NavbarAuthInner() {
  const { isAuthenticated, hasAccess, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="button button--primary button--lg"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 ml-2">
      {!hasAccess && (
        <Link
          to="/subscribe"
          className="button button--warning button--sm"
        >
          Subscribe
        </Link>
      )}
      <div className="dropdown dropdown--hoverable dropdown--right">
        <button
          className="button button--secondary button--sm flex items-center gap-1.5 px-2 py-1"
        >
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              className="w-6 h-6 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="w-6 h-6 rounded-full bg-[var(--ifm-color-primary)] text-white flex items-center justify-center text-xs font-semibold">
              {(user?.name || user?.email || '?')[0].toUpperCase()}
            </span>
          )}
        </button>
        <ul className="dropdown__menu min-w-[160px]">
          <li>
            <span className="dropdown__link font-medium cursor-default">
              {user?.name || user?.email}
            </span>
          </li>
          <li>
            <span
              className="dropdown__link text-xs text-[var(--ifm-color-emphasis-500)] cursor-default"
            >
              {user?.email}
            </span>
          </li>
          <li className="border-t border-[var(--ifm-color-emphasis-200)] mt-1 pt-1">
            <a
              className="dropdown__link text-[var(--ifm-color-danger)]"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              href="#"
            >
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function NavbarAuthButtons() {
  return (
    <BrowserOnly fallback={null}>
      {() => <NavbarAuthInner />}
    </BrowserOnly>
  );
}
