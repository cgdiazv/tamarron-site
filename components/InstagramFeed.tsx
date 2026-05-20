"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeholdPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  mediaType: string;
  thumbnailUrl?: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<BeholdPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const url = process.env.NEXT_PUBLIC_BEHOLD_URL;
      if (!url) {
        console.error("Behold URL no configurada.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error con Behold");
        const data = await res.json();
        
        // 💡 LA CORRECCIÓN ACÁ: 
        // Si data.posts existe, lo guardamos. Si la estructura viene como arreglo directo por algún plan, usamos data.
        const actualPosts = data.posts || (Array.isArray(data) ? data : []);
        setPosts(actualPosts);
      } catch (error) {
        console.error("Error cargando Instagram:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Mientras carga o si está vacío, no muestra nada para no romper el diseño
  if (loading || !posts || posts.length === 0) return null;

  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* =========================================
            CABECERA ESTILO INSTAGRAM
            ========================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mb-12 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[3px]">
            <div className="w-full h-full bg-white rounded-full p-[2px] relative overflow-hidden">
              <Image 
                src="/logo.webp" 
                alt="Tamarron Services" 
                fill 
                className="object-contain p-1"
              />
            </div>
          </div>
          
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Tamarron Services</h2>
              <a 
                href="https://instagram.com/tamarronservices" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0095f6] hover:bg-sky-600 text-white font-bold text-xs px-6 py-2 rounded-lg transition-colors shadow-sm"
              >
                Seguir
              </a>
            </div>
            <p className="text-sm font-medium text-slate-400">@tamarronservices</p>
          </div>
        </div>

        {/* =========================================
            GRID DE POSTS (MÁXIMO 4 ITEMS)
            ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post) => {
            const imageSrc = post.thumbnailUrl || post.mediaUrl;

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-slate-100"
              >
                <Image
                  src={imageSrc}
                  alt={post.caption || "Tamarron Services Outdoor Living Project"}
                  fill
                  sizes="(max-w-768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 bg-white rounded-full p-0.5 relative overflow-hidden flex items-center justify-center">
                      <span className="text-[8px] font-bold text-[#00a4dd]">T</span>
                    </div>
                    <span className="text-xs font-bold tracking-wide">Tamarron Services</span>
                  </div>
                  <p className="text-[10px] opacity-75">
                    {new Date(post.timestamp).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}