import React from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isUser = message.role === 'user';
  const isRemondis = theme === 'remondis';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={cn(
          'group relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md',
          isUser
            ? isRemondis
              ? 'bg-remondis text-white'
              : 'bg-primary text-primary-foreground'
            : isRemondis
            ? 'bg-remondis/10 text-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {isUser ? (
              <div className="w-8 h-8 rounded-full bg-remondis/20 flex items-center justify-center">
                <User className="h-5 w-5 text-remondis" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-remondis/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-remondis" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {isLoading ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-remondis/50 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-remondis/50 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-remondis/50 animate-bounce delay-200" />
                </div>
              ) : (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                    pre: ({ children }) => (
                      <pre className="bg-black/10 rounded-lg p-4 overflow-x-auto">
                        {children}
                      </pre>
                    ),
                    code: ({ children }) => (
                      <code className="bg-black/10 rounded px-1 py-0.5">{children}</code>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
        {!isLoading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              'absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity',
              isUser ? 'text-white/80 hover:text-white' : 'text-foreground/80 hover:text-foreground'
            )}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
