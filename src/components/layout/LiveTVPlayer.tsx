"use client";

import React, { useState } from 'react';
import { Tv, X, Maximize2, Minimize2, Play } from 'lucide-react';

export function LiveTVPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-2 group"
      >
        <div className="relative">
          <Tv className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary" />
        </div>
        <span className="font-black text-xs tracking-widest hidden group-hover:block transition-all">WATCH LIVE</span>
      </button>
    );
  }

  return (
    <div className={`
      fixed z-50 shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl border-4 border-primary bg-black
      ${isMinimized ? 'bottom-6 right-6 w-[300px] h-[168px]' : 'bottom-6 right-6 w-[90vw] md:w-[600px] h-[50vh] md:h-[337px]'}
    `}>
      {/* Controls Header */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
           <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
           <span className="text-[10px] font-black text-white tracking-widest uppercase">Live: Telugu Post News</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded-md transition-colors">
            {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-600 rounded-md transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Video Content (Mocked with Iframe) */}
      <div className="w-full h-full pt-10">
         <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/live_stream?channel=UC80Z9_q-Xf66n29rG0Lq-Gg&autoplay=1&mute=1" 
            title="Live TV" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          />
      </div>
    </div>
  );
}
