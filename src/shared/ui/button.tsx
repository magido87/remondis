import { Slot } from '@radix-ui/react-slot';
import { cn } from '@shared/lib/cn';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant = 'primary', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'rounded-md px-4 py-2 h-10',
          variant === 'primary' &&
            'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
          variant === 'secondary' &&
            'bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700',
          variant === 'ghost' && 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button'; 