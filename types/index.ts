// =============================================
// SHARED TYPES FOR THE PORTFOLIO
// =============================================

export type Role = 'USER' | 'ADMIN';

export type ProjectStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export type SkillCategory =
  | 'PROGRAMMING'
  | 'WEB_DEVELOPMENT'
  | 'AI_ML'
  | 'CLOUD'
  | 'DATABASE'
  | 'TOOLS'
  | 'LANGUAGES';

export type AchievementType =
  | 'HACKATHON'
  | 'AWARD'
  | 'OPEN_SOURCE'
  | 'PUBLIC_SPEAKING'
  | 'COMPETITION'
  | 'OTHER';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  category: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  thumbnail?: string | null;
  images: string[];
  featured: boolean;
  displayOrder: number;
  status: ProjectStatus;
  completedAt?: Date | null;
  features: string[];
  challenges?: string | null;
  solutions?: string | null;
  lessonsLearned?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string | null;
  level: number;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string | null;
  companyUrl?: string | null;
  role: string;
  location?: string | null;
  locationType?: string | null;
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  college: string;
  degree: string;
  field: string;
  cgpa?: number | null;
  maxCgpa?: number | null;
  startYear: number;
  endYear?: number | null;
  current: boolean;
  description?: string | null;
  coursework: string[];
  achievements: string[];
  logo?: string | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string | null;
  date: Date;
  expiryDate?: Date | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  image?: string | null;
  description?: string | null;
  skills: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  type: AchievementType;
  description: string;
  date: Date;
  url?: string | null;
  image?: string | null;
  position?: string | null;
  organizer?: string | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutSection {
  id: string;
  name: string;
  title: string;
  bio: string;
  shortBio?: string | null;
  profilePhoto?: string | null;
  resumeUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  available: boolean;
  socialLinks: Record<string, string>;
  stats: Record<string, number | string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: Date;
}

export interface MediaAsset {
  id: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format?: string | null;
  width?: number | null;
  height?: number | null;
  bytes?: number | null;
  folder?: string | null;
  tags: string[];
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Skill category display config
export const SKILL_CATEGORIES: Record<SkillCategory, { label: string; color: string }> = {
  PROGRAMMING: { label: 'Programming', color: '#7c3aed' },
  WEB_DEVELOPMENT: { label: 'Web Development', color: '#2563eb' },
  AI_ML: { label: 'AI & ML', color: '#059669' },
  CLOUD: { label: 'Cloud', color: '#d97706' },
  DATABASE: { label: 'Database', color: '#dc2626' },
  TOOLS: { label: 'Tools', color: '#7c3aed' },
  LANGUAGES: { label: 'Languages', color: '#0891b2' },
};

export const ACHIEVEMENT_TYPE_LABELS: Record<AchievementType, string> = {
  HACKATHON: 'Hackathon',
  AWARD: 'Award',
  OPEN_SOURCE: 'Open Source',
  PUBLIC_SPEAKING: 'Public Speaking',
  COMPETITION: 'Competition',
  OTHER: 'Other',
};
