import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink, Github, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { useToast } from "@/hooks/use-toast";
import ResumeButton from '../ui/ResumeButton';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const { toast } = useToast();
  
  const titles = [
    "Full-Stack Developer",
    "Mobile App Engineer", 
    "UI/UX Designer",
    "AI Enthusiast"
  ];
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / (rect.width / 2) * -20);
    y.set((e.clientY - centerY) / (rect.height / 2) * -20);
  };

  useEffect(() => {
    const currentTitle = titles[textIndex];
    let charIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let isDeleting = false;
    let text = "";
    
    const type = () => {
      if (isDeleting) {
        text = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex <= 0) {
          isDeleting = false;
          setTextIndex((prev) => (prev + 1) % titles.length);
          clearInterval(typingInterval);
          setTimeout(() => {
            typingInterval = setInterval(type, 200);
          }, 1500);
        }
      } else {
        text = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentTitle.length) {
          isDeleting = true;
          clearInterval(typingInterval);
          setTimeout(() => {
            typingInterval = setInterval(type, 150);
          }, 3000);
        }
      }
      
      setTypedText(text);
    };
    
    typingInterval = setInterval(type, 200);
    return () => clearInterval(typingInterval);
  }, [textIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 700, 0);
      const translateY = scrollY * 0.3;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    canvasRef.current.appendChild(renderer.domElement);
    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      const hue = (i / (particlesCount * 3)) * 360;
      const color = new THREE.Color(`hsl(${hue}, 70%, 50%)`);
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    const secondaryGeometry = new THREE.BufferGeometry();
    const secondaryCount = 1000;
    
    const secondaryPosArray = new Float32Array(secondaryCount * 3);
    const secondaryColorsArray = new Float32Array(secondaryCount * 3);
    
    for (let i = 0; i < secondaryCount * 3; i += 3) {
      secondaryPosArray[i] = (Math.random() - 0.5) * 20;
      secondaryPosArray[i + 1] = (Math.random() - 0.5) * 20;
      secondaryPosArray[i + 2] = (Math.random() - 0.5) * 20 - 5;
      
      const color = new THREE.Color(`hsl(${220 + Math.random() * 40}, 70%, 50%)`);
      secondaryColorsArray[i] = color.r;
      secondaryColorsArray[i + 1] = color.g;
      secondaryColorsArray[i + 2] = color.b;
    }
    
    secondaryGeometry.setAttribute('position', new THREE.BufferAttribute(secondaryPosArray, 3));
    secondaryGeometry.setAttribute('color', new THREE.BufferAttribute(secondaryColorsArray, 3));
    
    const secondaryMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const secondaryParticles = new THREE.Points(secondaryGeometry, secondaryMaterial);
    scene.add(secondaryParticles);
    
    camera.position.z = 5;
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      secondaryParticles.rotation.x -= 0.0003;
      secondaryParticles.rotation.y -= 0.0003;
      
      particlesMesh.rotation.y += mouseX * 0.05;
      particlesMesh.rotation.x += mouseY * 0.05;
      
      secondaryParticles.rotation.y += mouseX * 0.03;
      secondaryParticles.rotation.x += mouseY * 0.03;
      
      const pulse = Math.sin(elapsedTime * 0.5) * 0.05 + 1;
      particlesMesh.scale.set(pulse, pulse, pulse);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showEasterEgg = () => {
    toast({
      title: "You found an Easter egg!",
      description: "Thanks for exploring my portfolio in detail. There are more hidden surprises waiting to be discovered!",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div ref={canvasRef} className="absolute inset-0 -z-10"></div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>
      
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 -z-5 opacity-10">
        <div className="absolute inset-0 grid grid-cols-12 gap-4">
          {Array.from({ length: 12 * 12 }).map((_, i) => (
            <motion.div 
              key={i}
              className="bg-white/5 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between min-h-screen"
      >
        {/* Left Content */}
        <div className="md:w-3/5 text-center md:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Status badge */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center px-6 py-2 rounded-full glass-effect text-sm font-medium mb-6 gap-3 border border-primary/30"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              B.Tech CSE Student @ Aditya Engineering College
            </motion.span>
            
            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block text-white mb-2">Suchandra</span>
                <span className="block bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                  Etti
                </span>
              </motion.h1>
              
              {/* Animated subtitle */}
              <div className="h-16 md:h-20 flex items-center justify-center md:justify-start">
                <motion.p 
                  className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span className="inline-block min-w-[2ch]">{typedText}</span>
                  <span className="animate-pulse text-primary">|</span>
                </motion.p>
              </div>
            </div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              Crafting innovative solutions at the intersection of modern 
              web technologies, mobile applications, and artificial intelligence.
              <span 
                className="hidden md:inline-block ml-1 text-primary/70 cursor-pointer hover:text-primary transition-colors" 
                onClick={showEasterEgg}
              >
                Let's build something amazing together.
              </span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                <Sparkles className="h-5 w-5" />
                View My Work
              </motion.a>
              
              <motion.a
                href="https://github.com/SnvvSuchandraEtti"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-full glass-effect text-foreground font-semibold transition-all duration-300 border border-white/20 backdrop-blur-md hover:bg-white/10"
              >
                <Github className="h-5 w-5" />
                GitHub
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/suchandra-etti"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 rounded-full glass-effect text-foreground font-semibold transition-all duration-300 border border-white/20 backdrop-blur-md hover:bg-white/10"
              >
                <ExternalLink className="h-5 w-5" />
                LinkedIn
              </motion.a>
              
              <ResumeButton 
                className="mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="md:w-2/5 mt-16 md:mt-0 flex justify-center">
          <motion.div
            style={{
              x: useTransform(springX, x => x * 1.5),
              y: useTransform(springY, y => y * 1.5),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="relative"
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute -inset-12 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/15 to-accent/20 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div 
              className="absolute -inset-8 rounded-full bg-gradient-to-l from-accent/30 to-primary/30 blur-2xl"
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [360, 270, 180, 90, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Main image container */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-accent rounded-full blur-md opacity-75"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-pulse duration-4000"></div>
              
              {/* Image */}
              <div className="relative z-20 w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm shadow-2xl">
                <img 
                  src="https://i.postimg.cc/mDZjf4Kk/317kb.jpg" 
                  alt="Suchandra Etti - Full Stack Developer" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
