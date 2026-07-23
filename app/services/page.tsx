import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LOCAL_SERVICES } from '@/lib/data';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[200px] md:h-[200px] flex items-center justify-center">
        <Image 
          src="/headers/services.webp" 
          alt="Services Header" 
          layout="fill" 
          objectFit="cover" 
          quality={100} 
          className="absolute inset-0 z-0"
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
            Complete Patio Solutions
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mx-auto mb-12 max-w-3xl text-center text-slate-500 text-base md:text-lg leading-relaxed">
            We are committed to safety and customer satisfaction with each of our products,
            providing personalized service with each one of our installations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCAL_SERVICES.map((service) => (
              <div key={service.slug} className="group h-[320px] [perspective:1000px]">
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* Front Side */}
                  <Link href={`/services/${service.slug}`} className="absolute inset-0 h-full w-full rounded-xl overflow-hidden shadow-md block z-10 [backface-visibility:hidden]">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <h3 className="text-white font-bold text-xl text-center uppercase tracking-wider">{service.title}</h3>
                    </div>
                  </Link>

                  {/* Back Side */}
                  <div className="absolute inset-0 h-full w-full rounded-xl bg-[#00a4dd] p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex flex-col h-full items-center justify-center text-center">
                      <h3 className="font-bold text-xl uppercase mb-4 tracking-wider">{service.title}</h3>
                      <p className="text-sm line-clamp-4 mb-6">{service.excerpt}</p>
                      <Link href={`/services/${service.slug}`} className="inline-block border-2 border-white text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-[#00a4dd] transition-all">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================================
          QUOTE CTA SECTION
          ========================================= */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Get a Quote for Your Next Patio Services
          </h2>
          <p className="text-slate-500 text-sm md:text-base mb-10 leading-relaxed">
            An affordable, quality patio service that you can request online.
          </p>
          
          <Link 
            href="/contact" 
            className="inline-block bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all duration-300 shadow-lg hover:scale-105"
          >
            Order Now
          </Link>
        </div>
      </section>

    </div>
  );
}