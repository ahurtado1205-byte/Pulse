"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { ArrowUpRight, TrendingUp, AlertTriangle, Users } from 'lucide-react';

const mockDailyTrend = [
  { name: 'Lun', occ: 45, adr: 90000, revpar: 40500 },
  { name: 'Mar', occ: 52, adr: 95000, revpar: 49400 },
  { name: 'Mie', occ: 68, adr: 105000, revpar: 71400 },
  { name: 'Jue', occ: 74, adr: 110000, revpar: 81400 },
  { name: 'Vie', occ: 85, adr: 125000, revpar: 106250 },
  { name: 'Sab', occ: 92, adr: 135000, revpar: 124200 },
  { name: 'Dom', occ: 65, adr: 95000, revpar: 61750 },
];

const mockOrigins = [
  { name: 'Nacional', value: 65, color: '#4f46e5' },
  { name: 'Brasil', value: 20, color: '#10b981' },
  { name: 'Corporativo', value: 10, color: '#f59e0b' },
  { name: 'Otros', value: 5, color: '#64748b' },
];

interface DashboardProps {
  latestData: any;
  history: any[];
  hotelRooms: number;
}

export default function DashboardView({ latestData, history, hotelRooms }: DashboardProps) {
  // Combinamos la data ingresada ahora con el historial previo para el gráfico
  const chartData = [...history]
    .reverse()
    .map(op => ({
      name: new Date(op.fecha).toLocaleDateString('es-AR', { weekday: 'short' }),
      occ: (op.habitacionesVendidas / (hotelRooms || 1)) * 100,
      revpar: op.adrDiario * (op.habitacionesVendidas / (hotelRooms || 1)),
      adr: op.adrDiario
    }));

  // Si hay data recién ingresada (que aún no está en history), la agregamos al final para visualización inmediata
  if (latestData && hotelRooms > 0) {
    chartData.push({
      name: 'Hoy',
      occ: (parseInt(latestData.occ) / hotelRooms) * 100,
      revpar: parseFloat(latestData.adr) * (parseInt(latestData.occ) / hotelRooms),
      adr: parseFloat(latestData.adr)
    });
  }

  // Tomamos la última operación para los KPI (ya sea la del historial o la recién ingresada)
  const currentOcc = latestData ? (parseInt(latestData.occ) / hotelRooms) * 100 : (history[0]?.habitacionesVendidas / hotelRooms * 100) || 0;
  const currentAdr = latestData ? parseFloat(latestData.adr) : history[0]?.adrDiario || 0;
  const currentRevpar = currentAdr * (currentOcc / 100);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-black relative">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Consolidado <span className="text-indigo-400">Destino</span></h1>
          <p className="text-sm text-slate-400 mt-1 font-mono tracking-widest uppercase">Métricas Reales (Datos de Prisma)</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Market Penetration (MPI)</span>
            <span className="text-xl font-bold text-emerald-400 flex items-center gap-1">104.2 <TrendingUp size={16}/></span>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ocupación Actual</h3>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-white">{currentOcc.toFixed(1)}%</span>
            <span className="text-xs font-bold text-emerald-400 mb-1.5 flex items-center"><ArrowUpRight size={12}/> Ref. Real</span>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">ADR Diario</h3>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-white">${currentAdr.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            <span className="text-xs font-bold text-emerald-400 mb-1.5 flex items-center"><ArrowUpRight size={12}/> Activo</span>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">RevPAR Calculado</h3>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-amber-400">${currentRevpar.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            <span className="text-xs font-bold text-emerald-400 mb-1.5 flex items-center"><ArrowUpRight size={12}/> Live</span>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-center border-l-4 border-l-rose-500">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><AlertTriangle size={12} className="text-rose-500"/> Alertas Pacing</h3>
          <p className="text-sm font-semibold text-rose-200">
            {history.length > 0 ? "Monitoreando tendencias de reserva..." : "Esperando ingreso de datos históricos."}
          </p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Curva de RevPAR */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">Evolución RevPAR (Últimos {chartData.length} registros)</h3>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded transition-colors">Histórico</button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'RevPAR']}
                />
                <Line type="monotone" dataKey="revpar" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#818cf8', strokeWidth: 2, fill: '#0f172a' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Origenes */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <Users size={16} className="text-emerald-400"/> Distribución Origen
          </h3>
          <div className="flex-1 w-full flex items-center justify-center relative min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockOrigins}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockOrigins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', border: '1px solid #334155' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">{history[0]?.habitacionesVendidas || 0}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Res. Hoy</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {mockOrigins.map(origin => (
              <div key={origin.name} className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: origin.color }}></div>
                {origin.name} ({origin.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
