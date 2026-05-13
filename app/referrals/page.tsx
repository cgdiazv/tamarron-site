"use client";

import React, { useState } from 'react';

export default function ReferralsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    
    // Constructing data for the API
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      specialty: 'Referral Submission', // Category for your email subject
      details: `Referral Count: ${formData.get('referralCount')}`,
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
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER SECTION */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 uppercase tracking-tight">
            Referrals
          </h1>
        </div>
      </section>

      {/* REFER A FRIEND TEXT SECTION */}
      <section className="py-16 md:pt-24 md:pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 uppercase tracking-tight">
            Refer a Friend
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-light">
            Referrals are the life of our business. A referral also means a job was well done, but it is also a means for us to measure the satisfaction level of our customers. Having completed thousands of referrals, you can be confident we'll take care of your friends, family and neighbors with the same level of quality and care we provided for you.
          </p>
        </div>
      </section>

      {/* VOUCHER & FORM SECTION */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* VOUCHER CARD */}
            <div className="flex flex-col shadow-2xl rounded-2xl overflow-hidden max-w-md mx-auto lg:ml-auto w-full">
              <div className="bg-[#00a4dd] p-12 text-center text-white">
                <h3 className="text-5xl md:text-6xl font-bold mb-2">US$ 100</h3>
                <p className="text-sm font-bold uppercase tracking-[0.2em]">Gift Voucher</p>
              </div>
              
              <div className="bg-slate-100 p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
                <h4 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-4 uppercase">
                  Earn a US$100<br />Referral Bonus
                </h4>
                <p className="text-slate-600 text-sm md:text-base mb-12 font-light">
                  to spend in future projects, for every customer you refer who completes a project with our company.
                </p>
                
                <div className="text-slate-500 text-xs md:text-sm space-y-1">
                  <p>simply call the office anytime:</p>
                  <p className="font-bold text-slate-700">+1 (234) 230-7015 or email us:</p>
                  <a href="mailto:hello@tamarronservices.com" className="text-[#00a4dd] font-bold hover:underline">
                    hello@tamarronservices.com
                  </a>
                </div>
              </div>
            </div>

            {/* REFERRAL FORM */}
            <div className="w-full max-w-xl mx-auto lg:mr-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    name="firstName"
                    type="text" 
                    placeholder="First Name" 
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" 
                  />
                  <input 
                    name="lastName"
                    type="text" 
                    placeholder="Last Name" 
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" 
                  />
                </div>
                <input 
                  name="email"
                  type="email" 
                  placeholder="Your Email" 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" 
                />
                <input 
                  name="referralCount"
                  type="number" 
                  placeholder="How many referrals do you want to provide?" 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00a4dd]" 
                />
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-sky-600 transition-all shadow-md disabled:bg-slate-400"
                  >
                    {status === 'loading' ? 'Sending...' : 'Earn Bonus Now'}
                  </button>
                </div>

                {status === 'success' && (
                  <p className="text-green-600 font-bold text-sm p-2 bg-green-50 rounded border border-green-100">
                    Thank you! We have received your referral information.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 font-bold text-sm p-2 bg-red-50 rounded border border-red-100">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}