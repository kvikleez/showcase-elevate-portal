
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockChatCompletion } from '@/mocks/api-handler';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    { sender: 'bot', text: "Hi there! I'm Suchandra's virtual assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to conversation
    const userMessage = message;
    setConversation(prev => [...prev, { sender: 'user', text: userMessage }]);
    setMessage('');
    setIsLoading(true);

    try {
      // Convert the conversation to the format expected by the API
      const messages = conversation.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add the new user message
      messages.push({ role: 'user', content: userMessage });
      
      // In production, this would call the actual OpenAI API through a secure backend
      // For now, we're using our mock implementation
      const response = await mockChatCompletion(messages);
      
      // Add the bot response to the conversation
      setConversation(prev => [...prev, { sender: 'bot', text: response }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setConversation(prev => [
        ...prev, 
        { sender: 'bot', text: "I'm sorry, I encountered an error. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white shadow-lg apple-glass"
        aria-label="Chat with AI assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 h-96 z-50 rounded-xl overflow-hidden frosted-glass shadow-xl flex flex-col"
          >
            <div className="p-4 bg-gradient-to-r from-primary/30 to-accent/30 flex justify-between items-center backdrop-blur-xl">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-medium">AI Assistant</h3>
              </div>
              <button 
                onClick={toggleChat}
                className="p-1 rounded-full hover:bg-background/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 bg-black/50 backdrop-blur-lg">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "max-w-[80%] p-3 rounded-xl",
                    msg.sender === 'user' 
                      ? "bg-primary text-white self-end rounded-br-none" 
                      : "glass-effect self-start rounded-bl-none"
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start glass-effect p-3 rounded-xl rounded-bl-none max-w-[80%]"
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse delay-150"></div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex items-center gap-2 bg-black/30 backdrop-blur-lg">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 rounded-md bg-muted/80 text-foreground placeholder:text-muted-foreground outline-none backdrop-blur-md"
                disabled={isLoading}
              />
              <button 
                type="submit"
                className="p-2 rounded-md bg-primary text-white disabled:opacity-50"
                aria-label="Send message"
                disabled={isLoading || !message.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;
