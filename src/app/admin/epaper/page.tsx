import React from 'react';
import { 
  Plus, 
  Calendar, 
  Eye, 
  Trash2, 
  UploadCloud,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteEpaper } from '@/lib/epaper-actions';
import { EPaperUploader } from './epaper-uploader';

export default async function EPaperManagement() {
  const epapers = await prisma.ePaper.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">E-Paper Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upload Card */}
        <EPaperUploader />

        {/* Existing Editions */}
        {epapers.map((epaper) => (
          <div key={epaper.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
             <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden">
                <img 
                  src={epaper.thumbnail} 
                  alt={epaper.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-sm">
                   <Link href="/admin/epaper/editor" className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform shadow-lg">
                      <Layers className="w-5 h-5" />
                   </Link>
                   <a href={epaper.pdfUrl} target="_blank" rel="noreferrer" className="p-3 bg-black text-white rounded-full hover:scale-105 transition-transform shadow-lg border border-white/20">
                      <Eye className="w-5 h-5" />
                   </a>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border border-gray-200/50">
                   Live
                </div>
             </div>
             <div className="p-4 flex items-center justify-between">
                <div>
                   <h4 className="telugu-text text-sm font-bold truncate max-w-[150px]">{epaper.title}</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {epaper.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                   </p>
                </div>
                <div className="flex items-center space-x-1">
                   <form action={async () => {
                     "use server";
                     await deleteEpaper(epaper.id);
                   }}>
                     <button type="submit" className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                   </form>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Stats/Settings */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
         <h3 className="font-bold text-gray-900 text-lg mb-6 tracking-tight border-b border-gray-100 pb-4">E-Paper Analytics</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
               <p className="text-3xl font-black text-gray-900">15,240</p>
               <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Total Downloads</p>
            </div>
            <div className="space-y-1">
               <p className="text-3xl font-black text-gray-900">8.5K</p>
               <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Active Subscribers</p>
            </div>
            <div className="space-y-1">
               <p className="text-3xl font-black text-gray-900">124</p>
               <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Hotspot Clicks Today</p>
            </div>
         </div>
      </div>
    </div>
  );
}
