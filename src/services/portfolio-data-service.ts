import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';
import { certificates } from '@/data/certificates';

interface PortfolioData {
  projects: any[];
  skills: any[];
  experiences: any[];
  certificates: any[];
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    twitter: string;
    summary: string;
    location: string;
  };
  lastUpdated: Date;
}

class PortfolioDataService {
  private data: PortfolioData | null = null;
  private listeners: Set<(data: PortfolioData) => void> = new Set();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeData();
    this.startAutoUpdate();
  }

  private initializeData(): void {
    this.data = {
      projects: projects,
      skills: skills,
      experiences: experiences,
      certificates: certificates,
      personalInfo: {
        name: "Suchandra Etti",
        title: "Full-Stack Developer & Mobile App Engineer",
        email: "snvvs369@gmail.com",
        phone: "+91 7989635988",
        github: "github.com/SnvvSuchandraEtti",
        linkedin: "linkedin.com/suchandra-etti",
        twitter: "twitter.com/snvvs369",
        location: "India",
        summary: "Final-year Computer Science and Engineering student at Aditya Engineering College with proven expertise in full-stack software development and mobile application engineering. Proficient in Flutter, ReactJS, and Java frameworks with experience delivering multiple client projects in agile environments."
      },
      lastUpdated: new Date()
    };
    this.notifyListeners();
  }

  private startAutoUpdate(): void {
    // Check for updates every 5 seconds
    this.updateInterval = setInterval(() => {
      this.checkForUpdates();
    }, 5000);
  }

  private checkForUpdates(): void {
    try {
      // Import fresh data to check for changes
      const currentProjects = projects;
      const currentSkills = skills;
      const currentExperiences = experiences;
      const currentCertificates = certificates;

      const hasChanges = 
        JSON.stringify(currentProjects) !== JSON.stringify(this.data?.projects) ||
        JSON.stringify(currentSkills) !== JSON.stringify(this.data?.skills) ||
        JSON.stringify(currentExperiences) !== JSON.stringify(this.data?.experiences) ||
        JSON.stringify(currentCertificates) !== JSON.stringify(this.data?.certificates);

      if (hasChanges && this.data) {
        console.log('Portfolio data updated, refreshing chatbot knowledge...');
        this.data = {
          ...this.data,
          projects: currentProjects,
          skills: currentSkills,
          experiences: currentExperiences,
          certificates: currentCertificates,
          lastUpdated: new Date()
        };
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Error checking for data updates:', error);
    }
  }

  private notifyListeners(): void {
    if (this.data) {
      this.listeners.forEach(listener => listener(this.data!));
    }
  }

  public getData(): PortfolioData | null {
    return this.data;
  }

  public subscribe(listener: (data: PortfolioData) => void): () => void {
    this.listeners.add(listener);
    if (this.data) {
      listener(this.data);
    }
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getFormattedKnowledge(): string {
    if (!this.data) return '';

    const { personalInfo, projects, skills, experiences, certificates } = this.data;

    return `
# Suchandra Etti - Portfolio Knowledge Base

## Personal Information
- **Name**: ${personalInfo.name}
- **Title**: ${personalInfo.title}
- **Email**: ${personalInfo.email}
- **Phone**: ${personalInfo.phone}
- **GitHub**: ${personalInfo.github}
- **LinkedIn**: ${personalInfo.linkedin}
- **Twitter**: ${personalInfo.twitter}
- **Location**: ${personalInfo.location}
- **Summary**: ${personalInfo.summary}

## Technical Skills
${skills.map(skill => `
### ${skill.category}
${skill.items.map(item => `- **${item.name}**: ${item.level}/5 proficiency${item.description ? ` - ${item.description}` : ''}`).join('\n')}
`).join('')}

## Projects
${projects.map(project => `
### ${project.title}
- **Description**: ${project.description}
- **Technologies**: ${project.technologies.join(', ')}
- **Features**: ${project.features.join(', ')}
- **GitHub**: ${project.github || 'Not available'}
- **Live Demo**: ${project.demo || 'Not available'}
- **Status**: ${project.status}
`).join('')}

## Work Experience
${experiences.map(exp => `
### ${exp.title} at ${exp.company}
- **Duration**: ${exp.duration}
- **Location**: ${exp.location}
- **Description**: ${exp.description}
- **Key Achievements**: ${exp.achievements.join(', ')}
- **Technologies**: ${exp.technologies.join(', ')}
`).join('')}

## Certifications & Achievements
${certificates.map(cert => `
### ${cert.title}
- **Issuer**: ${cert.issuer}
- **Date**: ${cert.date}
- **Description**: ${cert.description}
- **Credential**: ${cert.credentialUrl || 'Not available'}
`).join('')}

---
*Last Updated: ${this.data.lastUpdated.toLocaleString()}*
    `.trim();
  }

  public destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.listeners.clear();
  }
}

export const portfolioDataService = new PortfolioDataService();
export default portfolioDataService;