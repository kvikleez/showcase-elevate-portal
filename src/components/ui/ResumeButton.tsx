
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeButtonProps extends MotionProps {
  className?: string;
  resumeUrl?: string;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({
  className,
  resumeUrl = "https://drive.google.com/file/d/1cuPFyM5g54188X2fGUGGPn7Y6CTDq67u/view?usp=drive_link",
  ...motionProps
}) => {
  // Function to handle view resume
  const handleViewResume = () => {
    window.open(resumeUrl, '_blank');
  };

  // Function to handle download resume
  const handleDownloadResume = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.target = '_blank';
    link.download = 'Suchandra_Etti_Resume.pdf'; // Set desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-button border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer",
        className
      )}
      onClick={handleViewResume}
      {...motionProps}
    >
      <FileText className="h-4 w-4" />
      <span className="font-medium">Resume</span>
      <Download className="h-4 w-4 cursor-pointer" onClick={handleDownloadResume} />
    </motion.div>
  );
};

export default ResumeButton;
