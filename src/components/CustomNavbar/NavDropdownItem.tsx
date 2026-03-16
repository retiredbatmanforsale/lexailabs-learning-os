import React from 'react';
import Link from '@docusaurus/Link';
import type { NavCourse } from './navData';
import styles from './NavDropdownItem.module.css';

interface Props {
  course: NavCourse;
  onClick?: () => void;
}

export default function NavDropdownItem({ course, onClick }: Props): React.JSX.Element {
  const Icon = course.icon;
  return (
    <Link to={course.to} className={styles.item} onClick={onClick}>
      <span className={styles.iconWrap}>
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{course.title}</span>
        <span className={styles.description}>{course.description}</span>
      </span>
    </Link>
  );
}
