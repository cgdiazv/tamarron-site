import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceNode {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

async function getServices(): Promise<ServiceNode[]> {
  const endpoint = process.env.WORDPRESS_API_URL;
  if (!endpoint) return [];

  // Querying specifically for the 'Services' category
  const query = `
    query GetServices {
      posts(where: {categoryName: "Services"}, first: 20) {
        nodes {
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json?.data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 uppercase tracking-tight">
            Complete Patio Solutions
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            A strong foundation is first built using the best materials which meet the strictest quality standards, 
            and no one understands that better than Tamarron Services. We are committed to safety and customer 
            satisfaction with each of our products, providing personalized service with each one of our installations. 
            Check out some of our specialized services below.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="group h-[320px] [perspective:1000px]">
                {/* FLIP CONTAINER */}
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT SIDE (Image & Title) */}
                  <div className="absolute inset-0 h-full w-full rounded-xl overflow-hidden shadow-md">
                    {service.featuredImage?.node.sourceUrl ? (
                      <Image 
                        src={service.featuredImage.node.sourceUrl} 
                        alt={service.title} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <h3 className="text-white font-bold text-xl text-center uppercase tracking-wider">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* BACK SIDE (Blue Card) */}
                  <div className="absolute inset-0 h-full w-full rounded-xl bg-[#00a4dd] p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex flex-col h-full items-center justify-center text-center">
                      <h3 className="font-bold text-xl uppercase mb-4 tracking-wider">
                        {service.title}
                      </h3>
                      <div 
                        className="text-sm line-clamp-4 mb-6 prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: service.excerpt }}
                      />
                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-block border-2 border-white text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-[#00a4dd] transition-all"
                      >
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