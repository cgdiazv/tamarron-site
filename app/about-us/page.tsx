import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  const values = [
    "Quality", "Commitment", "Trust", "Empathy", 
    "Autonomy", "Responsibility", "Teamwork"
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER SECTION (Consistent with Services and Contact) */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
              <Image
                src="/headers/about-us.webp"
                alt="About Us"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0"></div>
              <div className="relative z-10 text-center px-6">
                <h1 className="text-3xl md:text-[72pt] font-bold text-white tracking-tight drop-shadow-lg">
                  About Us
                </h1>
              </div>
            </section>

      {/* MISSION, VISION, VALUES SECTION */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex flex-col lg:flex-row items-stretch">
            
            {/* Image Column */}
            <div className="w-full lg:w-1/2 min-h-[400px] md:min-h-[600px] relative rounded-2xl overflow-hidden shadow-xl z-0">
              <Image 
                src="/concrete-bush.webp" 
                alt="Tamarron Services landscaping and stonework" 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Content Card */}
            <div className="w-full lg:w-3/5 bg-white p-8 md:p-16 shadow-2xl z-10 lg:-ml-24 mt-[-60px] lg:mt-12 rounded-2xl flex flex-col justify-center border border-slate-50">
              
              {/* Mission */}
              <div className="mb-10">
                <h2 className="text-[#00a4dd] font-semibold uppercase tracking-[0.2em] text-sm mb-4">Mission</h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                  We are a company committed to meet design and construction needs of our clients, 
                  by executing projects of quality, thanks to the support of all our workers.
                </p>
              </div>

              {/* Vision */}
              <div className="mb-10 border-t border-slate-100 pt-10">
                <h2 className="text-[#00a4dd] font-semibold uppercase tracking-[0.2em] text-sm mb-4">Vision</h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                  In the year 2030 we will position ourselves as the company most important and 
                  recognized Texas for offering services of construction and design with best quality and price.
                </p>
              </div>

              {/* Values */}
              <div className="mb-10 border-t border-slate-100 pt-10">
                <h2 className="text-[#00a4dd] font-semibold uppercase tracking-[0.2em] text-sm mb-4">Values</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {values.map((value) => (
                    <li key={value} className="flex items-center text-slate-500 text-sm md:text-base font-light">
                      <span className="text-[#00a4dd] mr-2">—</span> {value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Rounded Button */}
              <div className="mt-4">
                <Link 
                  href="/contact" 
                  className="inline-block bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}