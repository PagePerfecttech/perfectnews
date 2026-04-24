"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Save, 
  MousePointer2, 
  Link as LinkIcon,
  X,
  Trash2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function EPaperHotspotEditor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotspots, setHotspots] = useState([
    { id: 1, x: 10, y: 15, w: 30, h: 20, link: "/news/123" },
    { id: 2, x: 50, y: 10, w: 40, h: 15, link: "/news/456" },
  ]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
      {/* Editor Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-6">
           <h1 className="telugu-text font-bold text-lg">హైదరాబాద్ ఎడిషన్ - ఏప్రిల్ 23, 2026</h1>
           <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage-1))} className="p-2 hover:bg-white rounded-md transition-all shadow-none hover:shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 text-xs font-black">PAGE {currentPage} OF 16</span>
              <button onClick={() => setCurrentPage(Math.min(16, currentPage+1))} className="p-2 hover:bg-white rounded-md transition-all shadow-none hover:shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-1 border-r pr-4 mr-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg"><ZoomIn className="w-4 h-4" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg"><ZoomOut className="w-4 h-4" /></button>
           </div>
           <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center space-x-2 shadow-lg shadow-red-100">
              <Save className="w-4 h-4" />
              <span>Save Mapping</span>
           </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Toolbar */}
        <div className="w-16 bg-white border-r flex flex-col items-center py-6 space-y-6">
           <button className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-red-100">
              <MousePointer2 className="w-6 h-6" />
           </button>
           <button className="p-3 text-gray-400 hover:text-primary hover:bg-red-50 rounded-xl transition-all">
              <Plus className="w-6 h-6" />
           </button>
           <button className="p-3 text-gray-400 hover:text-primary hover:bg-red-50 rounded-xl transition-all">
              <LinkIcon className="w-6 h-6" />
           </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-200 overflow-auto p-12 flex justify-center custom-scrollbar">
           <div className="relative bg-white shadow-2xl w-[800px] h-[1100px] cursor-crosshair group">
              <img 
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover pointer-events-none" 
                alt="epaper page"
              />
              {/* Hotspot Overlays */}
              {hotspots.map(h => (
                <div 
                  key={h.id}
                  className="absolute border-2 border-primary bg-primary/20 hover:bg-primary/40 transition-all flex flex-col items-center justify-center cursor-move shadow-inner"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
                >
                   <div className="bg-primary text-white p-1 rounded-full shadow-lg">
                      <LinkIcon className="w-3 h-3" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Properties Sidebar */}
        <div className="w-80 bg-white border-l p-6 space-y-6 overflow-y-auto">
           <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-4">Hotspot Properties</h3>
           
           <div className="space-y-6">
              {hotspots.map(h => (
                <div key={h.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4 relative group">
                   <button className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                   </button>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Linked Article URL</label>
                      <input 
                        type="text" 
                        defaultValue={h.link}
                        className="w-full p-2 bg-white border border-gray-100 rounded text-xs outline-none focus:border-primary"
                      />
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase">
                      <span>X: {h.x}%</span>
                      <span>Y: {h.y}%</span>
                      <span>W: {h.w}%</span>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full py-3 bg-primary/5 text-primary border border-primary/20 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Hotspot</span>
           </button>
        </div>
      </div>
    </div>
  );
}
