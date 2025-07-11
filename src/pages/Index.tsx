
import React, { useEffect } from 'react';
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

const Index: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section animation variants
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <SmoothTransition>
      <div className="relative min-h-screen">
        {/* Enhanced animated background with improved performance */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Main gradient orbs */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/25 via-accent/15 to-transparent rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-secondary/10 via-transparent to-transparent rounded-full blur-[140px] animate-pulse delay-2000"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/15 to-transparent rounded-full blur-[100px] animate-pulse delay-3000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[110px] animate-pulse delay-4000"></div>
        </div>

        {/* Enhanced grid pattern with better visual hierarchy */}
        <div className="fixed inset-0 -z-5 opacity-15">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:140px_140px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>

        {/* Floating particles with improved animation */}
        <div className="fixed inset-0 -z-8 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/25 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -30, 30],
                x: [null, -15, 15],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <AboutSection />
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <SkillsSection />
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <ProjectsSection />
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <ExperienceSection />
          </motion.div>

          {/* Certificates Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <CertificatesSection />
          </motion.div>

          <ChatbotButton />
        </main>

        <Footer />
      </div>
    </SmoothTransition>
  );
};

export default Index;
