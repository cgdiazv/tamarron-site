"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '../actions';
import { FilePlus, LogOut, CheckCircle, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(''); // 👈 Nuevo: Estado para el Slug personalizado
  const [excerpt, setExcerpt] = useState(''); // 👈 Nuevo: Estado para el Excerpt
  const [author, setAuthor] = useState('Tamarron Services');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<{ name: string; base64: string } | null>(null);
  
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin');
    router.refresh(); 
  };

  // Función de ayuda para sugerir un slug limpio mientras escriben el título
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Genera automáticamente una sugerencia limpia en tiempo real, pero el usuario puede editarla
    const suggestedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(suggestedSlug);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const cleanBase64 = base64String.split(',')[1];
      setImageFile({ name: file.name, base64: cleanBase64 });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    if (!imageFile) {
      setStatus({ type: 'error', message: 'Por favor, selecciona una imagen destacada desde tu computadora.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          slug, // 👈 Enviamos el slug personalizado
          excerpt, // 👈 Enviamos el excerpt personalizado
          author, 
          content,
          imageName: imageFile.name,
          imageBase64: imageFile.base64 
        }), 
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al publicar el artículo.');

      setStatus({
        type: 'success',
        message: `¡Post publicado con éxito! GitHub ya recibió todo. Slug final: ${data.slug}`,
      });
      
      // Limpiamos los campos
      setTitle('');
      setSlug('');
      setExcerpt('');
      setImageFile(null);
      setContent('');
      
      const fileInput = document.getElementById('featured-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Ocurrió un error inesperado.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* SIDEBAR DEL PORTAL */}
      <aside className="w-64 bg-[#333333] text-white flex flex-col p-6 hidden md:flex">
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#00a4dd]">Tamarron</h2>
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">CMS Dashboard</p>
        </div>
        <nav className="space-y-2 flex-grow">
          <div className="flex items-center gap-3 bg-white/5 text-white px-4 py-3 rounded-xl font-medium text-sm">
            <FilePlus size={18} className="text-[#00a4dd]" />
            <span>Crear Artículo</span>
          </div>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 text-white/60 hover:text-white px-4 py-3 rounded-xl font-medium text-sm transition-colors mt-auto group">
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow p-6 md:p-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nuevo Artículo de Blog</h1>
            <p className="text-sm text-slate-400 mt-1">Completa los campos para subir la foto y el contenido a Tamarron Services.</p>
          </div>
        </div>

        {status.type && (
          <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
            {status.type === 'success' ? <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-600" /> : <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Título de la Publicación</label>
              <input 
                type="text"
                value={title}
                onChange={handleTitleChange} // 👈 Llama a la función que sugiere el slug
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800"
                placeholder="ej. Modern Patio Design Trends in Houston"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Autor</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800"
                placeholder="Tamarron Services"
                required
              />
            </div>
          </div>

          {/* 🔗 NUEVO CAMPO: SLUG PERSONALIZADO */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">URL Slug (SEO)</label>
            <input 
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} // Fuerza guiones bajos/espacios a guión medio
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800 font-mono"
              placeholder="modern-patio-design-trends"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Esta será la dirección web del post. Ej: `tamarron.com/blog/<strong>modern-patio-design-trends</strong>`</p>
          </div>

          {/* 📝 NUEVO CAMPO: EXCERPT (RESUMEN) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Excerpt (Resumen Corto para la Grilla)</label>
            <textarea 
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-700"
              placeholder="Descubre las últimas tendencias en el diseño de patios modernos en el área de Houston..."
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Un texto breve de 2 líneas que enganche al lector en la página principal del blog.</p>
          </div>

          {/* INPUT DE SUBIDA LOCAL */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Imagen Destacada (Desde tu Computadora)</label>
            <div className="relative flex items-center justify-center w-full bg-slate-50 border border-dashed border-slate-300 hover:border-[#00a4dd] transition-colors rounded-2xl p-6">
              <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-center flex flex-col items-center gap-2">
                <div className="p-3 bg-white shadow-sm rounded-xl text-[#00a4dd]">
                  <ImageIcon size={20} />
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {imageFile ? `✓ Archivo seleccionado: ${imageFile.name}` : "Haga clic para buscar o arrastre la imagen aquí"}
                </p>
                <p className="text-[10px] text-slate-400">Soporta JPG, PNG, WEBP</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contenido del Post (Acepta HTML estructurado)</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all font-mono text-slate-700"
              placeholder="<p>This is a main paragraph.</p>"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00a4dd] hover:bg-sky-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Subiendo foto y guardando en Tamarron Services...</span>
                </>
              ) : (
                <span>Publicar Artículo</span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}