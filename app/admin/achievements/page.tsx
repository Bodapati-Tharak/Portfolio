'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate, getCategoryLabel } from '@/lib/utils';
import type { AchievementType } from '@/types';

const TYPES: AchievementType[] = ['HACKATHON', 'AWARD', 'OPEN_SOURCE', 'PUBLIC_SPEAKING', 'COMPETITION', 'OTHER'];

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const empty = { title: '', type: 'HACKATHON', description: '', date: '', url: '', image: '', position: '', organizer: '', displayOrder: '0' };
  const [form, setForm] = useState(empty);

  const fetch_ = async () => { const r = await fetch('/api/achievements'); const d = await r.json(); if (d.success) setItems(d.data); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const startEdit = (item: any) => {
    setForm({ title: item.title, type: item.type, description: item.description, date: new Date(item.date).toISOString().slice(0, 10), url: item.url || '', image: item.image || '', position: item.position || '', organizer: item.organizer || '', displayOrder: item.displayOrder?.toString() || '0' });
    setEditing(item); setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, displayOrder: Number(form.displayOrder) };
    const url = editing ? `/api/achievements/${editing.id}` : '/api/achievements';
    const r = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const d = await r.json();
    if (d.success) { toast.success(editing ? 'Updated!' : 'Added!'); setEditing(null); setShowForm(false); setForm(empty); fetch_(); }
    else toast.error(d.error || 'Failed');
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    const r = await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
    const d = await r.json();
    if (d.success) { toast.success('Deleted!'); fetch_(); } else toast.error('Failed');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Achievements</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} className="btn-primary"><Plus className="w-4 h-4" />Add</button>
      </div>

      {(showForm || editing) && (
        <div className="glass-card p-6 rounded-2xl mb-6">
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit' : 'New'} Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="form-label">Title *</label><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="form-input" required /></div>
              <div><label className="form-label">Type *</label><select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="form-input">{TYPES.map((t) => <option key={t} value={t}>{getCategoryLabel(t)}</option>)}</select></div>
              <div><label className="form-label">Date *</label><input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="form-input" required /></div>
              <div><label className="form-label">Position (e.g., 1st Place)</label><input value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} className="form-input" /></div>
              <div><label className="form-label">Organizer</label><input value={form.organizer} onChange={(e) => setForm((f) => ({ ...f, organizer: e.target.value }))} className="form-input" /></div>
              <div><label className="form-label">URL</label><input type="url" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className="form-input" /></div>
            </div>
            <div><label className="form-label">Description *</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="form-input" required /></div>
            <div className="flex gap-3"><button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{editing ? 'Save' : 'Add'}</button><button type="button" onClick={() => { setEditing(null); setShowForm(false); }} className="btn-secondary">Cancel</button></div>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-white/30" /></div> : (
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a.id} className="glass-card p-4 rounded-xl flex items-start justify-between gap-4">
              <div><div className="font-bold text-white text-sm">{a.title}</div><div className="text-violet-400 text-xs">{getCategoryLabel(a.type)}{a.position ? ` · ${a.position}` : ''}</div><div className="text-white/40 text-xs mt-1">{formatDate(a.date)}{a.organizer ? ` · ${a.organizer}` : ''}</div></div>
              <div className="flex gap-1 flex-shrink-0"><button onClick={() => startEdit(a)} className="btn-ghost p-1.5 text-violet-400"><Pencil className="w-3.5 h-3.5" /></button><button onClick={() => del(a.id)} className="btn-ghost p-1.5 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-white/30">No achievements yet.</div>}
        </div>
      )}
    </div>
  );
}
