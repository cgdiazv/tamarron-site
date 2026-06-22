import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PermitProcessPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER SECTION */}
      <section className="py-16 md:py-20 relative w-full h-[300px] md:h-[200px] flex items-center justify-center bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 uppercase tracking-tight">
            Permit Process
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Introductory Text */}
          <p className="text-center text-slate-500 text-sm md:text-base leading-relaxed mb-16 max-w-4xl mx-auto">
            Tamarron Services has a license with the City of Katy, Fulshear, Fort Bend, Harris County. We help you with the permit process free of charge. Depending on the project type and location, homeowners usually need two permits for their patio project : HOA Permit and/or CITY permit.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-8 leading-tight">
                We recommend the following in order for you to obtain your permits:
              </h2>
              
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-lg mb-8">
                <Image 
                  src="/permit-process.webp" 
                  alt="Permit Process Team" 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className="space-y-6 text-slate-600 text-sm md:text-base">
                <p>If you have any questions, please let us know.</p>
                <p>
                  <strong className="text-slate-800">Note:</strong> Tamarron Services recommends that the homeowner has an HOA and City permit for their patio projects. We help the homeowners with the process of applying for the permits and with understanding the requirements thereof.
                </p>
              </div>
            </div>

            {/* Right Column (Thinner Vertical Line & Blue Numbers) */}
            <div className="border-l border-slate-200 pl-8 md:pl-10 space-y-8 text-slate-500 text-sm md:text-base leading-relaxed">
              <p>
                <span className="text-[#00a4dd] font-bold mr-1">1-</span> Call the HOA and ask if you need a permit from them and from the city, based on the scope of the project.
              </p>
              
              <p>
                <span className="text-[#00a4dd] font-bold mr-1">2-</span> Once you provide us with the Survey file of your house, we will be able to help you generate a "Site Plan". Kindly send the required documents to <a href="mailto:hello@tamarronservices.com" className="text-[#00a4dd] hover:underline">hello@tamarronservices.com</a>
              </p>

              <p>
                <span className="text-[#00a4dd] font-bold mr-1">3-</span> The HOA application form must be requested and paid for by the homeowner. Tamarron Services will be happy to assist you while filling out the form to help you fill out the relevant information.
              </p>

              <p>
                <span className="text-[#00a4dd] font-bold mr-1">4-</span> Tamarron Services will help you with the City Permit application process. Kindly send us the following information to <a href="mailto:hello@tamarronservices.com" className="text-[#00a4dd] hover:underline">hello@tamarronservices.com</a>: <em>Full name, Full address, Phone, Email, Survey or plan of the house.</em>
              </p>

              <p>
                <span className="text-[#00a4dd] font-bold mr-1">5-</span> Once we receive the City permit, we will send you a digital copy that can be used for your HOA application.
              </p>

              <div className="pt-4 space-y-4 border-t border-slate-100">
                <p>
                  The cost of the permit is approximately $100 for flatwork and $200 for roof/pergola projects. On average, the process takes 10 to 12 business days for flatwork projects and 20 to 30 business days for roof extension, gazebo or pergola projects.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          START PROJECT CTA SECTION
          ========================================= */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center">
            <Link 
              href="/contact" 
              className="inline-block bg-[#00a4dd] text-white font-bold text-sm md:text-base uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              Start Your Project Now
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}