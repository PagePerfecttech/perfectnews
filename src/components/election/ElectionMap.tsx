"use client";

import React, { useState } from 'react';
import { MapPin, TrendingUp, Info, MousePointer2 } from 'lucide-react';

export function ElectionMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Simplified districts for visualization
  const districts = [
    { id: 'HYD', name: 'Hyderabad', path: 'M 100 100 L 150 100 L 150 150 L 100 150 Z', color: '#FF4500', party: 'BJP', lead: '1,20,000' },
    { id: 'WRG', name: 'Warangal', path: 'M 150 50 L 200 50 L 200 100 L 150 100 Z', color: '#FFB800', party: 'BRS', lead: '45,000' },
    { id: 'KRI', name: 'Krishna', path: 'M 200 150 L 250 150 L 250 200 L 200 200 Z', color: '#00BFFF', party: 'Congress', lead: '82,000' },
    { id: 'GUN', name: 'Guntur', path: 'M 150 150 L 200 150 L 200 200 L 150 200 Z', color: '#00BFFF', party: 'Congress', lead: '32,000' },
  ];

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8">
         <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
               <TrendingUp className="w-4 h-4 text-primary" />
               <span>District-Wise Pulse</span>
            </h3>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-secondary leading-none">
              Interactive <span className="text-primary">Result Map</span>
            </h2>
            <p className="telugu-text text-gray-400 text-sm">నియోజకవర్గాల వారీగా పార్టీల ఆధిక్యతలు</p>
         </div>
         <div className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase text-gray-500">Hover for live lead margins</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
         
         {/* SVG Map Container */}
         <div className="lg:col-span-8 aspect-video bg-slate-50 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-12 group border border-gray-100 shadow-inner">
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-full drop-shadow-2xl"
            >
               {districts.map((district) => (
                 <path 
                    key={district.id}
                    d={district.path}
                    fill={district.color}
                    className="cursor-pointer transition-all duration-300 hover:brightness-110 hover:scale-[1.02] origin-center stroke-white stroke-2"
                    onMouseEnter={() => setHoveredDistrict(district.id)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    style={{ transformBox: 'fill-box' }}
                 />
               ))}
            </svg>

            {/* Float UI for Hover */}
            {hoveredDistrict && (
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
                 <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: districts.find(d => d.id === hoveredDistrict)?.color }} />
                    <span className="text-sm font-black italic uppercase tracking-tighter text-secondary">
                       {districts.find(d => d.id === hoveredDistrict)?.name}
                    </span>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Leading Party</p>
                    <p className="text-xl font-black text-primary italic uppercase tracking-tighter">
                       {districts.find(d => d.id === hoveredDistrict)?.party}
                    </p>
                 </div>
                 <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lead Margin</p>
                    <p className="text-lg font-black text-secondary">
                       {districts.find(d => d.id === hoveredDistrict)?.lead} Votes
                    </p>
                 </div>
              </div>
            )}
         </div>

         {/* Legend & Stats */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-6">
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Map Legend</h4>
               <div className="space-y-4">
                  {[
                    { party: 'BRS', color: '#FFB800' },
                    { party: 'Congress', color: '#00BFFF' },
                    { party: 'BJP', color: '#FF4500' },
                    { party: 'Others', color: '#808080' },
                  ].map((item) => (
                    <div key={item.party} className="flex items-center space-x-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                       <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-xs font-black uppercase text-secondary italic">{item.party}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start space-x-4">
               <MousePointer2 className="w-6 h-6 text-primary flex-shrink-0" />
               <p className="text-[10px] font-bold text-primary uppercase leading-relaxed italic">
                  Tap on any district to see a detailed constituency-level breakdown of vote shares.
               </p>
            </div>
         </div>

      </div>
    </div>
  );
}
