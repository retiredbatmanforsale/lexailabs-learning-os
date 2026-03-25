import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-700',
        beginner: 'bg-green-50 text-green-700 border border-green-200',
        intermediate: 'bg-blue-50 text-blue-700 border border-blue-200',
        advanced: 'bg-purple-50 text-purple-700 border border-purple-200',
        allLevels: 'bg-neutral-50 text-neutral-600 border border-neutral-200',
        coral: 'bg-coral-100 text-coral-700',
        dark: 'bg-neutral-900 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export function getLevelBadgeVariant(
  level: string
): 'beginner' | 'intermediate' | 'advanced' | 'allLevels' {
  switch (level) {
    case 'Beginner':
      return 'beginner';
    case 'Intermediate':
      return 'intermediate';
    case 'Advanced':
      return 'advanced';
    default:
      return 'allLevels';
  }
}

export { Badge, badgeVariants };
