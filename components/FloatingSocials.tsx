"use client";

import React from 'react';
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 👈 Importamos el hook de rutas

export default function FloatingSocials() {
  const pathname = usePathname(); // 👈 Inicializamos el lector de la URL

  // 💡 Si la ruta actual pertenece al administrador, no renderizamos nada
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const socials = [
    { 
      name: 'Facebook', 
      icon: <FaFacebook size={20} />, 
      href: 'https://facebook.com/tamarronservices', 
      color: 'bg-[#4267B2]' 
    },
    { 
      name: 'YouTube', 
      icon: <FaYoutube size={20} />, 
      href: 'https://www.youtube.com/channel/UCCM4-BmUfJkJvvuc4F-cpQQ', 
      color: 'bg-[#FF0000]' 
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram size={20} />, 
      href: 'https://instagram.com/tamarronservices', 
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' 
    },
    { 
      name: 'TikTok', 
      icon: <FaTiktok size={20} />, 
      href: 'https://www.tiktok.com/@tamarron.services', 
      color: 'bg-black' 
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center`}
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}