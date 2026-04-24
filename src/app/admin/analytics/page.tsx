"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Globe, 
  Smartphone, 
  MousePointer2, 
  ArrowUpRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Map as MapIcon
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Last 24 Hours");

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Traffic <span className="text-primary">Intelligence</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-Time Reader Analytics</p>
         </div>
         <select 
           value={timeRange}
           onChange={(e) => setTimeRange(e.target.value)}
           className="bg-white border border-gray-100 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm"
         >
            <option>Real-Time (Live)</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
         </select>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Live Readers', value: '1,429', trend: '+12%', icon: Activity, color: 'text-green-500', bg: 'bg-green-50' },
           { label: 'Total Views', value: '48.2K', trend: '+18%', icon: Eye, color: 'text-primary', bg: 'bg-red-50' },
           { label: 'Avg. Read Time', value: '3m 42s', trend: '+5%', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
           { label: 'Bounce Rate', value: '24.2%', trend: '-2%', icon: MousePointer2, color: 'text-amber-500', bg: 'bg-amber-50' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                 <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                 </div>
                 <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                 </span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-2xl font-black italic tracking-tighter text-secondary">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Top Performing Articles */}
         <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                     <TrendingUp className="w-4 h-4 text-primary" />
                     <span>Viral Performance</span>
                  </h3>
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center">
                     Full Report <ArrowUpRight className="w-3 h-3 ml-1" />
                  </button>
               </div>

               <div className="space-y-6">
                  {[
                    { title: "ఆంధ్రప్రదేశ్లో భారీ వర్షాలు – ప్రజలకు హెచ్చరిక", views: "12,420", growth: "↑ 24%", cat: "AP News" },
                    { title: "తెలంగాణలో రాజకీయ ఉద్రిక్తత - అసెంబ్లీలో చర్చ", views: "8,210", growth: "↑ 18%", cat: "Politics" },
                    { title: "భారత్ మ్యాచ్లో అద్భుత విజయం - అదరగొట్టిన బౌలర్లు", views: "6,400", growth: "↑ 12%", cat: "Sports" },
                  ].map((article, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                       <div className="space-y-1 max-w-[70%]">
                          <p className="text-[8px] font-black text-primary uppercase tracking-widest">{article.cat}</p>
                          <p className="telugu-text font-bold text-secondary text-sm line-clamp-1 group-hover:text-primary transition-colors">{article.title}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-black text-sm text-secondary">{article.views}</p>
                          <p className="text-[8px] font-black text-green-600">{article.growth}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Geographical Distribution */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                  <MapIcon className="w-4 h-4 text-primary" />
                  <span>Reader Locations</span>
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     {[
                       { city: 'Hyderabad', percent: 45 },
                       { city: 'Vijayawada', percent: 22 },
                       { city: 'Vizag', percent: 18 },
                       { city: 'Others', percent: 15 },
                     ].map((loc, i) => (
                       <div key={i} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-gray-400">{loc.city}</span>
                             <span className="text-secondary">{loc.percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${loc.percent}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 italic text-[10px] font-bold text-gray-400">
                     [INTERACTIVE HEATMAP PLACEHOLDER]
                  </div>
               </div>
            </section>
         </div>

         {/* Device & Acquisition */}
         <div className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span>Device Breakdown</span>
               </h3>
               <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                           <Smartphone className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black uppercase text-secondary">Mobile</span>
                     </div>
                     <span className="font-black text-sm text-secondary">82%</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                           <MousePointer2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black uppercase text-secondary">Desktop</span>
                     </div>
                     <span className="font-black text-sm text-secondary">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                           <Globe className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black uppercase text-secondary">Tablet</span>
                     </div>
                     <span className="font-black text-sm text-secondary">3%</span>
                  </div>
               </div>
            </section>

            <section className="bg-secondary p-8 rounded-[2.5rem] shadow-xl text-white space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest flex items-center space-x-2 opacity-80">
                  <BarChart3 className="w-4 h-4" />
                  <span>Growth Insights</span>
               </h3>
               <p className="text-xs font-bold leading-relaxed italic opacity-80">
                  "Your traffic from **Vizag City** has increased by **42%** since you launched the local edition. Consider pushing more hyperlocal content there."
               </p>
               <div className="pt-4 border-t border-white/10">
                  <button className="w-full py-4 bg-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-900/40 hover:scale-105 transition-all">
                     Download Monthly PDF
                  </button>
               </div>
            </section>
         </div>

      </div>
    </div>
  );
}

const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
