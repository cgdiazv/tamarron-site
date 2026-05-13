"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Navbar component for Tamarron Services.
 * Features:
 * - Brand Color: #00a4dd
 * - Font: Poppins
 * - Navigation links for About, Services, Contact, Resources, Our Job, Warranties, and Blog.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white font-sans">
      {/* Top Section: Address, Logo, and Phone */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/* Left: Address - Bold and Branded */}
          <div className="flex items-center gap-2 text-slate-600 w-full md:w-1/3 justify-center md:justify-start">
            <div className="text-[#00a4dd] flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-[10px] md:text-xs lg:text-sm leading-tight">
              <p className="uppercase font-bold">2750 FM 1463 RD SUITE 150-117</p>
              <p className="text-[#00a4dd] font-bold">Katy TX, 77494</p>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center order-first md:order-none">
            <Link href="/">
              <div className="relative w-[180px] h-[60px] md:w-[220px] md:h-[80px]">
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

          {/* Right: Phone Number - Call Today Bold & Scaled Down */}
          <div className="flex items-center gap-2 md:gap-3 text-right w-full md:w-1/3 justify-center md:justify-end">
            <div className="text-[10px] md:text-[11px] lg:text-xs text-slate-600">
              <p className="font-bold">Call Today</p>
              <p className="text-[#00a4dd] font-bold text-sm md:text-base lg:text-lg tracking-tight">
                +1 (234) 230-7015
              </p>
            </div>
            <div className="text-[#00a4dd] flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Navigation Bar: Uses Hex #00a4dd */}
      <div className="bg-[#00a4dd] text-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex justify-between items-center py-3">
            <span className="font-bold uppercase tracking-widest text-sm text-white">Menu</span>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 focus:outline-none text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links Grid */}
          <ul className={`
            ${isMenuOpen ? 'flex' : 'hidden'} 
            md:flex flex-col md:flex-row items-center justify-center 
            gap-4 md:gap-6 lg:gap-8 py-4 md:py-3 
            text-[12px] lg:text-sm font-bold uppercase tracking-wider
          `}>
            <li className="w-full md:w-auto text-center">
              <Link href="/about" className="block py-2 md:py-0 hover:text-sky-100 transition-colors">About Us</Link>
            </li>
            <li className="w-full md:w-auto text-center">
              <Link href="/services" className="block py-2 md:py-0 hover:text-sky-100 transition-colors">Our Services</Link>
            </li>
            <li className="w-full md:w-auto text-center">
              <Link href="/contact" className="block py-2 md:py-0 hover:text-sky-100 transition-colors">Contact Us</Link>
            </li>
            <li className="w-full md:w-auto text-center flex items-center justify-center gap-1 cursor-pointer hover:text-sky-100 transition-colors py-2 md:py-0">
              Resources 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="w-full md:w-auto text-center">
              <Link href="/our-job" className="block py-2 md:py-0 hover:text-sky-100 transition-colors">Our Job</Link>
            </li>
            <li className="w-full md:w-auto text-center">
              <Link href="/warranties" className="block py-2 md:py-0 hover:text-sky-100 transition-colors">Warranties</Link>
            </li>
            <li className="w-full md:w-auto text-center">
              {/* Underline removed here */}
              <Link href="/blog" className="block py-2 md:py-0 text-white hover:text-sky-100 transition-colors">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;