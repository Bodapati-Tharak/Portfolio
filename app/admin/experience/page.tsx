'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDateRange } from '@/lib/utils';
import type { Experience } from '@/types';

function ExpForm({ initial, onSave, onCancel }: { initial?: Partial<Experience>; onSave: (d: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    company: initial?.company || '', role: initial?.role || '', location: initial?.location || '',
    locationType: initial?.locationType || 'hybrid',
    startDate: initial?.startDate ? new Date(initial.startDate).toISOString().slice(0, 7) : '',
    endDate: initial?.endDate ? new Date(initial.endDate).toISOString().slice(0, 7) : '',
    current: initial?.current || false,
    description: initial?.description || '',
    responsibilities: (initial?.responsibilities || []).join('\n'),
    technologies: (initial?.technologies || []).join(', '),
    achievements: (initial?.achievements || []).join('\n'),
    displayOrder: initial?.displayOrder || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      await onSave({
        ...form,
        startDate: form.startDate + '-01',
        endDate: form.endDate ? form.endDate + '-01' : null,
        responsibilities: form.responsibilities.split('\n').filter(Boolean),
        technologies: form.technologies.split(',').map((s) => s.trim()).filter(Boolean),
        achievements: form.achievements.split('\n').filter(Boolean),
        displayOrder: Number(form.displayOrder),
      });
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="form-label">Company *</label><input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className="form-input" required /></div>
        <div><label className="form-label">Role *</label><input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="form-input" required /></div>
        <div><label className="form-label">Location</label><input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="form-input" /></div>
        <div><label className="form-label">Type</label>
          <select value={form.locationType} onChange={(e) => setForm((f) => ({ ...f, locationType: e.target.value }))} className="form-input">
            <option value="remote">Remote</option><option value="hybrid">Hybrid</option><option value="onsite">On-site</option>
          </select>
        </div>
        <div><label className="form-label">Start Date</label><input type="month" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} className="form-input" required /></div>
        <div><label className="form-label">End Date</label><input type="month" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} className="form-input" disabled={form.current} /></div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked, endDate: e.target.checked ? '' : f.endDate }))} className="accent-violet-500" /><span className="text-sm text-white/60">Currently working here</span></label>
      <div><label className="form-label">Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="form-input" /></div>
      <div><label className="form-label">Responsibilities (one per line)</label><textarea value={form.responsibilities} onChange={(e) => setForm((f) => ({ ...f, responsibilities: e.target.value }))} rows={3} className="form-input" /></div>
      <div><label className="form-label">Technologies (comma separated)</label><input value={form.technologies} onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))} className="form-input" /></div>
      <div><label className="form-label">Achievements (one per line)</label><textarea value={form.achievements} onChange={(e) => setForm((f) => ({ ...f, achievements: e.target.value }))} rows={2} className="form-input" /></div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{initial?.id ? 'Save' : 'Add'}</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);

  const fetch_ = async () => { const r = await fetch('/api/experience'); const d = await r.json(); if (d.success) setItems(d.data); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const save = async (data: any) => {
    const url = editing ? `/api/experience/${editing.id}` : '/api/experience';
    const method = editing ? 'PUT' : 'POST';
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const d = await r.json();
    if (d.success) { toast.success(editing ? 'Updated!' : 'Added!'); setEditing(null); setShowForm(false); fetch_(); }
    else toast.error(d.error || 'Failed');
  };

  const del = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    const r = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    const d = await r.json();
    if (d.success) { toast.success('Deleted!'); fetch_(); } else toast.error('Failed');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Experience</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="btn-primary"><Plus className="w-4 h-4" />Add</button>
      </div>

      {(showForm || editing) && (
        <div className="glass-card p-6 rounded-2xl mb-6">
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit' : 'New'} Experience</h2>
          <ExpForm initial={editing || undefined} onSave={save} onCancel={() => { setShowForm(false); setEditing(null); }} />
        </div>
      )}

      {loading ? <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-white/30" /></div> : (
        <div className="space-y-4">
          {items.map((exp) => (
            <div key={exp.id} className="glass-card p-5 rounded-2xl flex items-start justify-between gap-4">
              <div>
                <div className="font-bold text-white">{exp.role}</div>
                <div className="text-violet-400 text-sm">{exp.company}</div>
                <div className="text-white/40 text-xs mt-1">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(exp); setShowForm(false); }} className="btn-ghost p-2 text-violet-400"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => del(exp.id)} className="btn-ghost p-2 text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-white/30">No experience entries yet.</div>}
        </div>
      )}
    </div>
  );
}
