'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCategoryLabel, getCategoryColor } from '@/lib/utils';
import type { Skill, SkillCategory } from '@/types';

const CATEGORIES: SkillCategory[] = ['PROGRAMMING', 'WEB_DEVELOPMENT', 'AI_ML', 'CLOUD', 'DATABASE', 'TOOLS', 'LANGUAGES'];

function SkillForm({ initial, onSave, onCancel }: {
  initial?: Partial<Skill>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    category: initial?.category || 'PROGRAMMING',
    icon: initial?.icon || '',
    level: initial?.level || 80,
    displayOrder: initial?.displayOrder || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="form-label">Skill Name *</label>
        <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="React" className="form-input" required />
      </div>
      <div>
        <label className="form-label">Category *</label>
        <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as SkillCategory }))} className="form-input">
          {CATEGORIES.map((c) => <option key={c} value={c}>{getCategoryLabel(c)}</option>)}
        </select>
      </div>
      <div>
        <label className="form-label">Icon URL (optional)</label>
        <input value={form.icon || ''} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} placeholder="https://..." className="form-input" />
      </div>
      <div>
        <label className="form-label">Experience Level: {form.level}%</label>
        <input type="range" min="0" max="100" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: Number(e.target.value) }))} className="w-full accent-violet-500" />
      </div>
      <div>
        <label className="form-label">Display Order</label>
        <input type="number" value={form.displayOrder} onChange={(e) => setForm((f) => ({ ...f, displayOrder: Number(e.target.value) }))} className="form-input" />
      </div>
      <div className="flex items-end gap-2">
        <button type="submit" disabled={saving} className="btn-primary h-9 disabled:opacity-60">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {initial?.id ? 'Save' : 'Add Skill'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary h-9">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    const data = await res.json();
    if (data.success) setSkills(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleCreate = async (formData: any) => {
    const res = await fetch('/api/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    const data = await res.json();
    if (data.success) { toast.success('Skill added!'); setShowForm(false); fetchSkills(); }
    else toast.error(data.error || 'Failed');
  };

  const handleUpdate = async (formData: any) => {
    if (!editing) return;
    const res = await fetch(`/api/skills/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    const data = await res.json();
    if (data.success) { toast.success('Skill updated!'); setEditing(null); fetchSkills(); }
    else toast.error(data.error || 'Failed');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { toast.success('Deleted!'); fetchSkills(); }
    else toast.error('Failed to delete');
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Skills</h1>
          <p className="text-white/40 text-sm">{skills.length} skills total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="btn-primary">
          <Plus className="w-4 h-4" />Add Skill
        </button>
      </div>

      {(showForm || editing) && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl mb-6">
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit Skill' : 'New Skill'}</h2>
          <SkillForm
            initial={editing || undefined}
            onSave={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-12 text-white/30"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, catSkills]) => {
            const color = getCategoryColor(cat);
            return (
              <div key={cat} className="glass-card rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-semibold text-white/60">{getCategoryLabel(cat)}</span>
                  <span className="ml-auto text-xs text-white/30">{catSkills.length}</span>
                </div>
                <div className="divide-y divide-white/5">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-4 px-4 py-3">
                      <span className="text-sm font-medium text-white flex-1">{skill.name}</span>
                      <div className="w-32 skill-bar hidden sm:block">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
                      </div>
                      <span className="text-xs text-white/40 w-10 text-right">{skill.level}%</span>
                      <div className="flex gap-1">
                        <button onClick={() => { setEditing(skill); setShowForm(false); }} className="btn-ghost p-1.5 text-violet-400"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(skill.id)} className="btn-ghost p-1.5 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {skills.length === 0 && <div className="text-center py-12 text-white/30">No skills yet. Add your first skill!</div>}
        </div>
      )}
    </div>
  );
}
