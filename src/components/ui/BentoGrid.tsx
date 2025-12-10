import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
      className
    )}>
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  gradient?: 'primary' | 'accent' | 'mixed' | 'none';
  hover?: boolean;
  index?: number;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  gradient = 'none',
  hover = true,
  index = 0,
}) => {
  const colSpanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3 lg:col-span-3',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
  };

  const gradientClasses = {
    primary: 'bg-gradient-to-br from-primary/10 via-background to-primary/5',
    accent: 'bg-gradient-to-br from-accent/10 via-background to-accent/5',
    mixed: 'bg-gradient-to-br from-primary/10 via-background to-accent/10',
    none: 'bg-card',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/50',
        'backdrop-blur-sm transition-all duration-500',
        hover && 'hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        gradientClasses[gradient],
        className
      )}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-1px] bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-2xl blur-sm" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Content */}
      <div className="relative z-10 h-full p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default BentoGrid;
