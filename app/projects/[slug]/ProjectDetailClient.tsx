'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Github, ExternalLink, Calendar, CheckCircle,
  Lightbulb, Target, BookOpen, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/types';

interface Props {
  project: Project;
  related: Project[];
}

export default function ProjectDetailClient({ project, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const allImages = [project.thumbnail, ...project.images].filter(Boolean) as string[];

  const prevImage = () => setActiveImage((i) => (i - 1 + allImages.length) % allImages.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % allImages.length);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero banner */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {allImages.length > 0 ? (
            <Image
              src={allImages[activeImage]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-violet-700/10 flex items-center justify-center">
              <div className="text-7xl font-black gradient-text opacity-30">{project.title[0]}</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/50 to-transparent" />

          {/* Back button */}
          <div className="absolute top-24 left-0 right-0 container">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors glass px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </div>

        <div className="container -mt-24 relative z-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="badge badge-featured">⭐ Featured</span>
                  )}
                </div>
                <h1 className="heading-lg text-white mb-3">{project.title}</h1>
                <p className="text-white/60 text-lg leading-relaxed">{project.description}</p>
              </motion.div>

              {/* Image gallery */}
              {allImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-video glass-card">
                    <Image
                      src={allImages[activeImage]}
                      alt={`${project.title} screenshot ${activeImage + 1}`}
                      fill
                      className="object-cover"
                    />
                    {allImages.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Previous">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Next">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {allImages.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveImage(i)}
                              className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-white w-5' : 'bg-white/30'}`}
                              aria-label={`Image ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeImage ? 'border-violet-500' : 'border-transparent'}`}
                    >
                      <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Long description */}
              {project.longDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 rounded-2xl mb-6"
                >
                  <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                    About This Project
                  </h2>
                  <p className="text-white/60 leading-relaxed">{project.longDescription}</p>
                </motion.div>
              )}

              {/* Features */}
              {project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="glass-card p-6 rounded-2xl mb-6"
                >
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    Key Features
                  </h2>
                  <ul className="space-y-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex gap-3 text-white/60 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <div className="grid sm:grid-cols-2 gap-5 mb-6">
                  {project.challenges && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="glass-card p-5 rounded-2xl"
                    >
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-amber-400" />
                        Challenges
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">{project.challenges}</p>
                    </motion.div>
                  )}
                  {project.solutions && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                      className="glass-card p-5 rounded-2xl"
                    >
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-emerald-400" />
                        Solutions
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">{project.solutions}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Lessons Learned */}
              {project.lessonsLearned && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-5 rounded-2xl border-l-2 border-violet-500 mb-6"
                >
                  <h3 className="text-sm font-bold text-violet-400 mb-2">💡 Lessons Learned</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{project.lessonsLearned}</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              {/* Action buttons */}
              <div className="glass-card p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Links</h3>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center">
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
              </div>

              {/* Details */}
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Category</span>
                    <span className="text-white/80 font-medium">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Status</span>
                    <span className={`font-medium ${project.status === 'COMPLETED' ? 'text-emerald-400' : project.status === 'IN_PROGRESS' ? 'text-amber-400' : 'text-white/40'}`}>
                      {project.status === 'COMPLETED' ? '✓ Completed' : project.status === 'IN_PROGRESS' ? '⚡ In Progress' : 'Archived'}
                    </span>
                  </div>
                  {project.completedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 flex items-center gap-1"><Calendar className="w-3 h-3" /> Completed</span>
                      <span className="text-white/80">{formatDate(project.completedAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tech stack */}
              <div className="glass-card p-5 rounded-2xl">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="badge-tech">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Related projects */}
              {related.length > 0 && (
                <div className="glass-card p-5 rounded-2xl">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Related Projects</h3>
                  <div className="space-y-3">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/projects/${rel.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex-shrink-0 overflow-hidden relative">
                          {rel.thumbnail && <Image src={rel.thumbnail} alt={rel.title} fill className="object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm text-white group-hover:text-violet-300 transition-colors truncate">{rel.title}</div>
                          <div className="text-xs text-white/40">{rel.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
