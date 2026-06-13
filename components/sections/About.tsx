'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Target, Heart, Briefcase, MapPin, Mail, Download } from 'lucide-react';
import Image from 'next/image';
import type { AboutSection as AboutType } from '@/types';

const cards = [
  {
    icon: User,
    title: 'Who I Am',
    content:
      "A passionate full-stack developer who loves building scalable web applications and exploring the intersection of design and technology. I believe great software is both powerful and delightful to use.",
  },
  {
    icon: Target,
    title: 'My Goals',
    content:
      "To build products that solve real problems at scale. I'm driven by the challenge of creating impactful software — whether it's an AI tool, a beautiful frontend, or a robust backend system.",
  },
  {
    icon: Heart,
    title: 'My Interests',
    content:
      "3D web experiences, AI/ML research, open-source contributions, hackathons, and staying at the forefront of tech. Outside code, I enjoy hiking, photography, and reading sci-fi.",
  },
  {
    icon: Briefcase,
    title: 'Career Objective',
    content:
      "To work on ambitious projects that push the boundaries of what's possible on the web. Looking for roles where I can lead frontend architecture, build AI features, and grow with exceptional teammates.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const [about, setAbout] = useState<AboutType | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/about')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAbout(d.data);
      })
      .catch(console.error);
  }, []);

  return (
    <section id="about" ref={ref} className="section relative">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="section-label">
              <User className="w-3 h-3" />
              About Me
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="heading-xl text-white mb-4">
            A Little Bit About{' '}
            <span className="gradient-text">Myself</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/50 max-w-xl mx-auto">
            Passionate developer, lifelong learner, and someone who gets genuinely excited about clean code and great UX.
          </motion.p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Avatar */}
            <div className="relative mb-8">
              <div className="aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden glass gradient-border">
                {about?.profilePhoto ? (
                  <Image
                    src={about.profilePhoto}
                    alt={about.name || 'Profile'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-violet-700/20">
                    <div className="text-6xl font-bold gradient-text">AJ</div>
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass px-4 py-2.5 rounded-xl border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-400">Open to work</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/50">
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-sm">{about?.location || 'San Francisco, CA'}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Mail className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span className="text-sm">{about?.email || 'alex@example.com'}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { value: '24+', label: 'Projects Built' },
                { value: '3+', label: 'Years Experience' },
                { value: '10+', label: 'Technologies' },
                { value: '5+', label: 'Hackathons Won' },
              ].map(({ value, label }) => (
                <div key={label} className="glass p-3 rounded-xl text-center">
                  <div className="text-lg font-bold gradient-text">{value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Resume download */}
            {about?.resumeUrl && (
              <a href={about.resumeUrl} download className="btn-primary w-full justify-center">
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            )}
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Bio */}
            <motion.div
              variants={itemVariants}
              className="sm:col-span-2 glass-card p-6 rounded-2xl glass-hover"
            >
              <p className="text-white/70 leading-relaxed">
                {about?.bio ||
                  "I'm a passionate full-stack developer with 3+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies, with a growing interest in AI/ML integration. I love crafting elegant solutions to complex problems and building products that make a real difference."}
              </p>
            </motion.div>

            {cards.map(({ icon: Icon, title, content }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="glass-card p-5 rounded-2xl glass-hover group cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white/80">{title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
