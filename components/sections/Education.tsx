'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, BookOpen, Trophy } from 'lucide-react';
import type { Education } from '@/types';

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/education')
      .then((r) => r.json())
      .then((d) => { if (d.success) setEducation(d.data); })
      .catch(console.error);
  }, []);

  return (
    <section id="education" ref={ref} className="section relative">
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label">
            <GraduationCap className="w-3 h-3" />
            Education
          </div>
          <h2 className="heading-xl text-white mb-4">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl glass-hover"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-violet-400" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{edu.college}</h3>
                      <p className="text-violet-400 text-sm font-medium">
                        {edu.degree} in {edu.field}
                      </p>
                    </div>
                    {edu.cgpa && (
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold gradient-text">{edu.cgpa}</div>
                        <div className="text-xs text-white/40">/ {edu.maxCgpa || 10} CGPA</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    {edu.startYear} — {edu.current ? 'Present' : edu.endYear || 'Present'}
                    {edu.current && (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-white/50 text-sm mb-4">{edu.description}</p>
                  )}

                  {edu.coursework.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((c) => (
                          <span key={c} className="badge-tech">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.achievements.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Trophy className="w-3 h-3" />
                        Achievements
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.achievements.map((a, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300">
                            🏆 {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {education.length === 0 && (
            <div className="text-center py-16 text-white/30">
              No education entries yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
