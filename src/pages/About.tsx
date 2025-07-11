
import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Award, User, Star, Heart, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="About Me" 
            subtitle="Learn more about my journey, background, and what drives me"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold">
                  Hi, I'm <span className="text-gradient">Suchandra Etti</span>
                </h3>
                
                <p className="text-muted-foreground">
                  I'm a third-year B.Tech Computer Science and Engineering student at Aditya University, with a passion for creating innovative solutions that leverage cutting-edge technologies. My journey in the world of technology began early, and I've been building my skills in various areas of computer science ever since.
                </p>
                
                <p className="text-muted-foreground">
                  My academic journey has been focused on mastering the fundamentals of computer science while exploring specialized areas like artificial intelligence, machine learning, and web development. I believe in the power of technology to transform lives and solve real-world problems.
                </p>
                
                <p className="text-muted-foreground">
                  Beyond my technical skills, I value creativity, continuous learning, and collaboration. I enjoy working on projects that challenge me to think outside the box and push the boundaries of what's possible with technology.
                </p>
                
                <div className="pt-4">
                  <h4 className="text-xl font-semibold mb-4">Education</h4>
                  <div className="glass-effect p-6 rounded-xl">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                      <div>
                        <h5 className="text-lg font-medium">B.Tech in Computer Science and Engineering</h5>
                        <p className="text-muted-foreground">Aditya University</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="text-muted-foreground">2021 - 2025 (Expected)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-medium">Relevant Coursework:</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground ml-6">
                      <li>Data Structures and Algorithms</li>
                      <li>Artificial Intelligence</li>
                      <li>Machine Learning</li>
                      <li>Database Management Systems</li>
                      <li>Web Development</li>
                      <li>Computer Networks</li>
                      <li>Operating Systems</li>
                      <li>Software Engineering</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-xl font-semibold mb-4">Achievements</h4>
                  <div className="glass-effect p-6 rounded-xl space-y-4">
                    <div className="flex gap-3">
                      <div className="p-2 rounded-md bg-muted shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-medium">Dean's List Scholar</h5>
                        <p className="text-muted-foreground">
                          Maintained a GPA in the top 5% of the class for three consecutive semesters.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="p-2 rounded-md bg-muted shrink-0">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-medium">Hackathon Winner</h5>
                        <p className="text-muted-foreground">
                          First place in the university-wide hackathon for developing an innovative AI-powered solution.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="p-2 rounded-md bg-muted shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-medium">Technical Paper Publication</h5>
                        <p className="text-muted-foreground">
                          Co-authored a research paper on machine learning applications in healthcare, published in a student journal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" /> 
                    Personal Info
                  </h4>
                  <ul className="space-y-3">
                    <InfoItem label="Name" value="Suchandra Etti" />
                    <InfoItem label="Age" value="21 years" />
                    <InfoItem label="Location" value="Andhra Pradesh, India" />
                    <InfoItem label="Email" value="contact@example.com" isLink />
                    <InfoItem label="Languages" value="English, Hindi, Telugu" />
                  </ul>
                </div>
                
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-primary" />
                    My Interests
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InterestItem>Machine Learning</InterestItem>
                    <InterestItem>Web Development</InterestItem>
                    <InterestItem>UI/UX Design</InterestItem>
                    <InterestItem>Data Science</InterestItem>
                    <InterestItem>Open Source</InterestItem>
                    <InterestItem>Cloud Computing</InterestItem>
                    <InterestItem>Blockchain</InterestItem>
                    <InterestItem>IoT</InterestItem>
                  </div>
                </div>
                
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <Coffee className="h-5 w-5 mr-2 text-primary" />
                    Fun Facts
                  </h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      I started coding when I was 15 years old
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      I've participated in 10+ hackathons
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      I can solve a Rubik's cube in under 2 minutes
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      I mentor junior students in programming
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      I enjoy digital art and graphic design
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  isLink?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, isLink = false }) => (
  <li className="flex flex-wrap justify-between">
    <span className="text-muted-foreground">{label}:</span>
    {isLink ? (
      <a href={`mailto:${value}`} className="text-primary hover:underline">
        {value}
      </a>
    ) : (
      <span className="font-medium">{value}</span>
    )}
  </li>
);

interface InterestItemProps {
  children: React.ReactNode;
}

const InterestItem: React.FC<InterestItemProps> = ({ children }) => (
  <div className="px-3 py-2 bg-muted rounded-md text-center text-sm">
    {children}
  </div>
);

export default About;
