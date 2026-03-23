"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NightAuditorForm from "@/components/NightAuditorForm";
import DashboardView from "@/components/DashboardView";
import { User, Settings, LogOut } from "lucide-react";
import { getDashboardDataAction, logoutAction } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardFormData, OperacionDiaria, HotelInfo } from "@/types";

/**
 * MAIN DASHBOARD VIEW (Destino Consolidado)
 * ----------------------------------------------------------------------------
 * Ruta: / (app/page.tsx)
 * Propósito: Es la pantalla central de AHT Pulse. Aquí es donde el auditor
 * nocturno (usuario del hotel) interactúa principalmente.
 * 
 * Estructura:
 * - Panel Izquierdo: Formulario de ingreso de datos diarios (NightAuditorForm).
 * - Panel Derecho: Visualización en tiempo real de gráficos (DashboardView).
 * - Cabecera: Navegación hacia Login, Reportes, Configuración y Directorio.
 */
export default function Home() {
  const router = useRouter();
  const [latestData, setLatestData] = useState<DashboardFormData | null>(null);
  const [hotelInfo, setHotelInfo] = useState<HotelInfo | null>(null);
  const [history, setHistory] = useState<OperacionDiaria[]>([]);

  useEffect(() => {
    async function init() {
      const data = await getDashboardDataAction();
      if (data.success) {
        setHotelInfo({ name: data.hotelName || "", rooms: data.rooms || 0 });
        setHistory(data.operaciones || []);
      } else {
        router.push("/login");
      }
    }
    init();
  }, [router]);

  const handleUpdateDashboard = (data: DashboardFormData) => {
    console.log("New data received from hotel:", data);
    setLatestData(data);
  };

  const handleClearDashboard = () => {
    console.log("Dashboard data cleared");
    setLatestData(null);
  };

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans text-slate-200 selection:bg-indigo-500/30">
      
      {/* MAIN CONTENT: Dashboard */}
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden w-full">
        
        {/* Top Navigation */}
        <nav className="border-b border-slate-800 bg-black/90 backdrop-blur h-14 flex-shrink-0 flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="AHT Pulse Logo" 
                  fill 
                  className="object-contain shadow-[0_0_15px_rgba(99,102,241,0.5)] rounded-full"
                />
              </div>
              <span className="font-bold text-sm tracking-widest uppercase text-indigo-500">Pulse<span className="text-white">AHT</span> <span className="text-[10px] text-slate-500 font-mono ml-1">v4.0</span></span>
            </div>
            <div className="h-4 w-px bg-slate-800"></div>
            {/* Tabs Nav */}
            <div className="flex gap-2 relative">
              <Link href="/" className="px-4 py-1.5 rounded bg-indigo-600 border border-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-colors">
                Destino (Consolidado)
              </Link>
              <Link href="/ingreso" className="px-4 py-1.5 rounded bg-emerald-900/40 border border-emerald-500/50 text-emerald-400 hover:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-900/60 transition-colors flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Ingreso Operacional
              </Link>
              <Link href="/reports" className="px-4 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-widest hover:text-white hover:bg-slate-700 transition-colors">
                Reportes PDF
              </Link>
              <Link href="/superadmin" className="px-4 py-1.5 rounded bg-amber-900/40 border border-amber-500/50 text-amber-500 hover:text-amber-400 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-900/60 transition-colors flex items-center gap-1">
                 Mesa AHT
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/settings" className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
              <Settings size={14} />
            </Link>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded transition-colors text-xs font-semibold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 flex items-center gap-2">
              <LogOut size={14} />
              Cerrar Sesión
            </button>
            <Link href="/admin" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-indigo-500 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] group-hover:shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                <User size={14} />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] font-bold text-white leading-none group-hover:text-indigo-300 transition-colors">
                  {hotelInfo?.name || "Cargando..."}
                </span>
                <span className="text-[9px] text-slate-500 font-mono">Panel Admin &rarr;</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Dynamic View rendering based on state */}
        <DashboardView latestData={latestData} history={history} hotelRooms={hotelInfo?.rooms || 0} />

      </div>
    </div>
  );
}
