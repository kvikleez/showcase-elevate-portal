
import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  BookOpen, Award, User, Star, Heart, Coffee, 
  MapPin, Mail, Phone, Github, Linkedin, Twitter,
  Code, Database, Cloud, Monitor, Settings, 
  Calendar, Building, Trophy, CheckCircle, Users,
  Briefcase, GraduationCap, Target, Globe
} from 'lucide-react';

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

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6">
                Hi, I'm <span className="text-gradient">ETTI S N V V SUCHANDRA</span>
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Final-year Computer Science and Engineering student at Aditya Engineering College with proven expertise in full-stack software development and mobile application engineering. Proficient in Flutter, ReactJS, and Java frameworks with experience delivering multiple client projects in agile environments.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Consistently improved application performance by 20% while reducing development cycles through efficient code optimization. Strong algorithmic abilities with expertise in debugging complex systems and implementing continuous integration/continuous deployment (CI/CD) practices. Excels in cross-functional team collaboration to meet critical deadlines.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ContactCard 
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value="snvvs369@gmail.com"
                link="mailto:snvvs369@gmail.com"
              />
              <ContactCard 
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                value="+91 7989635988"
                link="tel:+917989635988"
              />
              <ContactCard 
                icon={<Github className="h-5 w-5" />}
                label="GitHub"
                value="SnvvSuchandraEtti"
                link="https://github.com/SnvvSuchandraEtti"
              />
              <ContactCard 
                icon={<Linkedin className="h-5 w-5" />}
                label="LinkedIn"
                value="suchandra-etti"
                link="https://linkedin.com/in/suchandra-etti"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Code className="h-6 w-6 mr-3 text-primary" />
                  Technologies & Skills
                </h3>
                
                <div className="space-y-6">
                  <SkillCategory
                    title="Technical Skills"
                    icon={<Monitor className="h-5 w-5" />}
                    skills={["Python", "Java", "C", "C++", "R", "HTML", "CSS", "JavaScript", "PL/SQL"]}
                  />
                  
                  <SkillCategory
                    title="Frameworks & Libraries"
                    icon={<Settings className="h-5 w-5" />}
                    skills={["Google Flutter", "ReactJS", "Node.js", "Express.js", "Bootstrap"]}
                  />
                  
                  <SkillCategory
                    title="Databases & Cloud"
                    icon={<Database className="h-5 w-5" />}
                    skills={["MongoDB", "Firebase", "MySQL", "Amazon Web Services (AWS)"]}
                  />
                  
                  <SkillCategory
                    title="Developer Tools"
                    icon={<Code className="h-5 w-5" />}
                    skills={["VS Code", "Android Studio", "GitHub", "VMware", "Blender", "Figma", "Audacity", "DaVinci Resolve", "GIMP"]}
                  />
                </div>
              </motion.div>

              {/* Project Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 mr-3 text-primary" />
                  Project Experience
                </h3>
                
                <div className="space-y-6">
                  <ProjectCard
                    title="TORI (Edu-tech App)"
                    date="March 2025"
                    description="Architected EdTech platform with RESTful APIs, increasing user engagement by 45% and supporting 10,000+ concurrent global users."
                    achievements={[
                      "Optimized application performance through state management implementation",
                      "Launched automated testing frameworks achieving 95% code coverage",
                      "Reduced production defects by 30%"
                    ]}
                  />
                  
                  <ProjectCard
                    title="ACLUB (College Clubs Management App)"
                    date="January 2025"
                    description="Developed comprehensive mobile application with Firebase backend for college club management."
                    achievements={[
                      "Increased administrative workflow efficiency by 65%",
                      "Boosted event participation rates by 40%",
                      "Achieved 98% positive feedback from users"
                    ]}
                  />
                  
                  <ProjectCard
                    title="S-TRACK (Students & Staff Profile Tracking)"
                    date="November 2024"
                    description="Engineered an app with role-based authentication serving 18,000+ users."
                    achievements={[
                      "Reduced administrative overhead by 70%",
                      "Implemented secure role-based access control"
                    ]}
                  />
                  
                  <ProjectCard
                    title="AIBG-RM (AI Background Remover)"
                    date="October 2024"
                    description="Built a web application with 95% accuracy in image processing."
                    achievements={[
                      "Handles 1,000+ daily requests",
                      "Achieved 60% faster performance"
                    ]}
                  />
                  
                  <ProjectCard
                    title="VIGGIEMART (Direct Farmer-Buyer App)"
                    date="September 2024"
                    description="Engineered a farmer-to-buyer marketplace app during SIH, enabling real-time bidding for fair pricing on vegetables and rice."
                    achievements={[
                      "Real-time bidding system implementation",
                      "Fair pricing mechanism for farmers"
                    ]}
                  />
                </div>
              </motion.div>

              {/* Work Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Building className="h-6 w-6 mr-3 text-primary" />
                  Work Experience
                </h3>
                
                <div className="space-y-6">
                  <ExperienceCard
                    title="Flutter Internship"
                    company="Technical Hub"
                    duration="June - July 2024"
                    mentors="Venkata Krishna sir, Vasanth sir"
                    description="Engineered enterprise-class Java Application and Flutter E-commerce platform with Firebase authentication, delivering 40% performance optimization through state management while collaborating in agile environments with 95% sprint completion rate."
                  />
                  
                  <ExperienceCard
                    title="Java Internship"
                    company="Technical Hub"
                    duration="April 2024"
                    mentors="Pavan sir"
                    description="Architected a Java-based enterprise with multi-threaded data processing that achieved 70% efficiency improvement by interactive dashboards, and dynamic filtering, transforming complex student data into actionable insights with 60% faster retrieval rates."
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Education */}
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" /> 
                    Education
                  </h4>
                  <div className="space-y-4">
                    <EducationItem
                      degree="B.Tech - Computer Science & Engineering"
                      institution="Aditya Engineering College"
                      duration="2022-Present"
                    />
                    <EducationItem
                      degree="Intermediate - PCM"
                      institution="Aditya Junior College"
                      duration="2021-22"
                    />
                    <EducationItem
                      degree="SSC"
                      institution="Mandapeta Public School"
                      duration="2020"
                    />
                  </div>
                </div>

                {/* Personal Info */}
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" /> 
                    Personal Info
                  </h4>
                  <ul className="space-y-3">
                    <InfoItem label="Languages" value="Telugu (Native), English (Professional), Hindi (Intermediate)" />
                  </ul>
                </div>

                {/* Achievements */}
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-primary" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>AWS Certified Cloud Practitioner</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Solved 500+ coding problems on LeetCode, GFG, CodeChef</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Top 5% globally in competitive contests</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>College representative at 6+ institutions</span>
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="glass-effect p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <Coffee className="h-5 w-5 mr-2 text-primary" />
                    Leadership & Activities
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Led LEO Club technical workshops as Program Coordinator
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Directed 'Movie Marathon' managing 15 volunteers
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Currently developing peer-to-peer marketplace 'Leez'
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      12-month technical apprenticeship at Technical Hub
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

// Component interfaces and implementations
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, label, value, link }) => (
  <a 
    href={link} 
    target={link.startsWith('http') ? '_blank' : undefined}
    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="glass-effect p-4 rounded-xl hover:bg-white/[0.14] transition-all duration-300 block"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-primary/20 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-sm">{value}</p>
      </div>
    </div>
  </a>
);

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => (
  <div className="glass-effect p-6 rounded-xl">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 rounded-md bg-primary/20 text-primary">
        {icon}
      </div>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span 
          key={index}
          className="px-3 py-1 bg-muted rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  achievements: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, date, description, achievements }) => (
  <div className="glass-effect p-6 rounded-xl">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
      <h4 className="text-lg font-semibold">{title}</h4>
      <span className="text-sm text-muted-foreground mt-1 md:mt-0">{date}</span>
    </div>
    <p className="text-muted-foreground mb-4">{description}</p>
    <ul className="space-y-2">
      {achievements.map((achievement, index) => (
        <li key={index} className="flex items-start gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  mentors?: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, duration, mentors, description }) => (
  <div className="glass-effect p-6 rounded-xl">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
      <h4 className="text-lg font-semibold">{title}</h4>
      <span className="text-sm text-muted-foreground mt-1 md:mt-0">{duration}</span>
    </div>
    <p className="text-primary font-medium mb-1">{company}</p>
    {mentors && (
      <p className="text-sm text-muted-foreground mb-4">Mentors: {mentors}</p>
    )}
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface EducationItemProps {
  degree: string;
  institution: string;
  duration: string;
}

const EducationItem: React.FC<EducationItemProps> = ({ degree, institution, duration }) => (
  <div className="border-l-2 border-primary/30 pl-4">
    <h5 className="font-medium text-sm">{degree}</h5>
    <p className="text-muted-foreground text-sm">{institution}</p>
    <p className="text-xs text-muted-foreground">{duration}</p>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string;
  isLink?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, isLink = false }) => (
  <li className="flex flex-col gap-1">
    <span className="text-muted-foreground text-sm">{label}:</span>
    {isLink ? (
      <a href={`mailto:${value}`} className="text-primary hover:underline text-sm">
        {value}
      </a>
    ) : (
      <span className="font-medium text-sm">{value}</span>
    )}
  </li>
);

export default About;
