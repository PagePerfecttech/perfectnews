"use client";

import React from 'react';
import { CloudSun, TrendingUp, DollarSign, Gem } from 'lucide-react';

export function MarketTicker({ tickerData }: { tickerData?: any }) {
  const data = [
    { label: "HYD WEATHER", value: tickerData?.weather || "34°C", icon: CloudSun, color: "text-blue-500" },
    { label: "24K GOLD (10g)", value: tickerData?.gold || "₹72,450", icon: Gem, color: "text-amber-500" },
    { label: "SENSEX", value: tickerData?.sensex || "74,248.12", icon: TrendingUp, color: "text-green-600" },
    { label: "USD/INR", value: tickerData?.usdInr || "₹83.45", icon: DollarSign, color: "text-indigo-600" },
  ];

  return (
    <div className="bg-white border-b border-gray-100 overflow-hidden hidden md:block">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center h-10 space-x-8">
        <div className="flex-shrink-0 bg-secondary text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
           Market Watch
        </div>
        <div className="flex flex-1 items-center space-x-12 animate-marquee whitespace-nowrap">
          {data.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.label}:</span>
              <span className="text-[10px] font-bold text-gray-800">{item.value}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {data.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center space-x-2">
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.label}:</span>
              <span className="text-[10px] font-bold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
