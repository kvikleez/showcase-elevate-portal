import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30',
    secondary: 'glass-effect border border-border/50 text-foreground hover:bg-muted/50',
    ghost: 'bg-transparent text-foreground hover:bg-muted/30',
    glow: 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_50px_rgba(79,70,229,0.7)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  const buttonContent = (
    <motion.span
      className="relative z-10 flex items-center gap-2 font-medium"
      animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.span>
  );

  const commonProps = {
    className: cn(
      'relative inline-flex items-center justify-center transition-all duration-300',
      'before:absolute before:inset-0 before:rounded-inherit before:transition-all before:duration-300',
      variants[variant],
      sizes[size],
      disabled && 'opacity-50 cursor-not-allowed',
      className
    ),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transform: `translate(${position.x}px, ${position.y}px)` },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        whileTap={{ scale: 0.98 }}
        {...commonProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      {...commonProps}
    >
      {buttonContent}
    </motion.button>
  );
};

export default MagneticButton;
