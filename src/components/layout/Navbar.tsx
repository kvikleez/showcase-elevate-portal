import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]
  
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="font-bold text-xl">Showcase Portal</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href)
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar