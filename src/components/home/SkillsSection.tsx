
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { skills } from '@/data/skills';

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Technical skills categories
  const technicalCategories = ["Programming", "Framework", "Database", "Development"];
  
  // Get all technical skills
  const technicalSkills = skills
    .filter(skill => technicalCategories.includes(skill.category))
    .slice(0, 12); // Limit to 12 skills for the homepage

  // Background floating shapes
  const shapes = [
    { size: 200, x: '5%', y: '10%', rotation: 15, delay: 0, color: 'from-purple-500/10 to-blue-500/5' },
    { size: 150, x: '85%', y: '15%', rotation: -20, delay: 0.2, color: 'from-pink-500/10 to-purple-500/5' },
    { size: 250, x: '75%', y: '70%', rotation: 30, delay: 0.4, color: 'from-blue-500/10 to-cyan-500/5' },
    { size: 180, x: '10%', y: '75%', rotation: -15, delay: 0.6, color: 'from-indigo-500/10 to-blue-500/5' },
  ];

  // Map skill names to image URLs
  const getSkillImageUrl = (skillId: string) => {
    const skillImages: Record<string, string> = {
      python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
      r: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
      flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      expressjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      androidstudio: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
      github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    };

    return skillImages[skillId] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  };

  return (
    <section 
      id="skills" 
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated background elements */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-[40%] bg-gradient-to-br ${shape.color} backdrop-blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            rotate: shape.rotation,
            y: index % 2 === 0 ? y1 : y2,
            opacity: opacity,
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: [0.2, 0.4, 0.2],
            rotate: [shape.rotation, shape.rotation + 10, shape.rotation],
          } : { opacity: 0 }}
          transition={{
            duration: 8 + index * 2,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-10 z-0">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          Array.from({ length: 20 }).map((_, colIndex) => {
            // Create a delayed, random animation for each cell
            const delay = (rowIndex * 0.1) + (colIndex * 0.05);
            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className="border-r border-b border-white/5"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
                transition={{ delay, duration: 0.5 }}
              />
            );
          })
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="My specialized technical expertise in programming, frameworks, and development tools"
          alignment="center"
        />

        <div className="max-w-7xl mx-auto mt-16">
          {/* Horizontal scrolling skills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden py-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
              {technicalSkills.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  className="w-full aspect-square"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <Link to={`/skills#${skill.id}`}>
                    <div 
                      className="w-full h-full bg-white/5 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center justify-center border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-lg"
                      style={{ backgroundColor: `${skill.color || '#333'}10` }}
                    >
                      <img 
                        src={getSkillImageUrl(skill.id)} 
                        alt={skill.name}
                        className="w-16 h-16 mb-3 object-contain"
                        onError={(e) => {
                          // Fallback for images that don't exist
                          (e.target as HTMLImageElement).src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
                        }}
                      />
                      <p className="text-center font-medium">{skill.name}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 text-center"
          >
            <Link 
              to="/skills" 
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-effect hover:bg-white/5 transition-all duration-300 border border-white/10 group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                Explore All Skills
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4 ml-1" />
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <style>
        {`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </section>
  );
};

export default SkillsSection;
