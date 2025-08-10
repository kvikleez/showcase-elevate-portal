import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages }: ChatRequest = await req.json();
    
    // Get API keys from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    console.log('Processing chat request with both APIs...');
    
    // Try OpenAI first (GPT-3.5 Turbo) for general conversations
    let response;
    let aiProvider = 'OpenAI';
    
    if (openaiApiKey) {
      try {
        console.log('Attempting OpenAI API call...');
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          response = data.choices[0].message.content;
          console.log('OpenAI response successful');
        } else {
          throw new Error(`OpenAI API error: ${openaiResponse.status}`);
        }
      } catch (openaiError) {
        console.log('OpenAI failed, trying Gemini...', openaiError);
        
        // Fallback to Gemini if OpenAI fails
        if (geminiApiKey) {
          try {
            aiProvider = 'Gemini';
            const geminiMessages = messages.map(msg => ({
              parts: [{ text: msg.content }]
            }));

            const geminiResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  contents: geminiMessages
                }),
              }
            );

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json();
              response = geminiData.candidates[0].content.parts[0].text;
              console.log('Gemini response successful as fallback');
            } else {
              throw new Error(`Gemini API error: ${geminiResponse.status}`);
            }
          } catch (geminiError) {
            console.error('Both APIs failed:', geminiError);
            response = "I'm experiencing technical difficulties with both AI services. Please try again in a moment.";
          }
        } else {
          response = "I'm experiencing technical difficulties. Please try again in a moment.";
        }
      }
    } else if (geminiApiKey) {
      // Use Gemini if no OpenAI key
      try {
        aiProvider = 'Gemini';
        console.log('Using Gemini API...');
        
        const geminiMessages = messages.map(msg => ({
          parts: [{ text: msg.content }]
        }));

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: geminiMessages
            }),
          }
        );

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          response = geminiData.candidates[0].content.parts[0].text;
          console.log('Gemini response successful');
        } else {
          throw new Error(`Gemini API error: ${geminiResponse.status}`);
        }
      } catch (error) {
        console.error('Gemini API error:', error);
        response = "I'm experiencing technical difficulties. Please try again in a moment.";
      }
    } else {
      response = "AI services are not configured. Please contact the administrator.";
    }

    return new Response(
      JSON.stringify({ 
        message: { content: response },
        provider: aiProvider,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});