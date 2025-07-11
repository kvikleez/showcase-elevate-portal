import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <Navbar />
      
      {/* Main Content Area - grows to fill space */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      
      {/* Global Footer */}
      <Footer />
      
      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  )
}

export default App