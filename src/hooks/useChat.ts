import { useState, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage?: string;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    console.log('useChat: Loading data from localStorage');
    const savedApiKey = localStorage.getItem('openai-api-key');
    const savedConversations = localStorage.getItem('chat-conversations');
    const savedCurrentId = localStorage.getItem('current-conversation-id');

    if (savedApiKey) {
      console.log('useChat: Found saved API key');
      setApiKey(savedApiKey);
    }

    if (savedConversations) {
      console.log('useChat: Found saved conversations');
      const parsed = JSON.parse(savedConversations);
      const conversationsWithDates = parsed.map((conv: any) => ({
        ...conv,
        timestamp: new Date(conv.timestamp),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setConversations(conversationsWithDates);
    }

    if (savedCurrentId) {
      console.log('useChat: Found saved current conversation ID:', savedCurrentId);
      setCurrentConversationId(savedCurrentId);
    }
  }, []);

  // Load current conversation messages
  useEffect(() => {
    console.log('useChat: Loading messages for conversation:', currentConversationId);
    if (currentConversationId) {
      const conversation = conversations.find(c => c.id === currentConversationId);
      if (conversation) {
        console.log('useChat: Setting messages from conversation:', conversation.messages.length, 'messages');
        setMessages(conversation.messages);
      }
    } else {
      console.log('useChat: No current conversation, clearing messages');
      setMessages([]);
    }
  }, [currentConversationId, conversations]);

  // Save to localStorage when data changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openai-api-key', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('chat-conversations', JSON.stringify(conversations));
    if (currentConversationId) {
      localStorage.setItem('current-conversation-id', currentConversationId);
    }
  }, [conversations, currentConversationId]);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const generateTitle = (firstMessage: string) => {
    const words = firstMessage.split(' ').slice(0, 6);
    return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
  };

  const createNewChat = () => {
    console.log('useChat: Creating new chat');
    const newId = generateId();
    const now = new Date();

    // Lägg in en tom konversation direkt
    const newConversation: Conversation = {
      id: newId,
      title: 'Ny konversation',
      messages: [],
      timestamp: now
    };

    // Spara i state (och därmed i localStorage tack vare effekten nedan)
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newId);
    setMessages([]);
  };

  const switchConversation = (conversationId: string) => {
    console.log('useChat: Switching to conversation:', conversationId);
    setCurrentConversationId(conversationId);
  };

  const sendMessage = async (content: string) => {
    console.log('useChat: sendMessage called with content:', content);
    console.log('useChat: API key exists:', !!apiKey);
    console.log('useChat: Current messages length:', messages.length);
    
    if (!apiKey || !content.trim()) {
      console.log('useChat: Missing API key or empty content, returning');
      return;
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    const newMessages = [...messages, userMessage];
    console.log('useChat: Setting new messages with user message, total:', newMessages.length);
    setMessages(newMessages);

    // Optimistiskt uppdatera konversationen direkt med användarmeddelandet
    if (currentConversationId) {
      setConversations(prev =>
        prev.map(c =>
          c.id === currentConversationId
            ? { 
                ...c, 
                messages: newMessages, 
                lastMessage: content, 
                timestamp: new Date(),
                title: c.title === 'Ny konversation' ? generateTitle(content) : c.title
              }
            : c
        )
      );
    }

    setIsLoading(true);

    try {
      console.log('useChat: Making API request to OpenAI');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: 'Du är en hjälpsam AI-assistent som alltid svarar på svenska. Var tydlig, koncis och professionell i dina svar. Använd inte andra språk än svenska.'
            },
            ...newMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        console.error('useChat: API error:', response.status);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('useChat: Received API response');
      
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, assistantMessage];
      console.log('useChat: Setting final messages, total:', finalMessages.length);
      setMessages(finalMessages);

      // Uppdatera konversationen med det slutgiltiga svaret
      if (currentConversationId) {
        setConversations(prev =>
          prev.map(c =>
            c.id === currentConversationId
              ? {
                  ...c,
                  messages: finalMessages,
                  lastMessage: assistantMessage.content,
                  timestamp: new Date()
                }
              : c
          )
        );
      }

    } catch (error) {
      console.error('useChat: Error sending message:', error);
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: 'Tyvärr uppstod ett fel när jag försökte svara. Kontrollera din API-nyckel och försök igen.',
        timestamp: new Date()
      };
      
      const messagesWithError = [...newMessages, errorMessage];
      setMessages(messagesWithError);
      
      // Uppdatera även konversationen med felmeddelandet
      if (currentConversationId) {
        setConversations(prev =>
          prev.map(c =>
            c.id === currentConversationId
              ? {
                  ...c,
                  messages: messagesWithError,
                  lastMessage: errorMessage.content,
                  timestamp: new Date()
                }
              : c
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    apiKey,
    setApiKey,
    sendMessage,
    createNewChat,
    conversations: conversations.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    currentConversationId,
    switchConversation
  };
};
