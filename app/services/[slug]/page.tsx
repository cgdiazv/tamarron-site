import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCAL_SERVICES } from '@/lib/data';

// Note: In newer Next.js versions, params is a Promise
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = LOCAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
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
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/services" className="text-[#00a4dd] font-bold text-sm uppercase mb-8 inline-block">
            ← Back to All Services
          </Link>
          <div className="prose prose-lg max-w-none text-slate-600">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Expert {service.title}</h2>
            <p>{service.excerpt}</p>
          </div>
        </div>
      </section>
    </div>
  );
}