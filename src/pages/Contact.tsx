
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import { useToast } from '@/hooks/use-toast';
import Map from '@/components/ui/Map';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Contact Me" 
            subtitle="Have a project in mind? Let's discuss how I can help bring your ideas to life."
            alignment="center"
          />
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <span>Get in Touch</span>
                    <div className="ml-3 h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
                  </h2>
                  
                  <p className="text-muted-foreground mb-8">
                    Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-muted-foreground">Aditya Engineering College, Andhra Pradesh, India</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <a href="mailto:suchandra@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                          ettisnvvsuchandra@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                          +91 95XX XXXXX
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Connect on Social Media</h3>
                  <div className="flex space-x-3">
                    <motion.a
                      href="https://github.com/SnvvSuchandraEtti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass-effect text-foreground hover:text-primary transition-colors border border-white/10"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    
                    <motion.a
                      href="https://linkedin.com/in/suchandra-etti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass-effect text-foreground hover:text-[#0A66C2] transition-colors border border-white/10"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass-effect text-foreground hover:text-[#E4405F] transition-colors border border-white/10"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="h-5 w-5" />
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass-effect text-foreground hover:text-[#1DA1F2] transition-colors border border-white/10"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
                
                {/* Map section */}
                <div>
                  <h3 className="text-xl font-medium mb-4">My Location</h3>
                  <div className="h-[300px] lg:h-[250px]">
                    <Map />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="glass-effect p-8 rounded-xl border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium mb-1 block">
                          Your Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                          placeholder="John Doe"
                          disabled={isSubmitting || isSuccess}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="text-sm font-medium mb-1 block">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                          placeholder="john@example.com"
                          disabled={isSubmitting || isSuccess}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="text-sm font-medium mb-1 block">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                        placeholder="Project inquiry"
                        disabled={isSubmitting || isSuccess}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-1 block">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all resize-none"
                        placeholder="Hello Suchandra, I'd like to discuss a project..."
                        disabled={isSubmitting || isSuccess}
                        required
                      ></textarea>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isSuccess}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Sent Successfully!
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
