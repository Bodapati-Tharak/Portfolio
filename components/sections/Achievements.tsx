'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, ExternalLink, Calendar } from 'lucide-react';
import { getCategoryLabel, formatDate } from '@/lib/utils';
import type { Achievement, AchievementType } from '@/types';

const typeConfig: Record<AchievementType, { emoji: string; color: string; bg: string }> = {
  HACKATHON: { emoji: '⚡', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  AWARD: { emoji: '🏆', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  OPEN_SOURCE: { emoji: '🔓', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  PUBLIC_SPEAKING: { emoji: '🎤', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  COMPETITION: { emoji: '🥇', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  OTHER: { emoji: '✨', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
};

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/achievements')
      .then((r) => r.json())
      .then((d) => { if (d.success) setAchievements(d.data); })
      .catch(console.error);
  }, []);

  return (
    <section id="achievements" ref={ref} className="section relative">
      <div className="absolute left-1/4 top-1/2 w-80 h-80 bg-amber-600/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label">
            <Trophy className="w-3 h-3" />
            Achievements
          </div>
          <h2 className="heading-xl text-white mb-4">
            Highlights &amp;{' '}
            <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Milestones and recognitions that shaped my journey as a developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {achievements.map((achievement, idx) => {
            const config = typeConfig[achievement.type];
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass-card p-5 rounded-2xl glass-hover group"
              >
                {/* Type badge + emoji */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    {getCategoryLabel(achievement.type)}
                  </span>
                  <span className="text-2xl">{config.emoji}</span>
                </div>

                {/* Position badge */}
                {achievement.position && (
                  <div className="mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      {achievement.position}
                    </span>
                  </div>
                )}

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-violet-300 transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-white/30">
                    <Calendar className="w-3 h-3" />
                    {formatDate(achievement.date)}
                  </div>
                  {achievement.url && (
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                      aria-label="View"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {achievement.organizer && (
                  <div className="mt-2 pt-2 border-t border-white/5 text-xs text-white/30">
                    by {achievement.organizer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {achievements.length === 0 && (
          <div className="text-center py-16 text-white/30">
            No achievements yet.
          </div>
        )}
      </div>
    </section>
  );
}
