import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink, Github, Sparkles, Download, Zap } from 'lucide-react';
import * as THREE from 'three';
import { useToast } from "@/hooks/use-toast";
import ResumeButton from '../ui/ResumeButton';
import MagneticButton from '../ui/MagneticButton';
import TextReveal from '../ui/TextReveal';
import AnimatedCounter from '../ui/AnimatedCounter';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();
  
  const titles = useMemo(() => [
    "Full-Stack Developer",
    "Mobile App Engineer", 
    "UI/UX Designer",
    "AI Enthusiast"
  ], []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = useMemo(() => ({ damping: 50, stiffness: 100 }), []);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Track mouse for spotlight effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / (rect.width / 2) * -15);
    y.set((e.clientY - centerY) / (rect.height / 2) * -15);
  }, [x, y]);

  // Typing animation
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
            typingInterval = setInterval(type, 150);
          }, 800);
        }
      } else {
        text = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentTitle.length) {
          isDeleting = true;
          clearInterval(typingInterval);
          setTimeout(() => {
            typingInterval = setInterval(type, 100);
          }, 2500);
        }
      }
      
      setTypedText(text);
    };
    
    typingInterval = setInterval(type, 150);
    return () => clearInterval(typingInterval);
  }, [textIndex, titles]);

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 600, 0);
      const translateY = scrollY * 0.4;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js particle system
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    canvasRef.current.appendChild(renderer.domElement);
    
    // Primary particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      // Purple to pink gradient
      const t = i / (particlesCount * 3);
      const color = new THREE.Color();
      color.setHSL(0.75 - t * 0.15, 0.8, 0.6);
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMoveCanvas = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    
    window.addEventListener('mousemove', handleMouseMoveCanvas);
    
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;
      
      particlesMesh.rotation.y += mouseX * 0.02;
      particlesMesh.rotation.x += mouseY * 0.02;
      
      const pulse = Math.sin(elapsedTime * 0.3) * 0.03 + 1;
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
      window.removeEventListener('mousemove', handleMouseMoveCanvas);
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const stats = [
    { value: 10, suffix: '+', label: 'Projects' },
    { value: 30, suffix: '+', label: 'Certifications' },
    { value: 500, suffix: '+', label: 'Problems Solved' },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas for particles */}
      <div ref={canvasRef} className="absolute inset-0 -z-10" />
      
      {/* Spotlight effect following cursor */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(262 83% 58% / 0.08), transparent 40%)`,
        }}
      />
      
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-[120px]"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-accent/20 to-pink-500/20 blur-[120px]"
          animate={{ 
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 z-10 pt-20"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-effect border border-primary/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-medium text-foreground/90">Open to Work</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">B.Tech CSE @ Aditya Engineering</span>
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block text-gradient-glow mt-2">Suchandra Etti</span>
            </h1>
            
            {/* Animated subtitle */}
            <div className="h-12 md:h-16 flex items-center justify-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground">
                <span className="inline-block min-w-[2ch]">{typedText}</span>
                <motion.span 
                  className="text-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </p>
            </div>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Crafting innovative solutions at the intersection of modern web technologies, 
            mobile applications, and artificial intelligence. Let's build something amazing together.
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-8 md:gap-16 py-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MagneticButton
              href="#projects"
              variant="glow"
              size="lg"
            >
              <Sparkles className="h-5 w-5" />
              View My Work
            </MagneticButton>
            
            <MagneticButton
              href="https://github.com/SnvvSuchandraEtti"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              <Github className="h-5 w-5" />
              GitHub
            </MagneticButton>
            
            <MagneticButton
              href="https://linkedin.com/in/suchandra-etti"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              <ExternalLink className="h-5 w-5" />
              LinkedIn
            </MagneticButton>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
