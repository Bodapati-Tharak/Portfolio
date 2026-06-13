'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

export default function AdminCertificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const empty = { title: '', issuer: '', date: '', expiryDate: '', credentialId: '', credentialUrl: '', image: '', description: '', skills: '', displayOrder: '0' };
  const [form, setForm] = useState(empty);

  const fetch_ = async () => { const r = await fetch('/api/certifications'); const d = await r.json(); if (d.success) setItems(d.data); setLoading(false); };
  useEffect(() => { fetch_(); }, []);

  const startEdit = (item: any) => {
    setForm({ title: item.title, issuer: item.issuer, date: new Date(item.date).toISOString().slice(0, 10), expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().slice(0, 10) : '', credentialId: item.credentialId || '', credentialUrl: item.credentialUrl || '', image: item.image || '', description: item.description || '', skills: (item.skills || []).join(', '), displayOrder: item.displayOrder?.toString() || '0' });
    setEditing(item); setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, date: form.date, expiryDate: form.expiryDate || null, skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean), displayOrder: Number(form.displayOrder) };
    const url = editing ? `/api/certifications/${editing.id}` : '/api/certifications';
    const r = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const d = await r.json();
    if (d.success) { toast.success(editing ? 'Updated!' : 'Added!'); setEditing(null); setShowForm(false); setForm(empty); fetch_(); }
    else toast.error(d.error || 'Failed');
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    const r = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
    const d = await r.json();
    if (d.success) { toast.success('Deleted!'); fetch_(); } else toast.error('Failed');
  };

  const F = (fn: string, label: string, type = 'text', required = false) => (
    <div><label className="form-label">{label}{required ? ' *' : ''}</label><input type={type} value={(form as any)[fn]} onChange={(e) => setForm((f: any) => ({ ...f, [fn]: e.target.value }))} className="form-input" required={required} /></div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Certifications</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} className="btn-primary"><Plus className="w-4 h-4" />Add</button>
      </div>

      {(showForm || editing) && (
        <div className="glass-card p-6 rounded-2xl mb-6">
          <h2 className="text-lg font-bold text-white mb-4">{editing ? 'Edit' : 'New'} Certification</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {F('title', 'Title', 'text', true)}
              {F('issuer', 'Issuer', 'text', true)}
              {F('date', 'Issue Date', 'date', true)}
              {F('expiryDate', 'Expiry Date', 'date')}
              {F('credentialId', 'Credential ID')}
              {F('credentialUrl', 'Credential URL', 'url')}
              {F('image', 'Certificate Image URL', 'url')}
              {F('displayOrder', 'Display Order', 'number')}
            </div>
            <div><label className="form-label">Description</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="form-input" /></div>
            <div><label className="form-label">Skills (comma separated)</label><input value={form.skills} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))} className="form-input" /></div>
            <div className="flex gap-3"><button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{editing ? 'Save' : 'Add'}</button><button type="button" onClick={() => { setEditing(null); setShowForm(false); }} className="btn-secondary">Cancel</button></div>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-white/30" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((cert) => (
            <div key={cert.id} className="glass-card p-4 rounded-xl">
              <div className="flex justify-between gap-2 mb-2">
                <div><div className="font-bold text-white text-sm">{cert.title}</div><div className="text-violet-400 text-xs">{cert.issuer}</div><div className="text-white/40 text-xs mt-1">{formatDate(cert.date)}</div></div>
                <div className="flex gap-1 flex-shrink-0">
                  {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost p-1.5 text-white/40"><ExternalLink className="w-3.5 h-3.5" /></a>}
                  <button onClick={() => startEdit(cert)} className="btn-ghost p-1.5 text-violet-400"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(cert.id)} className="btn-ghost p-1.5 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-12 text-white/30 col-span-2">No certifications yet.</div>}
        </div>
      )}
    </div>
  );
}
