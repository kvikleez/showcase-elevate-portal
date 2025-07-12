
import React, { useEffect, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import CertificatesSection from '@/components/home/CertificatesSection';
import ChatbotButton from '@/components/ui/ChatbotButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothTransition from '@/components/ui/SmoothTransition';

// Memoized animated section component for performance
const AnimatedSection = memo(({ children, variants }: { children: React.ReactNode; variants: any }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15, margin: "0px 0px -100px 0px" }}
    variants={variants}
  >
    {children}
  </motion.div>
));

AnimatedSection.displayName = 'AnimatedSection';

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memoized section animation variants for better performance
  const sectionVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }), []);

  return (
    <SmoothTransition>
      <div className="relative min-h-screen">
        {/* Optimized animated background */}
        <div className="fixed inset-0 -z-10 overflow-hidden will-change-transform">
          {/* Main gradient orbs with optimized animations */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/15 via-primary/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary/8 via-transparent to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Optimized grid pattern */}
        <div className="fixed inset-0 -z-5 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)]" />
        </div>

        {/* Optimized floating particles */}
        <div className="fixed inset-0 -z-8 pointer-events-none will-change-transform">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                y: [null, -20, 20],
                x: [null, -10, 10],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <Navbar />
        
        <main className="relative">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 1, 
                  ease: [0.25, 0.1, 0.25, 1] 
                }
              }
            }}
          >
            <HeroSection />
          </motion.div>

          {/* About Section */}
          <AnimatedSection variants={sectionVariants}>
            <AboutSection />
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection variants={sectionVariants}>
            <SkillsSection />
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection variants={sectionVariants}>
            <ProjectsSection />
          </AnimatedSection>

          {/* Experience Section */}
          <AnimatedSection variants={sectionVariants}>
            <ExperienceSection />
          </AnimatedSection>

          {/* Certificates Section */}
          <AnimatedSection variants={sectionVariants}>
            <CertificatesSection />
          </AnimatedSection>

          <ChatbotButton />
        </main>

        <Footer />
      </div>
    </SmoothTransition>
  );
};

export default memo(Index);
