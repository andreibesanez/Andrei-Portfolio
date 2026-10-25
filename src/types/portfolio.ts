export interface Education {
  degree: string;
  school: string;
  school_initials: string;
  year: string;
  logo: string;
  description_p1: string;
  description_p2: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  bio: string;
  about: {
    p1: string;
    p2: string;
    story_p1: string;
    story_p2: string;
  };
  email: string;
  phone: string;
  location: string;
  map_lat: number;
  map_lng: number;
  availability: string;
  avatar?: string;
  education: Education;
  resume_link: string;
}

export interface SocialLink {
  url: string;
  username: string;
}

export interface SkillItem {
  name: string;
  icon_type: 'text' | 'lucide';
  icon_text?: string;
  icon_name?: string;
  bg_color?: string;
  text_color?: string;
}

export interface ToolItem {
  name: string;
  icon: string;
}

export interface SkillsData {
  frontend: SkillItem[];
  backend: SkillItem[];
  tools: ToolItem[];
  learning: string[];
  strengths: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
  points: string[];
  tags: string[];
  dot_color?: string;
}

export interface ProjectItem {
  is_featured: boolean;
  catalog_no?: string;
  title: string;
  short_title?: string;
  category?: string;
  role?: string;
  year?: string;
  description: string;
  tags: string[];
  image?: string;
  banner_bg?: string;
  banner_text?: string;
  github_url?: string;
  github_backend_url?: string;
  demo_url?: string;
  link?: string;
  link_demo?: string;
  link_case_study?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  socials: {
    github: SocialLink;
    facebook: SocialLink;
    linkedin?: SocialLink;
  };
  skills: SkillsData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
}
