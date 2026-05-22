import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCombinedPosts } from '@/lib/blogReader'; // 👈 Cambiamos el import aquí

export const revalidate = 60; // Vercel revisará si hay posts nuevos en Git cada 60 segundos

export default function BlogPage() {
  const posts = getCombinedPosts(); // 👈 Trae la mezcla de posts locales + creados por la agencia

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-slate-50 border-b border-slate-100">
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
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md bg-slate-100">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <p className="text-slate-400 text-xs mb-2 uppercase font-bold tracking-widest">{post.date}</p>
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