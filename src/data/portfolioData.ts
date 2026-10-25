import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Andrei Besañez',
    initials: 'AB',
    role: 'IT Student & Web Developer',
    tagline: 'A curious mind, building for tomorrow.',
    bio: "I'm Andrei Besañez, an Information Technology student in the Philippines exploring web development, thoughtful interface design, and digital experiences.",
    about: {
      p1: "I am an Information Technology student based in Digos City, Philippines, currently pursuing my degree at Cor Jesu College. My journey into technology began with a fascination for how code can bridge abstract ideas into practical human tools. That curiosity quickly evolved into a dedicated pursuit of modern web development and software craftsmanship.",
      p2: "Rather than treating code merely as syntax, I look at software as an observatory lens: a way to study real problems, organize complexity into intuitive interfaces, and create digital experiences that feel purposeful. When not debugging or experimenting with React and GSAP, you'll find me documenting systems, studying design traditions, or exploring the cosmos.",
      story_p1: "My journey started with simple questions: how does a packet travel across continents, and how does a browser render thought into form? That curiosity turned into building projects for school, local businesses, and hackathons.",
      story_p2: "As an undergraduate, I prioritize three principles: constantly improving my technical foundation, immediately applying what I learn into real-world code, and never losing sight of the human user at the other end of the screen."
    },
    email: 'andreibesanez20@gmail.com',
    phone: '+63 915 533 9599',
    location: 'Purok 9-A, Aplaya, Digos City, Philippines',
    map_lat: 6.73682,
    map_lng: 125.37791,
    availability: 'Open for apprentice roles, part-time & freelance projects',
    avatar: '/images/pfp.png',
    education: {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Cor Jesu College',
      school_initials: 'CJC',
      year: '2023 – Present',
      logo: '/images/CorJesu.webp',
      description_p1: 'Currently pursuing an undergraduate degree with focus on software engineering, database architecture, distributed systems, and user interface design.',
      description_p2: 'Active in academic capstones, hackathons, and self-directed frontend exploration.'
    },
    resume_link: '#'
  },

  socials: {
    github: {
      url: 'https://github.com/andreibesanez',
      username: 'andreibesanez'
    },
    facebook: {
      url: 'https://www.facebook.com/andrei.besanez',
      username: 'andrei.besanez'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/andreibesanez',
      username: 'andreibesanez'
    }
  },

  skills: {
    frontend: [
      { name: 'HTML5', icon_type: 'text', icon_text: 'HTML', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'CSS3', icon_type: 'text', icon_text: 'CSS', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'JavaScript (ES6+)', icon_type: 'text', icon_text: 'JS', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'TypeScript', icon_type: 'text', icon_text: 'TS', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'React 19', icon_type: 'lucide', icon_name: 'Atom', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'Next.js', icon_type: 'text', icon_text: 'N', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'Tailwind CSS', icon_type: 'lucide', icon_name: 'Waves', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'Vite', icon_type: 'lucide', icon_name: 'Zap', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'GSAP Animations', icon_type: 'lucide', icon_name: 'Compass', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' }
    ],
    backend: [
      { name: 'PHP 8.2+', icon_type: 'text', icon_text: 'PHP', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'Laravel 12', icon_type: 'lucide', icon_name: 'Triangle', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'Node.js', icon_type: 'lucide', icon_name: 'Hexagon', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'MySQL', icon_type: 'lucide', icon_name: 'Database', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'SQLite', icon_type: 'lucide', icon_name: 'Database', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'MongoDB', icon_type: 'text', icon_text: 'M', text_color: '#18273B', bg_color: 'rgba(24, 39, 59, 0.1)' },
      { name: 'Firebase', icon_type: 'lucide', icon_name: 'Flame', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' },
      { name: 'RESTful APIs', icon_type: 'lucide', icon_name: 'Network', text_color: '#AE8950', bg_color: 'rgba(174, 137, 80, 0.1)' }
    ],
    tools: [
      { name: 'Git', icon: 'GitBranch' },
      { name: 'GitHub', icon: 'GitBranch' },
      { name: 'VS Code', icon: 'Code' },
      { name: 'Figma', icon: 'PenTool' },
      { name: 'Postman', icon: 'Send' },
      { name: 'Vercel', icon: 'Globe' }
    ],
    learning: [
      'Advanced GSAP ScrollTrigger',
      'Docker Containerization',
      'AWS Cloud Architecture',
      'React Native',
      'Stellar & Soroban Smart Contracts'
    ],
    strengths: [
      'Clean, maintainable code architecture',
      'Classical aesthetic and balanced typography',
      'User-centric interface craftsmanship',
      'Technical writing & system documentation',
      'Autonomous autodidactic problem-solving',
      'Strong teamwork & version-controlled workflows'
    ]
  },

  experience: [
    {
      title: 'Documentation Specialist (Capstone)',
      company: 'Cor Jesu College',
      duration: 'June 2026 – Present',
      description: 'Managed and authored comprehensive project documentation for our capstone project "Chainbudget", ensuring academic rigor, technical accuracy, and clear interface blueprints.',
      points: [
        'Authored system manuals, technical specifications, and analytical research chapters.',
        'Collaborated directly with engineering peers to translate features into concise developer documentation.'
      ],
      tags: ['Technical Writing', 'Documentation', 'System Analysis', 'Research'],
      dot_color: '#AE8950'
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed (The Observatory)',
      duration: 'Jan 2024 – Present',
      description: 'Designing and building responsive, tailored web applications for small businesses and academic initiatives, handling the pipeline from conceptual wireframes to live hosting.',
      points: [
        'Developed custom web interfaces emphasizing speed, accessibility, and clean visual hierarchy.',
        'Implemented headless content and form endpoints with zero operational maintenance costs.'
      ],
      tags: ['React', 'CSS Variables', 'Responsive Design', 'Vite'],
      dot_color: '#18273B'
    },
    {
      title: 'Web Development Intern',
      company: 'Tech Solutions Inc.',
      duration: 'Aug 2023 – Dec 2023',
      description: 'Contributed to front-end maintenance and bug resolutions for enterprise internal tools under the mentorship of senior web engineers.',
      points: [
        'Diagnosed and fixed 50+ UI/UX anomalies reported in QA sprint cycles.',
        'Assisted in standardizing CSS design tokens and component styling patterns.'
      ],
      tags: ['HTML/CSS', 'JavaScript', 'Git', 'Quality Assurance'],
      dot_color: '#AE8950'
    }
  ],

  projects: [
    {
      is_featured: true,
      catalog_no: 'OBS-01',
      title: 'Chainbudget',
      short_title: 'Chainbudget',
      category: 'Blockchain Ledger',
      role: 'Documentation Specialist & Frontend',
      year: '2026',
      description: 'A decentralized organizational budget monitoring system designed to bring transparent, immutable auditing to institution funds through blockchain ledgers.',
      tags: ['React', 'Blockchain', 'Stellar', 'Documentation', 'Tailwind CSS'],
      image: '/images/projects/chainbudget.png',
      banner_bg: 'rgba(24, 39, 59, 0.08)',
      banner_text: '#18273B',
      github_url: 'https://github.com/andreibesanez/chainbudget',
      demo_url: 'https://chainbudget.vercel.app',
      link: 'https://chainbudget.vercel.app'
    },
    {
      is_featured: false,
      catalog_no: 'OBS-02',
      title: '4Ps-Nexus',
      short_title: '4Ps-Nexus',
      category: 'FinTech / Smart Contracts',
      role: 'Hackathon Strategy & UI',
      year: '2026',
      description: 'A blockchain-powered conditional cash disbursement mechanism for the Philippine 4Ps program utilizing Stellar Soroban smart contracts for verifiable relief distribution.',
      tags: ['Smart Contracts', 'Soroban', 'React', 'FinTech', 'Strategy'],
      image: '/images/projects/4ps-Nexus.png',
      banner_bg: 'rgba(174, 137, 80, 0.08)',
      banner_text: '#AE8950',
      github_url: 'https://github.com/andreibesanez/4ps-nexus',
      demo_url: 'https://4-ps-nexus.vercel.app',
      link: 'https://4-ps-nexus.vercel.app'
    },
    {
      is_featured: true,
      catalog_no: 'OBS-03',
      title: 'Guestbook Full-Stack Application',
      short_title: 'Guestbook',
      category: 'Full-Stack Web Application',
      role: 'Full-Stack Developer',
      year: '2025',
      description: 'A full-stack guestbook application demonstrating REST APIs, database persistence, and React state management where visitors submit greetings, retrieved via GET API, stored via POST API, and persisted in PostgreSQL.',
      tags: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
      image: '/images/projects/guestbook.jpg',
      banner_bg: 'rgba(24, 39, 59, 0.08)',
      banner_text: '#18273B',
      github_url: 'https://github.com/ethel5/guestbook-client',
      github_backend_url: 'https://github.com/ethel5/guestbook-api',
      link: 'https://github.com/ethel5/guestbook-client'
    },
    {
      is_featured: false,
      catalog_no: 'OBS-04',
      title: 'Word & Line Counter CLI',
      short_title: 'Word Counter CLI',
      category: 'CLI Utility & Text Engine',
      role: 'Developer',
      year: '2025',
      description: 'A Node.js command-line utility for processing text files and generating basic text statistics, line counts, word frequencies, and character metrics using the File System API.',
      tags: ['Node.js', 'JavaScript', 'CLI Tool', 'File System API', 'Text Processing'],
      image: '/images/projects/wordlinecounter.jpg',
      banner_bg: 'rgba(174, 137, 80, 0.08)',
      banner_text: '#AE8950',
      github_url: 'https://github.com/andreibesanez',
      link: 'https://github.com/andreibesanez'
    },
    {
      is_featured: false,
      catalog_no: 'OBS-05',
      title: 'Inventory Management System',
      short_title: 'Inventory System',
      category: 'Backend Architecture',
      role: 'Backend Developer',
      year: '2025',
      description: 'An enterprise inventory management backend designed to organize commercial products, clients, suppliers, and transactional workflows via Laravel Eloquent ORM and normalized relational database schemas.',
      tags: ['Laravel', 'PHP', 'Eloquent ORM', 'MySQL', 'Relational Database'],
      image: '/images/projects/inventorysystem.jpg',
      banner_bg: 'rgba(24, 39, 59, 0.08)',
      banner_text: '#18273B',
      github_url: 'https://github.com/andreibesanez',
      link: 'https://github.com/andreibesanez'
    }
  ]
};
