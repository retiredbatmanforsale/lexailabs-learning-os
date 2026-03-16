export interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  label: string;
  /** Navigation URL (renders as Link) */
  href?: string;
  /** Click handler (when no href is provided) */
  onClick?: () => void;
  /** Force active state styling */
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Type of separator between items */
  separatorType?: "chevron" | "slash";
  /** Custom link component (e.g., Next.js Link) */
  linkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

