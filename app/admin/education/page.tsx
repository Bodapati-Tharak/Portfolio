'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminEducationPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const emptyForm = { college: '', degree: '', field: '', cgpa: '', maxCgpa: '10', startYear: '', endYear: '', current: false, description: '', coursework: '', achievements: '' };
  const [form, setForm] = useState(emptyForm);

  const fetch_ = async () => { const r = await fetch('/api/education'); const d = await r.json(); if (d.success) setItems(d.data); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const startEdit = (item: any) => {
    setForm({
      college: item.college, degree: item.degree, field: item.field,
      cgpa: item.cgpa?.toString() || '', maxCgpa: item.maxCgpa?.toString() || '10',
      startYear: item.startYear?.toString() || '', endYear: item.endYear?.toString() || '',
      current: item.current, description: item.description || '',
      coursework: (item.coursework || []).join(', '), achievements: (item.achievements || []).join('\n'),
    });
    setEditing(item); setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, cgpa: form.cgpa ? Number(form.cgpa) : null, maxCgpa: Number(form.maxCgpa), startYear: Number(form.startYear), endYear: form.endYear ? Number(form.endYear) : null, coursework: form.coursework.split(',').map((s) => s.trim()).filter(Boolean), achievements: form.achievements.split('\n').filter(Boolean) };
    const url = editing ? `/api/education/${editing.id}` : '/api/education';
    const method = editing ? 'PUT' : 'POST';
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const d = await r.json();
    if (d.success) { toast.success(editing ? 'Updated!' : 'Added!'); setEditing(null); setShowForm(false); setForm(emptyForm); fetch_(); }
    else toast.error(d.error || 'Failed');
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    const r = await fetch(`/api/education/${id}`, { method: 'DELETE' });
    const d = await r.json();
    if (d.success) { toast.success('Deleted!'); fetch_(); } else toast.error('Failed');
  };

  const FormEl = () => (
    <div className="glass-card p-6 rounded-2xl mb-6">
      <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit' : 'New'} Education</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="form-label">College *</label><input value={form.college} onChange={(e) => setForm((f) => ({ ...f, college: e.target.value }))} className="form-input" required /></div>
          <div><label className="form-label">Degree *</label><input value={form.degree} onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))} className="form-input" required /></div>
          <div><label className="form-label">Field of Study *</label><input value={form.field} onChange={(e) => setForm((f) => ({ ...f, field: e.target.value }))} className="form-input" required /></div>
          <div><label className="form-label">CGPA</label><input type="number" step="0.01" value={form.cgpa} onChange={(e) => setForm((f) => ({ ...f, cgpa: e.target.value }))} className="form-input" /></div>
          <div><label className="form-label">Start Year *</label><input type="number" value={form.startYear} onChange={(e) => setForm((f) => ({ ...f, startYear: e.target.value }))} className="form-input" required /></div>
          <div><label className="form-label">End Year</label><input type="number" value={form.endYear} onChange={(e) => setForm((f) => ({ ...f, endYear: e.target.value }))} className="form-input" disabled={form.current} /></div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))} className="accent-violet-500" /><span className="text-sm text-white/60">Currently enrolled</span></label>
        <div><label className="form-label">Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="form-input" /></div>
        <div><label className="form-label">Coursework (comma separated)</label><input value={form.coursework} onChange={(e) => setForm((f) => ({ ...f, coursework: e.target.value }))} className="form-input" /></div>
        <div><label className="form-label">Achievements (one per line)</label><textarea value={form.achievements} onChange={(e) => setForm((f) => ({ ...f, achievements: e.target.value }))} rows={2} className="form-input" /></div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{editing ? 'Save' : 'Add'}</button>
          <button type="button" onClick={() => { setEditing(null); setShowForm(false); setForm(emptyForm); }} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Education</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }} className="btn-primary"><Plus className="w-4 h-4" />Add</button>
      </div>
      {(showForm || editing) && <FormEl />}
      {loading ? <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-white/30" /></div> : (
        <div className="space-y-4">
          {items.map((edu) => (
            <div key={edu.id} className="glass-card p-5 rounded-2xl flex items-start justify-between gap-4">
              <div>
                <div className="font-bold text-white">{edu.college}</div>
                <div className="text-violet-400 text-sm">{edu.degree} in {edu.field}</div>
                <div className="text-white/40 text-xs mt-1">{edu.startYear} — {edu.current ? 'Present' : edu.endYear}{edu.cgpa && ` · CGPA: ${edu.cgpa}`}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(edu)} className="btn-ghost p-2 text-violet-400"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => del(edu.id)} className="btn-ghost p-2 text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-white/30">No education entries yet.</div>}
        </div>
      )}
    </div>
  );
}
