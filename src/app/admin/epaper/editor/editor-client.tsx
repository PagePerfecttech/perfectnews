"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, Save, MousePointer2, Link as LinkIcon, X, ZoomIn, ZoomOut, Loader2
} from 'lucide-react';
import { saveHotspots } from '@/lib/epaper-hotspot-actions';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  articleUrl: string | null;
}

interface EPaperPageData {
  id: string;
  pageNumber: number;
  imageUrl: string;
  hotspots: Hotspot[];
}

export function EPaperEditorClient({ 
  epaperTitle, 
  pages 
}: { 
  epaperTitle: string, 
  pages: EPaperPageData[] 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentPage = pages[currentIndex];
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);

  // Load hotspots when page changes
  useEffect(() => {
    if (currentPage) {
      setHotspots(currentPage.hotspots.map(h => ({ ...h })));
    }
  }, [currentIndex, currentPage]);

  const handleSave = async () => {
    if (!currentPage) return;
    setIsSaving(true);
    try {
      await saveHotspots(currentPage.id, hotspots.map(h => ({
        x: h.x, y: h.y, width: h.width, height: h.height, articleUrl: h.articleUrl || ""
      })));
      alert("Hotspots saved successfully!");
    } catch (e) {
      alert("Failed to save hotspots");
    } finally {
      setIsSaving(false);
    }
  };

  const addHotspot = () => {
    setHotspots([
      ...hotspots, 
      { id: Date.now().toString(), x: 10, y: 10, width: 20, height: 10, articleUrl: "" }
    ]);
  };

  const updateHotspot = (id: string, field: keyof Hotspot, value: any) => {
    setHotspots(hotspots.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const removeHotspot = (id: string) => {
    setHotspots(hotspots.filter(h => h.id !== id));
  };

  if (pages.length === 0) {
    return <div className="p-10 text-center">No pages found for this E-Paper.</div>;
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
      {/* Editor Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-6">
           <h1 className="telugu-text font-bold text-lg">{epaperTitle}</h1>
           <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)} className="p-2 hover:bg-white rounded-md transition-all shadow-none hover:shadow-sm disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 text-xs font-black">PAGE {currentPage.pageNumber} OF {pages.length}</span>
              <button disabled={currentIndex === pages.length - 1} onClick={() => setCurrentIndex(currentIndex + 1)} className="p-2 hover:bg-white rounded-md transition-all shadow-none hover:shadow-sm disabled:opacity-50">
                <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-1 border-r pr-4 mr-4">
              <button onClick={() => setScale(s => s + 0.2)} className="p-2 hover:bg-gray-100 rounded-lg"><ZoomIn className="w-4 h-4" /></button>
              <button onClick={() => setScale(s => Math.max(0.4, s - 0.2))} className="p-2 hover:bg-gray-100 rounded-lg"><ZoomOut className="w-4 h-4" /></button>
           </div>
           <button onClick={handleSave} disabled={isSaving} className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center space-x-2 shadow-lg shadow-red-100 disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
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
           <button onClick={addHotspot} className="p-3 text-gray-400 hover:text-primary hover:bg-red-50 rounded-xl transition-all">
              <Plus className="w-6 h-6" />
           </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-200 overflow-auto p-12 flex justify-center items-start custom-scrollbar" ref={containerRef}>
           <div 
             className="relative bg-white shadow-2xl origin-top transition-transform duration-200"
             style={{ width: '800px', height: '1100px', transform: `scale(${scale})` }}
           >
              {currentPage.imageUrl ? (
                <img 
                  src={currentPage.imageUrl} 
                  className="w-full h-full object-contain pointer-events-none" 
                  alt={`Page ${currentPage.pageNumber}`}
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">No Image Available</div>
              )}
              
              {/* Hotspot Overlays */}
              {hotspots.map(h => (
                <div 
                  key={h.id}
                  className="absolute border-2 border-primary bg-primary/20 hover:bg-primary/40 transition-all flex flex-col items-center justify-center cursor-move shadow-inner"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }}
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
              {hotspots.map((h, i) => (
                <div key={h.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4 relative group">
                   <button onClick={() => removeHotspot(h.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                   </button>
                   <div className="text-xs font-black text-gray-400 mb-2">Area {i + 1}</div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Linked Article URL</label>
                      <input 
                        type="text" 
                        value={h.articleUrl || ""}
                        onChange={(e) => updateHotspot(h.id, 'articleUrl', e.target.value)}
                        className="w-full p-2 bg-white border border-gray-100 rounded text-xs outline-none focus:border-primary"
                        placeholder="https://... or /news/..."
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                     <div className="space-y-1">
                       <label className="text-[10px] text-gray-400">X (%)</label>
                       <input type="number" value={h.x} onChange={e => updateHotspot(h.id, 'x', Number(e.target.value))} className="w-full p-1 text-xs border rounded" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] text-gray-400">Y (%)</label>
                       <input type="number" value={h.y} onChange={e => updateHotspot(h.id, 'y', Number(e.target.value))} className="w-full p-1 text-xs border rounded" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] text-gray-400">Width (%)</label>
                       <input type="number" value={h.width} onChange={e => updateHotspot(h.id, 'width', Number(e.target.value))} className="w-full p-1 text-xs border rounded" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] text-gray-400">Height (%)</label>
                       <input type="number" value={h.height} onChange={e => updateHotspot(h.id, 'height', Number(e.target.value))} className="w-full p-1 text-xs border rounded" />
                     </div>
                   </div>
                </div>
              ))}
              {hotspots.length === 0 && <p className="text-xs text-gray-400 italic">No hotspots created yet.</p>}
           </div>

           <button onClick={addHotspot} className="w-full py-3 bg-primary/5 text-primary border border-primary/20 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Hotspot</span>
           </button>
        </div>
      </div>
    </div>
  );
}
