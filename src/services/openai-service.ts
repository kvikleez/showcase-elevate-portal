
// This service handles OpenAI API requests through a secure backend endpoint
// Never expose API keys directly in frontend code

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionResponse {
  message: {
    content: string;
  };
  error?: string;
}

export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
  try {
    // In a production environment, this should call your own backend API
    // that handles the API key securely, never exposing it to the frontend.
    // For demonstration purposes, we'll use a mock implementation 
    // DO NOT USE this approach in production. Always use a backend service.
    
    // This is a mock implementation for demonstration
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from AI');
    }

    const data: ChatCompletionResponse = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error in chat completion:', error);
    return "I'm sorry, I encountered an error. Please try again later.";
  }
}
