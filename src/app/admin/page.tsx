import React from 'react';
import { 
  Eye, 
  FileEdit, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  ArrowUpRight
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.growth.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.growth}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Recent Articles</h3>
            <Link href="/admin/news" className="text-primary text-xs font-bold hover:underline flex items-center">
              View All <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                     <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=100&h=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h4 className="telugu-text text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
                      తెలంగాణలో కొత్త రాజకీయ పార్టీ? నేతల మధ్య ఆసక్తికర చర్చలు
                    </h4>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase mt-1">Published by Ramesh • 2 Hours Ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">Live</span>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Performance or Ticker */}
        <div className="space-y-8">
          <div className="bg-secondary text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-black italic text-primary text-lg mb-4 tracking-tight uppercase">Active Ad Revenue</h3>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-black">₹12,450</span>
                <span className="text-xs text-green-400 font-bold">+5% this month</span>
              </div>
              <Link href="/admin/monetization" className="block text-center bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold transition-all">
                Manage Ad Slots
              </Link>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-800 mb-6 border-l-4 border-primary pl-3 uppercase text-sm">System Alerts</h3>
             <div className="space-y-4">
                <div className="flex items-start space-x-3">
                   <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse" />
                   <p className="text-xs text-gray-600">
                      <strong>Server Load:</strong> Spike detected in Vizag region traffic.
                   </p>
                </div>
                <div className="flex items-start space-x-3">
                   <div className="w-2 h-2 mt-1.5 rounded-full bg-orange-500" />
                   <p className="text-xs text-gray-600">
                      <strong>E-Paper:</strong> Tomorrow&apos;s edition upload is pending.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
