import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mb-16">
          
          {/* Column 1: Contact Us */}
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">Contact Us</h3>
            <div className="text-slate-300 text-sm md:text-base leading-relaxed">
              <p>2750 FM 1463 RD SUITE 150-117</p>
              <p className="text-[#00a4dd] font-medium">Katy TX, 77494</p>
            </div>
            <div className="mt-2">
              <Image 
                src="/bbb-acredited.webp" 
                alt="BBB Accredited Charity" 
                width={160} 
                height={60} 
                className="rounded-sm object-contain"
              />
            </div>
          </div>

          {/* Column 2: Subscribe */}
          <div className="flex flex-col items-center text-center gap-6">
            <h3 className="text-xl md:text-2xl font-bold">Subscribe</h3>
            <form className="flex w-full max-w-sm bg-white rounded-full overflow-hidden p-1 shadow-sm">
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-grow px-6 py-2 text-slate-800 focus:outline-none bg-transparent"
                required
              />
              <button 
                type="submit" 
                className="bg-[#00a4dd] text-white p-3 rounded-full hover:bg-sky-600 transition-colors flex items-center justify-center shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Column 3: Follow Us */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <h3 className="text-xl md:text-2xl font-bold">Follow Us</h3>
            <div className="flex gap-4">
              {/* Instagram */}
              <a 
                href="https://instagram.com/tamarronservices" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 hover:text-[#00a4dd] transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/channel/UCCM4-BmUfJkJvvuc4F-cpQQ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 hover:text-[#00a4dd] transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              {/* Facebook */}
              <a 
                href="https://facebook.com/tamarronservices" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 hover:text-[#00a4dd] transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@tamarron.services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 hover:text-[#00a4dd] transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white font-light">
          <p>
            © 2022–{new Date().getFullYear()} Tamarron Services
          </p>
          <p className="font-normal">
            <a 
              href="https://indevasa.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#00a4dd] transition-colors"
            >
              Indeva Websites
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;