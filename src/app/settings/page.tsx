"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Palette, Eye, Smartphone, Monitor } from 'lucide-react';

/**
 * UI SETTINGS & PREFERENCES
 * ----------------------------------------------------------------------------
 * Ruta: /settings (app/settings/page.tsx)
 * Propósito: Permite al usuario (Auditor o Gerente) personalizar la interfaz
 * según sus preferencias o entorno de trabajo.
 * - Soporta cambio de temas visuales (Ej: Cyber Dark vs Terminal Bloomberg)
 * - Soporta densidad de pantalla para monitores ultra-chicos de PCs de hotel.
 */
export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState('pulse-dark');
  const [compactMode, setCompactMode] = useState(false);

  // Here we would typically persist to localStorage or a proper Context Provider.
  // For the prototype phase, we'll demonstrate the UI state changes.
  
  const handleThemeChange = (themeName: string) => {
    setActiveTheme(themeName);
    // document.documentElement.className = themeName; // Actual implementation
  };

  return (
    <div className="h-screen bg-[#020617] text-slate-200 overflow-y-auto font-sans relative">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <nav className="border-b border-slate-800 bg-black/90 backdrop-blur h-14 flex-shrink-0 flex items-center justify-between px-6 z-50 sticky top-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
            <div className="w-8 h-8 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)] border border-indigo-500/30 bg-indigo-900/50 flex items-center justify-center">
              <Settings size={16} className="text-indigo-400" />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">App<span className="text-indigo-400">Settings</span></span>
          </div>
          
          <Link href="/" className="px-3 py-1.5 rounded transition-colors text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-2">
            <ArrowLeft size={14} /> Volver a Terminal
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 md:p-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight">Personalización de Interfaz</h1>
          <p className="text-sm text-slate-400 mt-2">Ajusta los parámetros visuales para adaptar el dashboard AHT Pulse a tu monitor y preferencias de lectura.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Appearance Section */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur">
             <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
               <Palette size={18} className="text-indigo-400" /> Paleta de Colores
             </h2>

             <div className="space-y-4">
               {/* Option 1 */}
               <label className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${activeTheme === 'pulse-dark' ? 'border-indigo-500 bg-indigo-900/20' : 'border-slate-800 bg-black/40 hover:border-slate-600'}`}>
                 <div className="flex items-center gap-4">
                   <input 
                     type="radio" 
                     name="theme" 
                     className="accent-indigo-500 w-4 h-4"
                     checked={activeTheme === 'pulse-dark'}
                     onChange={() => handleThemeChange('pulse-dark')}
                   />
                   <div className="flex-1">
                     <h3 className="text-white font-bold text-sm mb-1">AHT Pulse Default (Sci-Fi Dark)</h3>
                     <p className="text-xs text-slate-400">Tonos Obsidian y Neón Ámbar/Índigo. Alto contraste.</p>
                   </div>
                   <div className="flex gap-1">
                     <div className="w-4 h-4 rounded bg-[#020617]"></div>
                     <div className="w-4 h-4 rounded bg-indigo-600"></div>
                     <div className="w-4 h-4 rounded bg-emerald-400"></div>
                   </div>
                 </div>
               </label>

               {/* Option 2 */}
               <label className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${activeTheme === 'bloomberg' ? 'border-orange-500 bg-orange-900/20' : 'border-slate-800 bg-black/40 hover:border-slate-600'}`}>
                 <div className="flex items-center gap-4">
                   <input 
                     type="radio" 
                     name="theme" 
                     className="accent-orange-500 w-4 h-4"
                     checked={activeTheme === 'bloomberg'}
                     onChange={() => handleThemeChange('bloomberg')}
                   />
                   <div className="flex-1">
                     <h3 className="text-white font-bold text-sm mb-1">Terminal Financiera</h3>
                     <p className="text-xs text-slate-400">Negro absoluto, números en verde y naranja eléctrico. Sin gradientes.</p>
                   </div>
                   <div className="flex gap-1">
                     <div className="w-4 h-4 rounded bg-black"></div>
                     <div className="w-4 h-4 rounded bg-orange-500"></div>
                     <div className="w-4 h-4 rounded bg-[#00ff00]"></div>
                   </div>
                 </div>
               </label>
               
               {/* Option 3 */}
               <label className={`block opacity-50 cursor-not-allowed p-4 rounded-xl border-2 border-slate-800 bg-black/40`}>
                 <div className="flex items-center gap-4">
                   <input disabled type="radio" name="theme" className="w-4 h-4" />
                   <div className="flex-1">
                     <h3 className="text-white font-bold text-sm mb-1">Modo Impresión (Light) <span className="ml-2 text-[8px] bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest text-slate-400">Pronto</span></h3>
                     <p className="text-xs text-slate-400">Fondo blanco, ideal para leer bajo mucha luz de día.</p>
                   </div>
                 </div>
               </label>

             </div>
          </div>

          {/* Densidad Section */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur">
             <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
               <Eye size={18} className="text-emerald-400" /> Densidad de Pantalla
             </h2>

             <div className="grid grid-cols-2 gap-4">
               
               <button 
                 onClick={() => setCompactMode(false)}
                 className={`p-6 rounded-xl border-2 ${!compactMode ? 'border-emerald-500 bg-emerald-900/10' : 'border-slate-800 bg-black/40 hover:border-slate-700'} flex flex-col items-center justify-center gap-3 transition-colors`}
               >
                 <Monitor size={32} className={!compactMode ? 'text-emerald-400' : 'text-slate-500'} />
                 <span className={`text-sm font-bold ${!compactMode ? 'text-white' : 'text-slate-400'}`}>Estándar Relax</span>
               </button>

               <button 
                 onClick={() => setCompactMode(true)}
                 className={`p-6 rounded-xl border-2 ${compactMode ? 'border-emerald-500 bg-emerald-900/10' : 'border-slate-800 bg-black/40 hover:border-slate-700'} flex flex-col items-center justify-center gap-3 transition-colors`}
               >
                 <Smartphone size={32} className={compactMode ? 'text-emerald-400' : 'text-slate-500'} />
                 <span className={`text-sm font-bold ${compactMode ? 'text-white' : 'text-slate-400'}`}>Ultra Compacto</span>
               </button>

             </div>
             <p className="text-[11px] text-slate-500 mt-4 leading-relaxed bg-black/30 p-3 rounded-lg border border-slate-800">
               El modo <strong>Ultra Compacto</strong> reduce un 30% los padding y el tamaño de fuente. Excelente si operas AHT Pulse desde una laptop de 13 pulgadas sin monitor externo.
             </p>

             <div className="mt-8 pt-6 border-t border-slate-800">
               <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                 Guardar Preferencias Locales
               </button>
             </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
