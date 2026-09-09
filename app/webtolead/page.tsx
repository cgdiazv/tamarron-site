import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Request a Quote | Tamarron Services',
  description: 'Tell us about your project and our team will get back to you.',
};

const inputClass =
  'w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]';

export default function WebToLeadPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION (Image Banner) */}
      <section className="relative w-full h-[200px] flex items-center justify-center">
        <Image
          src="/headers/contact-us.webp"
          alt="Request a Quote"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-[72pt] font-bold text-white tracking-tight drop-shadow-lg">
            Request a Quote
          </h1>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <form
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D4x000006sHlM"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="oid" value="00D4x000006sHlM" />
            <input type="hidden" name="retURL" value="https://www.tamarronservices.com/services" />
            <input type="hidden" name="00N4x00000bfZcH" value="Tamarron Services" />
            <input type="hidden" name="lead_source" value="Website" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="first_name"
                name="first_name"
                type="text"
                maxLength={40}
                placeholder="First Name"
                required
                className={inputClass}
              />
              <input
                id="last_name"
                name="last_name"
                type="text"
                maxLength={80}
                placeholder="Last Name"
                required
                className={inputClass}
              />
            </div>

            <input
              id="email"
              name="email"
              type="email"
              maxLength={80}
              placeholder="Email"
              required
              className={inputClass}
            />

            <input
              id="street"
              name="street"
              type="text"
              placeholder="Street"
              className={inputClass}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="city"
                name="city"
                type="text"
                maxLength={40}
                placeholder="City"
                className={inputClass}
              />
              <input
                id="zip"
                name="zip"
                type="text"
                maxLength={20}
                placeholder="Zip"
                className={inputClass}
              />
            </div>

            <textarea
              id="00N4x00000PoUVJ"
              name="00N4x00000PoUVJ"
              rows={4}
              wrap="soft"
              required
              placeholder="Please give us more details on the needs of the service required."
              className={inputClass}
            ></textarea>

            <button
              type="submit"
              className="w-full md:w-auto bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
