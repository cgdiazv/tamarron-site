import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCombinedPosts } from '@/lib/blogReader';

export const revalidate = 60; // Vercel revisará si hay posts nuevos en Git cada 60 segundos

export default async function BlogPage() {
  // 1. Traemos el universo de artículos híbridos
  const rawPosts = await getCombinedPosts(); 

  // 2. 🎯 Los ordenamos cronológicamente: el más reciente primero
  const posts = [...rawPosts].sort((a, b) => {
    // Si no hay fecha en alguno, lo mandamos al final
    if (!a.date) return 1;
    if (!b.date) return -1;
    
    // Convertimos las fechas (ej: "2026-05-22") a milisegundos para comparar números directamente
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    return dateB - dateA; // Orden descendente (más nuevo a más viejo)
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 relative w-full h-[200px] md:h-[200px] flex items-center justify-center bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 uppercase">Our Blog</h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {posts.length === 0 ? (
            <div className="text-center text-slate-400 py-12 font-medium">
              No posts available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden mb-4 shadow-md bg-slate-100">
                    {typeof post.image === 'string' && post.image.includes('firebasestorage.googleapis.com') ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mb-2 uppercase font-bold tracking-widest">
                    {(() => {
                      if (post.date && post.date.includes('-')) {
                        const parts = post.date.split('-');
                        const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                        return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      } 
                      return post.date;
                    })()}
                  </p>
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#00a4dd] transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}