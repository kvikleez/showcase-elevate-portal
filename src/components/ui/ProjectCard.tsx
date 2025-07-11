
import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  featured = false,
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Create gradient that follows mouse position
  const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15), transparent)`;
  const cardColor = project.color || 'hsl(var(--primary))';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring", 
        stiffness: 50, 
        damping: 15
      }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm h-full transition-all",
        featured 
          ? "md:flex-row md:min-h-[24rem] glass-effect" 
          : "glass-effect"
      )}
    >
      {/* Mouse follow effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" 
        style={{ maskImage }} 
      />
      
      {/* Background gradient based on project color */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ 
          background: `linear-gradient(45deg, ${cardColor}bb, transparent)` 
        }}
      />

      {/* Tech bubbles */}
      <div className="absolute -bottom-3 -right-3 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div 
          className="w-32 h-32 rounded-full"
          style={{ background: `radial-gradient(circle, ${cardColor}bb, transparent)` }}
        />
      </div>

      {/* Project image */}
      <div 
        className={cn(
          "w-full overflow-hidden flex-shrink-0",
          featured ? "md:w-2/5 md:h-auto" : "h-48"
        )}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
            style={{ 
              filter: isHovered ? "brightness(1.1)" : "brightness(0.9)"
            }}
          />
        </motion.div>
        
        {/* Featured tag */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-primary/80 text-white text-xs font-medium py-1 px-2.5 rounded-full flex items-center gap-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Featured
            </motion.div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, featured ? 7 : 4).map((tech, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + (i * 0.05) }}
              className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > (featured ? 7 : 4) && (
            <span className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10">
              +{project.technologies.length - (featured ? 7 : 4)} more
            </span>
          )}
        </div>
        
        {/* Metrics - only show for featured projects or on hover */}
        {project.metrics && (featured || isHovered) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="text-xs pt-3 border-t border-white/10 grid grid-cols-2 gap-y-2 gap-x-4"
          >
            {project.metrics.slice(0, 4).map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-start gap-1"
              >
                <svg className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">{metric}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              to={`/projects/${project.id}`} 
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
            >
              View Details <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
            </Link>
          </motion.div>
          
          <div className="flex gap-2 ml-auto">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </motion.a>
            )}
            
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Live Site"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
