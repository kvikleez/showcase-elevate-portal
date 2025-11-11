// Enhanced chat service that connects to secure backend
import { getChatCompletion } from './openai-service';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  type: 'text';
  tokens: number;
  confidence: number;
}

export async function enhancedChatCompletion(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    // Call the secure backend edge function
    const response = await getChatCompletion(messages);
    
    return {
      message: response,
      type: 'text',
      tokens: 0, // Token counting handled by backend
      confidence: 1.0
    };
  } catch (error) {
    console.error('Error in enhanced chat service:', error);
    throw error;
  }
}
