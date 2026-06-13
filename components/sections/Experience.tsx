'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { formatDateRange } from '@/lib/utils';
import type { Experience } from '@/types';

function ExperienceCard({ exp, idx }: { exp: Experience; idx: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="timeline-dot absolute left-0 top-1" />

      {/* Card */}
      <div className="glass-card p-6 rounded-2xl glass-hover ml-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-0.5">{exp.role}</h3>
            <div className="flex items-center gap-2">
              <span className="text-violet-400 font-medium text-sm">{exp.company}</span>
              {exp.companyUrl && (
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          {exp.current && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium self-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Current
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/40">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-violet-400" />
            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
          </div>
          {exp.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-400" />
              {exp.location}
              {exp.locationType && (
                <span className="capitalize text-white/30">· {exp.locationType}</span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-4">{exp.description}</p>

        {/* Responsibilities */}
        {exp.responsibilities.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {exp.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/50">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">▸</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        {exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
            {exp.technologies.map((tech) => (
              <span key={tech} className="badge-tech">{tech}</span>
            ))}
          </div>
        )}

        {/* Achievements */}
        {exp.achievements.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Key Achievements</p>
            <div className="flex flex-wrap gap-2">
              {exp.achievements.map((a, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  🏆 {a}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((d) => { if (d.success) setExperiences(d.data); })
      .catch(console.error);
  }, []);

  return (
    <section id="experience" ref={ref} className="section relative">
      <div className="absolute left-0 top-1/2 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label">
            <Briefcase className="w-3 h-3" />
            Experience
          </div>
          <h2 className="heading-xl text-white mb-4">
            Work <span className="gradient-text">History</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            My professional journey so far — each role shaped me into the engineer I am today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="timeline-line rounded-full" />

          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={exp.id} exp={exp} idx={idx} />
            ))}

            {experiences.length === 0 && (
              <div className="text-center py-16 text-white/30 pl-8">
                No experience entries yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
