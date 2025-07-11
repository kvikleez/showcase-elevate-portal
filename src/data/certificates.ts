
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'technical' | 'participation';
  description: string;
  imageUrl: string;
  credentialUrl?: string;
  skills?: string[];
}

export const certificates: Certificate[] = [
  // Technical Certificates from your resume
  {
    id: 'tech-1',
    title: 'Privacy and Security in Online Social Media',
    issuer: 'NPTEL - IIT',
    date: 'December 2023',
    category: 'technical',
    description: 'Comprehensive course on privacy and security aspects of online social media platforms.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Privacy', 'Security', 'Social Media']
  },
  {
    id: 'tech-2',
    title: 'Google Flutter Internship',
    issuer: 'Technical Hub',
    date: 'July 2024',
    category: 'technical',
    description: 'Professional internship certificate for Flutter development with enterprise applications.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Flutter', 'Mobile Development', 'Firebase']
  },
  {
    id: 'tech-3',
    title: 'PHP and MySQL Training',
    issuer: 'Technical Training Institute',
    date: 'November 2023',
    category: 'technical',
    description: 'Comprehensive training on PHP programming and MySQL database management.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['PHP', 'MySQL', 'Web Development']
  },
  {
    id: 'tech-4',
    title: 'HTML Forms with JavaScript',
    issuer: 'Web Development Academy',
    date: 'October 2023',
    category: 'technical',
    description: 'Advanced course on creating interactive HTML forms using JavaScript.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['HTML', 'JavaScript', 'Forms']
  },
  {
    id: 'tech-5',
    title: 'Red Hat OpenShift',
    issuer: 'Red Hat Academy',
    date: 'September 2023',
    category: 'technical',
    description: 'Container platform and application development with OpenShift.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['OpenShift', 'Containers', 'DevOps']
  },
  {
    id: 'tech-6',
    title: 'Introduction to Internet of Things (IoT)',
    issuer: 'NPTEL - IIT',
    date: 'August 2023',
    category: 'technical',
    description: 'Comprehensive course on IoT fundamentals, sensors, and connectivity.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['IoT', 'Sensors', 'Embedded Systems']
  },
  {
    id: 'tech-7',
    title: 'Introduction to Natural Language Processing',
    issuer: 'AI Academy',
    date: 'July 2023',
    category: 'technical',
    description: 'Fundamentals of NLP techniques and applications in AI.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['NLP', 'AI', 'Machine Learning']
  },
  {
    id: 'tech-8',
    title: 'Introduction to Deep Learning',
    issuer: 'AI Academy',
    date: 'June 2023',
    category: 'technical',
    description: 'Comprehensive introduction to deep learning concepts and neural networks.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Deep Learning', 'Neural Networks', 'AI']
  },
  {
    id: 'tech-9',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'AI Academy',
    date: 'May 2023',
    category: 'technical',
    description: 'Foundational course on artificial intelligence principles and applications.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['AI', 'Machine Learning', 'Algorithms']
  },
  {
    id: 'tech-10',
    title: 'Node.js',
    issuer: 'Technical Training Center',
    date: 'April 2023',
    category: 'technical',
    description: 'Server-side JavaScript development with Node.js runtime environment.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Node.js', 'JavaScript', 'Backend Development']
  },
  {
    id: 'tech-11',
    title: 'Data Mining',
    issuer: 'Data Science Institute',
    date: 'March 2023',
    category: 'technical',
    description: 'Advanced techniques in data mining and knowledge discovery.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Data Mining', 'Analytics', 'Machine Learning']
  },
  {
    id: 'tech-12',
    title: 'Pega Bootcamp',
    issuer: 'Pega Academy',
    date: 'February 2023',
    category: 'technical',
    description: 'Intensive bootcamp on Pega platform for business process management.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Pega', 'BPM', 'Process Automation']
  },
  {
    id: 'tech-13',
    title: 'Case Studies in Data Literacy',
    issuer: 'Data Academy',
    date: 'January 2023',
    category: 'technical',
    description: 'Real-world case studies in data analysis and interpretation.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Data Analysis', 'Statistics', 'Data Literacy']
  },
  {
    id: 'tech-14',
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    date: 'December 2022',
    category: 'technical',
    description: 'Student Expert certification in API testing and documentation using Postman.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['API Testing', 'Postman', 'API Documentation']
  },
  {
    id: 'tech-15',
    title: 'Postman API',
    issuer: 'Postman',
    date: 'November 2022',
    category: 'technical',
    description: 'Advanced API development and testing with Postman platform.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['API Development', 'Testing', 'Postman']
  },
  {
    id: 'tech-16',
    title: 'THUB - Certificate of Internship',
    issuer: 'Technical Hub',
    date: 'August 2024',
    category: 'technical',
    description: 'Professional internship completion certificate from Technical Hub.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Professional Development', 'Internship', 'Technical Skills']
  },
  {
    id: 'tech-17',
    title: 'CCNA v7: ITN',
    issuer: 'Cisco',
    date: 'October 2022',
    category: 'technical',
    description: 'Cisco Certified Network Associate - Introduction to Networks.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Networking', 'Cisco', 'Network Administration']
  },
  {
    id: 'tech-18',
    title: 'RHAPL Badge',
    issuer: 'Red Hat Academy',
    date: 'September 2022',
    category: 'technical',
    description: 'Red Hat Academy Programming Languages badge certification.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Programming', 'Red Hat', 'Linux']
  },
  {
    id: 'tech-19',
    title: 'IT Pearson Java',
    issuer: 'Pearson',
    date: 'August 2022',
    category: 'technical',
    description: 'Java programming certification from Pearson IT Academy.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Java', 'Programming', 'OOP']
  },
  {
    id: 'tech-20',
    title: 'edX Java Fundamentals',
    issuer: 'edX',
    date: 'July 2022',
    category: 'technical',
    description: 'Fundamentals of Java programming language through edX platform.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Java', 'Programming Fundamentals', 'Object-Oriented Programming']
  },
  {
    id: 'tech-21',
    title: 'Cloud Computing',
    issuer: 'NPTEL - IIT',
    date: 'June 2022',
    category: 'technical',
    description: 'Comprehensive course on cloud computing concepts and technologies.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Cloud Computing', 'AWS', 'Distributed Systems']
  },
  {
    id: 'tech-22',
    title: 'Spoken Tutorial - Project C',
    issuer: 'IIT Bombay',
    date: 'May 2022',
    category: 'technical',
    description: 'C programming language tutorial completion through Spoken Tutorial project.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['C Programming', 'System Programming', 'Algorithms']
  },
  {
    id: 'tech-23',
    title: 'Oracle Cloud Webinar Certificate',
    issuer: 'Oracle',
    date: 'April 2022',
    category: 'technical',
    description: 'Oracle Cloud platform webinar participation certificate.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Oracle Cloud', 'Cloud Platforms', 'Database']
  },
  {
    id: 'tech-24',
    title: 'SQL Basic',
    issuer: 'HackerRank',
    date: 'March 2022',
    category: 'technical',
    description: 'Basic SQL programming and database query certification.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['SQL', 'Database', 'Query Optimization']
  },
  {
    id: 'tech-25',
    title: 'DBMS',
    issuer: 'Technical Institute',
    date: 'February 2022',
    category: 'technical',
    description: 'Database Management Systems concepts and implementation.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['DBMS', 'Database Design', 'SQL']
  },
  {
    id: 'tech-26',
    title: 'Skill-A-THON 202',
    issuer: 'Skill Development Platform',
    date: 'January 2022',
    category: 'technical',
    description: 'Multi-skill technical competition and assessment.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Technical Skills', 'Problem Solving', 'Competition']
  },
  {
    id: 'tech-27',
    title: 'NDG Linux Unhatched',
    issuer: 'Cisco Networking Academy',
    date: 'December 2021',
    category: 'technical',
    description: 'Introduction to Linux operating system fundamentals.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Linux', 'Operating Systems', 'Command Line']
  },
  {
    id: 'tech-28',
    title: 'Spoken Tutorial - Project Cpp',
    issuer: 'IIT Bombay',
    date: 'November 2021',
    category: 'technical',
    description: 'C++ programming language tutorial completion.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['C++', 'Object-Oriented Programming', 'STL']
  },
  {
    id: 'tech-29',
    title: 'Red Hat System Administration 2',
    issuer: 'Red Hat Academy',
    date: 'October 2021',
    category: 'technical',
    description: 'Advanced Red Hat system administration skills and practices.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Red Hat', 'System Administration', 'Linux']
  },
  {
    id: 'tech-30',
    title: 'Red Hat System Administration 1',
    issuer: 'Red Hat Academy',
    date: 'September 2021',
    category: 'technical',
    description: 'Fundamental Red Hat system administration concepts.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Red Hat', 'System Administration', 'Linux Basics']
  },

  // Participation Certificates from your resume
  {
    id: 'part-1',
    title: 'BrandQuetz #19 – Taglines and Slogans',
    issuer: 'Brand Competition Platform',
    date: 'March 2024',
    category: 'participation',
    description: 'Creative competition focused on brand taglines and marketing slogans.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Creative Writing', 'Brand Marketing', 'Competition']
  },
  {
    id: 'part-2',
    title: 'CodeQuetz #14 – Coding Challenge',
    issuer: 'Coding Platform',
    date: 'February 2024',
    category: 'participation',
    description: 'Competitive programming challenge and algorithm optimization.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Competitive Programming', 'Algorithms', 'Problem Solving']
  },
  {
    id: 'part-3',
    title: 'TechQuetz #14 – Mobile Technologies',
    issuer: 'Technology Platform',
    date: 'January 2024',
    category: 'participation',
    description: 'Mobile technology quiz and knowledge assessment.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Mobile Technology', 'Technical Knowledge', 'Quiz']
  },
  {
    id: 'part-4',
    title: 'Software Designing Webinar – NDLI Club',
    issuer: 'NDLI Club',
    date: 'December 2023',
    category: 'participation',
    description: 'Software design principles and architecture webinar.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Software Design', 'Architecture', 'Webinar']
  },
  {
    id: 'part-5',
    title: 'Flipkart Grid 6.0',
    issuer: 'Flipkart',
    date: 'September 2024',
    category: 'participation',
    description: 'National level hackathon by Flipkart for innovative solutions.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Hackathon', 'Innovation', 'Team Collaboration']
  },
  {
    id: 'part-6',
    title: 'Flipkart Grid 5.0',
    issuer: 'Flipkart',
    date: 'August 2023',
    category: 'participation',
    description: 'Previous edition of Flipkart\'s national hackathon.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Hackathon', 'Problem Solving', 'Innovation']
  },
  {
    id: 'part-7',
    title: 'JNTUV Code Wars 3.0',
    issuer: 'JNTUV',
    date: 'November 2023',
    category: 'participation',
    description: 'University level coding competition and programming contest.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Competitive Coding', 'Programming Contest', 'University Competition']
  },
  {
    id: 'part-8',
    title: 'JNTUV Code Wars',
    issuer: 'JNTUV',
    date: 'October 2022',
    category: 'participation',
    description: 'Previous edition of JNTUV coding competition.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Coding Competition', 'Algorithms', 'Programming']
  },
  {
    id: 'part-9',
    title: 'Treasure Hunt 2025',
    issuer: 'Event Organizer',
    date: 'January 2025',
    category: 'participation',
    description: 'Interactive treasure hunt competition with problem-solving challenges.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Problem Solving', 'Team Work', 'Strategic Thinking']
  },
  {
    id: 'part-10',
    title: 'Talent Park 2025',
    issuer: 'Talent Platform',
    date: 'January 2025',
    category: 'participation',
    description: 'Multi-skill talent showcase and competition platform.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Talent Showcase', 'Multi-skill', 'Competition']
  }
];

// Helper function to get certificates by category
export const getCertificatesByCategory = (category: 'technical' | 'participation'): Certificate[] => {
  return certificates.filter(cert => cert.category === category);
};
