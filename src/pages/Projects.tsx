import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowLeft, ArrowRight, Filter, X, Code, Globe, Github, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [category, setCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  
  const featuredProject = projects[0];
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    let result = projects;
    
    if (category !== 'all') {
      result = result.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
    
    setFilteredProjects(result);
    setCurrentPage(1);
  }, [category]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="fixed -z-10 top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="fixed -z-10 bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading 
              title="My Projects" 
              subtitle="Explore my portfolio of projects spanning various technologies and domains"
              alignment="center"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-16"
          >
            <div className="glass-effect rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative overflow-hidden h-64 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src={featuredProject.imageUrl} 
                    alt={featuredProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary backdrop-blur-md z-20">
                    Featured Project
                  </div>
                </div>
                
                <div className="p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-3">{featuredProject.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredProject.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/projects/${featuredProject.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-button border border-white/10 hover:bg-white/5 transition-all duration-300"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                    
                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                      >
                        Live Demo <Globe className="h-4 w-4" />
                      </a>
                    )}
                    
                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                      >
                        GitHub <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold flex items-center gap-2"
            >
              <Code className="h-5 w-5 text-primary" />
              All Projects
            </motion.h2>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <ProjectCard 
                  project={project} 
                  featured={index === 0 && currentPage === 1} 
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 glass-effect rounded-xl mx-auto max-w-lg mt-8"
            >
              <Code className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filter criteria to find projects.
              </p>
            </motion.div>
          )}
          
          {filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center mt-12 space-x-2"
            >
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 1 
                    ? 'bg-white/5 text-white/50 cursor-not-allowed' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              
              <div className="flex items-center px-4">
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === totalPages 
                    ? 'bg-white/5 text-white/50 cursor-not-allowed' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
