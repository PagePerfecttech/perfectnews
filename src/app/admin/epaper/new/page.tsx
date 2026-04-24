"use client";

import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Calendar, 
  MapPin, 
  Plus, 
  Trash2, 
  Eye, 
  Check, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function NewEPaper() {
  const [district, setDistrict] = useState("Hyderabad Main");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const districts = [
    "Hyderabad Main", "Vizag City", "Vijayawada", "Guntur", "Kurnool", "Warangal"
  ];

  const handleUpload = () => {
    setIsProcessing(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 300);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Launch <span className="text-primary">E-Paper</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Digital Edition Automation</p>
         </div>
         <div className="flex items-center space-x-3">
            <button className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
               Save Draft
            </button>
            <button className="px-8 py-3 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all">
               Publish Edition
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Config */}
         <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
               <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                     <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <h3 className="font-black italic uppercase tracking-tighter text-secondary">Edition Details</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Configure the daily paper metadata</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> Select District
                     </label>
                     <select 
                       value={district}
                       onChange={(e) => setDistrict(e.target.value)}
                       className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-all appearance-none"
                     >
                        {districts.map(d => <option key={d}>{d}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> Edition Date
                     </label>
                     <input 
                       type="date" 
                       className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-all"
                     />
                  </div>
               </div>
            </section>

            {/* PDF Upload Area */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-primary" />
                  <span>Upload Main PDF</span>
               </h3>

               {uploadProgress === 0 ? (
                 <div 
                   onClick={handleUpload}
                   className="aspect-video bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all group"
                 >
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <p className="mt-6 text-sm font-black italic uppercase tracking-tighter text-secondary">Drop Full PDF Here</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Recommended: Under 50MB</p>
                 </div>
               ) : (
                 <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-xs font-bold text-secondary uppercase">Hyderabad_Main_April24.pdf</span>
                       </div>
                       <span className="text-xs font-black text-primary italic">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-primary transition-all duration-300" 
                         style={{ width: `${uploadProgress}%` }}
                       />
                    </div>
                    {uploadProgress === 100 && (
                      <div className="flex items-center space-x-2 text-green-600 animate-in fade-in">
                         <Check className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-widest">PDF Processed & Pages Extracted</span>
                      </div>
                    )}
                 </div>
               )}
            </section>
         </div>

         {/* Side Info / Page Preview */}
         <div className="space-y-8">
            <section className="bg-secondary p-8 rounded-[2.5rem] shadow-xl text-white space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest flex items-center space-x-2 opacity-80">
                  <Clock className="w-4 h-4" />
                  <span>Automation Logic</span>
               </h3>
               <div className="space-y-4">
                  {[
                    "Auto-split PDF into individual pages",
                    "Generate WebP optimized thumbnails",
                    "OCR recognition for headlines",
                    "Smart Hotspot Mapping"
                  ].map((step, i) => (
                    <div key={i} className="flex items-center space-x-3">
                       <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                          {i+1}
                       </div>
                       <span className="text-xs font-bold opacity-90">{step}</span>
                    </div>
                  ))}
               </div>
               <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] italic opacity-60">
                     Our AI-engine will automatically scan your PDF to detect individual news blocks for the interactive reader.
                  </p>
               </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary">Extracted Pages</h3>
               <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(p => (
                    <div key={p} className="aspect-[3/4] bg-gray-100 rounded-2xl relative group overflow-hidden border border-gray-50">
                       <img src={`https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=200&h=300&auto=format&fit=crop`} alt="page" className="w-full h-full object-cover opacity-60" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <Eye className="w-5 h-5 text-white" />
                       </div>
                       <div className="absolute bottom-2 left-2 bg-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
                          Page {p}
                       </div>
                    </div>
                  ))}
                  <button className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:bg-gray-50 transition-all group">
                     <Plus className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                     <span className="text-[8px] font-black uppercase mt-1 text-gray-400">Add Page</span>
                  </button>
               </div>
            </section>
         </div>

      </div>
    </div>
  );
}
