import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { certificates, Certificate, getCertificatesByCategory } from '@/data/certificates';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import SmoothTransition from '@/components/ui/SmoothTransition';
import { 
  Award, 
  Calendar, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Download, 
  Share2, 
  ExternalLink,
  Zap,
  Trophy,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'participation'>('all');
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(certificates);
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 12;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const { toast } = useToast();

  const totalCertificates = certificates.length;
  const totalTechnical = certificates.filter(cert => cert.category === 'technical').length;
  const totalParticipation = certificates.filter(cert => cert.category === 'participation').length;
  const latestCertDate = certificates.reduce((latest, cert) => {
    const certDate = new Date(cert.date);
    return certDate > latest ? certDate : latest;
  }, new Date(0));

  useEffect(() => {
    let filtered = certificates;
    
    if (selectedCategory !== 'all') {
      filtered = certificates.filter(cert => cert.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(cert =>
        cert.title.toLowerCase().includes(term) ||
        cert.issuer.toLowerCase().includes(term) ||
        cert.description.toLowerCase().includes(term) ||
        (cert.skills && cert.skills.some(skill => skill.toLowerCase().includes(term)))
      );
    }
    
    setFilteredCertificates(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
  const currentCertificates = filteredCertificates.slice(
    (currentPage - 1) * certificatesPerPage,
    currentPage * certificatesPerPage
  );

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
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid
      }
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString; // Fallback to original format
    }
  };

  return (
    <SmoothTransition>
      <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
        <Navbar />
        
        {/* Enhanced animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4" ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading 
                title="My Certifications" 
                subtitle="A comprehensive collection of my technical achievements and professional development"
                alignment="center"
                className="mb-16"
              />
              
              {/* Enhanced stats overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="relative glass-effect p-6 rounded-xl flex items-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
                  <div className="p-3 rounded-full bg-primary/10 mr-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{totalCertificates}</h3>
                    <p className="text-muted-foreground text-sm">Total Certificates</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="relative glass-effect p-6 rounded-xl flex items-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
                  <div className="p-3 rounded-full bg-blue-500/10 mr-4">
                    <Zap className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{totalTechnical}</h3>
                    <p className="text-muted-foreground text-sm">Technical Certs</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="relative glass-effect p-6 rounded-xl flex items-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
                  <div className="p-3 rounded-full bg-green-500/10 mr-4">
                    <Trophy className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{totalParticipation}</h3>
                    <p className="text-muted-foreground text-sm">Participation</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="relative glass-effect p-6 rounded-xl flex items-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
                  <div className="p-3 rounded-full bg-accent/10 mr-4">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{formatDate(latestCertDate.toISOString().split('T')[0])}</h3>
                    <p className="text-muted-foreground text-sm">Latest Certificate</p>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced search and filter controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg glass-effect border border-white/10 focus:border-primary/30 transition-colors"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'technical' | 'participation')}
                    className="px-4 py-2 rounded-lg glass-effect border border-white/10 focus:border-primary/30 transition-colors"
                  >
                    <option value="all">All Categories</option>
                    <option value="technical">Technical</option>
                    <option value="participation">Participation</option>
                  </select>
                </div>
              </motion.div>
              
              {/* Enhanced certificates grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
              >
                <AnimatePresence mode="wait">
                  {currentCertificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                        <img 
                          src={cert.imageUrl} 
                          alt={cert.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium z-20 ${
                          cert.category === 'technical' 
                            ? 'bg-primary/20 backdrop-blur-md' 
                            : 'bg-accent/20 backdrop-blur-md'
                        }`}>
                          {cert.category === 'technical' ? 'Technical' : 'Participation'}
                        </div>
                        
                        {/* Quick action buttons */}
                        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mb-3 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(cert.date)}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {cert.description}
                        </p>
                        
                        {cert.skills && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {cert.skills.slice(0, 3).map((skill, i) => (
                              <span 
                                key={i} 
                                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                                  highlightedSkills.includes(skill)
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-muted/50 text-muted-foreground'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 3 && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground">
                                +{cert.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={(e) => handleViewCredential(cert.credentialUrl, e)}
                            className={`text-sm flex items-center transition-colors ${
                              cert.category === 'technical' 
                                ? 'text-primary hover:text-primary/80' 
                                : 'text-accent hover:text-accent/80'
                            }`}
                          >
                            View Details <ExternalLink className="ml-1 h-3 w-3" />
                          </button>
                          <Star className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Enhanced pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex justify-center items-center space-x-2"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'glass-effect hover:bg-white/5'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </SmoothTransition>
  );
};

export default Certificates;
