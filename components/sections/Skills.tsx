'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap } from 'lucide-react';
import { getCategoryColor, getCategoryLabel } from '@/lib/utils';
import type { Skill, SkillCategory } from '@/types';

const CATEGORY_ORDER: SkillCategory[] = [
  'PROGRAMMING',
  'WEB_DEVELOPMENT',
  'AI_ML',
  'CLOUD',
  'DATABASE',
  'TOOLS',
  'LANGUAGES',
];

function SkillBar({ level, color, delay }: { level: number; color: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="skill-bar">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
      />
    </div>
  );
}

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const color = getCategoryColor(skill.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card p-4 rounded-xl group cursor-default"
      style={{ borderColor: `${color}15` }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-white/80">{skill.name}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {skill.level}%
        </span>
      </div>
      <SkillBar level={skill.level} color={color} delay={delay + 0.2} />
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'ALL'>('ALL');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSkills(d.data);
      })
      .catch(console.error);
  }, []);

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const filteredCategories = activeCategory === 'ALL' ? CATEGORY_ORDER : [activeCategory];

  const categories: (SkillCategory | 'ALL')[] = ['ALL', ...CATEGORY_ORDER.filter((c) => !!grouped[c])];

  return (
    <section id="skills" ref={ref} className="section relative">
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-label">
            <Zap className="w-3 h-3" />
            Skills & Technologies
          </div>
          <h2 className="heading-xl text-white mb-4">
            My Technical{' '}
            <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            A curated collection of technologies I use to build exceptional products.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat === 'ALL' ? '#7c3aed' : getCategoryColor(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white scale-105'
                    : 'text-white/50 hover:text-white glass-hover glass'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${color}20`,
                        border: `1px solid ${color}40`,
                        color: color,
                        boxShadow: `0 0 20px ${color}20`,
                      }
                    : {}
                }
              >
                {cat === 'ALL' ? 'All Skills' : getCategoryLabel(cat)}
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid by category */}
        <div className="space-y-10">
          {filteredCategories
            .filter((cat) => grouped[cat]?.length > 0)
            .map((cat, catIdx) => {
              const catSkills = grouped[cat] || [];
              const color = getCategoryColor(cat);

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                >
                  {/* Category title */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {catIdx + 1}
                    </div>
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                      {getCategoryLabel(cat)}
                    </h3>
                    <div className="flex-1 h-px" style={{ background: `${color}15` }} />
                    <span className="text-xs text-white/30">{catSkills.length} skills</span>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {catSkills.map((skill, idx) => (
                      <SkillCard key={skill.id} skill={skill} delay={idx * 0.05} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
