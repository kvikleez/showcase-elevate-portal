import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
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
  "Show me recent projects",
  "What are the key skills?",
  "Tell me about work experience",
  "Any certifications?"
];

const EnhancedChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      text: "Hello! I'm Suchandra's AI assistant. I can help you explore projects, skills, experience, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSuggestions(false);
    handleSubmitMessage(suggestion);
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
        text: "I apologize, but I encountered an error. Please try again.",
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

  return (
    <>
      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed z-50",
          isMobile ? "bottom-4 right-4" : "bottom-8 right-8"
        )}
      >
        <Button
          onClick={toggleChat}
          className={cn(
            "rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300",
            isMobile ? "h-12 w-12" : "h-14 w-14"
          )}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? (
              <X className={cn("text-primary-foreground", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            ) : (
              <MessageCircle className={cn("text-primary-foreground", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "fixed z-40 rounded-2xl overflow-hidden shadow-xl bg-background/95 backdrop-blur-lg border border-border/50",
              isMobile 
                ? "bottom-20 left-4 right-4 top-4 h-auto max-h-[calc(100vh-6rem)]" 
                : "bottom-20 right-8 w-96 h-[600px]"
            )}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-background to-background/80 border-b border-border/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Powered by Gemini</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleChat} className="h-7 w-7 p-0 hover:bg-muted/50">
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4",
              isMobile ? "h-[calc(100vh-240px)]" : "h-[calc(600px-140px)]"
            )}>
              {conversation.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs",
                    msg.sender === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={cn(
                    "px-3 py-2 rounded-2xl text-sm leading-relaxed",
                    msg.sender === 'user' 
                      ? "bg-primary text-primary-foreground rounded-br-md" 
                      : "bg-muted rounded-bl-md"
                  )}>
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Suggestion Buttons */}
              {showSuggestions && conversation.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-wrap gap-2 max-w-[85%] mr-auto"
                >
                  {suggestionButtons.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs h-8 px-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </motion.div>
              )}
              
              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 max-w-[85%] mr-auto"
                >
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-muted rounded-bl-md">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce delay-200"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border/30 bg-background/50">
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="border-border/30 bg-background/50 focus-visible:ring-1 focus-visible:ring-primary/30 text-sm"
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
                  size="sm"
                  className="h-9 w-9 p-0 bg-primary hover:bg-primary/90"
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