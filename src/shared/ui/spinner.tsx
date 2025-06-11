import { cn } from '@shared/lib/cn';

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      aria-label="Loading"
      className={cn('animate-spin h-5 w-5 text-primary-500', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M22 12a10 10 0 0 1-10 10" />
    </svg>
  );
} 