import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function formatDateRange(startDate: Date | string, endDate?: Date | string | null, current?: boolean): string {
  const start = formatDateShort(startDate);
  if (current) return `${start} — Present`;
  if (!endDate) return start;
  return `${start} — ${formatDateShort(endDate)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}${path}`;
}

// Category display helpers
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    PROGRAMMING: '#7c3aed',
    WEB_DEVELOPMENT: '#2563eb',
    AI_ML: '#059669',
    CLOUD: '#d97706',
    DATABASE: '#dc2626',
    TOOLS: '#7c3aed',
    LANGUAGES: '#0891b2',
  };
  return colors[category] || '#7c3aed';
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    PROGRAMMING: 'Programming',
    WEB_DEVELOPMENT: 'Web Development',
    AI_ML: 'AI & ML',
    CLOUD: 'Cloud',
    DATABASE: 'Database',
    TOOLS: 'Tools',
    LANGUAGES: 'Languages',
    HACKATHON: 'Hackathon',
    AWARD: 'Award',
    OPEN_SOURCE: 'Open Source',
    PUBLIC_SPEAKING: 'Public Speaking',
    COMPETITION: 'Competition',
    OTHER: 'Other',
  };
  return labels[category] || category;
}
