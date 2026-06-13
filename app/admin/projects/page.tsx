'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Star, ExternalLink, Github, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Project } from '@/types';

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Project>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    longDescription: initial?.longDescription || '',
    category: initial?.category || '',
    techStack: (initial?.techStack || []).join(', '),
    githubUrl: initial?.githubUrl || '',
    liveUrl: initial?.liveUrl || '',
    thumbnail: initial?.thumbnail || '',
    featured: initial?.featured || false,
    status: initial?.status || 'COMPLETED',
    features: (initial?.features || []).join('\n'),
    challenges: initial?.challenges || '',
    solutions: initial?.solutions || '',
    lessonsLearned: initial?.lessonsLearned || '',
    displayOrder: initial?.displayOrder || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        ...form,
        techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        features: form.features.split('\n').map((s) => s.trim()).filter(Boolean),
        displayOrder: Number(form.displayOrder),
      });
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    const slug = form.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    setForm((f) => ({ ...f, slug }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Project Title *</label>
          <input name="title" value={form.title} onChange={handleChange} onBlur={generateSlug} placeholder="My Awesome Project" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Slug *</label>
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="my-awesome-project" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Category *</label>
          <input name="category" value={form.category} onChange={handleChange} placeholder="Web Development" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="form-input">
            <option value="COMPLETED">Completed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Short Description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={2} placeholder="Brief description of your project..." className="form-input" required />
      </div>

      <div>
        <label className="form-label">Long Description</label>
        <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows={4} placeholder="Detailed description..." className="form-input" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">GitHub URL</label>
          <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="form-input" type="url" />
        </div>
        <div>
          <label className="form-label">Live URL</label>
          <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://project.com" className="form-input" type="url" />
        </div>
      </div>

      <div>
        <label className="form-label">Thumbnail URL</label>
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://res.cloudinary.com/..." className="form-input" />
      </div>

      <div>
        <label className="form-label">Tech Stack (comma separated)</label>
        <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, PostgreSQL, Docker" className="form-input" />
      </div>

      <div>
        <label className="form-label">Features (one per line)</label>
        <textarea name="features" value={form.features} onChange={handleChange} rows={3} placeholder="Real-time collaboration&#10;Multi-language support&#10;Dark mode" className="form-input" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Challenges</label>
          <textarea name="challenges" value={form.challenges} onChange={handleChange} rows={2} className="form-input" />
        </div>
        <div>
          <label className="form-label">Solutions</label>
          <textarea name="solutions" value={form.solutions} onChange={handleChange} rows={2} className="form-input" />
        </div>
      </div>

      <div>
        <label className="form-label">Lessons Learned</label>
        <textarea name="lessonsLearned" value={form.lessonsLearned} onChange={handleChange} rows={2} className="form-input" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 accent-violet-500"
          />
          <span className="text-sm text-white/60">Featured Project</span>
        </label>
        <div className="flex items-center gap-2">
          <label className="form-label mb-0">Order</label>
          <input name="displayOrder" type="number" value={form.displayOrder} onChange={handleChange} className="form-input w-20" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {initial?.id ? 'Save Changes' : 'Create Project'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    if (data.success) setProjects(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (formData: any) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success('Project created!');
      setShowForm(false);
      fetchProjects();
    } else {
      toast.error(data.error || 'Failed to create project');
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!editing) return;
    const res = await fetch(`/api/projects/${editing.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success('Project updated!');
      setEditing(null);
      fetchProjects();
    } else {
      toast.error(data.error || 'Failed to update');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setDeleting(slug);
    const res = await fetch(`/api/projects/${slug}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      toast.success('Project deleted!');
      fetchProjects();
    } else {
      toast.error('Failed to delete');
    }
    setDeleting(null);
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Projects</h1>
          <p className="text-white/40 text-sm">{projects.length} projects total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Form */}
      {(showForm || editing) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Project' : 'New Project'}</h2>
          <ProjectForm
            initial={editing || undefined}
            onSave={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </motion.div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input pl-9"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/30">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-white/30">No projects found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Project</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-sm">{project.title}</span>
                        {project.featured && <Star className="w-3 h-3 text-amber-400 fill-current" />}
                      </div>
                      <div className="text-xs text-white/30 mt-0.5">{project.slug}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-white/50">{project.category}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`text-xs font-medium ${project.status === 'COMPLETED' ? 'text-emerald-400' : project.status === 'IN_PROGRESS' ? 'text-amber-400' : 'text-white/30'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-1.5" aria-label="Live">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-1.5" aria-label="GitHub">
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button onClick={() => { setEditing(project); setShowForm(false); }} className="btn-ghost p-1.5 text-violet-400" aria-label="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.slug)}
                          disabled={deleting === project.slug}
                          className="btn-ghost p-1.5 text-red-400 hover:text-red-300"
                          aria-label="Delete"
                        >
                          {deleting === project.slug ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
