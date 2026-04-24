"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  RefreshCw, 
  Bell, 
  ExternalLink, 
  Check, 
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function TickerManager() {
  const [tickerItems, setTickerItems] = useState([
    { id: '1', title: 'ఆంధ్రప్రదేశ్లో భారీ వర్షాలు – ప్రజలకు హెచ్చరిక', status: 'ACTIVE', time: '2 mins ago' },
    { id: '2', title: 'తెలంగాణలో రాజకీయ ఉద్రిక్తత - అసెంబ్లీలో వాడివేడి చర్చ', status: 'ACTIVE', time: '1 hour ago' },
    { id: '3', title: 'భారత్ మ్యాచ్లో అద్భుత విజయం - అదరగొట్టిన బౌలర్లు', status: 'EXPIRED', time: '5 hours ago' },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">News <span className="text-primary">Ticker</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Breaking News Distribution Hub</p>
         </div>
         <div className="flex items-center space-x-3">
            <div className="bg-primary/5 text-primary px-4 py-2 rounded-xl border border-primary/10 flex items-center space-x-2">
               <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-widest">Live On Site</span>
            </div>
         </div>
      </div>

      {/* Quick Add */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
         <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
               <Plus className="w-4 h-4 text-primary" />
               <span>Push New Alert</span>
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Max 150 Characters</span>
         </div>
         <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="ఇక్కడ బ్రేకింగ్ వార్తను టైప్ చేయండి..." 
              className="flex-1 bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold telugu-text outline-none focus:border-primary transition-all"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center justify-center space-x-2">
               <Bell className="w-4 h-4" />
               <span>Push Live</span>
            </button>
         </div>
      </section>

      {/* Active Tickers */}
      <div className="space-y-4">
         <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-4">Current Site Feed</h3>
         {tickerItems.map((item) => (
           <div key={item.id} className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group transition-all ${item.status === 'EXPIRED' ? 'opacity-60' : ''}`}>
              <div className="flex items-start space-x-4">
                 <div className={`mt-1 w-2 h-2 rounded-full ${item.status === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`} />
                 <div className="space-y-1">
                    <p className="telugu-text font-bold text-secondary text-sm group-hover:text-primary transition-colors">{item.title}</p>
                    <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold uppercase">
                       <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {item.time}</span>
                       <span>•</span>
                       <span>ID: TKR-{item.id}</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-secondary transition-all">
                    <RefreshCw className="w-4 h-4" />
                 </button>
                 <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-primary transition-all">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
           </div>
         ))}
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start space-x-4">
         <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
         <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 uppercase tracking-tighter">System Notice</p>
            <p className="text-xs text-amber-700 leading-relaxed italic">
               Alerts published here will scroll in the site header and are delivered via Push Notifications to active mobile users. Verify facts before pushing live.
            </p>
         </div>
      </div>

    </div>
  );
}
