"use client";

import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  FileJson, 
  FileSpreadsheet, 
  Check, 
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';

export default function ImportNewsPage() {
  const [fileType, setFileType] = useState('CSV');
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImport = () => {
    setIsImporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsImporting(false);
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Archive <span className="text-primary">Migration</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Legacy News Ingestion Terminal</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
         {/* Config */}
         <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
               <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                     <Database className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="font-black italic uppercase tracking-tighter text-secondary">Source Configuration</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Map legacy data to new schema</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setFileType('CSV')}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center space-y-3 ${
                      fileType === 'CSV' ? 'border-primary bg-red-50/30' : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                  >
                     <FileSpreadsheet className={`w-8 h-8 ${fileType === 'CSV' ? 'text-primary' : 'text-gray-400'}`} />
                     <span className="text-[10px] font-black uppercase tracking-widest">CSV / Spreadsheet</span>
                  </button>
                  <button 
                    onClick={() => setFileType('JSON')}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center space-y-3 ${
                      fileType === 'JSON' ? 'border-primary bg-red-50/30' : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                  >
                     <FileJson className={`w-8 h-8 ${fileType === 'JSON' ? 'text-primary' : 'text-gray-400'}`} />
                     <span className="text-[10px] font-black uppercase tracking-widest">JSON Format</span>
                  </button>
               </div>

               {progress === 0 ? (
                 <div 
                   onClick={handleImport}
                   className="aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all group"
                 >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <p className="mt-4 text-sm font-black italic uppercase tracking-tighter text-secondary">Select Archive File</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">UTF-8 Telugu Encoding Supported</p>
                 </div>
               ) : (
                 <div className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          {isImporting ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <Check className="w-5 h-5 text-green-600" />}
                          <span className="text-xs font-black uppercase text-secondary tracking-widest">
                             {isImporting ? 'Ingesting Legacy Data...' : 'Import Complete'}
                          </span>
                       </div>
                       <span className="text-xs font-black text-primary italic">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
                       <span>Processed: {Math.floor(progress * 124)} Articles</span>
                       <span>Failed: 0</span>
                    </div>
                 </div>
               )}
            </section>
         </div>

         {/* Side Info */}
         <div className="space-y-8">
            <section className="bg-secondary p-8 rounded-[2.5rem] shadow-xl text-white space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest flex items-center space-x-2 opacity-80">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Validation Rules</span>
               </h3>
               <div className="space-y-4">
                  {[
                    "Auto-generate Slugs from titles",
                    "Sanitize HTML content",
                    "Map old IDs to new UUIDs",
                    "Rebuild SEO Metadata"
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center space-x-3">
                       <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                          {i+1}
                       </div>
                       <span className="text-xs font-bold opacity-90">{rule}</span>
                    </div>
                  ))}
               </div>
            </section>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start space-x-4">
               <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
               <p className="text-[10px] font-bold text-amber-800 uppercase leading-relaxed italic">
                  Ensure your legacy date formats are ISO-8601 to prevent timeline disruption.
               </p>
            </div>
         </div>

      </div>
    </div>
  );
}
