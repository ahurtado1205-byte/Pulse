"use client";
import React, { useState } from "react";
import Link from "next/link";
import NightAuditorForm from "@/components/NightAuditorForm";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * INGRESO OPERATIVO (Carga de Datos)
 * ----------------------------------------------------------------------------
 * Ruta: /ingreso (app/ingreso/page.tsx)
 * Propósito: Módulo dedicado para que los auditores nocturnos carguen la
 * información diaria. Separado del dashboard principal para evitar distracciones.
 */
export default function IngresoPage() {
  const handleUpdateDashboard = async (data: any) => {
    console.log("Intentando grabar en Supabase:", data);
    
    try {
      const { data: result, error } = await supabase
        .from('operaciones_diarias')
        .insert([{
            fecha: new Date().toISOString().split('T')[0],
            habitaciones_vendidas: isNaN(parseInt(data.occ)) ? 0 : parseInt(data.occ),
            adr_diario: isNaN(parseFloat(data.adr)) ? 0 : parseFloat(data.adr),
            nuevas_reservas: isNaN(parseInt(data.newRes)) ? 0 : parseInt(data.newRes),
            cancelaciones: isNaN(parseInt(data.cancels)) ? 0 : parseInt(data.cancels),
            origen_predominante: data.origin,
            evento_atractor: data.pacingEvent,
            // ID temporal, hasta implementar auth
            hotel_id: 1 
        }])
        .select();
        
      if (error) {
        throw error;
      }
      
      console.log("¡Éxito! Datos guardados en Supabase:", result);
      alert("✅ Datos enviados exitosamente al servidor.");
    } catch (err) {
      console.error("Supabase API Error:", err);
      // Fallback amigable si el usuario aún no configuró las variables de entorno o la tabla
      alert("⚠️ Modo de prueba activo. Para guardar real en DB, recuerda configurar tus credenciales de Supabase en el archivo .env.local y crear la tabla 'operaciones_diarias'.");
    }
  };

  const handleClearDashboard = () => {
    console.log("Formulario limpiado");
  };

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden font-sans text-slate-200 justify-center">
      
      {/* Top Nav Minimal */}
      <nav className="fixed top-0 left-0 w-full border-b border-slate-800 bg-black/90 backdrop-blur h-14 flex items-center justify-between px-6 z-50">
         <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] border border-indigo-500/30 bg-indigo-900/50 flex items-center justify-center">
                 <span className="text-[10px] font-bold text-indigo-400">AHT</span>
             </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">Ingreso<span className="text-indigo-400">Diario</span></span>
         </div>
         <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 border border-slate-700">
            <ArrowLeft size={14} /> Volver a Terminal
         </Link>
      </nav>

      {/* Form Container (Center aligned) */}
      <div className="mt-14 w-full max-w-md pt-8">
        <div className="shadow-2xl rounded-2xl overflow-hidden border border-slate-800">
           <NightAuditorForm 
             onUpdateDashboard={handleUpdateDashboard} 
             onClearDashboard={handleClearDashboard} 
           />
        </div>
      </div>
      
    </div>
  );
}
