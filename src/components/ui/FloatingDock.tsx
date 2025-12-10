import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DockItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ items, className }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        'flex items-center gap-2 p-2 rounded-2xl',
        'bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl',
        className
      )}
    >
      {items.map((item, index) => (
        <DockIcon key={index} item={item} />
      ))}
    </motion.div>
  );
};

interface DockIconProps {
  item: DockItem;
}

const DockIcon: React.FC<DockIconProps> = ({ item }) => {
  const Icon = item.icon;
  
  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative group"
      whileHover={{ scale: 1.3, y: -10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-foreground bg-background/90 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/50">
        {item.label}
      </span>
      
      {/* Icon container */}
      <div className="p-3 rounded-xl bg-muted/50 text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
        <Icon className="h-5 w-5" />
      </div>
    </motion.button>
  );
};

export default FloatingDock;
