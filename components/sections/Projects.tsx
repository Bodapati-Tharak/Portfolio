'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { FolderOpen, Github, ExternalLink, Star, ArrowRight, Filter } from 'lucide-react';
import type { Project } from '@/types';

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass-card rounded-2xl overflow-hidden glass-hover"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-10 badge badge-featured">
          <Star className="w-3 h-3 fill-current mr-1" />
          Featured
        </div>
      )}

      {/* Status badge */}
      {project.status === 'IN_PROGRESS' && (
        <div className="absolute top-3 right-3 z-10 badge bg-amber-500/10 border-amber-500/30 text-amber-400">
          In Progress
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-violet-900/30 to-violet-700/10">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder with animated gradient */}
            <div className="w-full h-full bg-gradient-to-br from-violet-900/20 via-violet-800/10 to-transparent flex items-center justify-center">
              <div className="text-violet-400/30">
                <FolderOpen className="w-16 h-16" />
              </div>
            </div>
            {/* Animated grid */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>
        )}
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-violet-900/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
            {project.category}
          </span>
          {project.completedAt && (
            <span className="text-xs text-white/30">
              {new Date(project.completedAt).getFullYear()}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-violet-300 transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="badge-tech">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="badge-tech text-violet-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* View details link */}
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors group/link"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

const categories = ['All', 'Web Development', 'AI/ML', 'Blockchain', 'Developer Tools', 'Mobile'];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProjects(d.data);
      })
      .catch(console.error);
  }, []);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="section relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-3xl h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-label">
            <FolderOpen className="w-3 h-3" />
            Projects
          </div>
          <h2 className="heading-xl text-white mb-4">
            Things I've{' '}
            <span className="gradient-text">Built</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            A selection of my best work — from full-stack applications to AI-powered tools. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          <Filter className="w-4 h-4 text-white/30 self-center mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <ProjectCard key={project.id} project={project} delay={idx * 0.1} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            No projects found in this category.
          </div>
        )}

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary gap-2"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
