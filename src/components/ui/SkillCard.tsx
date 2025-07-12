
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Skill } from '@/data/skills';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  skill: Skill;
  className?: string;
  index?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, className, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Map skill names to image URLs
  const getSkillImageUrl = (skillId: string) => {
    const skillImages: Record<string, string> = {
      python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      "ai-ml": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      agile: "/lovable-uploads/b6c42711-617b-47a3-b13f-71904f1c1c0e.png",
      api: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    };

    return skillImages[skillId] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  };

  const gradientStyle = skill.color ? {
    backgroundColor: isHovered ? `${skill.color}15` : 'transparent',
    borderColor: isHovered ? `${skill.color}66` : 'rgba(255, 255, 255, 0.1)'
  } : {};

  return (
    <Link to={`/skills#${skill.id}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{ 
          y: -15,
          transition: { duration: 0.2, type: "spring", stiffness: 300 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          'glass-effect p-5 rounded-xl h-full flex flex-col shadow-lg border border-white/10 backdrop-blur-md transition-all duration-300',
          isHovered ? 'shadow-xl shadow-primary/10' : 'shadow-md',
          className
        )}
        style={gradientStyle}
      >
        <div className="flex flex-col items-center text-center mb-4">
          <motion.div 
            animate={{ 
              rotate: isHovered ? [0, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mb-3 p-3 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: isHovered ? (skill.color || 'hsl(var(--primary))') + '20' : 'transparent' }}
          >
            <img 
              src={getSkillImageUrl(skill.id)} 
              alt={skill.name} 
              className="w-full h-full object-contain"
            />
          </motion.div>
          <h3 className="font-semibold text-lg">{skill.name}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground flex-grow line-clamp-3 text-center">
          {skill.description}
        </p>
        
        {skill.certifications && skill.certifications.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.8,
              height: 'auto' 
            }}
            transition={{ duration: 0.3 }}
            className="mt-3 pt-3 border-t border-muted/50 text-xs"
          >
            <span className="font-medium text-foreground/80">Certifications:</span>
            <ul className="mt-1 space-y-1">
              {skill.certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-1.5">
                  <motion.span 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: isHovered ? [0, 5, 0] : 0
                    }}
                    transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                    className="text-primary flex-shrink-0 mt-0.5"
                  >
                    •
                  </motion.span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Show "View Details" on hover with animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2 }}
          className="mt-3 text-xs font-medium text-center"
          style={{ color: skill.color || 'hsl(var(--primary))' }}
        >
          View details →
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default SkillCard;
