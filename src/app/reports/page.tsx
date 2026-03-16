"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Send, ArrowLeft, Wand2 } from 'lucide-react';

// Fix typescript for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

/**
 * PDF REPORT GENERATOR
 * ----------------------------------------------------------------------------
 * Ruta: /reports (app/reports/page.tsx)
 * Propósito: Módulo de extracción de datos del motor Big Data.
 * Permite compilar los datos de todos los hoteles y exportarlos formalmente 
 * en PDF o CSV. Utiliza jsPDF para renderizado 100% Client-Side en el navegador.
 */
export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [docType, setDocType] = useState('weekly');

  const generatePDF = async () => {
    // Dynamically import jsPDF to avoid Next.js SSR "window is not defined" issues
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF();
    
    // Inject autoTable directly if TS allows it, but normally jsPDF prototype is augmented
    // or we can call the module function directly: autoTable(doc, options);
    
    // Premium AHT Branding Colors
    const primary = [15, 23, 42]; // slate-900
    const accent = [79, 70, 229]; // indigo-600
    const textLight = [100, 116, 139]; // slate-500
    
    // Page border
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.rect(5, 5, 200, 287);
    
    // Header background (Dark Blue/Slate)
    doc.setFillColor(primary[0], primary[1], primary[2]);
    doc.rect(5, 5, 200, 35, 'F');
    
    // Top Left: Brand
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text('AHT', 14, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text('Pulse', 36, 25);

    // Top Right: Document Info
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('CONFIDENCIAL', 196, 18, { align: 'right' });
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 196, 25, { align: 'right' });
    
    // Title Section
    doc.setTextColor(primary[0], primary[1], primary[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(docType === 'monthly' ? 'Cierre Operativo Mensual (Consolidado)' : 'Resumen Ejecutivo Semanal', 14, 55);
    
    // Subtitle / Scope
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('Métricas ponderadas por motor Big Data. Ámbito: Mar del Plata (Global).', 14, 62);

    // Separator line
    doc.setDrawColor(accent[0], accent[1], accent[2]);
    doc.setLineWidth(1);
    doc.line(14, 66, 196, 66);

    // Global KPIs Mock Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(primary[0], primary[1], primary[2]);
    doc.text('KPIs GENERALES DEL DESTINO:', 14, 76);
    
    doc.setFont("helvetica", "normal");
    doc.text('Occupancy Promedio: 74.2%  |  ADR Ponderado: $115,200  |  RevPAR Destino: $85,478', 14, 82);

    // Mock Data Table
    const tableData = [
      ['Hotel Costa Galana', '186', '75%', '$125,000', '$93,750'],
      ['Sheraton Mar del Plata', '350', '68%', '$118,000', '$80,240'],
      ['NH Gran Hotel Provincial', '460', '52%', '$85,000', '$44,200'],
      ['Hermitage Hotel', '220', '81%', '$132,000', '$106,920'],
      ['Sainte Jeanne Boutique', '27', '92%', '$185,000', '$170,200'],
    ];

    autoTable(doc, {
      startY: 90,
      head: [['Propiedad (Nodo)', 'Volumen Habs', 'Occupancy', 'ADR ($)', 'RevPAR ($)']],
      body: tableData,
      theme: 'grid',
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 5 },
      headStyles: { 
        fillColor: [primary[0], primary[1], primary[2]], 
        textColor: 255, 
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { halign: 'center' },
        3: { halign: 'right' },
        4: { halign: 'right', fontStyle: 'bold', textColor: [accent[0], accent[1], accent[2]] }
      },
      alternateRowStyles: { fillColor: [248, 250, 252] }, // slate-50
      tableLineColor: [226, 232, 240],
      tableLineWidth: 0.1,
    });

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(5, pageHeight - 15, 200, 10, 'F');
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('AHT Argentina - Cámara de Hotelería de Turismo', 14, pageHeight - 9);
    doc.text('aht.org.ar | Documento Protegido', 196, pageHeight - 9, { align: 'right' });

    doc.save(docType === 'monthly' ? 'AHT_Month_Mar26.pdf' : 'AHT_Exec_Week1.pdf');
  };

  const generateCSV = () => {
    const headers = ['Hotel_ID', 'Propiedad', 'Habitaciones', 'OCC', 'ADR', 'RevPAR'];
    const data = [
      ['AHT-MDP-001', 'Hotel Costa Galana', '186', '75', '125000', '93750'],
      ['AHT-MDP-002', 'Sheraton Mar del Plata', '350', '68', '118000', '80240'],
      ['AHT-MDP-005', 'NH Gran Hotel Provincial', '460', '52', '85000', '44200'],
      ['AHT-MDP-012', 'Hermitage Hotel', '220', '81', '132000', '106920'],
      ['AHT-MDP-022', 'Sainte Jeanne Boutique', '27', '92', '185000', '170200'],
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'AHT_Raw_Database.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (progress === 100) {
      // Trigger actual download
      if (docType === 'raw') {
        generateCSV();
      } else {
        generatePDF();
      }
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 25;
      });
    }, 800);
  };

  const getStatusText = () => {
    if (progress === 0) return "SOLICITANDO CONSULTA BIG DATA...";
    if (progress === 25) return "PONDERANDO REVPAR...";
    if (progress === 50) return "RENDERIZANDO GRÁFICOS (ECHARTS)...";
    if (progress === 75) return "CONSTRUYENDO PDF...";
    return "¡LISTO PARA DESCARGA!";
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute bottom-[-20%] right-[20%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <nav className="border-b border-slate-800 bg-black/90 backdrop-blur h-14 flex-shrink-0 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
            <div className="w-8 h-8 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] border border-emerald-500/30 bg-emerald-900/50 flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-400">REP</span>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">Report<span className="text-emerald-400">Generator</span></span>
          </div>
          
          <Link href="/" className="px-3 py-1.5 rounded transition-colors text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-2">
            <ArrowLeft size={14} /> Volver a Terminal
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Generación Automática de Entregables AHT</span>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Builder */}
          <div className="bg-slate-900/70 p-8 rounded-2xl border-t-4 border-t-emerald-500 shadow-2xl backdrop-blur border-x border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Wand2 className="text-emerald-400" /> Construir Entregable
            </h2>
            <p className="text-sm text-slate-400 mb-8 border-l-2 border-slate-700 pl-3">
              Parametriza los datos que deseas exportar desde el motor Big Data del destino.
            </p>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Plantilla AHT</label>
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-4 py-3 outline-none focus:border-emerald-500 text-sm font-semibold"
                >
                  <option value="weekly">Resumen Ejecutivo Semanal (PDF)</option>
                  <option value="monthly">Cierre Mensual Consolidado PDF</option>
                  <option value="raw">Crudo Transaccional Destino (CSV)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Fecha Inicio</label>
                  <input type="date" defaultValue="2026-03-01" className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-3 py-2 outline-none focus:border-emerald-500 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Fecha Fin</label>
                  <input type="date" defaultValue="2026-03-07" className="w-full bg-slate-950 border border-slate-700 rounded-lg text-white px-3 py-2 outline-none focus:border-emerald-500 text-sm" />
                </div>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-slate-800">
                <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Dimensión de Datos</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="scope" defaultChecked className="accent-emerald-500 w-4 h-4 bg-slate-900 border-slate-600" />
                    <span className="text-sm font-semibold text-white">Todo el Destino (Total Plaza)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="scope" className="accent-emerald-500 w-4 h-4 bg-slate-900 border-slate-600" />
                    <span className="text-sm font-semibold text-slate-300">Solo Segmento Lujo</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isGenerating && progress < 100}
                className={`w-full py-4 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3 ${(isGenerating && progress < 100) ? 'bg-slate-700 opacity-80 cursor-not-allowed' : progress === 100 ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
              >
                {isGenerating && progress < 100 ? (
                  <><span className="animate-spin"><Wand2 size={18} /></span> Consultando Big Data...</>
                ) : progress === 100 ? (
                  <><Download size={18} /> Descargar Archivo Físico</>
                ) : (
                  <><FileText size={18} /> Compilar Data & Exportar</>
                )}
              </button>
            </form>
          </div>

          {/* Preview / Email */}
          <div className="flex flex-col gap-6">
            <div className={`bg-slate-900/40 p-6 rounded-2xl flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur border ${progress === 100 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-slate-800'} transition-all duration-700`}>
              
              <div className={`w-28 h-36 bg-slate-800 rounded-lg shadow-2xl border-2 ${progress === 100 ? 'border-emerald-500 scale-100 opacity-100' : 'border-slate-700 scale-95 opacity-50'} flex flex-col items-center justify-center mb-6 relative transition-all duration-500`}>
                <FileText size={48} className={docType === 'raw' ? 'text-emerald-500' : 'text-rose-500'} />
                <span className={`mt-3 text-[10px] font-bold px-2 py-0.5 rounded border ${docType === 'raw' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-rose-400 bg-rose-500/10 border-rose-500/30'}`}>
                  {docType === 'raw' ? 'CSV' : 'PDF'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-mono">
                {docType === 'raw' ? 'AHT_Raw_Database.csv' : docType === 'monthly' ? 'AHT_Month_Mar26.pdf' : 'AHT_Exec_Week1.pdf'}
              </h3>
              
              {isGenerating && (
                <div className="w-full px-8 mt-6">
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-300" style={{width: `${progress}%`}}></div>
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-emerald-400 mt-2">{getStatusText()}</p>
                </div>
              )}
            </div>

            <div className="bg-indigo-900/10 border border-indigo-500/30 p-6 rounded-2xl backdrop-blur">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Send size={16} className="text-indigo-400" /> Auto-Distribución Inmediata
              </h3>
              <div className="flex gap-2 mb-3">
                <input type="text" placeholder="Emails separados por coma..." className="flex-1 bg-slate-950 border border-slate-700 rounded-lg text-white px-3 py-2 outline-none focus:border-indigo-500 text-sm" />
                <button className="px-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm font-bold transition-colors">Push</button>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] text-slate-300 font-semibold cursor-pointer hover:border-indigo-500">Junta Directiva</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] text-slate-300 font-semibold cursor-pointer hover:border-indigo-500">Sec. de Turismo</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
