"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building, Check, KeySquare, ShieldCheck, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Form states - Register
  const [regHotelName, setRegHotelName] = useState("");
  const [regRooms, setRegRooms] = useState("");
  const [regCategory, setRegCategory] = useState("5 Estrellas");
  const [regAdminEmail, setRegAdminEmail] = useState("");
  const [regAdminPassword, setRegAdminPassword] = useState("");

  // Manejar Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Supabase Auth Integration
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;
      
      console.log("Sesión iniciada:", data);
      alert("✅ Acceso autorizado. (Redirigiendo...)");
      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      alert(`⚠️ Error al iniciar sesión: ${err.message || 'Verifica tus credenciales'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar Registro de Hotel
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Supabase Auth Integration (Sign Up)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: regAdminEmail,
        password: regAdminPassword,
      });

      if (authError) throw authError;

      // 2. Aquí iría la lógica para insertar el Hotel en la DB
      console.log("Administrador creado:", authData);
      alert("✅ Propiedad registrada. (Requiere confirmación de email)");
      
      // Simulamos la redirección
      setActiveTab("login");
    } catch (err: any) {
      console.error(err);
      alert(`⚠️ Error al registrar: ${err.message || 'Intenta nuevamente'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020617] text-slate-200 font-sans">
      
      {/* FONDOS ABSTRACTOS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoNTEsIDY1LCA4NSwgMC4yKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* MAIN CONTAINER LOGIN */}
      <div className="w-full max-w-[1000px] min-h-[600px] flex rounded-2xl shadow-2xl relative z-10 mx-4 border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* MITAD IZQUIERDA: BRANDING */}
        <div className="hidden md:flex w-1/2 bg-slate-900/40 border-r border-slate-800 flex-col justify-between p-10 relative">
          
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)] border border-indigo-500/40 bg-indigo-900 flex items-center justify-center">
                 <span className="text-2xl font-bold text-indigo-400">AHT</span>
              </div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight leading-tight mb-4">
              La Inteligencia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Ponderada</span> del<br />
              Destino Turístico.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-6 border-l-2 border-indigo-500/50 pl-4 py-1">
              Plataforma B2B exclusiva para la hotelería local.
              Provee Big Data transaccional y Revenue Management en tiempo real.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-inner">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Cifrado Bancario (256-bit)</h4>
                <p className="text-xs text-slate-500">Datos hoteleros encriptados y confidenciales.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-8 opacity-60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Pulse AHT v4.0
            </div>
          </div>
        </div>

        {/* MITAD DERECHA: FORMULARIOS (LOGIN / ALTA) */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col bg-black/40 backdrop-blur-md relative overflow-y-auto">
          
          <div className="w-full max-w-md mx-auto">
            
            {/* TABS SWITCHER */}
            <div className="flex border-b border-slate-800 mb-8">
              <button 
                onClick={() => setActiveTab("login")} 
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'login' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                Acceso Staff
              </button>
              <button 
                onClick={() => setActiveTab("register")} 
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'register' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                Alta Hotel Nuevo
              </button>
            </div>

            {/* FORMULARIO 1: LOGIN (Simple) */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">Ingreso Operativo</h2>
                  <p className="text-xs text-slate-400">Para auditores y gerentes registrados</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                    <span>Usuario / Email Operativo</span>
                    <User size={14} className="text-slate-600" />
                  </label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="auditor@hotel.com" 
                    required 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                    <span>Clave de Acceso</span>
                    <Link href="#" className="text-indigo-400 hover:text-indigo-300 normal-case tracking-normal text-[10px]">¿Olvidaste la clave?</Link>
                  </label>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••" 
                    required 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white px-4 py-3 outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? "Autenticando..." : "Ingresar al Pulse"}</span>
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </div>
              </form>
            )}

            {/* FORMULARIO 2: ALTA DE HOTEL (Registro) */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-6 border-b border-indigo-500/30 pb-4">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-500/30">
                    <Building size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">Unir mi Propiedad</h2>
                  <p className="text-xs text-slate-400">Paso 1: Datos Core del nuevo hotel</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nombre Oficial del Hotel</label>
                    <input 
                      type="text" 
                      value={regHotelName}
                      onChange={(e) => setRegHotelName(e.target.value)}
                      placeholder="Ej: Hotel Gran Plaza" 
                      required 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white px-3 py-2.5 outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Habs. Fijas</label>
                    <input 
                      type="number" 
                      value={regRooms}
                      onChange={(e) => setRegRooms(e.target.value)}
                      placeholder="Ej: 45" 
                      required 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white px-3 py-2.5 outline-none focus:border-indigo-500 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Categoría</label>
                    <select 
                      value={regCategory}
                      onChange={(e) => setRegCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 text-sm"
                    >
                      <option>5 Estrellas</option>
                      <option>4 Estrellas</option>
                      <option>3 Estrellas</option>
                      <option>Boutique</option>
                    </select>
                  </div>

                  <div className="col-span-2 mt-2 pt-2 border-t border-slate-800">
                    <p className="text-[10px] text-amber-500 font-bold uppercase mb-2">Creación Cuenta Gerencia (Admin)</p>
                    <input 
                      type="email" 
                      value={regAdminEmail}
                      onChange={(e) => setRegAdminEmail(e.target.value)}
                      placeholder="Email Gerente (Admin)" 
                      required 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white px-3 py-2.5 outline-none focus:border-indigo-500 text-sm mb-3"
                    />
                    <input 
                      type="password" 
                      value={regAdminPassword}
                      onChange={(e) => setRegAdminPassword(e.target.value)}
                      placeholder="Crear Password" 
                      required 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white px-3 py-2.5 outline-none focus:border-indigo-500 text-sm font-mono tracking-widest"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? "Enviando..." : "Inscribir Propiedad"}</span>
                    {!isLoading && <Check size={18} />}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
