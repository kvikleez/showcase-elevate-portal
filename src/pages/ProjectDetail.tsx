
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Project, projects } from '@/data/projects';
import { ArrowLeft, Github, ExternalLink, ArrowRight } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject || null);
      
      if (foundProject) {
        // Find related projects based on shared technologies
        const related = projects
          .filter(p => p.id !== id && p.technologies.some(tech => 
            foundProject.technologies.includes(tech)
          ))
          .slice(0, 2);
        setRelatedProjects(related);
      }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <PageTransition>
        <Navbar />
        <div className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Project Not Found</h2>
            <p className="mb-8 text-muted-foreground">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/projects" 
              className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="glass-effect rounded-xl overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full aspect-video object-cover object-center"
                  />
                </div>

                <h1 className="text-3xl font-bold mt-8 mb-4">{project.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="text-muted-foreground space-y-6">
                  <p className="text-lg font-medium text-foreground">
                    {project.description}
                  </p>
                  
                  <p>
                    {project.longDescription || 
                      "A detailed description of this project is being developed. Please check back later for more information about the project goals, challenges, and implementation details."}
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Intuitive user interface design with responsive layouts</li>
                      <li>Integration with multiple APIs for enhanced functionality</li>
                      <li>Robust error handling and data validation</li>
                      <li>Performance optimization for smooth user experience</li>
                      <li>Comprehensive testing and quality assurance</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Technical Implementation</h3>
                    <p>
                      This project leverages a modern tech stack including {project.technologies.join(', ')}. 
                      The architecture follows best practices for maintainability and scalability, 
                      with a focus on clean code and efficient algorithms.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 rounded-md bg-muted text-foreground hover:bg-muted/70 transition-colors"
                    >
                      <Github className="mr-2 h-5 w-5" /> View Source Code
                    </a>
                  )}
                  
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" /> View Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-effect p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">Web Application</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Timeline:</span>
                    <span className="font-medium">3 months</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">Full-stack Developer</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Team Size:</span>
                    <span className="font-medium">2 people</span>
                  </li>
                </ul>
              </div>

              {relatedProjects.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
                  <div className="space-y-4">
                    {relatedProjects.map(related => (
                      <Link 
                        key={related.id}
                        to={`/projects/${related.id}`}
                        className="glass-effect block p-4 rounded-xl hover:translate-y-[-2px] transition-transform"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={related.imageUrl} 
                              alt={related.title}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{related.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="mt-12 pt-8 border-t border-muted flex justify-between">
            <Link 
              to="/projects" 
              className="inline-flex items-center px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> All Projects
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Discuss This Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default ProjectDetail;
