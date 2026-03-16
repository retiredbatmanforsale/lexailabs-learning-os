"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Icon } from "../Icon";
import type { BreadcrumbItem, BreadcrumbsProps } from "./types";

export type { BreadcrumbItem, BreadcrumbsProps };

// Default link component (plain anchor)
const DefaultLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const breadcrumbsVariants = cva("flex items-center font-matter", {
  variants: {
    size: {
      sm: "text-tatva-body-xs",
      md: "text-tatva-body-sm",
      lg: "text-tatva-body-md",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbItemVariants = cva(
  "inline-flex items-center gap-tatva-2 rounded-tatva-xs font-normal transition-colors",
  {
    variants: {
      size: {
        sm: "px-tatva-2 py-tatva-1",
        md: "px-tatva-4 py-tatva-2",
        lg: "p-tatva-4",
      },
      isActive: {
        true: "cursor-default text-tatva-content-primary !font-medium",
        false: "text-tatva-content-secondary hover:text-tatva-content-primary",
      },
      isClickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      isActive: false,
      isClickable: false,
    },
  }
);

const separatorVariants = cva("shrink-0 text-tatva-content-tertiary", {
  variants: {
    size: {
      sm: "size-tatva-3",
      md: "size-tatva-4",
      lg: "size-tatva-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const slashVariants = cva(
  "select-none font-normal text-tatva-border-secondary",
  {
    variants: {
      size: {
        sm: "mx-tatva-2 text-tatva-body-sm",
        md: "mx-tatva-4 text-tatva-body-md",
        lg: "mx-tatva-4 text-tatva-body-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type BreadcrumbsVariants = VariantProps<typeof breadcrumbsVariants>;

export interface BreadcrumbsComponentProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "className">,
    BreadcrumbsProps,
    BreadcrumbsVariants {}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsComponentProps>(
  (
    {
      items,
      separatorType = "chevron",
      size = "md",
      linkComponent: Link = DefaultLink,
      ...props
    },
    ref
  ) => {
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={breadcrumbsVariants({ size })}
        role="navigation"
        {...props}
      >
        <ol className="flex items-center">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isActive = item.isActive || isLast;
            const isClickable = !!(item.href || item.onClick) && !isActive;

            return (
              <li key={index} className="flex items-center">
                {/* Breadcrumb Item */}
                {item.href && !isActive ? (
                  <Link
                    href={item.href}
                    className={breadcrumbItemVariants({
                      size,
                      isActive,
                      isClickable: true,
                    })}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    onClick={!isActive ? item.onClick : undefined}
                    className={breadcrumbItemVariants({
                      size,
                      isActive,
                      isClickable,
                    })}
                    aria-current={isActive ? "page" : undefined}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={
                      isClickable
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              item.onClick?.();
                            }
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast &&
                  (separatorType === "chevron" ? (
                    <Icon name="chevron-right" />
                  ) : (
                    <span
                      className={slashVariants({ size })}
                      aria-hidden="true"
                    >
                      /
                    </span>
                  ))}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export {
  breadcrumbItemVariants,
  Breadcrumbs,
  breadcrumbsVariants,
  separatorVariants,
  slashVariants,
};
export default Breadcrumbs;
