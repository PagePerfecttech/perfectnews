"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Maximize, 
  Calendar,
  Grid,
  Search,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import Link from 'next/link';

export default function EPaperReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Reader Header */}
      <nav className="h-16 md:h-20 border-b border-white/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl">
        <div className="flex items-center space-x-6">
           <Link href="/" className="text-xl md:text-2xl font-black italic tracking-tighter text-primary">TP<span className="text-white">.PAPER</span></Link>
           <div className="hidden md:flex items-center space-x-2 border-l border-white/10 pl-6">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">April 23, 2026</span>
           </div>
        </div>

        <div className="flex items-center space-x-2 bg-white/5 rounded-full p-1 border border-white/5">
           <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
           </button>
           <span className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-300">Page {currentPage} / 16</span>
           <button onClick={() => setCurrentPage(Math.min(16, currentPage + 1))} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5" />
           </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
           <div className="hidden lg:flex items-center space-x-2 mr-4 border-r border-white/10 pr-6">
              <button className="p-2 text-gray-400 hover:text-white transition-colors"><ZoomIn className="w-5 h-5" /></button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors"><ZoomOut className="w-5 h-5" /></button>
           </div>
           <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Download className="w-5 h-5" /></button>
           <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Share2 className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* Main Reader View */}
      <div className="flex-1 overflow-hidden relative flex flex-col items-center bg-black/40">
        <div className="max-w-screen-xl mx-auto w-full h-full p-4 md:p-8 flex items-center justify-center relative overflow-auto custom-scrollbar">
           {/* Newspaper Page Wrapper */}
           <div className={`relative shadow-2xl transition-all duration-500 bg-white ${isZoomed ? 'scale-150 origin-top' : 'h-full md:h-[85vh] aspect-[3/4]'}`}>
              <img 
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&h=1600&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="newspaper page" 
              />
              
              {/* Interactive Hotspots (Example) */}
              <Link 
                href="/news/123" 
                className="absolute top-[10%] left-[10%] w-[30%] h-[20%] border-2 border-primary/0 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-pointer group"
              >
                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-primary text-white p-1 rounded-full text-[8px] font-black uppercase">Click to Read</div>
              </Link>
           </div>
        </div>

        {/* Thumbnail Navigation (Bottom Bar) */}
        <div className="h-24 md:h-28 w-full bg-gray-900/60 backdrop-blur-md border-t border-white/5 p-4 flex items-center justify-center space-x-4 overflow-x-auto no-scrollbar">
           {[...Array(16)].map((_, i) => (
             <button 
               key={i}
               onClick={() => setCurrentPage(i + 1)}
               className={`h-full aspect-[3/4] flex-shrink-0 rounded overflow-hidden border-2 transition-all ${currentPage === i + 1 ? 'border-primary scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
             >
               <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=100&h=133&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
             </button>
           ))}
        </div>
      </div>

      {/* Floating Action Menu (Mobile) */}
      <div className="fixed bottom-32 right-6 md:hidden z-50 space-y-4">
         <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center">
            <Maximize className="w-6 h-6" />
         </button>
         <button className="w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center">
            <Grid className="w-6 h-6" />
         </button>
      </div>
    </main>
  );
}
