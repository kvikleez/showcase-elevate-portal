// Enhanced chat service with advanced AI capabilities and portfolio-specific knowledge
import { getChatCompletion } from './openai-service';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  type: 'text' | 'code' | 'suggestion' | 'info' | 'error';
  tokens: number;
  suggestions?: string[];
  confidence: number;
}

// Comprehensive knowledge base about Suchandra
const KNOWLEDGE_BASE = {
  personal: {
    name: "ETTI S N V V SUCHANDRA",
    email: "snvvs369@gmail.com",
    phone: "+91 7989635988",
    github: "github/SnvvSuchandraEtti",
    linkedin: "linkedin/suchandra-etti",
    twitter: "twitter.com/snvvs369",
    education: "Final-year Computer Science and Engineering student at Aditya Engineering College",
    summary: "Proven expertise in full-stack software development and mobile application engineering with experience delivering multiple client projects in agile environments"
  },

  skills: {
    technical: ["Python", "Java", "C", "CPP", "R", "HTML", "CSS", "JavaScript", "PL/SQL"],
    frameworks: ["Google Flutter", "ReactJS", "Nodejs", "Express.js", "Bootstrap"],
    databases: ["MongoDB", "Firebase", "MySQL", "Amazon Web Services(AWS)"],
    fundamentals: ["Object Oriented Programming", "Computer Networks", "DBMS", "Operating System"],
    tools: ["VS Code", "Android Studio", "GitHub", "VMware", "Blender", "Figma", "Audacity", "Davinci Resolve", "Gimp"],
    development: ["Agile", "Scrum", "Test-Driven Development", "Version Control", "API Integration"]
  },

  projects: {
    "TORI": {
      date: "March 2025",
      description: "Architected EdTech platform with RESTful APIs, increasing user engagement by 45% and supporting 10,000+ concurrent global users",
      achievements: ["95% code coverage", "30% reduction in production defects", "Automated testing frameworks"]
    },
    "ACLUB": {
      date: "January 2025",
      description: "Developed comprehensive mobile application with Firebase backend for college club management",
      achievements: ["65% efficiency improvement", "40% increase in event participation", "98% positive feedback"]
    },
    "S-TRACK": {
      date: "November 2024",
      description: "Engineered an app with role-based authentication, reducing administrative overhead by 70% while serving 18,000+ users"
    },
    "AIBG-RM": {
      date: "October 2024",
      description: "Built an web application with 95% accuracy in image processing, handling 1,000+ daily requests with 60% faster performance"
    },
    "VIGGIEMART": {
      date: "September 2024",
      description: "Engineered a farmer-to-buyer marketplace app during SIH, enabling real-time bidding for fair pricing"
    }
  },

  experience: {
    "Co-founder & Technical Lead": {
      company: "Leez",
      duration: "January 2024 - Present",
      location: "Remote",
      description: "Currently developing an innovative solution peer-to-peer marketplace revolutionizing on-demand rentals for local communities.",
      responsibilities: [
        "Leading the technical development of the marketplace platform",
        "Designing and implementing the product architecture", 
        "Making key decisions on technology stack and development roadmap",
        "Building and managing the technical team",
        "Ensuring platform scalability and user experience"
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Payment APIs", "Geolocation Services"]
    },
    "Junior Developer": {
      company: "Technical Hub",
      duration: "August 2023 - Present", 
      location: "Aditya Engineering College",
      description: "Completed intensive 12-month technical apprenticeship at Technical Hub, mastering 7+ programming languages while delivering 5 client projects with 100% satisfaction rate as Junior Developer. Implemented version control systems, CI/CD & development methodologies.",
      responsibilities: [
        "Developing client projects using various programming languages",
        "Implementing version control systems and CI/CD pipelines",
        "Collaborating with senior developers on complex features",
        "Participating in client meetings and requirement gathering",
        "Contributing to code reviews and documentation"
      ],
      technologies: ["Git", "Jenkins", "Docker", "JavaScript", "Python", "Java", "React"]
    },
    "Flutter Development Intern": {
      company: "Technical Hub",
      duration: "June 2024 - July 2024",
      location: "Aditya Engineering College", 
      description: "Engineered enterprise-class Java Application and Flutter E-commerce platform with Firebase authentication, delivering 40% performance optimization through state management while collaborating in agile environments with 95% sprint completion rate.",
      responsibilities: [
        "Developing enterprise-class Java applications",
        "Building Flutter E-commerce platform with Firebase integration",
        "Implementing state management for performance optimization",
        "Collaborating in agile development environments",
        "Participating in sprint planning and code reviews"
      ],
      technologies: ["Flutter", "Java", "Firebase", "State Management", "Git", "Android Studio"]
    },
    "Java Developer Intern": {
      company: "Technical Hub",
      duration: "April 2024 - April 2024",
      location: "Aditya Engineering College",
      description: "Architected a Java-based enterprise with multi-threaded data processing that achieved 70% efficiency improvement by interactive dashboards, and dynamic filtering, transforming complex student data into actionable insights with 60% faster retrieval rates.",
      responsibilities: [
        "Architecting Java-based enterprise applications",
        "Implementing multi-threaded data processing systems", 
        "Developing interactive dashboards with dynamic filtering",
        "Optimizing data retrieval performance",
        "Transforming complex data into actionable insights"
      ],
      technologies: ["Java", "Multi-threading", "Data Processing", "Dashboard APIs", "Performance Optimization"]
    },
    "Program Coordinator": {
      company: "Aditya University",
      duration: "January 2023 - Present",
      location: "Aditya Engineering College",
      description: "Led LEO Club technical workshops as Program Coordinator, reaching 2500+ students by implementing improved event execution by 40% while developing team collaboration through stakeholder communication and data-driven decision-making processes.",
      responsibilities: [
        "Leading technical workshops for large student audiences",
        "Coordinating with multiple stakeholders",
        "Implementing data-driven decision-making processes", 
        "Developing team collaboration strategies",
        "Managing workshop logistics and execution"
      ],
      technologies: ["Workshop Management Tools", "Data Analytics", "Presentation Software", "Collaboration Platforms"]
    },
    "Event Coordinator": {
      company: "Aditya University", 
      duration: "March 2024 - March 2024",
      location: "Aditya Engineering College",
      description: "Directed Movie Marathon managing 15 volunteers and technical logistics for 24-hour screenings, increasing attendance by 35% through strategic digital marketing, budget allocation, vendor negotiations, and real-time analytic tracking for optimization.",
      responsibilities: [
        "Planning and coordinating all aspects of the movie marathon event",
        "Managing a team of 15 volunteers",
        "Implementing strategic digital marketing campaigns",
        "Handling budget allocation and vendor negotiations", 
        "Setting up real-time analytic tracking systems"
      ],
      technologies: ["Event Planning Tools", "Digital Marketing Platforms", "Analytics Tools", "Budget Management Systems"]
    }
  },

  achievements: [
    "AWS Certified Cloud Practitioner",
    "Postman API Fundamentals Student Expert",
    "Solved 500+ Questions in Leetcode, GFG, CodeChef and HackerRank",
    "Globally ranked in top 5% of competitive contests, placing among top 5000",
    "College representative at multiple institutions for hackathons and technical events"
  ]
};

// Advanced response patterns with context awareness
const RESPONSE_PATTERNS = {
  greeting: [
    "Hello! I'm excited to help you learn about Suchandra's impressive portfolio. What would you like to explore?",
    "Hi there! Suchandra has quite a remarkable background in tech. What specific area interests you?",
    "Welcome! I'm here to showcase Suchandra's journey from student to accomplished developer. How can I help?"
  ],

  projects: [
    "Suchandra has worked on some fascinating projects! Here are the highlights:",
    "Let me walk you through Suchandra's impressive project portfolio:",
    "These projects really showcase Suchandra's versatility and technical depth:"
  ],

  skills: [
    "Suchandra's technical expertise spans multiple domains:",
    "Here's a comprehensive overview of Suchandra's technical capabilities:",
    "Suchandra has built a robust skill set across the full technology stack:"
  ],

  contact: [
    "You can reach out to Suchandra through several channels:",
    "Here's how to connect with Suchandra for opportunities:",
    "Suchandra is actively looking for new opportunities. Contact details:"
  ]
};

// AI reasoning engine for contextual responses
class AIReasoningEngine {
  private context: string[] = [];
  private userIntent: string = '';
  private confidence: number = 0;

  analyzeIntent(message: string): string {
    const msg = message.toLowerCase();
    
    // Out-of-scope questions that should be handled naturally
    if (msg.includes('time') || msg.includes('weather') || msg.includes('age') || 
        msg.includes('birthday') || msg.includes('location') || msg.includes('where') ||
        msg.includes('when') || msg.includes('how old') || msg.includes('married') ||
        msg.includes('family') || msg.includes('personal') || msg.includes('date')) {
      return 'out-of-scope';
    }
    
    // Experience-related keywords - Check this BEFORE projects to avoid conflicts
    if (msg.includes('experience') || msg.includes('internship') || msg.includes('job') || 
        msg.includes('work experience') || msg.includes('career') || msg.includes('employment')) {
      return 'experience';
    }
    
    // Project-related keywords
    if (msg.includes('project') || msg.includes('build') || msg.includes('develop') || msg.includes('app')) {
      return 'projects';
    }
    
    // Skill-related keywords
    if (msg.includes('skill') || msg.includes('technology') || msg.includes('language') || msg.includes('framework')) {
      return 'skills';
    }
    
    // Contact-related keywords
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('reach') || msg.includes('email')) {
      return 'contact';
    }
    
    // Code-related keywords
    if (msg.includes('code') || msg.includes('github') || msg.includes('repository') || msg.includes('example')) {
      return 'code';
    }
    
    // Greeting keywords
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('start')) {
      return 'greeting';
    }
    
    return 'general';
  }

  async generateResponse(intent: string, specificQuery?: string): Promise<ChatResponse> {
    let response = '';
    let suggestions: string[] = [];
    let type: 'text' | 'code' | 'suggestion' | 'info' = 'text';
    
    switch (intent) {
      case 'greeting':
        response = this.getRandomResponse(RESPONSE_PATTERNS.greeting);
        suggestions = ['Show me projects', 'What are your skills?', 'Tell me about experience', 'How to contact?'];
        type = 'suggestion';
        break;
        
      case 'projects':
        response = this.generateProjectsResponse(specificQuery);
        suggestions = ['Tell me about TORI project', 'Show ACLUB details', 'What about S-TRACK?'];
        type = 'info';
        break;
        
      case 'skills':
        response = this.generateSkillsResponse();
        suggestions = ['Show programming languages', 'What frameworks do you know?', 'Tell me about databases'];
        type = 'info';
        break;
        
      case 'contact':
        response = this.generateContactResponse();
        suggestions = ['Open GitHub profile', 'View LinkedIn', 'Send email'];
        type = 'info';
        break;
        
      case 'experience':
        response = this.generateExperienceResponse();
        suggestions = ['Tell me about internships', 'What did you achieve?', 'Show certifications'];
        type = 'info';
        break;
        
      case 'code':
        response = this.generateCodeResponse();
        suggestions = ['Show GitHub repositories', 'What languages do you use?', 'Any open source contributions?'];
        type = 'code';
        break;
        
      case 'out-of-scope':
        response = await this.generateOutOfScopeResponse(specificQuery || '');
        suggestions = ['Tell me about Suchandra\'s projects', 'What are his skills?', 'How to contact him?'];
        type = 'text';
        break;
        
      default:
        response = this.generateGeneralResponse(specificQuery || '');
        suggestions = ['Tell me about projects', 'Show technical skills', 'Contact information', 'Work experience'];
        type = 'suggestion';
    }
    
    return {
      message: response,
      type,
      tokens: Math.floor(response.length / 4), // Rough token estimation
      suggestions,
      confidence: this.confidence
    };
  }

  private getRandomResponse(patterns: string[]): string {
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  private generateProjectsResponse(query?: string): string {
    const projects = KNOWLEDGE_BASE.projects;
    
    if (query && query.toLowerCase().includes('tori')) {
      const tori = projects.TORI;
      return `🚀 **TORI (Edu-tech App)** - ${tori.date}\n\n${tori.description}\n\n**Key Achievements:**\n${tori.achievements.map(a => `• ${a}`).join('\n')}\n\nThis project demonstrates Suchandra's ability to build scalable educational platforms that serve thousands of users globally.`;
    }
    
    if (query && query.toLowerCase().includes('aclub')) {
      const aclub = projects.ACLUB;
      return `📱 **ACLUB (College Clubs Management App)** - ${aclub.date}\n\n${aclub.description}\n\n**Key Achievements:**\n${aclub.achievements.map(a => `• ${a}`).join('\n')}\n\nThis showcases Suchandra's expertise in mobile development and user experience design.`;
    }
    
    // General projects overview
    return `${this.getRandomResponse(RESPONSE_PATTERNS.projects)}\n\n` +
      Object.entries(projects).map(([name, details]) => 
        `🔹 **${name}** (${details.date})\n   ${details.description}\n`
      ).join('\n') +
      `\n💡 These projects demonstrate Suchandra's versatility across web development, mobile apps, AI, and marketplace solutions. Each project solved real-world problems with measurable impact!`;
  }

  private generateSkillsResponse(): string {
    const skills = KNOWLEDGE_BASE.skills;
    
    return `${this.getRandomResponse(RESPONSE_PATTERNS.skills)}\n\n` +
      `**💻 Programming Languages:**\n${skills.technical.join(', ')}\n\n` +
      `**🛠️ Frameworks & Libraries:**\n${skills.frameworks.join(', ')}\n\n` +
      `**🗄️ Databases & Cloud:**\n${skills.databases.join(', ')}\n\n` +
      `**🔧 Developer Tools:**\n${skills.tools.slice(0, 5).join(', ')} and more\n\n` +
      `**📚 CS Fundamentals:**\n${skills.fundamentals.join(', ')}\n\n` +
      `Suchandra has consistently improved application performance by 20% while reducing development cycles through efficient code optimization.`;
  }

  private generateContactResponse(): string {
    const personal = KNOWLEDGE_BASE.personal;
    
    return `${this.getRandomResponse(RESPONSE_PATTERNS.contact)}\n\n` +
      `📧 **Email:** ${personal.email}\n` +
      `📱 **Phone:** ${personal.phone}\n` +
      `💼 **LinkedIn:** ${personal.linkedin}\n` +
      `🐙 **GitHub:** ${personal.github}\n` +
      `🐦 **Twitter:** ${personal.twitter}\n\n` +
      `🎯 Suchandra is currently open to internship and full-time opportunities in software development, particularly in full-stack and mobile development roles.\n\n` +
      `💼 Ready to deliver measurable business impact through user-centric design and data-driven optimization strategies.`;
  }

  private generateExperienceResponse(): string {
    const experience = KNOWLEDGE_BASE.experience;
    
    return `Here's Suchandra's professional journey:\n\n` +
      Object.entries(experience).map(([role, details]) => 
        `🏢 **${role}** at ${details.company}\n` +
        `📅 ${details.duration}\n` +
        `📍 ${details.location}\n` +
        `📋 ${details.description}\n\n` +
        `**Key Responsibilities:**\n` +
        `${details.responsibilities.slice(0, 3).map(r => `• ${r}`).join('\n')}\n\n` +
        `**Technologies:** ${details.technologies.join(', ')}\n`
      ).join('\n\n') +
      `\n🏆 **Key Achievements:**\n` +
      KNOWLEDGE_BASE.achievements.slice(0, 3).map(a => `• ${a}`).join('\n') +
      `\n\n💪 Suchandra excels in cross-functional team collaboration and consistently meets critical deadlines while delivering high-quality solutions.`;
  }

  private generateCodeResponse(): string {
    return `🔍 **Suchandra's Code & Development:**\n\n` +
      `**🐙 GitHub:** ${KNOWLEDGE_BASE.personal.github}\n` +
      `**💻 Primary Languages:** Python, Java, JavaScript, Flutter/Dart\n` +
      `**🏗️ Architecture Experience:** RESTful APIs, Microservices, Real-time Systems\n\n` +
      `**📊 Coding Achievements:**\n` +
      `• 500+ problems solved across LeetCode, GeeksforGeeks, CodeChef, HackerRank\n` +
      `• Top 5% globally in competitive programming contests\n` +
      `• 95% code coverage in testing frameworks\n` +
      `• Implemented CI/CD practices and version control\n\n` +
      `**🚀 Recent Code Highlights:**\n` +
      `• EdTech platform supporting 10,000+ concurrent users\n` +
      `• AI-powered image processing with 95% accuracy\n` +
      `• Real-time bidding marketplace application\n\n` +
      `Check out the GitHub profile for detailed code examples and project repositories!`;
  }

  private async generateOutOfScopeResponse(query: string): Promise<string> {
    try {
      // Use OpenAI for general questions not related to Suchandra's portfolio
      const systemPrompt = `You are a helpful AI assistant. The user is asking a general question that's not related to a specific person's portfolio or career. Please provide a helpful and informative response. Keep your response conversational and informative.`;
      
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ];
      
      const aiResponse = await getChatCompletion(messages);
      return aiResponse;
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to original behavior if OpenAI fails
      const responses = [
        "I'm Suchandra's portfolio assistant, but I can try to help with general questions too! However, I'm experiencing some technical difficulties right now. What would you like to know about Suchandra's projects or skills?",
        "I'd love to help with that, but I'm having some connectivity issues. In the meantime, would you like to learn about Suchandra's amazing tech projects?",
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  private generateGeneralResponse(query: string): string {
    // Analyze query for specific topics
    if (query.toLowerCase().includes('achievement')) {
      return `🏆 **Suchandra's Key Achievements:**\n\n` +
        KNOWLEDGE_BASE.achievements.map(a => `• ${a}`).join('\n') +
        `\n\nThese accomplishments demonstrate consistent excellence and continuous learning in the tech field.`;
    }
    
    if (query.toLowerCase().includes('education')) {
      return `🎓 **Education Background:**\n\n` +
        `**Current:** ${KNOWLEDGE_BASE.personal.education}\n\n` +
        `**Academic Focus:** Computer Science & Engineering with specialization in:\n` +
        `• Software Development & Architecture\n` +
        `• Mobile Application Engineering\n` +
        `• AI/ML Implementation\n` +
        `• Cloud Services Integration\n\n` +
        `Suchandra has been actively involved in hackathons and technical events, representing the college at multiple institutions.`;
    }
    
    // Default comprehensive response
    return `Hey! I'm here to help you learn about Suchandra's tech journey. 🚀\n\n` +
      `**Quick Overview:**\n` +
      `• ${KNOWLEDGE_BASE.personal.summary}\n` +
      `• Currently: ${KNOWLEDGE_BASE.personal.education}\n` +
      `• Expertise: Full-stack development, Mobile apps, AI implementation\n\n` +
      `**What I can help you discover:**\n` +
      `🔹 **Projects:** Innovative solutions with measurable impact\n` +
      `🔹 **Skills:** Comprehensive technical expertise\n` +
      `🔹 **Experience:** Professional internships and achievements\n` +
      `🔹 **Contact:** How to connect for opportunities\n\n` +
      `What would you like to explore first?`;
  }
}

export async function enhancedChatCompletion(messages: ChatMessage[]): Promise<ChatResponse> {
  // Simulate network delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  const engine = new AIReasoningEngine();
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  
  if (!lastUserMessage) {
    return {
      message: "I'm here to help you learn about Suchandra's portfolio. What would you like to know?",
      type: 'suggestion',
      tokens: 20,
      suggestions: ['Tell me about projects', 'Show technical skills', 'Contact information'],
      confidence: 1.0
    };
  }
  
  const intent = engine.analyzeIntent(lastUserMessage.content);
  return engine.generateResponse(intent, lastUserMessage.content);
}