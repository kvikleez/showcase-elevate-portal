import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Instagram, Youtube, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Brand */}
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4">Suchandra Etti</h2>
            <p className="text-muted-foreground mb-4">
              Final-year B.Tech CSE student passionate about full-stack development, mobile engineering, and AI innovation.
            </p>
            <div className="flex flex-wrap gap-2">
              <SocialIcon href="https://github.com/SnvvSuchandraEtti" icon={<Github className="h-5 w-5" />} label="GitHub" />
              <SocialIcon href="https://linkedin.com/in/suchandra-etti" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              <SocialIcon href="https://twitter.com/snvvs369" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
              <SocialIcon href="https://instagram.com/suchandra369" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
              <SocialIcon href="https://leetcode.com/u/snvvsuchandraetti/" icon={<Code className="h-5 w-5" />} label="LeetCode" />
              <SocialIcon href="mailto:snvvs369@gmail.com" icon={<Mail className="h-5 w-5" />} label="Email" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:snvvs369@gmail.com" className="hover:text-primary transition-colors inline-flex items-center">
                  snvvs369@gmail.com <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="tel:+917989635988" className="hover:text-primary transition-colors inline-flex items-center">
                  +91 7989635988 <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://linktr.ee/snvvs369" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center">
                  All Links (Linktree) <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>Aditya Engineering College, Mandapeta</li>
              <li>Andhra Pradesh, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Suchandra Etti. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed & Built with ❤️ | B.Tech CSE @ Aditya University
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default Footer;
