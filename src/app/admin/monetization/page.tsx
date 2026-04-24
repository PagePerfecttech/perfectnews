"use client";

import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  ExternalLink, 
  Eye, 
  Settings2, 
  Layout, 
  Monitor, 
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function MonetizationPage() {
  const [activeZone, setActiveZone] = useState('HEADER');

  const zones = [
    { id: 'HEADER', name: 'Header (970x90)', icon: Layout },
    { id: 'SIDEBAR', name: 'Sidebar (300x600)', icon: Monitor },
    { id: 'IN_ARTICLE', name: 'In-Article', icon: Smartphone },
    { id: 'FOOTER', name: 'Footer Banner', icon: Layout },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Monetization <span className="text-primary">Hub</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue & Advertisement Management</p>
         </div>
         <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create New Ad</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         
         {/* Zones Sidebar */}
         <div className="lg:col-span-1 space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Ad Zones</h3>
            {zones.map((zone) => (
              <button 
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center space-x-4 transition-all ${
                  activeZone === zone.id ? 'border-primary bg-red-50/30' : 'border-gray-100 bg-white opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeZone === zone.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                   <zone.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-left">{zone.name}</span>
              </button>
            ))}
         </div>

         {/* Ad Management Area */}
         <div className="lg:col-span-3 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                  <div className="flex items-center space-x-3">
                     <Settings2 className="w-5 h-5 text-primary" />
                     <h3 className="font-black italic uppercase tracking-tighter text-secondary">Active Campaigns: {activeZone}</h3>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                     <CheckCircle2 className="w-3 h-3" />
                     <span>System Live</span>
                  </div>
               </div>

               <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                       <div className="w-full md:w-48 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-widest overflow-hidden relative group">
                          AD PREVIEW
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button className="text-white bg-primary p-2 rounded-full"><Eye className="w-4 h-4" /></button>
                          </div>
                       </div>
                       
                       <div className="flex-1 space-y-2">
                          <h4 className="font-black italic uppercase tracking-tighter text-secondary">Premium Client {i}</h4>
                          <div className="flex items-center space-x-4">
                             <p className="text-[10px] font-black text-gray-400 uppercase">Type: Google AdSense</p>
                             <p className="text-[10px] font-black text-gray-400 uppercase">Status: Active</p>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] font-black text-primary uppercase cursor-pointer hover:underline">
                             <ExternalLink className="w-3 h-3" />
                             <span>Analytics View</span>
                          </div>
                       </div>

                       <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-end">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Earnings</p>
                             <p className="text-xl font-black text-secondary">₹12,400</p>
                          </div>
                          <button className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                             <div className="w-6 h-3 bg-red-100 rounded-full flex items-center px-1"><div className="w-2 h-2 bg-red-500 rounded-full" /></div>
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-secondary p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center justify-between">
                        <DollarSign className="w-8 h-8 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Revenue MTD</span>
                     </div>
                     <div className="space-y-1">
                        <p className="text-4xl font-black italic tracking-tighter uppercase">₹1,42,000</p>
                        <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">↑ 12% vs last month</p>
                     </div>
                  </div>
               </div>
               
               <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center space-x-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                     <Eye className="w-8 h-8" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ad Impressions</p>
                     <p className="text-2xl font-black text-secondary uppercase tracking-tighter italic">2.4 Million</p>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-start space-x-4">
         <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
         <div className="space-y-1">
            <p className="text-sm font-bold text-blue-900 uppercase tracking-tighter">Inventory Health Check</p>
            <p className="text-xs text-blue-700 leading-relaxed italic">
               The Header zone currently has 100% fill rate. Consider adding a fallback script for the Sidebar zone to maximize yield.
            </p>
         </div>
      </div>
    </div>
  );
}
