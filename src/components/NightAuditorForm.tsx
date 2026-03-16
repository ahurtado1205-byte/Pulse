"use client";
import React, { useState, useEffect } from "react";
import { Check, Hotel, LogIn, Moon } from "lucide-react";

export default function NightAuditorForm({ onUpdateDashboard, onClearDashboard }: { onUpdateDashboard: (data: any) => void, onClearDashboard: () => void }) {
  const initialData = {
    occ: "",
    adr: "",
    newRes: "0",
    cancels: "0",
    origin: "national",
    pacingEvent: "none",
  };

  const [formData, setFormData] = useState(initialData);

  const [dateStr, setDateStr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    setDateStr(d.toISOString().split("T")[0]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      onUpdateDashboard(formData);
      setIsSubmitting(false);
      // Reset form or show success toast
    }, 800);
  };

  const handleClear = () => {
    setFormData(initialData);
    onClearDashboard();
  };

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col relative z-20 h-screen overflow-y-auto">
      <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900/90 backdrop-blur z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Hotel className="text-indigo-400" size={20} />
            <span>Ingreso Operacional</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Cierre de día contable</p>
        </div>
      </div>

      <div className="p-6 flex-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-black/50 p-4 rounded-xl border border-slate-800 flex justify-between items-end">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Fecha de Auditoría</label>
              <input
                type="date"
                value={dateStr}
                readOnly
                className="w-full bg-transparent text-white text-sm font-mono outline-none cursor-not-allowed opacity-70"
              />
            </div>
             <button type="button" onClick={handleClear} className="text-[10px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-1 rounded transition-colors uppercase font-bold tracking-widest whitespace-nowrap">
               Limpiar Data
             </button>
          </div>

          <p className="text-[9px] text-slate-600 italic mt-0 pt-0">El ingreso siempre impacta el día anterior (cierre necturno).</p>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Moon size={14} /> Core Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Habs. Vendidas</label>
                <input
                  type="number"
                  name="occ"
                  value={formData.occ}
                  onChange={handleChange}
                  placeholder="Ej: 32"
                  min="0"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-3 py-2 outline-none focus:border-indigo-500 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ADR Diario ($)</label>
                <input
                  type="number"
                  name="adr"
                  value={formData.adr}
                  onChange={handleChange}
                  placeholder="Ej: 145000"
                  min="0"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-3 py-2 outline-none focus:border-indigo-500 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Check size={14} /> Pace & Pickup
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nuevas Rvas</label>
                <input
                  type="number"
                  name="newRes"
                  value={formData.newRes}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-3 py-2 outline-none focus:border-emerald-500 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Canceladas</label>
                <input
                  type="number"
                  name="cancels"
                  value={formData.cancels}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg text-rose-300 px-3 py-2 outline-none focus:border-rose-500 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-400 border-b border-slate-800 pb-2">Segmentación</h3>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Origen Predominante</label>
              <select
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-300 px-3 py-2 outline-none focus:border-amber-500 text-sm"
              >
                <option value="national">Turismo Nacional (ARG)</option>
                <option value="brazil">Brasil / Mercosur</option>
                <option value="usa_europe">USA & Europa</option>
                <option value="corporate">Corporativo Local</option>
              </select>
            </div>
            
            <div className="pt-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Evento Atractor (Opcional)</label>
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="pacingEvent" value="none" checked={formData.pacingEvent === "none"} onChange={handleChange} className="peer sr-only" />
                  <div className="p-2 text-center border border-slate-700 rounded peer-checked:bg-indigo-600/20 peer-checked:border-indigo-500 peer-checked:text-indigo-400 text-slate-500 text-xs transition-colors">Normal</div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="pacingEvent" value="recital" checked={formData.pacingEvent === "recital"} onChange={handleChange} className="peer sr-only" />
                  <div className="p-2 text-center border border-slate-700 rounded peer-checked:bg-amber-600/20 peer-checked:border-amber-500 peer-checked:text-amber-400 text-slate-500 text-xs transition-colors">Show</div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="pacingEvent" value="congreso" checked={formData.pacingEvent === "congreso"} onChange={handleChange} className="peer sr-only" />
                  <div className="p-2 text-center border border-slate-700 rounded peer-checked:bg-emerald-600/20 peer-checked:border-emerald-500 peer-checked:text-emerald-400 text-slate-500 text-xs transition-colors">MICE</div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'bg-slate-700 opacity-70' : 'bg-indigo-600 hover:bg-indigo-500'}`}
            >
              {isSubmitting ? "Impactando Destino..." : "Push Data al Destino"}
              {!isSubmitting && <LogIn size={16} />}
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-3 flex items-center justify-center gap-1">
               Datos Encriptados (AHT SecLevel 4)
            </p>
          </div>
        </form>
      </div>
    </aside>
  );
}
