"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Menu, X, Phone, Info, Briefcase, Mail, 
  FileText, Users, ShieldCheck, Newspaper, ChevronRight 
} from 'lucide-react';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: 'About Us', href: '/about-us', icon: <Info size={18} /> },
    { name: 'Our Services', href: '/services', icon: <Briefcase size={18} /> },
    { name: 'Contact Us', href: '/contact', icon: <Mail size={18} /> },
    { name: 'Permit Process', href: '/permit-process', icon: <FileText size={18} /> },
    { name: 'Referrals', href: '/referrals', icon: <Users size={18} /> },
    { name: 'Our Job', href: '/our-job', icon: <ShieldCheck size={18} /> },
    { name: 'Warranties', href: '/warranties', icon: <ShieldCheck size={18} /> },
    { name: 'Blog', href: '/blog', icon: <Newspaper size={18} /> },
  ];

  return (
    <nav className="w-full bg-white font-sans sticky top-0 z-[100] shadow-sm">
      {/* MAIN NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          
          {/* LEFT: MENU BUTTON */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-3 bg-white text-[#00a4dd] px-2 py-2 md:px-5 md:py-2 rounded-full border border-[#00a4dd]/20 shadow-sm hover:shadow-md hover:border-[#00a4dd] transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="bg-[#00a4dd] text-white p-1.5 md:p-1.5 rounded-full">
                <Menu size={16} className="md:w-4 md:h-4" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 opacity-80 leading-tight">Explore</p>
                <p className="font-bold text-sm lg:text-base tracking-tight leading-tight">Tamarron Services</p>
              </div>
            </button>
          </div>

          {/* CENTER: LOGO */}
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/">
              <div className="relative w-[120px] h-[40px] md:w-[200px] md:h-[70px]">
                <Image 
                  src="/logo.webp" 
                  alt="Tamarron Services Logo" 
                  fill 
                  priority 
                  className="object-contain" 
                />
              </div>
            </Link>
          </div>

          {/* RIGHT: CALL BUTTON */}
          <div className="flex-1 flex justify-end">
            <a 
              href="tel:+12342307015" 
              className="flex items-center gap-3 bg-white text-[#00a4dd] px-2 py-2 md:px-5 md:py-2 rounded-full border border-[#00a4dd]/20 shadow-sm hover:shadow-md hover:border-[#00a4dd] transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="text-right hidden md:block">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 opacity-80 leading-tight">Call Today</p>
                <p className="font-bold text-sm lg:text-base tracking-tight leading-tight">+1 (234) 230-7015</p>
              </div>
              <div className="bg-[#00a4dd] text-white p-1.5 md:p-1.5 rounded-full">
                <Phone size={16} className="md:w-4 md:h-4" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-[110] ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* LEFT-SIDE DRAWER */}
      <div className={`fixed top-0 left-0 h-full w-[280px] md:w-[350px] bg-[#333333] shadow-2xl transition-transform duration-300 transform z-[120] ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <span className="text-white font-bold uppercase tracking-[0.2em] text-xs">Navigation</span>
          <button onClick={() => setIsDrawerOpen(false)} className="text-white/50 hover:text-white transition-colors p-2">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col py-4 overflow-y-auto h-[calc(100%-80px)]">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx}
              href={link.href}
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center justify-between px-8 py-4 text-white/80 hover:text-white hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#00a4dd] group-hover:scale-110 transition-transform">{link.icon}</span>
                <span className="text-sm font-bold uppercase tracking-wider">{link.name}</span>
              </div>
              <ChevronRight size={16} className="text-white/20 group-hover:text-[#00a4dd] transition-colors" />
            </Link>
          ))}
          <div className="mt-auto p-8 border-t border-white/5 bg-black/20 text-white/80 text-xs">
             <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-2">Location</p>
             <p>2750 FM 1463 RD SUITE 150-117<br />Katy TX, 77494</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;