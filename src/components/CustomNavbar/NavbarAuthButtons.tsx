import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';
import styles from './NavbarAuthButtons.module.css';

function AuthButtonsInner() {
  const { isAuthenticated, hasAccess, user, logout, isLoading } = useAuth();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
      setAvatarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (avatarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [avatarOpen, handleClickOutside]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.buttons}>
        <Link to="/login" className={styles.loginBtn}>
          Log In
        </Link>
        <Link to="/login?tab=register" className={styles.getStartedBtn}>
          Get Started
        </Link>
      </div>
    );
  }

  const initials = (user?.name || user?.email || '?')[0].toUpperCase();

  return (
    <div className={styles.buttons}>
      {!hasAccess && (
        <Link to="/subscribe" className={styles.getStartedBtn}>
          Subscribe
        </Link>
      )}

      <div ref={avatarRef} className={styles.avatarContainer}>
        <button
          className={styles.avatarBtn}
          onClick={() => setAvatarOpen((prev) => !prev)}
          aria-expanded={avatarOpen}
          aria-haspopup="true"
          type="button"
        >
          {user?.image ? (
            <img
              src={user.image}
              alt=""
              className={styles.avatarImg}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className={styles.avatarFallback}>{initials}</span>
          )}
        </button>

        <div className={`${styles.avatarPanel} ${avatarOpen ? styles.avatarPanelOpen : ''}`}>
          <div className={styles.avatarPanelInner}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || user?.email}</span>
              {user?.name && user?.email && (
                <span className={styles.userEmail}>{user.email}</span>
              )}
            </div>
            <div className={styles.divider} />
            <button
              className={styles.signOutBtn}
              onClick={() => {
                setAvatarOpen(false);
                logout();
              }}
              type="button"
            >
              <LogOut size={14} strokeWidth={2} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NavbarAuthButtons(): React.JSX.Element {
  return (
    <BrowserOnly fallback={null}>
      {() => <AuthButtonsInner />}
    </BrowserOnly>
  );
}
