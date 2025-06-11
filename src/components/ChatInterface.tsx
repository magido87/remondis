import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, Plus, MessageSquare, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { Sidebar } from './Sidebar';
import { ApiKeyModal } from './ApiKeyModal';
import { useChat } from '@/hooks/useChat';
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-2"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "remondis" ? "light" : "remondis")}
        className="flex items-center gap-2"
      >
        <span className="text-remondis">Remondis</span>
      </Button>
    </div>
  );
};

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showApiModal, setShowApiModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    apiKey,
    setApiKey,
    sendMessage,
    createNewChat,
    conversations,
    currentConversationId,
    switchConversation
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!apiKey) {
      setShowApiModal(true);
    }
  }, [apiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={switchConversation}
        onNewChat={createNewChat}
      />
      
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold text-foreground">AI Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiModal(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 relative">
          <div className="remondis-bg absolute inset-0 pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {messages.length === 0 && (
              <div className="text-center py-12 relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-remondis/10 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-12 w-12 text-remondis" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Välkommen till din AI-assistent</h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Ställ en fråga eller börja en konversation för att komma igång.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button
                    onClick={createNewChat}
                    className="bg-remondis hover:bg-remondis-dark text-white px-6 py-2 rounded-lg shadow-md transition-all"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Ny konversation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowApiModal(true)}
                    className="border-remondis text-remondis hover:bg-remondis/10 px-6 py-2 rounded-lg shadow-md transition-all"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Inställningar
                  </Button>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <MessageBubble 
                message={{
                  id: 'loading',
                  role: 'assistant',
                  content: '',
                  timestamp: new Date()
                }}
                isLoading
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-card relative z-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Skriv ditt meddelande här..."
                  disabled={isLoading || !apiKey}
                  className="pr-12 resize-none min-h-[44px] max-h-32 bg-background border-remondis/20 focus:border-remondis"
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading || !apiKey}
                className="h-11 px-4 bg-remondis hover:bg-remondis-dark text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        apiKey={apiKey}
        onSave={setApiKey}
      />
    </div>
  );
};
