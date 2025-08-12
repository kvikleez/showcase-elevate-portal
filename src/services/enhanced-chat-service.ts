// Enhanced chat service with real-time portfolio data integration and advanced AI capabilities
import portfolioDataService from './portfolio-data-service';

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

// Enhanced AI reasoning engine with real-time data integration
class EnhancedAIEngine {
  private context: string[] = [];
  private userIntent: string = '';
  private confidence: number = 0;
  private portfolioData: any = null;

  constructor() {
    this.initializeData();
    this.subscribeToUpdates();
  }

  private initializeData(): void {
    this.portfolioData = portfolioDataService.getData();
  }

  private subscribeToUpdates(): void {
    portfolioDataService.subscribe((data) => {
      this.portfolioData = data;
      console.log('🤖 Chatbot updated with latest portfolio data');
    });
  }

  analyzeIntent(message: string): string {
    const msg = message.toLowerCase();
    
    // Advanced intent analysis with better keyword matching
    if (msg.match(/\b(project|work|build|develop|create|tori|aclub|track|marketplace|app)\b/)) {
      return 'projects';
    }
    
    if (msg.match(/\b(skill|technology|language|framework|programming|tech|stack|flutter|react|java|python)\b/)) {
      return 'skills';
    }
    
    if (msg.match(/\b(contact|hire|reach|email|phone|linkedin|github|connect|opportunity)\b/)) {
      return 'contact';
    }
    
    if (msg.match(/\b(experience|internship|work|job|career|employment|technical hub)\b/)) {
      return 'experience';
    }
    
    if (msg.match(/\b(certificate|certification|achievement|award|aws|achievement|leetcode)\b/)) {
      return 'achievements';
    }
    
    if (msg.match(/\b(education|college|university|degree|student|academic)\b/)) {
      return 'education';
    }

    if (msg.match(/\b(code|github|repository|example|programming|source)\b/)) {
      return 'code';
    }
    
    if (msg.match(/\b(hello|hi|hey|start|help|about|who)\b/)) {
      return 'greeting';
    }
    
    return 'general';
  }

  generateResponse(intent: string, userMessage?: string): ChatResponse {
    if (!this.portfolioData) {
      return {
        message: "🔄 Loading Suchandra's latest portfolio data... Please try again in a moment.",
        type: 'info',
        tokens: 15,
        suggestions: ['Tell me about projects', 'Show skills', 'Contact info'],
        confidence: 0.5
      };
    }

    const { personalInfo, projects, skills, experiences, certificates } = this.portfolioData;
    let response = '';
    let suggestions: string[] = [];
    let type: 'text' | 'code' | 'suggestion' | 'info' = 'text';
    this.confidence = 0.95;
    
    switch (intent) {
      case 'greeting':
        response = `👋 Hello! I'm Suchandra's AI assistant with real-time portfolio updates.\n\n**${personalInfo.name}** - ${personalInfo.title}\n\n${personalInfo.summary}\n\n🚀 **What I can help you discover:**\n• 📱 **${projects.length} Innovative Projects** with measurable impact\n• 💻 **${skills.length} Technical Skill Categories** across the full stack\n• 💼 **${experiences.length} Professional Experiences** and internships\n• 🏆 **${certificates.length} Certifications** and achievements\n• 📞 **Contact Information** for opportunities\n\nWhat would you like to explore first?`;
        suggestions = ['Show me projects', 'What are your skills?', 'Tell me about experience', 'How to contact?'];
        type = 'suggestion';
        break;
        
      case 'projects':
        response = this.generateProjectsResponse(userMessage, projects);
        suggestions = ['Tell me about TORI', 'Show ACLUB details', 'What about S-TRACK?', 'View all projects'];
        type = 'info';
        break;
        
      case 'skills':
        response = this.generateSkillsResponse(skills);
        suggestions = ['Show programming languages', 'What frameworks?', 'Database experience', 'Development tools'];
        type = 'info';
        break;
        
      case 'contact':
        response = this.generateContactResponse(personalInfo);
        suggestions = ['View GitHub profile', 'Connect on LinkedIn', 'Send email', 'Check Twitter'];
        type = 'info';
        break;
        
      case 'experience':
        response = this.generateExperienceResponse(experiences);
        suggestions = ['Internship details', 'Technical achievements', 'Show certifications', 'Career timeline'];
        type = 'info';
        break;

      case 'achievements':
        response = this.generateAchievementsResponse(certificates);
        suggestions = ['AWS certification', 'Coding achievements', 'Competition rankings', 'All certifications'];
        type = 'info';
        break;

      case 'education':
        response = this.generateEducationResponse(personalInfo);
        suggestions = ['Academic projects', 'College activities', 'Technical skills', 'Current status'];
        type = 'info';
        break;
        
      case 'code':
        response = this.generateCodeResponse(personalInfo, projects);
        suggestions = ['GitHub repositories', 'Programming languages', 'Code examples', 'Open source work'];
        type = 'code';
        break;
        
      default:
        response = this.generateGeneralResponse(userMessage || '', personalInfo);
        suggestions = ['Tell me about projects', 'Show technical skills', 'Contact information', 'Work experience'];
        type = 'suggestion';
    }
    
    return {
      message: response,
      type,
      tokens: Math.floor(response.length / 4),
      suggestions,
      confidence: this.confidence
    };
  }

  private generateProjectsResponse(query: string = '', projects: any[]): string {
    if (query && query.toLowerCase().includes('tori')) {
      const tori = projects.find(p => p.title.toLowerCase().includes('tori'));
      if (tori) {
        return `🚀 **${tori.title}** - ${tori.status}\n\n📋 **Description:** ${tori.description}\n\n🛠️ **Technologies:** ${tori.technologies.join(', ')}\n\n✨ **Key Features:**\n${tori.features.map((f: string) => `• ${f}`).join('\n')}\n\n${tori.github ? `🔗 **GitHub:** ${tori.github}` : ''}${tori.demo ? `\n🌐 **Live Demo:** ${tori.demo}` : ''}\n\nThis project demonstrates Suchandra's ability to build scalable educational platforms!`;
      }
    }
    
    if (query && query.toLowerCase().includes('aclub')) {
      const aclub = projects.find(p => p.title.toLowerCase().includes('aclub'));
      if (aclub) {
        return `📱 **${aclub.title}** - ${aclub.status}\n\n📋 **Description:** ${aclub.description}\n\n🛠️ **Technologies:** ${aclub.technologies.join(', ')}\n\n✨ **Key Features:**\n${aclub.features.map((f: string) => `• ${f}`).join('\n')}\n\n${aclub.github ? `🔗 **GitHub:** ${aclub.github}` : ''}${aclub.demo ? `\n🌐 **Live Demo:** ${aclub.demo}` : ''}\n\nShowcases expertise in mobile development and user experience design!`;
      }
    }
    
    // General projects overview with real-time data
    return `🚀 **Suchandra's Project Portfolio** (Updated: ${this.portfolioData.lastUpdated.toLocaleDateString()})\n\n` +
      projects.map((project: any) => 
        `🔹 **${project.title}** (${project.status})\n   📋 ${project.description}\n   🛠️ ${project.technologies.slice(0, 3).join(', ')}\n`
      ).join('\n') +
      `\n💡 **Portfolio Highlights:**\n• ${projects.length} innovative projects with measurable impact\n• Full-stack development across web and mobile\n• AI/ML integration and cloud deployment\n• Real-world problem solving with user-centric design\n\n📊 All projects demonstrate significant performance improvements and user engagement!`;
  }

  private generateSkillsResponse(skills: any[]): string {
    return `💻 **Suchandra's Technical Expertise** (Live Updated)\n\n` +
      skills.map((category: any) => {
        const topSkills = category.items.slice(0, 4).map((item: any) => 
          `${item.name} (${item.level}/5)`
        ).join(', ');
        return `**${category.category}:**\n${topSkills}${category.items.length > 4 ? ` +${category.items.length - 4} more` : ''}\n`;
      }).join('\n') +
      `\n🎯 **Specializations:**\n• Full-stack development with modern frameworks\n• Mobile app development (Flutter/React Native)\n• Cloud services and deployment (AWS certified)\n• AI/ML implementation and optimization\n• Database design and management\n\n📈 Consistently delivers 20% performance improvements while reducing development cycles!`;
  }

  private generateContactResponse(personalInfo: any): string {
    return `📞 **Connect with Suchandra** (Ready for New Opportunities)\n\n` +
      `📧 **Email:** ${personalInfo.email}\n` +
      `📱 **Phone:** ${personalInfo.phone}\n` +
      `💼 **LinkedIn:** ${personalInfo.linkedin}\n` +
      `🐙 **GitHub:** ${personalInfo.github}\n` +
      `🐦 **Twitter:** ${personalInfo.twitter}\n` +
      `📍 **Location:** ${personalInfo.location}\n\n` +
      `🎯 **Current Status:** Final-year student actively seeking:\n` +
      `• Full-time software development positions\n` +
      `• Internship opportunities in tech companies\n` +
      `• Freelance and consulting projects\n` +
      `• Open source collaboration\n\n` +
      `💪 **Ready to deliver:** User-centric solutions with measurable business impact!`;
  }

  private generateExperienceResponse(experiences: any[]): string {
    return `💼 **Suchandra's Professional Journey**\n\n` +
      experiences.map((exp: any) => 
        `🏢 **${exp.title}** at ${exp.company}\n` +
        `📅 ${exp.duration} | 📍 ${exp.location}\n` +
        `📋 ${exp.description}\n` +
        `🎯 **Key Achievements:** ${exp.achievements.slice(0, 2).join(', ')}\n` +
        `🛠️ **Technologies:** ${exp.technologies.join(', ')}\n`
      ).join('\n') +
      `\n🚀 **Professional Highlights:**\n• Agile development with 95% sprint completion rates\n• Cross-functional team collaboration\n• Performance optimization and code quality focus\n• Client satisfaction and project delivery excellence\n\n💡 Proven track record of exceeding expectations in fast-paced environments!`;
  }

  private generateAchievementsResponse(certificates: any[]): string {
    return `🏆 **Suchandra's Achievements & Certifications**\n\n` +
      `**🎖️ Professional Certifications:**\n` +
      certificates.map((cert: any) => `• **${cert.title}** - ${cert.issuer} (${cert.date})`).join('\n') +
      `\n\n**💻 Coding Achievements:**\n` +
      `• 500+ problems solved (LeetCode, GeeksforGeeks, CodeChef, HackerRank)\n` +
      `• Top 5% globally in competitive programming contests\n` +
      `• College representative at multiple technical events\n` +
      `• Multiple hackathon participations and wins\n\n` +
      `**📈 Performance Metrics:**\n` +
      `• 95% code coverage in testing frameworks\n` +
      `• 30% reduction in production defects\n` +
      `• 70% improvement in administrative efficiency\n` +
      `• 40% increase in user engagement across projects\n\n` +
      `🎯 Continuous learner with a passion for technical excellence!`;
  }

  private generateEducationResponse(personalInfo: any): string {
    return `🎓 **Educational Background**\n\n` +
      `**Current:** Final-year Computer Science & Engineering\n` +
      `🏫 **Institution:** Aditya Engineering College (2022-Present)\n\n` +
      `**📚 Academic Focus:**\n` +
      `• Software Engineering & System Design\n` +
      `• Mobile Application Development\n` +
      `• Artificial Intelligence & Machine Learning\n` +
      `• Cloud Computing & DevOps\n` +
      `• Database Management & Optimization\n\n` +
      `**🎯 Extracurricular Excellence:**\n` +
      `• Technical workshops and leadership roles\n` +
      `• College representative at major institutions\n` +
      `• Event management and team coordination\n` +
      `• Community engagement and mentoring\n\n` +
      `**🚀 Current Status:** Ready to transition from academic excellence to professional impact!`;
  }

  private generateCodeResponse(personalInfo: any, projects: any[]): string {
    return `💻 **Code & Development Portfolio**\n\n` +
      `**🐙 GitHub Profile:** ${personalInfo.github}\n` +
      `**🔧 Primary Tech Stack:** Flutter, React, Java, Python, Node.js\n` +
      `**🏗️ Architecture:** RESTful APIs, Microservices, Real-time Systems\n\n` +
      `**📊 Coding Metrics:**\n` +
      `• ${projects.length} production-ready applications\n` +
      `• 500+ algorithm problems solved\n` +
      `• 95% test coverage maintained\n` +
      `• CI/CD pipelines implemented\n\n` +
      `**🚀 Recent Code Highlights:**\n` +
      projects.slice(0, 3).map((p: any) => `• **${p.title}**: ${p.description.substring(0, 80)}...`).join('\n') +
      `\n\n**🔍 Code Quality Focus:**\n` +
      `• Clean architecture principles\n` +
      `• Test-driven development\n` +
      `• Performance optimization\n` +
      `• Security best practices\n\n` +
      `💡 Check the GitHub profile for detailed implementations and documentation!`;
  }

  private generateGeneralResponse(query: string, personalInfo: any): string {
    return `🤖 **Suchandra's AI Portfolio Assistant** (Real-time Updates)\n\n` +
      `I'm here to showcase **${personalInfo.name}**'s impressive journey in tech!\n\n` +
      `**🎯 Quick Overview:**\n` +
      `• ${personalInfo.title}\n` +
      `• ${personalInfo.summary}\n` +
      `• Currently: Final-year CS student at Aditya Engineering College\n\n` +
      `**🚀 What makes Suchandra special:**\n` +
      `• Proven track record with ${this.portfolioData.projects.length} successful projects\n` +
      `• Full-stack expertise across ${this.portfolioData.skills.length} technology categories\n` +
      `• Real-world impact: 10,000+ users served, 70% efficiency improvements\n` +
      `• AWS certified with top 5% competitive programming ranking\n\n` +
      `**💡 I can help you explore:**\n` +
      `🔹 **Innovative Projects** with measurable business impact\n` +
      `🔹 **Technical Skills** across the full development stack\n` +
      `🔹 **Professional Experience** and internship achievements\n` +
      `🔹 **Certifications** and competitive programming success\n` +
      `🔹 **Contact Information** for collaboration opportunities\n\n` +
      `*Data automatically updates when portfolio changes!*\n\nWhat interests you most?`;
  }
}

async function callAIAPI(messages: ChatMessage[]): Promise<string> {
  try {
    console.log('🔄 Attempting AI API call with messages:', messages.length);
    
    const response = await fetch('https://pnhlgkoxsgxhiyesbtqh.supabase.co/functions/v1/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('📡 AI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ AI API error response:', errorText);
      throw new Error(`API call failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ AI API response data:', data);
    
    return data.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error('💥 AI API call error:', error);
    throw error;
  }
}

// Global instance with real-time updates
const enhancedEngine = new EnhancedAIEngine();

export async function enhancedChatCompletion(messages: ChatMessage[]): Promise<ChatResponse> {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  
  if (!lastUserMessage) {
    return {
      message: "Hello! I'm Suchandra's AI assistant. I can help you learn about projects, skills, experience, and more. What would you like to know?",
      type: 'suggestion',
      tokens: 25,
      suggestions: [
        "Show me recent projects",
        "What are the key skills?", 
        "Tell me about work experience",
        "Any certifications?"
      ],
      confidence: 1.0
    };
  }
  
  // Try AI-powered response first, fall back to local knowledge
  try {
    console.log('🚀 Calling AI API for user message:', lastUserMessage.content);
    const aiResponse = await callAIAPI(messages);
    console.log('🎯 AI Response received:', aiResponse.substring(0, 100) + '...');
    
    // Check if AI response is a valid response (not an error message)
    const errorMessages = [
      'technical difficulties',
      'AI services are not configured',
      'experiencing technical difficulties',
      'Please try again',
      'contact the administrator'
    ];
    
    const isValidAIResponse = aiResponse && !errorMessages.some(errorMsg => 
      aiResponse.toLowerCase().includes(errorMsg.toLowerCase())
    );
    
    if (isValidAIResponse) {
      console.log('✅ Using AI response');
      return {
        message: aiResponse,
        type: 'text',
        tokens: aiResponse.length,
        confidence: 0.9,
        suggestions: [
          "Tell me more about this",
          "What else can you show me?",
          "Any recent updates?"
        ]
      };
    } else {
      console.log('⚠️ AI response not usable, falling back to local knowledge');
    }
  } catch (error) {
    console.error('💥 AI response failed, using local knowledge:', error);
  }
  
  // Fallback to local knowledge
  const intent = enhancedEngine.analyzeIntent(lastUserMessage.content);
  return enhancedEngine.generateResponse(intent, lastUserMessage.content);
}