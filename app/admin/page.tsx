"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // We can secure this with an API route later, but let's test the interface logic first
    if (username === "tamarron_admin" && password === "TamarronMarketing2026!") {
      // Temporary token for prototype testing
      localStorage.setItem('admin_token', 'authenticated_tamarron_session');
      router.push('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas. Intente de nuevo.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-[#00a4dd] mb-4">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Portal de Marketing</h1>
          <p className="text-sm text-slate-400 mt-1">Gestión de contenidos para Tamarron Services</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Usuario</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <User size={18} />
              </span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800"
                placeholder="ej. tamarron_agency"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Lock size={18} />
              </span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00a4dd] focus:bg-white transition-all text-slate-800"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-medium text-red-500 bg-red-50 px-4 py-2 rounded-lg text-center">
              {error}
            </p>
          )}

          <button 
            type="submit"
            className="w-full bg-[#00a4dd] hover:bg-sky-600 text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg mt-2"
          >
            Ingresar al Portal
          </button>
        </form>
      </div>
    </div>
  );
}