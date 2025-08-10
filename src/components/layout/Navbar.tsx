
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

// Moved outside component to prevent re-creation on every render
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
] as const;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 backdrop-blur-xl bg-background/90 border-b border-white/5'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Name */}
        <Link to="/" className="flex items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-tight text-white relative"
          >
            <span className="relative z-10">Suchandra Etti</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md -z-10 blur-sm"
              animate={{ 
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              active={location.pathname === link.path}
            >
              {link.name === 'Certificates' && <Award className="h-3.5 w-3.5 mr-1 opacity-70" />}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/5"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="container mx-auto px-4 py-4 flex flex-col space-y-1"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'px-4 py-3 rounded-lg flex items-center transition-colors',
                      location.pathname === link.path
                        ? 'text-white bg-white/10 font-medium'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name === 'Certificates' && <Award className="h-4 w-4 mr-2 opacity-70" />}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={cn(
        'relative px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-300',
        active 
          ? 'text-white bg-white/10' 
          : 'text-white/70 hover:text-white hover:bg-white/5'
      )}
    >
      {children}
      {active && (
        <motion.span
          layoutId="navbar-indicator"
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
