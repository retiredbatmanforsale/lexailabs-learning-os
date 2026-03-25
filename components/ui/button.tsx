import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 text-white hover:opacity-80',
        destructive:
          'bg-destructive text-white hover:opacity-80',
        outline:
          'border border-neutral-200 bg-white hover:opacity-80 text-neutral-900',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:opacity-80',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600',
        link: 'text-neutral-900 underline-offset-4 hover:underline',
        accent:
          'bg-coral-500 text-white hover:opacity-80',
        shimmer:
          'bg-gradient-to-r from-neutral-900 to-neutral-700 text-white relative overflow-hidden hover:opacity-80',
        white:
          'bg-white text-neutral-900 hover:opacity-80 border border-neutral-200',
      },
      size: {
        default: 'h-10 px-6 py-2 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, children, disabled, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'cursor-not-allowed opacity-70'
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
