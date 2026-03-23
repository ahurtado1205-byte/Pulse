import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { ArrowLeft, Building2, Search, Filter, ShieldCheck, AlertCircle, SignalHigh, CheckCircle2 } from 'lucide-react';

/**
 * GLOBAL HOTEL DIRECTORY (Mesa Directiva AHT)
 * ----------------------------------------------------------------------------
 * Ruta: /superadmin (app/superadmin/page.tsx)
 * Propósito: Vista de grado "Dios" para los directivos de la AHT.
 * Permite monitorear el estado de conexión (Ping) de cada hotel asociado
 * al destino, verificar su volumen de datos inyectados ayer, y detectar
 * qué nodos están atrasados en su carga diaria.
 */
const mockHotels = [
  { id: 'AHT-MDP-001', name: 'Hotel Costa Galana', category: '5 Estrellas', rooms: 186, status: 'synced', lastPing: 'Hace 5 min', paxs: 320, revpar: 125000 },
  { id: 'AHT-MDP-002', name: 'Sheraton Mar del Plata', category: '5 Estrellas', rooms: 350, status: 'synced', lastPing: 'Hace 12 min', paxs: 410, revpar: 118000 },
  { id: 'AHT-MDP-005', name: 'NH Gran Hotel Provincial', category: '4 Estrellas', rooms: 460, status: 'delayed', lastPing: 'Ayer 23:45', paxs: 180, revpar: 85000 },
  { id: 'AHT-MDP-012', name: 'Hermitage Hotel', category: '5 Estrellas', rooms: 220, status: 'synced', lastPing: 'Hace 2 min', paxs: 295, revpar: 132000 },
  { id: 'AHT-MDP-018', name: 'Hotel Iruña', category: '4 Estrellas', rooms: 94, status: 'offline', lastPing: 'Hace 3 días', paxs: 0, revpar: 0 },
  { id: 'AHT-MDP-022', name: 'Sainte Jeanne Boutique', category: 'Boutique', rooms: 27, status: 'synced', lastPing: 'Hace 1 hora', paxs: 45, revpar: 185000 },
];

export default function SuperAdminPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans">
      
      {/* Header */}
      <nav className="border-b border-slate-800 bg-black/90 backdrop-blur h-14 flex-shrink-0 flex items-center justify-between px-6 z-50 sticky top-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
             <div className="relative w-8 h-8 flex items-center justify-center">
               <Image 
                 src="/logo.png" 
                 alt="AHT Pulse Logo" 
                 fill 
                 className="object-contain shadow-[0_0_10px_rgba(245,158,11,0.3)] rounded-full"
               />
             </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">Directorio<span className="text-amber-400">AHT</span></span>
          </div>
          
          <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 border border-slate-700">
            <ArrowLeft size={14} /> Volver a Terminal
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-500 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded tracking-widest uppercase">
             Permiso: SuperUser Nivel 5
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3 mb-2">
               Red de Propiedades
            </h1>
            <p className="text-sm text-slate-400 border-l-2 border-amber-500/50 pl-3">
              Monitoreo global de los 12 hoteles adheridos. Verifica quién está inyectando datos al Big Data en tiempo real.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-end min-w-[150px]">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Volumen Camas</span>
              <span className="text-2xl font-black text-white">1,337</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-end min-w-[150px]">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Nodos Activos</span>
              <span className="text-2xl font-black text-emerald-400">11 / 12</span>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por ID, nombre o categoría..." 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white pl-10 pr-4 py-2 outline-none focus:border-amber-500 text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700 flex items-center gap-2 text-sm">
            <Filter size={16} /> Filtros Rápidos
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-[10px] tracking-widest uppercase text-slate-500">
                <th className="p-4 font-bold">Smart ID</th>
                <th className="p-4 font-bold">Propiedad Ponderada</th>
                <th className="p-4 font-bold">Inventario (Habs)</th>
                <th className="p-4 font-bold text-right">Métricas Ayer (Pax / RevPAR)</th>
                <th className="p-4 font-bold text-center">Estado del Nodo</th>
                <th className="p-4 font-bold">Último Cierre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockHotels.map((hotel, i) => (
                <tr key={hotel.id} className="hover:bg-slate-800/20 transition-colors group cursor-pointer">
                  <td className="p-4 font-mono text-xs text-slate-400">{hotel.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-colors">
                        <Building2 size={14} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{hotel.name}</div>
                        <div className="text-[10px] text-slate-500">{hotel.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm text-slate-300">{hotel.rooms}</td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-white text-sm">{hotel.paxs} <span className="text-[10px] text-slate-500 font-normal">Turistas</span></span>
                      <span className="text-xs text-indigo-400 font-mono">${hotel.revpar.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {hotel.status === 'synced' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        <SignalHigh size={12} /> Sincronizado
                      </span>
                    ) : hotel.status === 'delayed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        <AlertCircle size={12} /> Atrasado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                        <AlertCircle size={12} /> Offline
                      </span>
                    )}
                  </td>
                  <td className={`p-4 font-mono text-xs ${hotel.status === 'offline' ? 'text-rose-400/70' : 'text-slate-400'}`}>
                    {hotel.lastPing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col gap-4 md:hidden">
            {mockHotels.map(hotel => (
               <div key={hotel.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-3">
                     <div>
                        <h3 className="font-bold text-white text-base">{hotel.name}</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{hotel.id}</p>
                     </div>
                     {hotel.status === 'synced' ? <CheckCircle2 className="text-emerald-500" size={18}/> : <AlertCircle className="text-rose-500" size={18} />}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                     <div className="bg-black/30 p-2 rounded border border-slate-800">
                        <span className="block text-[9px] text-slate-500 uppercase">Habs</span>
                        <span className="font-mono text-slate-300">{hotel.rooms}</span>
                     </div>
                     <div className="bg-black/30 p-2 rounded border border-slate-800">
                        <span className="block text-[9px] text-slate-500 uppercase">RevPAR</span>
                        <span className="font-mono text-indigo-400">${(hotel.revpar/1000).toFixed(0)}k</span>
                     </div>
                  </div>
               </div>
            ))}
        </div>

      </main>
    </div>
  );
}
