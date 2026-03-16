import React from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavDropdown from './NavDropdown';
import NavbarAuthButtons from './NavbarAuthButtons';
import { navDropdowns } from './navData';
import { Menu, X } from 'lucide-react';
import styles from './CustomNavbarContent.module.css';

function NavbarLogo(): React.JSX.Element {
  const {
    navbar: { title, logo },
  } = useThemeConfig();

  return (
    <Link to="/" className={styles.brand}>
      {logo && (
        <img
          src={logo.src}
          alt={logo.alt || ''}
          className={styles.logo}
        />
      )}
      {title && <span className={styles.title}>{title}</span>}
    </Link>
  );
}

function MobileToggle(): React.JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      className={styles.mobileToggle}
      onClick={() => mobileSidebar.toggle()}
      aria-label="Navigation menu"
      aria-expanded={mobileSidebar.shown}
      type="button"
    >
      {mobileSidebar.shown ? (
        <X size={22} strokeWidth={2} />
      ) : (
        <Menu size={22} strokeWidth={2} />
      )}
    </button>
  );
}

export default function CustomNavbarContent(): React.JSX.Element {
  return (
    <div className={styles.content}>
      {/* Left section: logo + nav dropdowns */}
      <div className={styles.left}>
        <NavbarLogo />
        <div className={styles.separator} />
        <nav className={styles.nav} aria-label="Main navigation">
          {navDropdowns.map((dd) => (
            <NavDropdown key={dd.label} data={dd} />
          ))}
        </nav>
      </div>

      {/* Right section: auth buttons (desktop) + mobile toggle */}
      <div className={styles.right}>
        <div className={styles.authDesktop}>
          <NavbarAuthButtons />
        </div>
        <MobileToggle />
      </div>
    </div>
  );
}
