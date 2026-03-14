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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
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
          className="button button--secondary button--sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.5rem',
          }}
        >
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
              }}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--ifm-color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {(user?.name || user?.email || '?')[0].toUpperCase()}
            </span>
          )}
        </button>
        <ul className="dropdown__menu" style={{ minWidth: '160px' }}>
          <li>
            <span className="dropdown__link" style={{ fontWeight: 500, cursor: 'default' }}>
              {user?.name || user?.email}
            </span>
          </li>
          <li>
            <span
              className="dropdown__link"
              style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)', cursor: 'default' }}
            >
              {user?.email}
            </span>
          </li>
          <li style={{ borderTop: '1px solid var(--ifm-color-emphasis-200)', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
            <a
              className="dropdown__link"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              href="#"
              style={{ color: 'var(--ifm-color-danger)' }}
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
