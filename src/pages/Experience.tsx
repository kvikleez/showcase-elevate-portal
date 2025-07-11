
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { experiences } from '@/data/experience';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import SmoothTransition from '@/components/ui/SmoothTransition';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';

const Experience = () => {
  const location = useLocation();
  
  // Scroll to experience if hash exists
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

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <SmoothTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading 
                title="My Experience" 
                subtitle="A timeline of my professional journey and internships"
                alignment="center"
                className="mb-16"
              />
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2"></div>
                
                <div className="space-y-12">
                  {sortedExperiences.map((experience, index) => (
                    <motion.div
                      id={experience.id}
                      key={experience.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex flex-col ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      } md:items-center`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary transform translate-x-[-10px] md:translate-x-[-10px]"></div>
                      
                      {/* Content */}
                      <div className={`ml-8 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                      }`}>
                        <div className="glass-effect p-6 rounded-xl">
                          <div className="mb-4">
                            <h3 className="text-xl font-semibold">{experience.role || experience.title}</h3>
                            <div className="flex items-center mt-1 text-muted-foreground">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{experience.company}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                  {experience.startDate} - {experience.endDate || 'Present'}
                                </span>
                              </div>
                              <div className="flex items-center mt-1 sm:mt-0 text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{experience.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {experience.description}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {experience.responsibilities?.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies?.map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {experience.website && (
                            <a 
                              href={experience.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-4 text-primary hover:text-primary/80 transition-colors"
                            >
                              Visit company <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Date for mobile */}
                      <div className="md:hidden ml-8 mt-2 text-sm text-muted-foreground">
                        {experience.startDate} - {experience.endDate || 'Present'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </SmoothTransition>
  );
};

export default Experience;
