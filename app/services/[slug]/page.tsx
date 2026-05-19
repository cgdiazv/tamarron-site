import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCAL_SERVICES } from '@/lib/data';
import fs from 'fs';
import path from 'path';

const slugToDirName: Record<string, string> = {
  'roof-extension': 'roof extensions',
  'pergolas-gazebos': 'pergolas',
  'concrete-job': 'concrete jobs',
  'stamped-concrete': 'stamped concrete',
  'spray-decks': 'spray decks',
  'pavers': 'pavers',
  'outdoor-kitchen': 'outdoor kitchen',
  'motorized-screens': 'motorized screens',
  'gutters': 'gutters',
  'fences': 'fences',
  'retaining-walls': 'retaining walls',
  'landscape-lights': 'landscape lights',
  'french-drains': 'french drains',
  'pools': 'pools',
  'grass': 'grass',
  'general-construction': 'general construction',
};

// Note: In newer Next.js versions, params is a Promise
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = LOCAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const dirName = slugToDirName[slug];
  let images: string[] = [];
  
  if (dirName) {
    const dirPath = path.join(process.cwd(), 'public', 'services', dirName);
    try {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        images = files
          .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
          .map(file => `/services/${dirName}/${file}`);
      }
    } catch (e) {
      console.error(`Error reading directory ${dirPath}:`, e);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full h-[300px] md:h-[450px]">
        <Image src={service.image} alt={service.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold uppercase text-center px-4">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/services" className="text-[#00a4dd] font-bold text-sm uppercase mb-8 inline-block">
            ← Back to All Services
          </Link>
          <div className="prose prose-lg max-w-none text-slate-600 mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Expert {service.title}</h2>
            <p>{service.excerpt}</p>
          </div>
          
          {images.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 uppercase text-center">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((imgSrc, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
                    <Image
                      src={imgSrc}
                      alt={`${service.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}