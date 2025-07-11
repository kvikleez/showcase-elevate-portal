
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string[];
  color?: string;
}

export const projects: Project[] = [
  {
    id: "tori-edtech",
    title: "TORI - EdTech Platform",
    description: "Comprehensive placement training and skill enhancement application serving global students.",
    longDescription: "Architected EdTech platform with RESTful APIs, increasing user engagement by 45% and supporting 10,000+ concurrent global users. Optimized application performance through state management implementation, API response caching, and responsive design patterns. Launched automated testing frameworks achieving 95% code coverage, reducing production defects by 30%.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Jest", "CI/CD", "Redis"],
    imageUrl: "https://i.ibb.co/RkY4d4x/Timetable.png",
    githubUrl: "https://github.com/SnvvSuchandraEtti/tori-edtech",
    liveUrl: "https://tori-edtech.com",
    featured: true,
    metrics: [
      "45% increase in user engagement",
      "10,000+ concurrent users supported",
      "95% code coverage",
      "30% reduction in production defects"
    ],
    color: "#6366F1"
  },
  {
    id: "aclub-management",
    title: "ACLUB - College Clubs Management",
    description: "Centralized platform for managing college clubs and events with responsive design.",
    longDescription: "Developed comprehensive mobile application with Firebase backend for college club management, increasing administrative workflow efficiency by 65% and event participation rates by 40% through Material Design UI/UX implementation and custom animations. Built real-time notifications with role-based authentication system, achieving 98% positive feedback and boosted student engagement.",
    technologies: ["Flutter", "Firebase", "Material Design", "Cloud Functions", "Authentication"],
    imageUrl: "https://i.ibb.co/RkY4d4x/Timetable.png",
    githubUrl: "https://github.com/SnvvSuchandraEtti/aclub-management",
    featured: true,
    metrics: [
      "65% improvement in administrative workflows",
      "40% increase in event participation",
      "98% positive user feedback",
      "Real-time notifications implemented"
    ],
    color: "#8B5CF6"
  },
  {
    id: "s-track",
    title: "S-TRACK - Profile Tracking System",
    description: "Robust system for tracking students and staff profiles with role-based access.",
    longDescription: "Engineered an app with role-based authentication, reducing administrative overhead by 70% while serving 18,000+ users. Built features for educational materials downloads and session schedule monitoring, improving data accessibility and operational efficiency.",
    technologies: ["Java", "Spring Boot", "MySQL", "React", "JWT Authentication"],
    imageUrl: "https://i.ibb.co/RkY4d4x/Timetable.png",
    githubUrl: "https://github.com/SnvvSuchandraEtti/s-track",
    liveUrl: "https://s-track.adityaedu.net",
    featured: true,
    metrics: [
      "70% reduction in administrative overhead",
      "18,000+ active users",
      "Improved data accessibility",
      "Enhanced operational efficiency"
    ],
    color: "#F43F5E"
  },
  {
    id: "ai-bg-remover",
    title: "AIBG-RM - AI Background Remover",
    description: "AI-powered web application for automatic image background removal.",
    longDescription: "Built a web application with 95% accuracy in image processing, handling 1,000+ daily requests with 60% faster performance compared to traditional methods. Implemented deep learning models for precise image segmentation and background removal with minimal artifacts.",
    technologies: ["Python", "TensorFlow", "React", "Flask", "Computer Vision", "Deep Learning"],
    imageUrl: "https://i.ibb.co/RkY4d4x/Timetable.png",
    githubUrl: "https://github.com/SnvvSuchandraEtti/ai-bg-remover",
    featured: false,
    metrics: [
      "95% accuracy in image processing",
      "1,000+ daily requests processed",
      "60% faster performance",
      "Minimal artifacts in processed images"
    ],
    color: "#EC4899"
  },
  {
    id: "viggiemart-marketplace",
    title: "VIGGIEMART - Direct Farmer-Buyer App",
    description: "Farmer-to-buyer marketplace enabling real-time bidding for fair pricing on vegetables and rice.",
    longDescription: "Engineered a farmer-to-buyer marketplace app during SIH, enabling real-time bidding for fair pricing on vegetables and rice. The platform connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing through transparent bidding mechanisms.",
    technologies: ["React Native", "Node.js", "MongoDB", "Real-time Bidding", "Payment Gateway"],
    imageUrl: "https://i.ibb.co/RkY4d4x/Timetable.png",
    githubUrl: "https://github.com/SnvvSuchandraEtti/viggiemart-marketplace",
    featured: false,
    metrics: [
      "Real-time bidding system",
      "Direct farmer-buyer connection",
      "Fair pricing mechanisms",
      "SIH project completion"
    ],
    color: "#10B981"
  },
  {
    id: "leez-marketplace",
    title: "Leez - P2P Rental Marketplace",
    description: "Innovative peer-to-peer marketplace revolutionizing on-demand rentals for local communities.",
    longDescription: "Currently developing an innovative solution peer-to-peer marketplace revolutionizing on-demand rentals for local communities. The platform features secure payment processing, user verification, geolocation-based search, and an intuitive user interface for seamless product listings and rentals.",
    technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Payment APIs", "Geolocation"],
    imageUrl: "https://i.ibb.co/RkY4d4x/Timetable.png",
    githubUrl: "https://github.com/SnvvSuchandraEtti/leez-marketplace",
    featured: false,
    metrics: [
      "Under active development",
      "Secure payment processing",
      "User verification system",
      "Geolocation-based search"
    ],
    color: "#10B981"
  }
];
