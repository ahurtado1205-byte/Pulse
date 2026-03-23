"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { PieChart, Server, Settings2, UserPlus, FileText, ToggleRight, ArrowLeft } from 'lucide-react';

/**
 * PROPERTY ADMIN CONSOLE
 * ----------------------------------------------------------------------------
 * Ruta: /admin (app/admin/page.tsx)
 * Propósito: Panel de control exclusivo para el Gerente General (Owner) de un
 * hotel específico. 
 * 
 * Funcionalidades:
 * - Parámetros Base: Configuración del inventario (Habitaciones) y categoría, 
 *   vitales para matemáticamente ponderar el peso del hotel en el destino.
 * - Staff Management: Alta/Baja de usuarios (Auditores) para cargar datos diarios.
 * - Módulos: Gestión de suscripciones B2B (Módulos activos de AHT Pulse).
 */
export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col font-sans text-slate-200">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-[40%] h-[40%] bg-slate-800/50 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Header */}
      <nav className="border-b border-slate-800 bg-black/90 backdrop-blur h-14 flex-shrink-0 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
             <div className="relative w-8 h-8 flex items-center justify-center">
               <Image 
                 src="/logo.png" 
                 alt="AHT Pulse Logo" 
                 fill 
                 className="object-contain shadow-[0_0_10px_rgba(99,102,241,0.5)] rounded-full"
               />
             </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">Console<span className="text-indigo-400">Admin</span></span>
          </div>
          
          <button onClick={() => router.push('/')} className="flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 border border-slate-700">
            <ArrowLeft size={14} /> Volver a Terminal
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Propiedad Verificada
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 w-full max-w-7xl mx-auto">
        
        <header className="mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Hotel Costa Galana 
            <span className="text-sm font-bold text-slate-500 bg-slate-900 border border-slate-700 px-3 py-1 rounded uppercase tracking-widest font-mono">
              AHT-MDP-001
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl border-l-2 border-indigo-500/50 pl-3">
            Este panel de configuración es confidencial. Los valores aquí definidos alimentan directamente el motor matemático de Big Data de tu destino (AHT Pulse).
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Col 1: Core Setup */}
          <div className="box-section bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden backdrop-blur">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Server size={80} /></div>
            
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
              <Settings2 size={18} className="text-indigo-400" /> Parámetros Base
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="bg-black/40 p-4 rounded-xl border border-slate-800">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                  <span>Inventario Fijo Dificultado</span>
                  <span className="text-indigo-400">Lock: Sí</span>
                </label>
                <div className="flex gap-3">
                  <input type="number" defaultValue="186" className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-4 py-2 outline-none font-mono text-xl" />
                  <button className="px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700 text-sm">Cambiar</button>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 italic">Define el 100% de Occupancy Rate. Un cambio afecta el histórico entero.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Clasificación AHT</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 text-sm font-semibold">
                  <option>5 Estrellas (Lujo)</option>
                  <option>4 Estrellas</option>
                  <option>Boutique</option>
                </select>
              </div>
            </div>
          </div>

          {/* Col 2: Staff Management */}
          <div className="box-section bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur flex flex-col">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <UserPlus size={18} className="text-emerald-400" /> Terminales de Operación
            </h2>
            <p className="text-xs text-slate-400 mb-6 pb-3 border-b border-slate-700">
              Da acceso a tus recepcionistas para que puedan registrar el Cierre Nocturno desde `login`.
            </p>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between p-3 bg-black/40 border border-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">GM</div>
                  <div>
                    <div className="text-xs text-white font-bold">Gerente (Tú)</div>
                    <div className="text-[10px] text-slate-500">gerencia@hotel.com</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Owner</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-black/40 border border-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">RS</div>
                  <div>
                    <div className="text-xs text-slate-300 font-bold">Roberto (Auditor)</div>
                    <div className="text-[10px] text-slate-500">noche@hotel.com</div>
                  </div>
                </div>
                <button className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/30">Revocar</button>
              </div>
            </div>

            <div className="pt-4 mt-auto border-t border-slate-800">
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors border border-slate-700 flex items-center justify-center gap-2">
                <UserPlus size={14} /> Enviar Invitación al Staff
              </button>
            </div>
          </div>

          {/* Col 3: Modules & Billing */}
          <div className="box-section bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur lg:row-span-2">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
              <FileText size={18} className="text-amber-400" /> Módulos Contratados
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-900/10 to-transparent border border-indigo-500/30 rounded-xl relative overflow-hidden group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wide">Big Data Destino</h4>
                  <ToggleRight size={24} className="text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Lectura del dashboard consolidado (Market Penetration, ADR ponderado). Nivel Base.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">Revenue Pro V4</h4>
                  <ToggleRight size={24} className="text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Habilita curvas predictivas a futuro (Pacing de reservas en los próximos 30 días).
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-slate-800 rounded-xl opacity-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">Reportes Ejecutivos</h4>
                  <div className="w-8 h-4 rounded-full bg-slate-800 border border-slate-700 relative"><div className="w-3 h-3 rounded-full bg-slate-600 absolute top-0.5 left-0.5"></div></div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
                  Auto-envío de PDFs mensuales a la gerencia.
                </p>
                <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/50 px-3 py-1 rounded w-full hover:bg-indigo-500/10 transition-colors">Solicitar Upgrade</button>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Fee AHT Mensual</h4>
               <p className="text-2xl font-mono font-bold text-white mb-2">$0.00 <span className="text-[10px] text-slate-500 font-sans tracking-normal">ARS (Bonificado)</span></p>
               <button className="text-[10px] font-bold underline text-slate-400 hover:text-white transition-colors">Ver Facturación</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
