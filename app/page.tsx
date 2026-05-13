import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. TypeScript Interfaces
interface WordPressPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: { node: { sourceUrl: string; altText: string; }; };
}

// 2. Fetching Logic
async function getPosts(): Promise<WordPressPost[]> {
  const endpoint = process.env.WORDPRESS_API_URL;
  if (!endpoint) return [];

  const query = `query GetLatestPosts { posts(first: 12) { nodes { title slug excerpt date featuredImage { node { sourceUrl altText } } } } }`;
  
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
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

// 3. Main Page Component
export default async function Page() {
  const posts = await getPosts();

  const services = [
    {
      title: "ROOFS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      description: "Choose whether you want to use real or synthetic materials, and select the color that best suits the rest of your space."
    },
    {
      title: "PERGOLAS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 7h18M6 21V7M18 21V7M9 7v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
      ),
      description: "Choose whether you want to use real or synthetic materials, and select the color that best suits the rest of your space."
    },
    {
      title: "FENCES",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3v18M8 3v18M12 3v18M16 3v18M20 3v18M2 7h20M2 17h20"/>
        </svg>
      ),
      description: "Choose whether you want to use real or synthetic materials, and select the color that best suits the rest of your space."
    },
    {
      title: "POOLS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
        </svg>
      ),
      description: "Choose whether you want to use real or synthetic materials, and select the color that best suits the rest of your space."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative w-full h-[350px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/header.webp" 
            alt="Tamarron Services Outdoor Living" 
            fill 
            priority 
            className="object-cover object-center" 
          />
        </div>
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 max-w-5xl mx-auto w-full">
          <div className="border-2 border-white rounded-xl px-4 py-2 md:px-8 md:py-3 inline-block backdrop-blur-[2px] bg-black/10">
            <h1 className="text-white font-bold text-xl sm:text-3xl md:text-5xl tracking-tight">
              Make your backyard work for your lifestyle.
            </h1>
          </div>
          <p className="text-white text-base md:text-xl mt-4 md:mt-6 font-medium drop-shadow-lg max-w-3xl">
            Patios, pergolas and roof extensions<br className="hidden md:block" /> designed for comfort and function.
          </p>
          <Link 
            href="/contact" 
            className="mt-6 md:mt-8 bg-white text-[#00a4dd] font-bold text-sm md:text-base uppercase tracking-wide px-8 py-3 md:px-10 rounded-full hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            GET A FREE ESTIMATE
          </Link>
        </div>
      </section>

      {/* =========================================
          SECTION 1: FINANCING (WISETACK)
          ========================================= */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="order-2 lg:order-1">
            <h2 className="text-center lg:text-left text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-12">
              We offer financing
            </h2>
            <p className="text-[17px] text-slate-600 mb-6 leading-relaxed">
              We’ve partnered with <strong className="text-[#00a4dd]">Wisetack</strong> to offer our customers flexible financing options, so you can pay over time rather than all at once. The application takes about a minute to complete, and checking your options does not impact your credit score.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700 font-semibold mb-8 text-[17px]">
              <li>Finance projects up to $25,000*</li>
              <li>Terms from 3 to 60 months*</li>
              <li>APRs range from 0 to 35.9%*</li>
              <li>No hidden fees or compounding interest</li>
            </ul>
            <p className="text-[17px] text-slate-600 mb-8 leading-relaxed">
              <Link href="#" className="font-semibold text-[#00a4dd] hover:underline">
                Prequalify today
              </Link> with no impact to your credit and contact us to learn about financing your next project!
            </p>
            <div className="text-center lg:text-left">
              <Link 
                href="https://wisetack.us/#/4cbys30/prequalify" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-[#00a4dd] text-white font-bold py-4 px-10 rounded-full hover:bg-sky-600 transition-all shadow-lg hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
              >
                Prequalify Now
              </Link>
            </div>
            <p className="mt-10 text-[11px] text-slate-500 leading-relaxed max-w-2xl">
              *All financing is subject to credit approval. Your terms may vary. Payment options through Wisetack are provided by our lending partners. For example, a $1,200 purchase could cost $104.89 a month for 12 months, based on an 8.9% APR, or $400 a month for 3 months, based on a 0% APR. Offers range from 0-35.9% APR based on creditworthiness. No other financing charges or participation fees. See additional terms at .
            </p>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[280px] md:max-w-[320px]">
              <Image 
                src="/wisetack.png" 
                alt="Wisetack Financing Options" 
                width={320} 
                height={640} 
                className="w-full h-auto object-contain"
              />
              <p className="mt-4 text-[10px] text-slate-400 italic text-center leading-tight">
                For illustrative purposes only.<br />
                All loans are subject to credit approval. Terms may vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SERVICES (PATIO EXPERTS)
          ========================================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 uppercase tracking-tight mb-12">
            Patio Experts
          </h2>
          <p className="text-slate-500 max-w-4xl mx-auto text-base md:text-lg leading-relaxed mb-16">
            A strong foundation is first built using the best materials which meet the strictest quality standards, and no one understands that better than Tamarron Services. We are committed to safety and customer satisfaction with each of our products, providing personalized service with each one of our installations. Check out some of our specialized services below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-slate-800 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-[#00a4dd] font-bold text-xl mb-4 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-snug px-2">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <Link 
            href="/services" 
            className="inline-block border-2 border-[#00a4dd] text-[#00a4dd] font-bold text-xs md:text-sm uppercase rounded-full tracking-widest px-10 py-4 hover:bg-[#00a4dd] hover:text-white transition-all duration-300"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* =========================================
          WHAT WE OFFER SECTION
          ========================================= */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 uppercase tracking-tight mb-12">
            What We Offer
          </h2>

          <div className="relative flex flex-col md:flex-row items-center justify-center">
            {/* Image Container */}
            <div className="w-full md:w-2/3 h-[300px] md:h-[450px] relative rounded-lg overflow-hidden shadow-lg z-0">
              <Image 
                src="/what-we-offer.webp" 
                alt="Tamarron Services specialized outdoor projects" 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Content Card (Overlapping on Desktop) */}
            <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-2xl z-10 md:-ml-24 mt-[-40px] md:mt-0 rounded-lg md:rounded-none text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6 leading-tight">
                A Personalized Offer for Your Home
              </h3>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
                We aim to provide exclusive and creative outdoor living services with a unique individual approach. Feel the difference with a personalized quote program from our company.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-sky-600 transition-all duration-300 shadow-md"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          REVIEWS SECTION: WHAT OUR CUSTOMERS SAY
          ========================================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 uppercase tracking-tight mb-12">
            What Our Customers Say
          </h2>

          <div className="relative group">
            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Review 1 */}
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xl">J</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Jae</h4>
                      <p className="text-slate-400 text-xs">2 years ago</p>
                    </div>
                  </div>
                  <div className="text-google-blue">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  I have a patio that was being enjoyed by wasps more than my family. I wanted a motorized screen installed and have the ugly concrete slab with some minor cracks in it spruced up...
                </p>
                <button className="text-slate-400 text-xs font-semibold hover:text-[#00a4dd] transition-colors text-left">Read more</button>
              </div>

              {/* Review 2 */}
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-300 rounded-full overflow-hidden relative">
                       <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold">ER</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Elyse Rouzan</h4>
                      <p className="text-slate-400 text-xs">2 years ago</p>
                    </div>
                  </div>
                  <div className="text-google-blue">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  Brick pavers were installed. The workers were on time and professional. I was able to communicate with the office easily. The cost was very reasonable. I would definitely call...
                </p>
                <button className="text-slate-400 text-xs font-semibold hover:text-[#00a4dd] transition-colors text-left">Read more</button>
              </div>

              {/* Review 3 */}
              <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center text-white font-bold text-xl">J</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">J M</h4>
                      <p className="text-slate-400 text-xs">2 years ago</p>
                    </div>
                  </div>
                  <div className="text-google-blue">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  Tamarron did a remarkable patio expansion project in terms of quality, cost, schedule, project control, and last but not least, in terms of customer attention, respect, and willingnes...
                </p>
                <button className="text-slate-400 text-xs font-semibold hover:text-[#00a4dd] transition-colors text-left">Read more</button>
              </div>
            </div>

            {/* Navigation Arrows (Visible on hover on Desktop) */}
            <button className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-slate-300 hover:text-[#00a4dd] transition-all z-20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-slate-300 hover:text-[#00a4dd] transition-all z-20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </section>
     
    </div>
  );
}