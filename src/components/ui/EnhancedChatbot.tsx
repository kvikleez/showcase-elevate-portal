import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { enhancedChatCompletion } from '@/services/enhanced-chat-service';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

const EnhancedChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'bot', 
      text: "Hello! I'm Suchandra's AI assistant. I can help you explore projects, skills, experience, and more. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Show me recent projects",
        "What are the key skills?",
        "Tell me about work experience",
        "Any certifications?"
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  const toggleChat = () => setIsOpen(!isOpen);

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
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';
      recognition.current.maxAlternatives = 1;
      
      recognition.current.onstart = () => {
        setIsListening(true);
      };
      
      recognition.current.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setMessage(prev => prev + finalTranscript + ' ');
        }
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
      
      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'network') {
          console.warn('Network error - trying offline recognition');
        }
      };
    }
  }, []);

  // Initialize text-to-speech
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }
  }, []);

  const startListening = () => {
    if (recognition.current && !isListening) {
      try {
        setIsListening(true);
        recognition.current.start();
      } catch (error) {
        console.error('Speech recognition start error:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      try {
        recognition.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Speech recognition stop error:', error);
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (synthesis.current && !isSpeaking) {
      // Stop any ongoing speech
      synthesis.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesis.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis.current && isSpeaking) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      timestamp: new Date()
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
        suggestions: response.suggestions
      };

      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
        suggestions: ["Try again", "Ask something else", "Contact directly"]
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    // Trigger form submission after setting the message
    setTimeout(() => {
      const form = textareaRef.current?.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 border border-primary/20"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 w-[380px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-8rem)] z-40 rounded-3xl overflow-hidden shadow-2xl bg-background/95 backdrop-blur-lg border border-border/50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-background/90 to-background/70 border-b border-border/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(580px-140px)]">
              {conversation.map((msg, index) => (
                <div key={msg.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "max-w-[85%] group",
                      msg.sender === 'user' ? "ml-auto" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "relative p-3 rounded-2xl",
                      msg.sender === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-md" 
                        : "bg-muted/70 rounded-tl-md"
                    )}>
                      <div className="flex items-start gap-2">
                        {msg.sender === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 text-muted-foreground/70 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                          <div className="flex items-center justify-between mt-2 pt-1">
                            <p className="text-xs opacity-50">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {msg.sender === 'bot' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.text)}
                                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity"
                                disabled={isLoading}
                              >
                                {isSpeaking ? 
                                  <VolumeX className="h-3 w-3" /> : 
                                  <Volume2 className="h-3 w-3" />
                                }
                              </Button>
                            )}
                          </div>
                        </div>
                        {msg.sender === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-primary-foreground/70 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Suggestion Buttons */}
                  {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex flex-wrap gap-2 mt-3 pl-6"
                    >
                      {msg.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-7 px-3 bg-background/50 hover:bg-muted/80 border-muted-foreground/20 hover:border-muted-foreground/40 transition-all"
                          disabled={isLoading}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-[85%] mr-auto"
                >
                  <div className="bg-muted/70 p-3 rounded-2xl rounded-tl-md">
                    <div className="flex items-center gap-3">
                      <Bot className="h-4 w-4 text-muted-foreground/70 flex-shrink-0" />
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce delay-100"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce delay-200"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border/30 bg-background/90 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about projects, skills, experience..."
                    disabled={isLoading}
                    className="min-h-0 resize-none border border-border/50 rounded-xl shadow-none focus-visible:ring-1 focus-visible:ring-primary/30 p-3 pr-20 bg-background/80 text-sm placeholder:text-muted-foreground/60"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <div className="absolute right-2 bottom-2 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={isListening ? stopListening : startListening}
                      className={cn(
                        "h-6 w-6 p-0 hover:bg-muted/50 transition-colors",
                        isListening && "text-primary bg-primary/10"
                      )}
                    >
                      {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={!message.trim() || isLoading}
                      className="h-6 w-6 p-0 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedChatbot;