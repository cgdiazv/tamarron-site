"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const specialties = [
    "Roof Extension", "Pergolas & Gazebos", "Concrete Job", 
    "Stamped Concrete", "Spray Decks", "Pavers", 
    "Outdoor Kitchen", "Motorized Screens", "Gutters", 
    "Fences", "Retaining Walls", "Landscape Lights", 
    "French Drains", "Pools", "Grass", "General Construction"
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    
    // Constructing the body based on the API expectations
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'), // Maps to 'Mobile' input
      street: formData.get('street'),
      city: formData.get('city'),
      zip: formData.get('zip'),
      specialty: formData.get('specialty'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <section className="py-16 md:py-20 relative w-full h-[300px] md:h-[200px] flex items-center justify-center bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 uppercase tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* CONTACT CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT COLUMN: FORM */}
            <div className="bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="firstName" type="text" placeholder="First Name" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  <input name="lastName" type="text" placeholder="Last Name" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  <input name="phone" type="tel" placeholder="Mobile" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                </div>
                <input name="street" type="text" placeholder="Street" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="city" type="text" placeholder="City" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                  <input name="zip" type="text" placeholder="Zip" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" />
                </div>
                <select name="specialty" required className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd] text-slate-500 bg-white">
                  <option value="">Select Specialty</option>
                  {specialties.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <textarea 
                  name="details"
                  rows={4} 
                  required
                  placeholder="Please give us more details on the needs of the service required." 
                  className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]"
                ></textarea>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full md:w-auto bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all shadow-md disabled:bg-slate-400"
                >
                  {status === 'loading' ? 'Sending...' : 'Submit'}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 font-bold text-sm bg-green-50 p-3 rounded-md">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 font-bold text-sm bg-red-50 p-3 rounded-md">
                    Oops! Something went wrong. Please try again or call us directly.
                  </p>
                )}
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