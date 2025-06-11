import { useState } from 'react';
import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/button';

interface Props {
  onSend: (value: string) => void;
  disabled?: boolean;
}

export function InputComposer({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSend(value);
        setValue('');
      }}
      className="flex gap-3"
    >
      <textarea
        className={cn(
          'flex-1 resize-none rounded-md border border-neutral-300 p-3 dark:bg-neutral-900 dark:text-neutral-50',
        )}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder="Skriv ett meddelande…"
      />
      <Button type="submit" disabled={disabled || !value.trim()}>
        Skicka
      </Button>
    </form>
  );
} 