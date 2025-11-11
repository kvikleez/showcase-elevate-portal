
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
    const response = await fetch('https://habnpuephuurcqkwblor.supabase.co/functions/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhYm5wdWVwaHV1cmNxa3dibG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NDM4NzMsImV4cCI6MjA3ODQxOTg3M30.-56VyiVBHqlzFTjsx1SCbfWrB4P0wgUc19hO7BsNeZg`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'Failed to get response from AI');
    }

    const data: ChatCompletionResponse = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error in chat completion:', error);
    return "I'm sorry, I encountered an error. Please try again later.";
  }
}
