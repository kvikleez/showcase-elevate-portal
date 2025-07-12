import { useState, useEffect, useCallback } from 'react';

interface UseOptimizedScrollOptions {
  threshold?: number;
  throttleMs?: number;
}

export const useOptimizedScroll = ({
  threshold = 10,
  throttleMs = 16
}: UseOptimizedScrollOptions = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  return { isScrolled };
};