
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -10,
    scale: 0.98
  }
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1], // Apple-like cubic-bezier easing
  duration: 0.6
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
