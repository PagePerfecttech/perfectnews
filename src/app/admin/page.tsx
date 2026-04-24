import React from 'react';
import { 
  Eye, 
  FileEdit, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  ArrowUpRight,
  Layout,
  BarChart3,
  Users,
  Bell
} from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { label: "Total Page Views", value: "1.2M", icon: Eye, color: "text-blue-600", bg: "bg-blue-50", growth: "+12.5%" },
  { label: "Articles Published", value: "154", icon: FileEdit, color: "text-green-600", bg: "bg-green-50", growth: "+8%" },
  { label: "Pending Review", value: "12", icon: Clock, color: "text-orange-600", bg: "bg-orange-50", growth: "-2%" },
  { label: "Today's Traffic", value: "45.2K", icon: TrendingUp, color: "text-primary", bg: "bg-red-50", growth: "+18%" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header with Active Template Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Admin <span className="text-primary">Dashboard</span></h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
             Real-time News Engine Analytics
          </p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Active Clone</span>
                 <span className="text-[10px] font-black uppercase tracking-tight">TV9 Hybrid Hybrid Grid</span>
              </div>
              <Layout className="w-4 h-4 text-primary ml-2" />
           </div>
           <button className="bg-secondary text-white p-3 rounded-2xl shadow-lg hover:scale-110 transition-all">
              <Bell className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Command Hub Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {['Overview', 'Analytics', 'Monetization', 'Elections', 'System'].map((tab, i) => (
          <button key={tab} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
            i === 0 ? 'bg-primary text-white shadow-xl shadow-red-100' : 'bg-white text-gray-400 hover:bg-gray-50'
          }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:rotate-12 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-3 py-1 rounded-full ${
                stat.growth.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                <span>{stat.growth}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black tracking-tighter italic">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Traffic Overview Mock Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center space-x-2">
                 <BarChart3 className="w-4 h-4 text-primary" />
                 <span>Engagement Pulse</span>
              </h3>
              <div className="flex space-x-2">
                 {['24h', '7d', '30d'].map(p => (
                   <button key={p} className="text-[9px] font-black uppercase text-gray-400 px-3 py-1 hover:text-primary">{p}</button>
                 ))}
              </div>
           </div>
           
           <div className="h-[250px] flex items-end justify-between space-x-2 pb-2">
              {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 55].map((h, i) => (
                <div key={i} className="flex-1 space-y-2 group cursor-pointer">
                   <div className="relative w-full h-full flex flex-col justify-end">
                      <div 
                        className="bg-gray-50 group-hover:bg-primary/20 rounded-t-lg transition-all" 
                        style={{ height: `${h}%` }} 
                      />
                      <div 
                        className="absolute bottom-0 w-full bg-primary/10 group-hover:bg-primary transition-all rounded-t-lg" 
                        style={{ height: `${h * 0.4}%` }} 
                      />
                   </div>
                   <div className="text-[8px] font-black text-gray-300 text-center uppercase">{i + 8}h</div>
                </div>
              ))}
           </div>
        </div>

        {/* Real-time Insights */}
        <div className="space-y-8">
           <div className="bg-secondary text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-3">
                   <Users className="w-5 h-5 text-primary" />
                   <h3 className="font-black italic text-primary text-xl tracking-tight uppercase">Live Readers</h3>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black italic tracking-tighter">1,248</span>
                  <span className="text-[10px] text-green-400 font-black uppercase animate-pulse">● Active Now</span>
                </div>
                <div className="pt-4 flex -space-x-3 overflow-hidden">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="inline-block h-8 w-8 rounded-full ring-4 ring-secondary bg-gray-600 border border-gray-500" />
                   ))}
                   <div className="flex items-center justify-center h-8 w-8 rounded-full ring-4 ring-secondary bg-primary text-[8px] font-black">
                      +1.2k
                   </div>
                </div>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-secondary mb-8 flex items-center space-x-2">
                 <Bell className="w-4 h-4 text-primary" />
                 <span>Strategic Alerts</span>
              </h3>
              <div className="space-y-6">
                 {[
                   { type: 'URGENT', msg: 'Traffic surge detected from Andhra Pradesh. Scale resources?', color: 'bg-red-500' },
                   { type: 'SYSTEM', msg: 'Vercel production build successful. TV9 Hybrid Template active.', color: 'bg-green-500' },
                   { type: 'PENDING', msg: '12 new articles awaiting Editor review.', color: 'bg-orange-500' }
                 ].map((alert, i) => (
                   <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                      <div className={`w-1.5 h-1.5 mt-1.5 rounded-full ${alert.color} group-hover:scale-150 transition-transform shadow-lg`} />
                      <div>
                         <span className={`text-[8px] font-black uppercase tracking-widest mb-1 block opacity-40`}>{alert.type}</span>
                         <p className="text-[10px] font-bold text-gray-600 leading-relaxed group-hover:text-black transition-colors">{alert.msg}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
