
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Briefcase } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { experiences } from '@/data/experience';

const ExperienceSection: React.FC = () => {
  // Display the 2 most recent experiences
  const recentExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  }).slice(0, 2);

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Experience" 
          subtitle="My professional journey and internships"
        />

        <div className="space-y-8">
          {recentExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="glass-effect rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{experience.role}</h3>
                      <div className="flex items-center mt-1 text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{experience.company}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {experience.startDate} - {experience.endDate || 'Present'}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-muted-foreground">
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
                      {experience.responsibilities.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                      {experience.responsibilities.length > 2 && (
                        <li>
                          <Link 
                            to={`/experience#${experience.id}`} 
                            className="text-primary hover:underline"
                          >
                            And more...
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.slice(0, 5).map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {experience.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-foreground">
                        +{experience.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/experience" 
            className="inline-flex items-center px-6 py-3 rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
