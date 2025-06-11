'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error('Något gick fel vid kommunikation med AI:n');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Tyvärr kunde jag inte processa din fråga just nu. Vänligen försök igen senare.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/remondis-logo.png"
              alt="Remondis Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Remondis Chat
            </h1>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-2xl w-full">
              <Image
                src="/remondis-logo.png"
                alt="Remondis Logo"
                width={80}
                height={80}
                className="mx-auto mb-6 rounded-lg"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Välkommen till Remondis Chat
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Jag är din AI-assistent, redo att hjälpa dig med frågor om återvinning, 
                miljö och Remondis tjänster. Hur kan jag hjälpa dig idag?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setInput('Vad är Remondis?')}
                  className="p-4 bg-[#00A19C] hover:bg-[#008F8A] text-white rounded-lg transition-colors"
                >
                  Vad är Remondis?
                </button>
                <button
                  onClick={() => setInput('Hur fungerar återvinning?')}
                  className="p-4 bg-[#00A19C] hover:bg-[#008F8A] text-white rounded-lg transition-colors"
                >
                  Hur fungerar återvinning?
                </button>
                <button
                  onClick={() => setInput('Vilka tjänster erbjuder Remondis?')}
                  className="p-4 bg-[#00A19C] hover:bg-[#008F8A] text-white rounded-lg transition-colors"
                >
                  Vilka tjänster erbjuder Remondis?
                </button>
                <button
                  onClick={() => setInput('Hur kan jag bli mer miljövänlig?')}
                  className="p-4 bg-[#00A19C] hover:bg-[#008F8A] text-white rounded-lg transition-colors"
                >
                  Hur kan jag bli mer miljövänlig?
                </button>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-[#00A19C] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-gray-900 dark:text-white">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#00A19C] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#00A19C] rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-[#00A19C] rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv ditt meddelande här..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A19C] dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#00A19C] hover:bg-[#008F8A] text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Skicka
          </button>
        </div>
      </form>
    </div>
  );
} 