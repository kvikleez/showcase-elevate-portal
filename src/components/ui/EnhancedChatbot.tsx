import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, Download, Copy, ThumbsUp, 
  ThumbsDown, RotateCcw, Maximize2, Minimize2, Settings, 
  Mic, MicOff, Volume2, VolumeX, Search, Star, Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { enhancedChatCompletion } from '@/services/enhanced-chat-service';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'suggestion' | 'error' | 'info';
  rating?: 'up' | 'down';
  tokens?: number;
  suggestions?: string[];
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface ChatSettings {
  autoSpeak: boolean;
  saveHistory: boolean;
  showTyping: boolean;
  theme: 'dark' | 'light' | 'auto';
}

const EnhancedChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      text: "👋 Hello! I'm Suchandra's enhanced AI assistant. I can help you with:\n\n• Portfolio information\n• Project details\n• Technical skills\n• Career opportunities\n• Code examples\n\nWhat would you like to explore?",
      timestamp: new Date(),
      type: 'text',
      suggestions: ['Tell me about projects', 'Show technical skills', 'Contact information']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    autoSpeak: false,
    saveHistory: true,
    showTyping: true,
    theme: 'auto'
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognition = useRef<any>(null);
  const synthesis = window.speechSynthesis;

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };
      
      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesis && settings.autoSpeak) {
      synthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    synthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      timestamp: new Date(),
      type: 'text'
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await enhancedChatCompletion([
        ...conversation.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        })),
        { role: 'user' as const, content: message }
      ]);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.message,
        timestamp: new Date(),
        type: response.type || 'text',
        tokens: response.tokens,
        suggestions: response.suggestions
      };

      setConversation(prev => [...prev, botMessage]);
      speakText(response.message);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I apologize, but I encountered an error. Please try again or rephrase your question.",
        timestamp: new Date(),
        type: 'error'
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    inputRef.current?.focus();
  };

  const rateMessage = (messageId: string, rating: 'up' | 'down') => {
    setConversation(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const addToFavorites = (messageId: string) => {
    setFavorites(prev => [...prev, messageId]);
  };

  const clearConversation = () => {
    setConversation([conversation[0]]);
  };

  const exportConversation = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: conversation,
      settings
    };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredMessages = conversation.filter(msg => 
    searchTerm === '' || msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chatSize = isMaximized 
    ? "fixed inset-4 z-50" 
    : "fixed bottom-20 right-6 w-80 md:w-96 h-96 z-50";

  return (
    <TooltipProvider>
      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-primary to-accent hover:shadow-primary/25 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </motion.div>
          {conversation.length > 1 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              {conversation.length - 1}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
            className={cn(
              chatSize,
              "rounded-xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-xl",
              "bg-gradient-to-br from-background/95 to-background/90 border border-border/50"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 flex justify-between items-center border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="h-6 w-6 text-primary" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Enhanced AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSettings(prev => ({ ...prev, autoSpeak: !prev.autoSpeak }))}
                      className={cn(settings.autoSpeak && "text-primary")}
                    >
                      {settings.autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle auto-speak</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={toggleMaximize}>
                      {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle fullscreen</TooltipContent>
                </Tooltip>
                
                <Button variant="ghost" size="sm" onClick={toggleChat}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search & Controls */}
            <div className="p-3 border-b border-border/50 flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-8"
                />
              </div>
              <Button variant="outline" size="sm" onClick={exportConversation}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={clearConversation}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "group relative max-w-[85%] rounded-xl p-4",
                    msg.sender === 'user' 
                      ? "bg-primary text-primary-foreground ml-auto rounded-br-none" 
                      : "bg-muted/50 rounded-bl-none border border-border/50"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {msg.sender === 'bot' && (
                      <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    )}
                    {msg.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 text-primary-foreground/80 flex-shrink-0" />
                    )}
                    
                    <div className="flex-grow">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {msg.text}
                      </pre>
                      
                      {msg.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-7"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{msg.timestamp.toLocaleTimeString()}</span>
                        {msg.tokens && <span>{msg.tokens} tokens</span>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Actions */}
                  <div className="absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyMessage(msg.text)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    
                    {msg.sender === 'bot' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => rateMessage(msg.id, 'up')}
                          className={cn("h-6 w-6 p-0", msg.rating === 'up' && "text-green-500")}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => rateMessage(msg.id, 'down')}
                          className={cn("h-6 w-6 p-0", msg.rating === 'down' && "text-red-500")}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addToFavorites(msg.id)}
                          className={cn("h-6 w-6 p-0", favorites.includes(msg.id) && "text-yellow-500")}
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && settings.showTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-4 bg-muted/50 rounded-xl rounded-bl-none max-w-[85%] border border-border/50"
                >
                  <Bot className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-background/50">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-grow relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about Suchandra..."
                    disabled={isLoading}
                    className="pr-10"
                  />
                  
                  {/* Voice Input Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className={cn(
                      "absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0",
                      isListening && "text-red-500 animate-pulse"
                    )}
                    disabled={isLoading}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                
                {/* Send Button */}
                <Button 
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
                
                {/* Stop Speaking Button */}
                {isSpeaking && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={stopSpeaking}
                    className="px-3"
                  >
                    <VolumeX className="h-4 w-4" />
                  </Button>
                )}
              </form>
              
              {/* Quick Actions */}
              <div className="mt-2 flex flex-wrap gap-1">
                {['Projects', 'Skills', 'Contact', 'Experience', 'Code Examples'].map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(`Tell me about ${action.toLowerCase()}`)}
                    className="text-xs h-6"
                    disabled={isLoading}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default EnhancedChatbot;