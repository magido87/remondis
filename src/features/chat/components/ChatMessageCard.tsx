import { cn } from '@shared/lib/cn';

interface Props {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessageCard({ role, content }: Props) {
  return (
    <article
      aria-label={`${role} message`}
      className={cn(
        'max-w-3xl prose dark:prose-invert break-words rounded-lg p-4 my-3 shadow-sm',
        role === 'user'
          ? 'ml-auto bg-primary-500 text-white'
          : 'mr-auto bg-neutral-100 dark:bg-neutral-800',
      )}
    >
      {content}
    </article>
  );
} 