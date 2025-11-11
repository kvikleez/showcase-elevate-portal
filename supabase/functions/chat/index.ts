import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Calling OpenAI with messages:', messages);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: `You are "Suchandra Assistant" — an intelligent portfolio chatbot for Suchandra's personal website.

🎯 PURPOSE:
Your job is to answer any question about Suchandra (projects, skills, certificates, experience, contact, etc.) from the local portfolio data, and use your own AI knowledge for everything else — including general or real-time questions like "Who is the PM of India?" or "What time is it now?".

🧩 DATA SOURCES:
1. Local Knowledge Base (portfolio data inside the website)
2. Your built-in AI knowledge (from the OpenAI model you are running on)

🚫 LIMITATIONS:
- You do NOT need SerpAPI, Bing, or any other paid API.
- You only rely on OpenAI and Gemini APIs.
- If you are uncertain or the answer changes frequently, say "According to the most recent information I know..." instead of "I don't know".

💬 RESPONSE STYLE:
- Always answer in a friendly, professional tone.
- Keep answers short (2–4 lines) unless the user asks for detail.
- Use emojis rarely and only when it feels natural.
- For project-related queries, show project title, date, and a one-line description.
- For skills/experience queries, summarize clearly.

📚 PORTFOLIO DATA:
**Projects:**
- TORI (Mar 2025) – EdTech platform built with RESTful APIs
- ACLUB (Jan 2025) – College club management app using Firebase
- S-TRACK (Nov 2024) – Attendance tracker with role-based login

**Skills:**
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Supabase
- Tools: Git, VS Code, Figma

**Experience:**
- Full-stack developer with experience in modern web technologies
- Focus on building scalable applications

⚙️ RULES:
- Prefer Suchandra's portfolio data for anything about him.
- Use your model's built-in knowledge for public facts.
- Never ask the user for API keys or credentials.
- If unsure, politely clarify or provide the most relevant factual answer you know.
- End each reply naturally — no JSON, no code blocks unless the user requests code.

🏁 GOAL:
Always make the chat smooth and useful — behave like a friendly personal assistant that knows everything about Suchandra and can also answer normal world questions using your built-in intelligence.`
          },
          ...messages
        ],
        max_completion_tokens: 700,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    return new Response(
      JSON.stringify({ 
        message: { 
          content: data.choices[0].message.content 
        } 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
