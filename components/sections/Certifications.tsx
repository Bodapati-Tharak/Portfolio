'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Certification } from '@/types';

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    fetch('/api/certifications')
      .then((r) => r.json())
      .then((d) => { if (d.success) setCertifications(d.data); })
      .catch(console.error);
  }, []);

  return (
    <section id="certifications" ref={ref} className="section relative">
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label">
            <Award className="w-3 h-3" />
            Certifications
          </div>
          <h2 className="heading-xl text-white mb-4">
            Professional{' '}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Industry-recognized certifications that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-5 rounded-2xl glass-hover group"
            >
              {/* Top section */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-violet-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-violet-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-white/40 font-medium">{cert.issuer}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
                <Calendar className="w-3 h-3 text-violet-400" />
                Issued {formatDate(cert.date)}
                {cert.expiryDate && (
                  <span className="text-white/30">· Expires {formatDate(cert.expiryDate)}</span>
                )}
              </div>

              {/* Description */}
              {cert.description && (
                <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">
                  {cert.description}
                </p>
              )}

              {/* Skills */}
              {cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 4).map((s) => (
                    <span key={s} className="badge-tech text-xs">{s}</span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified</span>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  >
                    View Credential
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {certifications.length === 0 && (
          <div className="text-center py-16 text-white/30">
            No certifications yet.
          </div>
        )}
      </div>
    </section>
  );
}
