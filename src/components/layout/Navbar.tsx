
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Award, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollProgress from '@/components/ui/ScrollProgress';

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
  
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100], [20, 30]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut for navigation hint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Could open a command palette in the future
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ScrollProgress />
      
      <motion.header
        style={{ 
          backdropFilter: `blur(${navbarBlur}px)`,
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 bg-background/80 border-b border-border/30 shadow-lg shadow-background/20'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="text-xl font-display font-bold tracking-tight text-foreground relative z-10">
                Suchandra
                <span className="text-gradient ml-1">.</span>
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg -z-10 blur-xl"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLink
                  to={link.path}
                  active={location.pathname === link.path}
                >
                  {link.name === 'Certificates' && <Award className="h-3.5 w-3.5 mr-1 opacity-70" />}
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
            
            {/* Keyboard shortcut hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="ml-4 hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground text-xs"
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2.5 rounded-xl glass-effect text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-b border-border/30"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="container mx-auto px-4 py-6 flex flex-col gap-2"
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
                        'px-4 py-3.5 rounded-xl flex items-center transition-all duration-300',
                        location.pathname === link.path
                          ? 'text-foreground bg-primary/10 border border-primary/20 font-medium'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
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
      </motion.header>
    </>
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
        'relative px-4 py-2.5 rounded-xl font-medium flex items-center transition-all duration-300 group',
        active 
          ? 'text-foreground' 
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {/* Background */}
      {active && (
        <motion.span
          layoutId="navbar-bg"
          className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center">{children}</span>
      
      {/* Underline animation for non-active items */}
      {!active && (
        <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
      )}
    </Link>
  );
};

export default Navbar;
