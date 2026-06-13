'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, Instagram, Send, Check, MapPin, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: '#6e40c9' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: '#e1306c' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', color: '#7c3aed' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSent(true);
        toast.success('Message sent! I\'ll get back to you soon 🚀');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.error || 'Failed to send message.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="section relative">
      <div className="absolute inset-0 bg-gradient-radial from-violet-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-label">
            <MessageSquare className="w-3 h-3" />
            Contact
          </div>
          <h2 className="heading-xl text-white mb-4">
            Let's Work{' '}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Have a project in mind or just want to chat? My inbox is always open. I'll try to respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">Available for Hire</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Currently open to full-time roles, freelance projects, and exciting collaborations. Let's build something amazing.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:hello@example.com" className="flex items-center gap-3 p-3 rounded-xl glass glass-hover group">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40">Email</div>
                  <div className="text-sm text-white group-hover:text-violet-300 transition-colors">hello@example.com</div>
                </div>
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl glass">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40">Location</div>
                  <div className="text-sm text-white">San Francisco, CA</div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:scale-110 transition-all"
                    style={{ '--hover-color': color } as React.CSSProperties}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project collaboration, job opportunity..."
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and budget..."
                  rows={5}
                  className="form-input resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || sent}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
