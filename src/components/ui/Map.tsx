
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, MapPin } from 'lucide-react';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initialize map iframe when component mounts
    if (!mapContainerRef.current) return;
    
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3802.398778366238!2d82.24183307504913!3d17.65024259695731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37739901b79e05%3A0xc767d3e2699f01fc!2sAditya%20Engineering%20College!5e0!3m2!1sen!2sin!4v1717064172866!5m2!1sen!2sin";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = "0";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    
    // Handle iframe load event
    iframe.onload = () => {
      setIsLoading(false);
    };
    
    mapContainerRef.current.appendChild(iframe);
    
    return () => {
      if (mapContainerRef.current && mapContainerRef.current.firstChild) {
        mapContainerRef.current.removeChild(mapContainerRef.current.firstChild);
      }
    };
  }, []);

  return (
    <motion.div 
      className="w-full h-full min-h-[400px] relative rounded-xl overflow-hidden shadow-lg border border-white/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && (
        <div className="absolute inset-0 p-3 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20 text-center">
          <div className="flex flex-col items-center justify-center">
            <MapIcon className="h-12 w-12 text-primary mb-4 animate-pulse" />
            <p className="text-lg font-medium mb-1">Loading Map...</p>
            <p className="text-sm text-muted-foreground">Please wait while the map loads</p>
          </div>
        </div>
      )}
      
      <div ref={mapContainerRef} className="w-full h-full"></div>
      
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-background/80 backdrop-blur-sm py-2 px-3 rounded-full flex items-center shadow-lg border border-white/10">
          <MapPin className="h-4 w-4 text-primary mr-1.5" />
          <span className="text-xs font-medium">Aditya Engineering College</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Map;
