import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Search, Trophy, Timer } from 'lucide-react';
import { getLiveElectionResults } from '@/lib/election-actions';

interface PartyResult {
  name: string;
  shortName: string;
  color: string;
  leading: number;
  won: number;
  total: number;
  gain: number;
}

export function ElectionDashboard() {
  const [parties, setParties] = useState<PartyResult[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("--:--:--");
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    const data = await getLiveElectionResults();
    if (data && data.results.length > 0) {
      const mappedResults = data.results.map(r => ({
        name: r.partyName,
        shortName: r.partyName,
        color: r.partyColor,
        leading: r.leads,
        won: r.won,
        total: r.leads + r.won,
        gain: 0 // Logic for gain can be added later
      }));
      setParties(mappedResults);
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const totalSeats = 175;
  const magicNumber = 88;
  const currentTotal = parties.reduce((acc, p) => acc + p.total, 0);

  return (
    <div className="bg-slate-950 text-white p-6 md:p-10 rounded-[3rem] shadow-2xl space-y-12 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
           <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary border border-primary/20 px-4 py-1 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Counting</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
             ELECTION <span className="text-primary">WAR ROOM</span> 2026
           </h2>
           <p className="telugu-text text-gray-400 text-lg">ఆంధ్రప్రదేశ్ అసెంబ్లీ ఎన్నికల ఫలితాలు - ప్రత్యక్ష ప్రసారం</p>
        </div>
        
        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-3xl border border-white/10">
           <Timer className="w-6 h-6 text-primary" />
           <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Last Updated</p>
              <p className="text-sm font-bold">{lastUpdated}</p>
           </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Magic Number Gauge */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6">
           <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                <circle 
                  cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="12" 
                  strokeDasharray={502} 
                  strokeDashoffset={502 - (502 * (currentTotal / totalSeats))} 
                  className="text-primary transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-5xl font-black italic tracking-tighter">{currentTotal}</span>
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Declared / Leads</span>
              </div>
           </div>
           <div className="space-y-1">
              <p className="text-sm font-bold text-primary italic uppercase">Target: {magicNumber}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Total Seats: {totalSeats}</p>
           </div>
        </div>

        {/* Party Standings Table */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parties.map((party, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl group hover:border-primary/50 transition-all cursor-pointer">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                         <div className={`w-10 h-10 ${party.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg`}>
                            {party.shortName}
                         </div>
                         <h4 className="font-black italic uppercase tracking-tighter">{party.name}</h4>
                      </div>
                      <div className={`text-xs font-black px-2 py-1 rounded bg-white/5 ${party.gain > 0 ? 'text-green-500' : 'text-red-500'}`}>
                         {party.gain > 0 ? `+${party.gain}` : party.gain}
                      </div>
                   </div>
                   <div className="flex items-end justify-between">
                      <div className="flex items-baseline space-x-2">
                         <span className="text-4xl font-black italic tracking-tighter">{party.total}</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Total</span>
                      </div>
                      <div className="flex space-x-4 text-right">
                         <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase">Leads</p>
                            <p className="text-xs font-bold text-green-500">{party.leading}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase">Won</p>
                            <p className="text-xs font-bold text-primary">{party.won}</p>
                         </div>
                      </div>
                   </div>
                   {/* Progress Bar */}
                   <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${party.color}`} style={{ width: `${(party.total / totalSeats) * 100}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Constituency Search Bar */}
      <div className="bg-primary/10 border border-primary/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/20">
               <Search className="text-white w-6 h-6" />
            </div>
            <div>
               <h4 className="text-xl font-black italic tracking-tighter uppercase">Find Your Result</h4>
               <p className="telugu-text text-sm text-gray-400">మీ నియోజకవర్గం ఫలితం తెలుసుకోండి</p>
            </div>
         </div>
         <div className="flex-1 w-full relative">
            <input 
               type="text" 
               placeholder="Search Constituency (Ex: Kuppam, Pulivendula...)" 
               className="w-full bg-white/5 border border-white/10 py-5 px-8 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-all placeholder:text-gray-600"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
               Quick View
            </button>
         </div>
      </div>
    </div>
  );
}
