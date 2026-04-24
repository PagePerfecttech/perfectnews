import React from 'react';
import { 
  Plus, 
  Calendar, 
  FileText, 
  Eye, 
  Edit3, 
  Trash2, 
  UploadCloud,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function EPaperManagement() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">E-Paper Management</h1>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-red-700 transition-all shadow-lg">
          <UploadCloud className="w-5 h-5" />
          <span>Upload New Edition</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upload Card Placeholder */}
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary hover:bg-red-50 transition-all cursor-pointer group">
           <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
              <Plus className="w-8 h-8 text-gray-300 group-hover:text-primary" />
           </div>
           <div>
              <p className="font-bold text-gray-800 text-sm">Tomorrow's Edition</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Pending Upload</p>
           </div>
        </div>

        {/* Existing Editions */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
             <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400&h=600&auto=format&fit=crop`} 
                  alt="epaper" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                   <Link href="/admin/epaper/editor" className="p-3 bg-white text-primary rounded-full hover:scale-110 transition-transform shadow-xl">
                      <Layers className="w-5 h-5" />
                   </Link>
                   <button className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-xl">
                      <Eye className="w-5 h-5" />
                   </button>
                </div>
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                   Live
                </div>
             </div>
             <div className="p-4 flex items-center justify-between">
                <div>
                   <h4 className="telugu-text text-sm font-bold">ఈరోజు ఎడిషన్ - హైదరాబాద్</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> April 23, 2026
                   </p>
                </div>
                <div className="flex items-center space-x-1">
                   <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Stats/Settings */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
         <h3 className="font-black italic text-secondary text-lg mb-6 tracking-tight uppercase border-b-2 border-primary/10 pb-4">E-Paper Analytics</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
               <p className="text-3xl font-black text-primary">15,240</p>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total Downloads</p>
            </div>
            <div className="space-y-1">
               <p className="text-3xl font-black text-primary">8.5K</p>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Subscribers</p>
            </div>
            <div className="space-y-1">
               <p className="text-3xl font-black text-primary">124</p>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hotspot Clicks Today</p>
            </div>
         </div>
      </div>
    </div>
  );
}
