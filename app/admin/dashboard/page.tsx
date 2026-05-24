"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '../actions';
import { FilePlus, LogOut, CheckCircle, AlertCircle, Loader2, Image as ImageIcon, Newspaper, Eye, Trash2 } from 'lucide-react';

interface SimplePost {
  title: string;
  date: string;
  slug: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('create');
  const [posts, setPosts] = useState<SimplePost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null); // 👈 Controla qué post se está borrando

  // Estados del Formulario de Creación
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(''); 
  const [excerpt, setExcerpt] = useState(''); 
  const [author, setAuthor] = useState('Tamarron Services');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<{ name: string; base64: string } | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    if (activeTab === 'view') {
      fetchArticles();
    }
  }, [activeTab]);

  const fetchArticles = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/admin-posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Error cargando posts", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  // 🎯 Nueva función para eliminar el artículo con confirmación nativa
  const handleDelete = async (postSlug: string, postTitle: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el artículo "${postTitle}"? Esta acción no se puede deshacer.`);
    if (!confirmDelete) return;

    setDeletingSlug(postSlug);
    try {
      const res = await fetch('/api/admin-posts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: postSlug }),
      });

      if (res.ok) {
        // Removemos el post localmente del estado para que desaparezca visualmente de inmediato
        setPosts(prev => prev.filter(p => p.slug !== postSlug));
      } else {
        const data = await res.json();
        alert(data.error || 'No se pudo eliminar el artículo.');
      }
    } catch (err) {
      console.error("Error eliminando post:", err);
      alert('Ocurrió un error al intentar eliminar el artículo.');
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin');
    router.refresh(); 
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
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
        body: JSON.stringify({ title, slug, excerpt, author, content, imageName: imageFile.name, imageBase64: imageFile.base64 }), 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al publicar el artículo.');

      setStatus({
        type: 'success',
        message: `¡Post publicado con éxito! Tamarron Services ya recibió todo. Slug final: ${data.slug}`,
      });
      
      setTitle(''); setSlug(''); setExcerpt(''); setImageFile(null); setContent('');
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
      <aside className="w-64 bg-[#333333] text-white flex flex-col p-6 hidden md:flex shrink-0">
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#00a4dd]">Tamarron</h2>
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">CMS Dashboard</p>
        </div>
        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab('create')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'create' ? 'bg-white/5 text-white' : 'text-white/60 hover:text-white'}`}
          >
            <FilePlus size={18} className={activeTab === 'create' ? 'text-[#00a4dd]' : ''} />
            <span>Crear Artículo</span>
          </button>

          <button 
            onClick={() => setActiveTab('view')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'view' ? 'bg-white/5 text-white' : 'text-white/60 hover:text-white'}`}
          >
            <Newspaper size={18} className={activeTab === 'view' ? 'text-[#00a4dd]' : ''} />
            <span>Ver Artículos</span>
          </button>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 text-white/60 hover:text-white px-4 py-3 rounded-xl font-medium text-sm transition-colors mt-auto group">
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow p-6 md:p-12 max-w-4xl">
        
        {/* VISTA A: FORMULARIO DE CREACIÓN */}
        {activeTab === 'create' && (
          <>
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
                  <input type="text" value={title} onChange={handleTitleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800" placeholder="ej. Modern Patio Design Trends in Houston" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Autor</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800" placeholder="Tamarron Services" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">URL Slug (SEO)</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800 font-mono" placeholder="modern-patio-design-trends" required />
                <p className="text-[11px] text-slate-400 mt-1">Esta será la dirección web del post. Ej: tamarron.com/blog/modern-patio-design-trends</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Excerpt (Resumen Corto para la Grilla)</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} maxLength={200} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-700" placeholder="Descubre las últimas tendencias en el diseño de patios modernos..." required />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Imagen Destacada (Desde tu Computadora)</label>
                <div className="relative flex items-center justify-center w-full bg-slate-50 border border-dashed border-slate-300 hover:border-[#00a4dd] transition-colors rounded-2xl p-6">
                  <input type="file" id="featured-image" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="p-3 bg-white shadow-sm rounded-xl text-[#00a4dd]"><ImageIcon size={20} /></div>
                    <p className="text-xs font-semibold text-slate-700">{imageFile ? `✓ Archivo seleccionado: ${imageFile.name}` : "Haga clic para buscar o arrastre la imagen aquí"}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contenido del Post (Acepta HTML estructurado)</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all font-mono text-slate-700" placeholder="<p>This is a main paragraph.</p>" required />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" disabled={isSubmitting} className="bg-[#00a4dd] hover:bg-sky-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  <span>Publicar Artículo</span>
                </button>
              </div>
            </form>
          </>
        )}

        {/* 🎯 VISTA B: TABLA DE ARTÍCULOS PUBLICADOS */}
        {activeTab === 'view' && (
          <>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Artículos Publicados</h1>
                <p className="text-sm text-slate-400 mt-1">Lista unificada de contenidos activos en el blog de Tamarron Services.</p>
              </div>
            </div>

            {loadingPosts ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100">
                <Loader2 size={32} className="animate-spin text-[#00a4dd] mb-2" />
                <p className="text-sm text-slate-400">Consultando base de datos de artículos...</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Título del Artículo</th>
                        <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-40">Fecha</th>
                        <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-36 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {posts.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-slate-400">No se encontraron artículos publicados.</td>
                        </tr>
                      ) : (
                        posts.map((post, index) => (
                          <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-5 font-semibold text-slate-800">{post.title}</td>
                            <td className="p-5 text-slate-500 font-mono text-xs">{post.date}</td>
                            <td className="p-5 flex items-center justify-center gap-2">
                              {/* Icono de Ver en vivo */}
                              <a 
                                href={`/blog/${post.slug}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center p-2 bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-[#00a4dd] rounded-lg transition-colors"
                                title="Ver post en vivo"
                              >
                                <Eye size={16} />
                              </a>
                              
                              {/* 🎯 Icono de Eliminar Artículo */}
                              <button
                                onClick={() => handleDelete(post.slug, post.title)}
                                disabled={deletingSlug === post.slug}
                                className="inline-flex items-center justify-center p-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                                title="Eliminar artículo"
                              >
                                {deletingSlug === post.slug ? (
                                  <Loader2 size={16} className="animate-spin" />
                                ) : (
                                  <Trash2 size={16} />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}