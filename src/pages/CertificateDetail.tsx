
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Award, ExternalLink } from 'lucide-react';
import { certificates, Certificate } from '@/data/certificates';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CertificateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [relatedCertificates, setRelatedCertificates] = useState<Certificate[]>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the certificate by ID
    const cert = certificates.find(c => c.id === id);
    
    if (cert) {
      setCertificate(cert);
      
      // Find related certificates (same category, excluding current)
      const related = certificates
        .filter(c => c.category === cert.category && c.id !== cert.id)
        .slice(0, 3);
      
      setRelatedCertificates(related);
    } else {
      // Certificate not found, redirect to certificates page
      navigate('/certificates');
    }
  }, [id, navigate]);
  
  if (!certificate) {
    return null; // Loading or redirecting
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link 
              to="/certificates" 
              className="inline-flex items-center text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Certificates
            </Link>
          </motion.div>
          
          {/* Certificate Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Certificate Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 relative"
            >
              <div className="sticky top-24">
                <div className="relative rounded-xl overflow-hidden border border-white/10 h-full">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={certificate.imageUrl} 
                      alt={certificate.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 right-0 p-4">
                    <div className="px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center bg-white/10 backdrop-blur-md">
                      {certificate.category === 'technical' ? (
                        <Award className="h-3 w-3 mr-1.5 text-primary" />
                      ) : (
                        <Award className="h-3 w-3 mr-1.5 text-accent" />
                      )}
                      {certificate.category === 'technical' ? 'Technical Certificate' : 'Participation Certificate'}
                    </div>
                  </div>
                  {certificate.credentialUrl && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <a 
                        href={certificate.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white text-sm font-medium border border-white/10"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Credential
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Certificate Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 glass-effect rounded-xl p-6 border border-white/10"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{certificate.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Issuing Organization</h3>
                  <p className="text-base font-medium">{certificate.issuer}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Issue Date</h3>
                  <p className="text-base font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 opacity-70" />
                    {certificate.date}
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {certificate.description}
                  {/* Extended description for the detail page */}
                  <br /><br />
                  This certification represents a significant milestone in my professional development journey. 
                  Through rigorous study and practical application, I've demonstrated proficiency in this domain, 
                  enhancing my skill set and expanding my knowledge base. The certification process involved 
                  comprehensive assessments and real-world projects, ensuring a thorough understanding of the subject matter.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Skills Acquired</h2>
                <div className="flex flex-wrap gap-2">
                  {certificate.category === 'technical' ? (
                    // Technical skills for technical certificates
                    <>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Problem Solving</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Technical Design</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Critical Thinking</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">System Architecture</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Code Quality</span>
                    </>
                  ) : (
                    // Soft skills for participation certificates
                    <>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Teamwork</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Communication</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Time Management</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Leadership</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground">Adaptability</span>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-3">Learning Journey</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The path to earning this certificate was both challenging and rewarding. It involved dedicated 
                  study sessions, hands-on practice with cutting-edge tools and technologies, and collaboration 
                  with peers and mentors. This experience has not only enhanced my technical abilities but also 
                  strengthened my problem-solving approach and collaborative skills.
                  <br /><br />
                  I'm applying these learned concepts in my academic projects and professional work, continuously 
                  building upon this foundation to stay current with industry best practices and emerging trends.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Related Certificates */}
          {relatedCertificates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-6">Related Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCertificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="glass-effect rounded-xl overflow-hidden border border-white/10"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold mb-2 line-clamp-1">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                      <Link 
                        to={`/certificates/${cert.id}`} 
                        className={`text-sm ${cert.category === 'technical' ? 'text-primary' : 'text-accent'} hover:underline flex items-center`}
                      >
                        View Details <ArrowLeft className="ml-1 h-3 w-3 rotate-180" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CertificateDetail;
