'use client';

import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Download, Sparkles, Code2, Brain } from 'lucide-react';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));

const roles = [
  'Full Stack Engineer',
  'AI/ML Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const role = roles[currentRole];
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentRole]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#06060a]" />}>
          <HeroScene mousePosition={mousePos} />
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-950/20 via-transparent to-transparent z-1" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06060a] to-transparent z-1" />

      {/* Content */}
      <div className="relative z-10 container text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-white/60 text-sm">Available for new opportunities</span>
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="heading-display mb-4">
            <span className="block text-white">Hi, I'm</span>
            <span className="block gradient-text">Alex Johnson</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-6 h-10 flex items-center justify-center"
        >
          <p className="text-xl md:text-2xl font-medium text-white/60">
            <Code2 className="w-5 h-5 inline mr-2 text-violet-400" />
            {displayText}
            <span className="inline-block w-0.5 h-6 bg-violet-400 ml-0.5 animate-pulse align-middle" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="max-w-2xl mx-auto text-white/50 text-lg leading-relaxed mb-12"
        >
          I craft exceptional digital experiences with modern technologies.
          Specializing in full-stack development, 3D interfaces, and AI integration.
          Let's build something extraordinary together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <button onClick={scrollToProjects} className="btn-primary group">
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button onClick={scrollToContact} className="btn-secondary">
            Contact Me
          </button>
          <a
            href="/resume.pdf"
            download
            className="btn-ghost gap-2"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { value: '24+', label: 'Projects' },
            { value: '3+', label: 'Years Exp.' },
            { value: '10+', label: 'Technologies' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{value}</div>
              <div className="text-xs text-white/40 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center gap-4 mt-10"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl glass text-white/40 hover:text-white hover:border-violet-500/30 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl glass text-white/40 hover:text-white hover:border-violet-500/30 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="p-2.5 rounded-xl glass text-white/40 hover:text-white hover:border-violet-500/30 transition-all hover:scale-110"
            aria-label="Email"
          >
            <Brain className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-violet-500/0 via-violet-500/60 to-violet-500/0" />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-violet-400/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
