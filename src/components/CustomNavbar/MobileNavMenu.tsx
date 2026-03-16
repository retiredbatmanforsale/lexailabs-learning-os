import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { ChevronDown } from 'lucide-react';
import { navDropdowns } from './navData';
import NavbarAuthButtons from './NavbarAuthButtons';
import styles from './MobileNavMenu.module.css';

function AccordionSection({ data }: { data: typeof navDropdowns[number] }): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        type="button"
      >
        <span className={styles.sectionLabel}>{data.label}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`${styles.sectionChevron} ${expanded ? styles.sectionChevronOpen : ''}`}
        />
      </button>

      <div className={`${styles.sectionBody} ${expanded ? styles.sectionBodyOpen : ''}`}>
        <div className={styles.sectionItems}>
          {data.courses.map((course) => {
            const Icon = course.icon;
            return (
              <Link
                key={course.to}
                to={course.to}
                className={styles.courseItem}
                onClick={() => mobileSidebar.toggle()}
              >
                <span className={styles.courseIcon}>
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className={styles.courseText}>
                  <span className={styles.courseTitle}>{course.title}</span>
                  <span className={styles.courseDesc}>{course.description}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MobileNavMenu(): React.JSX.Element {
  return (
    <div className={styles.menu}>
      {navDropdowns.map((dd) => (
        <AccordionSection key={dd.label} data={dd} />
      ))}

      <div className={styles.authSection}>
        <NavbarAuthButtons />
      </div>
    </div>
  );
}
