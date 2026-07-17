import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCombinedPosts } from '@/lib/blogReader'; // 👈 Importamos el lector unificado

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 👈 Obtenemos el universo unificado de artículos (JSONs de GitHub + Fijos vacíos)
  const posts = await getCombinedPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Featured Image */}
      <div className="w-full">
        {typeof post.image === 'string' && post.image.includes('firebasestorage.googleapis.com') ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-contain max-h-[80vh]"
            loading="eager"
          />
        ) : (
          <Image 
            src={post.image} 
            alt={post.title} 
            width={1200}
            height={675}
            sizes="100vw"
            className="w-full h-auto object-contain max-h-[80vh]" 
            priority 
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-12">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">
          {(() => {
            // 💡 Formateamos dinámicamente la fecha si viene con guiones
            if (post.date && post.date.includes('-')) {
              const parts = post.date.split('-');
              const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
              return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
            return post.date;
          })()}
        </p>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none text-slate-600 prose-headings:text-slate-800 prose-headings:font-bold prose-strong:text-[#00a4dd]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}