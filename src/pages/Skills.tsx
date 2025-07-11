
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { skills } from '@/data/skills';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillCard from '@/components/ui/SkillCard';
import SmoothTransition from '@/components/ui/SmoothTransition';
import { Sparkles } from 'lucide-react';

const Skills = () => {
  const location = useLocation();
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Scroll to skill if hash exists
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame
    
    const animate = () => {
      position += speed;
      // Reset when we reach the end
      if (position >= carousel.scrollWidth / 2) {
        position = 0;
      }
      carousel.scrollLeft = position;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);
  
  // Sort categories for consistent display
  const categories = Object.keys(groupedSkills).sort();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Horizontal scroll animation
  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start end", "end start"]
  });

  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <SmoothTransition>
      <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
        <Navbar />
        
        {/* Animated background elements */}
        <div className="absolute top-20 right-5 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-60 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading 
                title="My Skills" 
                subtitle="A comprehensive overview of my technical expertise and capabilities"
                alignment="center"
                className="mb-16"
              />
              
              {/* Horizontal infinitely scrolling skills showcase */}
              <div className="relative mb-24 overflow-hidden py-8" ref={horizontalScrollRef}>
                <motion.div 
                  style={{ opacity: opacityProgress }}
                  className="py-8"
                >
                  <h2 className="text-2xl font-semibold text-center mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      Technical Proficiency
                    </span>
                  </h2>
                  
                  <div className="relative overflow-hidden">
                    <div 
                      ref={carouselRef}
                      className="flex overflow-x-scroll pb-10 hide-scrollbar"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {/* First set of skills */}
                      <div className="flex flex-nowrap gap-6 pr-6">
                        {skills.map((skill, idx) => (
                          <motion.div
                            key={`skill-1-${skill.id}`}
                            className="w-[180px] h-[180px] flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div 
                              className="w-full h-full bg-white/5 rounded-2xl backdrop-blur-sm p-4 flex flex-col items-center justify-center border border-white/10 hover:border-primary/30 transition-all shadow-lg"
                              style={{ backgroundColor: `${skill.color || '#333'}10` }}
                            >
                              <img 
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.id === 'cpp' ? 'cplusplus' : skill.id}/${skill.id === 'cpp' ? 'cplusplus' : skill.id}-original.svg`} 
                                alt={skill.name}
                                className="w-16 h-16 mb-4 object-contain"
                                onError={(e) => {
                                  // Fallback for images that don't exist
                                  (e.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg`;
                                }}
                              />
                              <p className="text-center font-medium">{skill.name}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Duplicate set for infinite scroll effect */}
                      <div className="flex flex-nowrap gap-6">
                        {skills.map((skill, idx) => (
                          <motion.div
                            key={`skill-2-${skill.id}`}
                            className="w-[180px] h-[180px] flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div 
                              className="w-full h-full bg-white/5 rounded-2xl backdrop-blur-sm p-4 flex flex-col items-center justify-center border border-white/10 hover:border-primary/30 transition-all shadow-lg"
                              style={{ backgroundColor: `${skill.color || '#333'}10` }}
                            >
                              <img 
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.id === 'cpp' ? 'cplusplus' : skill.id}/${skill.id === 'cpp' ? 'cplusplus' : skill.id}-original.svg`} 
                                alt={skill.name}
                                className="w-16 h-16 mb-4 object-contain"
                                onError={(e) => {
                                  // Fallback for images that don't exist
                                  (e.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg`;
                                }}
                              />
                              <p className="text-center font-medium">{skill.name}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Gradient edges for better visual effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 right-0 top-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 left-0 bottom-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
              
              {categories.map((category, index) => (
                <section key={category} className="mb-20 relative">
                  {/* Category decoration */}
                  <div className="absolute -z-10 inset-0 opacity-10">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-primary/30 rounded-full blur-xl"></div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-10">
                      <h2 className="text-2xl font-semibold relative inline-block">
                        {category}
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      </h2>
                      <div className="ml-3 p-1.5 rounded-full bg-muted">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {groupedSkills[category].map((skill) => (
                        <motion.div
                          key={skill.id}
                          id={skill.id}
                          variants={itemVariants}
                          className="h-full"
                        >
                          <SkillCard skill={skill} className="h-full" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </section>
              ))}
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </SmoothTransition>
  );
};

export default Skills;
