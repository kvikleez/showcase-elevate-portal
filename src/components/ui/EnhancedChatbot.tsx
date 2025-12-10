import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles, Mic, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { enhancedChatCompletion } from '@/services/enhanced-chat-service';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const suggestionButtons = [
  { label: "Projects", query: "Show me Suchandra's top projects" },
  { label: "Skills", query: "What are Suchandra's key technical skills?" },
  { label: "Experience", query: "Tell me about work experience" },
  { label: "Contact", query: "How can I contact Suchandra?" }
];

const EnhancedChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      text: "Hey! 👋 I'm Suchandra's AI assistant. Ask me anything about projects, skills, experience, or even general questions. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSuggestionClick = (query: string) => {
    setMessage(query);
    setShowSuggestions(false);
    handleSubmitMessage(query);
  };

  const handleSubmitMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await enhancedChatCompletion([
        ...conversation.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        })),
        { role: 'user' as const, content: messageText }
      ]);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.message,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitMessage(message);
  };

  // Parse markdown-like formatting
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs">$1</code>')
      .replace(/🔹/g, '<span class="text-primary">•</span>');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        className={cn(
          "fixed z-50",
          isMobile ? "bottom-4 right-4" : "bottom-8 right-8"
        )}
      >
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative rounded-full shadow-glow transition-all duration-300",
            "bg-gradient-to-r from-primary to-accent",
            isMobile ? "h-14 w-14" : "h-16 w-16"
          )}
        >
          {/* Pulse ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
          )}
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center h-full w-full"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary-foreground" />
            ) : (
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed z-40 rounded-3xl overflow-hidden shadow-2xl",
              "bg-background/95 backdrop-blur-2xl border border-border/30",
              isMobile 
                ? "bottom-20 left-3 right-3 h-[70vh]" 
                : "bottom-28 right-8 w-[420px] h-[600px]"
            )}
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-border/30">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Suchandra Assistant</h3>
                    <p className="text-xs text-muted-foreground">AI-powered • Always online</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleChat} 
                  className="h-8 w-8 rounded-lg hover:bg-muted/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none",
              "h-[calc(100%-140px)]"
            )}>
              {conversation.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex gap-3 max-w-[90%]",
                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center",
                    msg.sender === 'user' 
                      ? "bg-gradient-to-br from-primary to-accent" 
                      : "bg-muted border border-border/50"
                  )}>
                    {msg.sender === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.sender === 'user' 
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-br-md" 
                      : "bg-muted/50 border border-border/30 rounded-bl-md"
                  )}>
                    <p 
                      className="whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                    <p className={cn(
                      "text-[10px] mt-2",
                      msg.sender === 'user' ? "text-primary-foreground/60" : "text-muted-foreground"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Suggestion Pills */}
              {showSuggestions && conversation.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {suggestionButtons.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestionClick(suggestion.query)}
                      className="px-4 py-2 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {suggestion.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 max-w-[90%] mr-auto"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted border border-border/50 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-muted/50 border border-border/30 rounded-bl-md">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/30 bg-background/80 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="pr-10 bg-muted/30 border-border/30 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/30 text-sm h-11"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="h-11 w-11 p-0 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedChatbot;
