import React from 'react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION (Image Banner) */}
      <section className="relative w-full h-[200px] md:h-[200px] flex items-center justify-center">
        <Image
          src="/headers/contact-us.webp"
          alt="Contact Us"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-[72pt] font-bold text-white tracking-tight drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>

      {/* CONTACT CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT COLUMN: SALESFORCE WEB-TO-LEAD FORM */}
            <div className="bg-white">
              <form
                action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D4x000006sHlM"
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="oid" value="00D4x000006sHlM" />
                <input type="hidden" name="retURL" value="https://www.tamarronservices.com/services" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                    <input id="first_name" name="first_name" maxLength={40} type="text" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                    <input id="last_name" name="last_name" maxLength={80} type="text" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <input id="email" name="email" maxLength={80} type="text" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-1">Mobile</label>
                  <input id="mobile" name="mobile" maxLength={40} type="text" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                </div>

                <div>
                  <label htmlFor="street" className="block text-sm font-semibold text-slate-700 mb-1">Street</label>
                  <textarea id="street" name="street" rows={2} className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]"></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">City</label>
                    <input id="city" name="city" maxLength={40} type="text" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-semibold text-slate-700 mb-1">Zip</label>
                    <input id="zip" name="zip" maxLength={20} type="text" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  </div>
                </div>

                <div>
                  <label htmlFor="00N4x00000PoUVJ" className="block text-sm font-semibold text-slate-700 mb-1">Need</label>
                  <textarea id="00N4x00000PoUVJ" name="00N4x00000PoUVJ" rows={3} wrap="soft" className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]"></textarea>
                </div>

                <input type="hidden" id="00N4x00000bfZcH" name="00N4x00000bfZcH" value="Tamarron Services" />
                <input type="hidden" id="lead_source" name="lead_source" value="Website" />

                <button
                  type="submit"
                  name="submit"
                  className="w-full md:w-auto bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all shadow-md"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: MAP & INFO */}
            <div className="space-y-10">
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-500 border border-slate-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.3444641604!2d-95.8459422235!3d29.7677333750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864121e7d8900001%3A0x6b0f69f2e7b1658e!2s2750%20FM%201463%2C%20Katy%2C%20TX%2077494!5e0!3m2!1sen!2sus!4v1715612345678!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="space-y-6 text-slate-600">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold text-[#00a4dd] mb-1">Phone</p>
                  <p className="text-lg">+1 (234) 230-7015</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold text-[#00a4dd] mb-1">Email</p>
                  <p className="text-lg">hello@tamarronservices.com</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold text-[#00a4dd] mb-1">Address</p>
                  <p className="text-lg">2750 FM 1463 RD SUITE 150-117<br />Katy TX, 77494</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold text-[#00a4dd] mb-1">Hours</p>
                  <p className="text-lg">MON-SUN 9:00AM – 6:00PM</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}