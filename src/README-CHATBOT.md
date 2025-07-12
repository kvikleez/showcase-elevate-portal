
# Production Deployment Instructions for the OpenAI Chatbot

## Security Warning

The current implementation uses a mock API for development purposes only. **DO NOT** deploy this to production as is.

## Proper Implementation Steps

To properly implement the OpenAI chatbot in production:

1. **Create a secure backend API**:
   - Set up a Node.js, Python, or other backend server
   - Store your OpenAI API key securely as an environment variable on the server
   - Create an endpoint that proxies requests to OpenAI

2. **Example Backend (Node.js/Express)**:
   ```javascript
   // server.js
   require('dotenv').config();
   const express = require('express');
   const { Configuration, OpenAIApi } = require('openai');
   const app = express();

   // Configure OpenAI
   const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
   });
   const openai = new OpenAIApi(configuration);

   app.use(express.json());

   // Chat endpoint
   app.post('/api/chat', async (req, res) => {
     try {
       const { messages } = req.body;
       
       const response = await openai.createChatCompletion({
         model: 'gpt-3.5-turbo',
         messages: messages,
       });

       res.json({ message: response.data.choices[0].message });
     } catch (error) {
       console.error('OpenAI API error:', error);
       res.status(500).json({ error: 'Failed to get response from AI' });
     }
   });

   app.listen(3001, () => console.log('Server running on port 3001'));
   ```

3. **Update Frontend**:
   - Modify `src/services/openai-service.ts` to point to your backend API endpoint
   - Remove the mock implementation

4. **Deploy**:
   - Deploy your backend to a secure hosting environment (e.g., Vercel, Heroku, AWS)
   - Ensure environment variables are properly set on the server
   - Deploy your frontend application

## IMPORTANT: Never expose API keys in frontend code

API keys should always be kept on a secure backend and never included in frontend code that gets sent to the browser.
