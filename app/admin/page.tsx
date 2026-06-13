'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Zap, Award, Briefcase, GraduationCap, Trophy, TrendingUp, MessageSquare } from 'lucide-react';

interface Stats {
  projects: number;
  skills: number;
  certifications: number;
  experiences: number;
  education: number;
  achievements: number;
  messages: number;
}

function StatCard({ icon: Icon, label, value, color, delay }: {
  icon: any;
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-5 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <TrendingUp className="w-4 h-4 text-white/20" />
      </div>
      <div className="text-3xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-xs text-white/40 font-medium">{label}</div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0, skills: 0, certifications: 0,
    experiences: 0, education: 0, achievements: 0, messages: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [projects, skills, certifications, experiences, education, achievements, messages] =
        await Promise.allSettled([
          fetch('/api/projects').then((r) => r.json()),
          fetch('/api/skills').then((r) => r.json()),
          fetch('/api/certifications').then((r) => r.json()),
          fetch('/api/experience').then((r) => r.json()),
          fetch('/api/education').then((r) => r.json()),
          fetch('/api/achievements').then((r) => r.json()),
          fetch('/api/contact').then((r) => r.json()),
        ]);

      setStats({
        projects: projects.status === 'fulfilled' ? projects.value.data?.length || 0 : 0,
        skills: skills.status === 'fulfilled' ? skills.value.data?.length || 0 : 0,
        certifications: certifications.status === 'fulfilled' ? certifications.value.data?.length || 0 : 0,
        experiences: experiences.status === 'fulfilled' ? experiences.value.data?.length || 0 : 0,
        education: education.status === 'fulfilled' ? education.value.data?.length || 0 : 0,
        achievements: achievements.status === 'fulfilled' ? achievements.value.data?.length || 0 : 0,
        messages: messages.status === 'fulfilled' ? messages.value.data?.length || 0 : 0,
      });
    }
    fetchStats();
  }, []);

  const statCards = [
    { icon: FolderOpen, label: 'Projects', value: stats.projects, color: '#7c3aed' },
    { icon: Zap, label: 'Skills', value: stats.skills, color: '#2563eb' },
    { icon: Award, label: 'Certifications', value: stats.certifications, color: '#059669' },
    { icon: Briefcase, label: 'Experiences', value: stats.experiences, color: '#d97706' },
    { icon: GraduationCap, label: 'Education', value: stats.education, color: '#dc2626' },
    { icon: Trophy, label: 'Achievements', value: stats.achievements, color: '#f59e0b' },
    { icon: MessageSquare, label: 'Messages', value: stats.messages, color: '#8b5cf6' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-1"
        >
          Welcome back! 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-sm"
        >
          Here's an overview of your portfolio content.
        </motion.p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ icon, label, value, color }, idx) => (
          <StatCard key={label} icon={icon} label={label} value={value} color={color} delay={idx * 0.05} />
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: '/admin/projects', label: 'Add Project', icon: FolderOpen },
            { href: '/admin/skills', label: 'Add Skill', icon: Zap },
            { href: '/admin/certifications', label: 'Add Certification', icon: Award },
            { href: '/admin/experience', label: 'Add Experience', icon: Briefcase },
            { href: '/admin/achievements', label: 'Add Achievement', icon: Trophy },
            { href: '/admin/media', label: 'Upload Media', icon: Award },
          ].map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2.5 p-3 rounded-xl glass glass-hover text-sm font-medium text-white/60 hover:text-white transition-all"
            >
              <Icon className="w-4 h-4 text-violet-400" />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
