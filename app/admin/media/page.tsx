'use client';

import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, Loader2, Copy, Check, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { formatBytes } from '@/lib/utils';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    const r = await fetch('/api/upload');
    const d = await r.json();
    if (d.success) setAssets(d.data);
    setLoading(false);
  };

  useEffect(() => { fetchAssets(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Max 10MB.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'portfolio');

    try {
      const r = await fetch('/api/upload', { method: 'POST', body: formData });
      const d = await r.json();
      if (d.success) { toast.success('Uploaded!'); fetchAssets(); }
      else toast.error(d.error || 'Upload failed');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm('Delete this asset? It may break existing references.')) return;
    const r = await fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId }) });
    const d = await r.json();
    if (d.success) { toast.success('Deleted!'); fetchAssets(); }
    else toast.error('Failed to delete');
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success('URL copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Media Library</h1>
          <p className="text-white/40 text-sm">{assets.length} assets</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" id="file-upload" />
          <label htmlFor="file-upload">
            <div className={`btn-primary cursor-pointer inline-flex items-center gap-2 ${uploading ? 'opacity-60' : ''}`}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? 'Uploading...' : 'Upload Image'}
            </div>
          </label>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className="mb-6 border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file && fileInputRef.current) {
            const dt = new DataTransfer();
            dt.items.add(file);
            fileInputRef.current.files = dt.files;
            handleUpload({ target: fileInputRef.current } as any);
          }
        }}
      >
        <ImageIcon className="w-10 h-10 text-white/20 mx-auto mb-3" />
        <p className="text-white/40 text-sm">Drag & drop images here, or click to browse</p>
        <p className="text-white/20 text-xs mt-1">PNG, JPG, GIF, WebP up to 10MB</p>
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto text-white/30" /></div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12 text-white/30">No images uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="group relative glass-card rounded-xl overflow-hidden aspect-square">
              <Image src={asset.secureUrl} alt={asset.publicId} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <button onClick={() => copyUrl(asset.secureUrl)} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="Copy URL">
                  {copied === asset.secureUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white" />}
                </button>
                <button onClick={() => handleDelete(asset.publicId)} className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/40 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
              {asset.bytes && (
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 text-xs text-white/50 text-center truncate">
                  {formatBytes(asset.bytes)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
