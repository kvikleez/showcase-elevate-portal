import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { Sparkles, Lightbulb, Code, Laptop, Award, Users, Target, Rocket } from 'lucide-react';
import suchandraCasual from '@/assets/profile/suchandra-casual.png';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading 
          title="About Me" 
          subtitle="Learn about my journey, expertise, and what drives me to create exceptional digital experiences"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-xl transform rotate-3"></div>
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-bl from-accent/15 to-primary/15 blur-lg transform -rotate-2"></div>
              
              {/* Main image container */}
              <div className="glass-effect rounded-3xl overflow-hidden relative z-10 border border-white/10">
                <img 
                  src={suchandraCasual} 
                  alt="Suchandra Etti - Professional Developer" 
                  className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Professional badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-effect rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Full-Stack Developer</h4>
                        <p className="text-sm text-white/80">3+ Years Experience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating achievement badges */}
              <motion.div
                className="absolute -top-4 -right-4 p-4 glass-effect rounded-xl z-20 border border-white/20"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Award className="h-6 w-6 text-primary" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 p-4 glass-effect rounded-xl z-20 border border-white/20"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Code className="h-6 w-6 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Passionate Tech Innovator & <span className="text-gradient">Digital Craftsman</span>
              </h3>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a final-year B.Tech CSE student at Aditya Engineering College with proven expertise in 
                  full-stack software development and mobile application engineering. Proficient in Flutter, ReactJS, 
                  and Java frameworks with experience delivering multiple client projects in agile environments.
                </p>
                <p>
                  My journey in tech has led to consistently improving application performance by 20% while reducing 
                  development cycles through efficient code optimization. Specializing in mobile engineering, and AI, 
                  I've successfully delivered <span className="text-primary font-semibold">7+ major projects</span> 
                  including HOOT 2.0 (10,000+ users) and S-TRACK (18,000+ users).
                </p>
                <p>
                  Beyond coding, I'm the LEO Club Program Coordinator reaching 2500+ students, a college representative 
                  at multiple hackathons (KL, GIET, JNTUK, JNTUV), and currently developing "Leez" - an innovative P2P 
                  rental marketplace startup. I've solved 500+ problems on competitive platforms and ranked in top 5% globally.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">7+</div>
                <div className="text-sm text-muted-foreground">Major Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">30+</div>
                <div className="text-sm text-muted-foreground">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">Top 5%</div>
                <div className="text-sm text-muted-foreground">Global Ranking</div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HighlightCard 
                icon={<Lightbulb className="h-5 w-5" />}
                title="Innovation Mindset"
                description="Approaching challenges with creative problem-solving and cutting-edge solutions"
              />
              <HighlightCard 
                icon={<Code className="h-5 w-5" />}
                title="Technical Excellence"
                description="Proficient in 7+ programming languages and modern development frameworks"
              />
              <HighlightCard 
                icon={<Users className="h-5 w-5" />}
                title="Team Leadership"
                description="Led technical workshops reaching 2500+ students and managed event teams"
              />
              <HighlightCard 
                icon={<Target className="h-5 w-5" />}
                title="Results-Driven"
                description="Consistently delivered projects with measurable performance improvements"
              />
            </div>

            {/* Call to Action */}
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <Sparkles className="h-5 w-5" />
                Let's Collaborate
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="glass-effect p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
