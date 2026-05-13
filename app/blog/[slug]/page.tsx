import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LOCAL_POSTS } from '@/lib/data';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = LOCAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Featured Image */}
      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover" 
          priority 
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-12">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">
          {post.date}
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