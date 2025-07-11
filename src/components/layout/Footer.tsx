import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="font-bold">Showcase Portal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A modern web application built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://docs.lovable.dev" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Built with Lovable
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Showcase Portal. Built with modern web technologies.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer