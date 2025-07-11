
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ExternalLink, Download, Share2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { certificates } from '@/data/certificates';
import { useToast } from '@/hooks/use-toast';

const CertificatesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [hoveredCertId, setHoveredCertId] = useState<string | null>(null);
  
  const technicalCount = certificates.filter(cert => cert.category === 'technical').length;
  const participationCount = certificates.filter(cert => cert.category === 'participation').length;
  
  // Featured certificates (3 of each type)
  const featuredTechnical = certificates
    .filter(cert => cert.category === 'technical')
    .slice(0, 3);
    
  const featuredParticipation = certificates
    .filter(cert => cert.category === 'participation')
    .slice(0, 3);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };
  
  const handleViewCredential = (url?: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!url) {
      toast({
        title: "Credential link unavailable",
        description: "The credential verification link is not available for this certificate.",
        variant: "destructive",
      });
      return;
    }
    
    window.open(url, '_blank');
  };

  const handleShareCertificate = (certTitle: string, certIssuer: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (navigator.share) {
      navigator.share({
        title: certTitle,
        text: `Check out my ${certTitle} certificate from ${certIssuer}`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Certificate shared",
          description: "Successfully shared your certificate.",
        });
      })
      .catch(() => {
        toast({
          title: "Share cancelled",
          description: "You cancelled the share operation.",
        });
      });
    } else {
      // Fallback - copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Certificate link copied to clipboard.",
      });
    }
  };

  const handleDownloadCertificate = (certTitle: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    toast({
      title: "Download initiated",
      description: `Downloading certificate: ${certTitle}`,
    });
    
    // In a real scenario, this would download the actual certificate file
    // For this demo, we'll just simulate the download with a toast
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `Certificate downloaded successfully.`,
      });
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    // Handle "Ongoing" or special dates
    if (dateString.toLowerCase().includes('ongoing') || 
        dateString.toLowerCase().includes('present')) {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long'
      }).format(date);
    } catch (e) {
      return dateString; // Fallback to original format
    }
  };

  return (
    <section id="certificates" className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4" ref={ref}>
        <SectionHeading 
          title="My Certifications" 
          subtitle="A showcase of my technical achievements and participation in various events"
        />
        
        {/* Stats overview with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative glass-effect p-6 rounded-xl flex items-center flex-1 max-w-xs mx-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{technicalCount}+</h3>
              <p className="text-muted-foreground">Technical Certifications</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="relative glass-effect p-6 rounded-xl flex items-center flex-1 max-w-xs mx-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
            <div className="p-3 rounded-full bg-accent/10 mr-4">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{participationCount}+</h3>
              <p className="text-muted-foreground">Participation Certificates</p>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="space-y-12">
          {/* Technical Certifications */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-semibold mb-6 flex items-center"
            >
              <Award className="mr-2 h-5 w-5 text-primary" />
              Technical Certifications
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTechnical.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onHoverStart={() => setHoveredCertId(cert.id)}
                  onHoverEnd={() => setHoveredCertId(null)}
                  className="glass-effect rounded-xl overflow-hidden border border-white/10 relative group"
                >
                  <Link to={`/certificates`} className="block h-full">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-primary/20 backdrop-blur-md z-20">
                        {cert.issuer}
                      </div>
                      
                      {/* Quick action buttons on hover */}
                      <AnimatePresence>
                        {hoveredCertId === cert.id && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-3 right-3 z-20 flex gap-2"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleShareCertificate(cert.title, cert.issuer, e)}
                              className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                              title="Share Certificate"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleDownloadCertificate(cert.title, e)}
                              className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                              title="Download Certificate"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold mb-2 line-clamp-1">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{formatDate(cert.date)}</span>
                        <button 
                          onClick={(e) => handleViewCredential(cert.credentialUrl, e)}
                          className="text-sm text-primary hover:text-primary/80 flex items-center"
                        >
                          View Details <ExternalLink className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Participation Certificates */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-semibold mb-6 flex items-center"
            >
              <Award className="mr-2 h-5 w-5 text-accent" />
              Participation Certificates
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredParticipation.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onHoverStart={() => setHoveredCertId(cert.id)}
                  onHoverEnd={() => setHoveredCertId(null)}
                  className="glass-effect rounded-xl overflow-hidden border border-white/10 relative group"
                >
                  <Link to={`/certificates`} className="block h-full">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-accent/20 backdrop-blur-md z-20">
                        {cert.issuer}
                      </div>
                      
                      {/* Quick action buttons on hover */}
                      <AnimatePresence>
                        {hoveredCertId === cert.id && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-3 right-3 z-20 flex gap-2"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleShareCertificate(cert.title, cert.issuer, e)}
                              className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                              title="Share Certificate"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleDownloadCertificate(cert.title, e)}
                              className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                              title="Download Certificate"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold mb-2 line-clamp-1">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{formatDate(cert.date)}</span>
                        <button 
                          onClick={(e) => handleViewCredential(cert.credentialUrl, e)}
                          className="text-sm text-accent hover:text-accent/80 flex items-center"
                        >
                          View Details <ExternalLink className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/certificates" 
            className="inline-flex items-center px-6 py-3 rounded-lg glass-button border border-white/10 hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            View All Certificates <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;
