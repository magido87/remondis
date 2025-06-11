import { LucideProps } from 'lucide-react';

export function Icon(props: LucideProps) {
  // Wrapper if we later want to add defaults or context-based sizing
  return <svg {...props} />;
} 