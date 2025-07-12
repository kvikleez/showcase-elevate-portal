
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transformed values for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Decorative floating elements in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => {
          const size = 100 + (i * 50);
          const positions = [
            { left: '10%', top: '20%' },
            { right: '15%', top: '70%' },
            { left: '60%', top: '40%' },
            { left: '20%', top: '70%' },
            { right: '25%', top: '30%' }
          ];
          
          const colors = [
            'from-primary/20 via-primary/5 to-transparent',
            'from-accent/20 via-accent/5 to-transparent',
            'from-blue-500/20 via-blue-500/5 to-transparent',
            'from-purple-500/20 via-purple-500/5 to-transparent',
            'from-pink-500/20 via-pink-500/5 to-transparent'
          ];
          
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-10 bg-gradient-radial ${colors[i]} blur-3xl`}
              style={{ 
                ...positions[i],
                width: size,
                height: size,
                y: i % 2 === 0 ? y1 : y2,
                opacity: opacity
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}
      </div>
      
      {/* Glowing orbs for background effect */}
      {[...Array(3)].map((_, i) => {
        const size = 300 + (i * 100);
        const positions = [
          { left: '10%', top: '20%' },
          { right: '15%', top: '70%' },
          { left: '60%', top: '40%' }
        ];
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
            style={{ 
              ...positions[i],
              width: size,
              height: size,
              y: i % 2 === 0 ? y1 : y2,
              opacity: opacity
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        );
      })}

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="Explore my most impactful work combining technical excellence with creative solutions"
          alignment="center"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* All featured projects in a uniform grid */}
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                style={{ isolation: 'isolate' }} // Fix for hover issue
              >
                <ProjectCard 
                  project={project} 
                  featured={false} // Set all cards to the same size for consistency
                  index={index} 
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-xl shadow-primary/5 group"
            >
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-medium">View All Projects</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-5 w-5 ml-1" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
