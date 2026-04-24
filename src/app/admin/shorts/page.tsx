"use client";

import React, { useState } from 'react';
import { 
  Play, 
  Upload, 
  Smartphone, 
  Type, 
  Hash, 
  Trash2, 
  Check, 
  Eye, 
  Music,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function ShortsEditor() {
  const [videoTitle, setVideoTitle] = useState("నేటి ముఖ్యాంశాలు: ఆంధ్రప్రదేశ్ రాజకీయాల్లో అనూహ్య మార్పులు");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Shorts <span className="text-primary">Studio</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vertical News Creator</p>
         </div>
         <div className="flex items-center space-x-3">
            <button className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
               Save Draft
            </button>
            <button className="px-8 py-3 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all">
               Post Short
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Editor Area */}
         <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
               <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                     <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <h3 className="font-black italic uppercase tracking-tighter text-secondary">Video Upload</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">MP4 / MOV (Portrait 9:16 Only)</p>
                  </div>
               </div>

               {progress === 0 ? (
                 <div 
                   onClick={handleUpload}
                   className="aspect-[9/10] bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all group"
                 >
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Play className="w-6 h-6 text-primary" fill="currentColor" />
                    </div>
                    <p className="mt-6 text-sm font-black italic uppercase tracking-tighter text-secondary">Drop Vertical Video Here</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Recommended: Under 15MB, 30s max</p>
                 </div>
               ) : (
                 <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                          <span className="text-xs font-bold text-secondary uppercase tracking-widest">Processing Vertical Feed...</span>
                       </div>
                       <span className="text-xs font-black text-primary italic">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-primary transition-all duration-300" 
                         style={{ width: `${progress}%` }}
                       />
                    </div>
                 </div>
               )}
            </section>

            {/* Metadata */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                  <Type className="w-4 h-4 text-primary" />
                  <span>Captions & Tags</span>
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-400">Short Title (Telugu)</label>
                     <textarea 
                       value={videoTitle}
                       onChange={(e) => setVideoTitle(e.target.value)}
                       className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold telugu-text outline-none focus:border-primary transition-all h-24"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-gray-400">Hashtags</label>
                     <div className="flex items-center space-x-2">
                        <div className="bg-gray-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-600">#LatestNews</div>
                        <div className="bg-gray-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-600">#APPolitics</div>
                        <button className="p-1.5 bg-primary/5 text-primary rounded-lg"><Plus className="w-4 h-4" /></button>
                     </div>
                  </div>
               </div>
            </section>
         </div>

         {/* Mobile Preview */}
         <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 text-center italic">Live Preview</h3>
               <div className="bg-black w-full aspect-[9/16] rounded-[3rem] relative overflow-hidden border-[12px] border-secondary shadow-2xl">
                  {/* Simulated Video Content */}
                  <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=400&h=700&auto=format&fit=crop" alt="preview" className="w-full h-full object-cover opacity-80" />
                  
                  {/* Overlay UI */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-8 left-6 right-16 space-y-3">
                     <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border border-white/20">
                           <Play className="w-4 h-4 text-white" fill="white" />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Telugu Post LIVE</span>
                     </div>
                     <p className="text-xs font-bold text-white telugu-text leading-relaxed">
                        {videoTitle}
                     </p>
                     <div className="flex items-center space-x-3 text-[10px] text-primary font-black uppercase">
                        <Music className="w-3 h-3" />
                        <span>Breaking News Original</span>
                     </div>
                  </div>

                  {/* Right Actions */}
                  <div className="absolute bottom-20 right-4 flex flex-col space-y-6 items-center">
                     <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                        <Check className="w-5 h-5 text-white" />
                     </div>
                     <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                        <Eye className="w-5 h-5 text-white" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
