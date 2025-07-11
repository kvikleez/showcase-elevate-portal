import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'

// Create a client for React Query (handles server state management)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 10, // Cache for 10 minutes (renamed from cacheTime)
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* React Query Provider for API calls and caching */}
    <QueryClientProvider client={queryClient}>
      {/* Theme Provider for dark/light mode */}
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {/* Router Provider for navigation between pages */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)