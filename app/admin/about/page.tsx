'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAboutPage() {
  const [form, setForm] = useState({ name: '', title: '', bio: '', shortBio: '', profilePhoto: '', resumeUrl: '', email: '', phone: '', location: '', available: true, github: '', linkedin: '', twitter: '', instagram: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/about').then((r) => r.json()).then((d) => {
      if (d.success && d.data) {
        const about = d.data;
        setForm({ name: about.name || '', title: about.title || '', bio: about.bio || '', shortBio: about.shortBio || '', profilePhoto: about.profilePhoto || '', resumeUrl: about.resumeUrl || '', email: about.email || '', phone: about.phone || '', location: about.location || '', available: about.available ?? true, github: about.socialLinks?.github || '', linkedin: about.socialLinks?.linkedin || '', twitter: about.socialLinks?.twitter || '', instagram: about.socialLinks?.instagram || '' });
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { name: form.name, title: form.title, bio: form.bio, shortBio: form.shortBio, profilePhoto: form.profilePhoto, resumeUrl: form.resumeUrl, email: form.email, phone: form.phone, location: form.location, available: form.available, socialLinks: { github: form.github, linkedin: form.linkedin, twitter: form.twitter, instagram: form.instagram } };
    const r = await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const d = await r.json();
    if (d.success) toast.success('About section updated!'); else toast.error('Failed to save');
    setSaving(false);
  };

  const F = (fn: string, label: string, type = 'text', rows?: number) => (
    <div>
      <label className="form-label">{label}</label>
      {rows ? (
        <textarea value={(form as any)[fn]} onChange={(e) => setForm((f: any) => ({ ...f, [fn]: e.target.value }))} rows={rows} className="form-input" />
      ) : (
        <input type={type} value={(form as any)[fn]} onChange={(e) => setForm((f: any) => ({ ...f, [fn]: e.target.value }))} className="form-input" />
      )}
    </div>
  );

  if (loading) return <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-white/30" /></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6"><h1 className="text-xl font-bold text-white">About Section</h1><p className="text-white/40 text-sm">Update your personal information and bio.</p></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Personal Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {F('name', 'Full Name')}
            {F('title', 'Professional Title')}
            {F('email', 'Email', 'email')}
            {F('phone', 'Phone', 'tel')}
            {F('location', 'Location')}
            {F('profilePhoto', 'Profile Photo URL', 'url')}
            {F('resumeUrl', 'Resume URL', 'url')}
          </div>
          {F('bio', 'Full Bio', 'text', 4)}
          {F('shortBio', 'Short Bio (tagline)', 'text', 2)}
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.available} onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))} className="accent-violet-500" /><span className="text-sm text-white/60">Currently available for work</span></label>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {F('github', 'GitHub URL', 'url')}
            {F('linkedin', 'LinkedIn URL', 'url')}
            {F('twitter', 'Twitter/X URL', 'url')}
            {F('instagram', 'Instagram URL', 'url')}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60 w-full justify-center">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </form>
    </div>
  );
}
