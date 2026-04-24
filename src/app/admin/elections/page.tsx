"use client";

import React, { useState } from 'react';
import { Save, Plus, Minus, Search, Trophy, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminElectionEntry() {
  const [parties, setParties] = useState([
    { id: 'tdp', name: 'TDP+', leading: 85, won: 20, color: 'bg-yellow-500' },
    { id: 'ysrcp', name: 'YSRCP', leading: 45, won: 10, color: 'bg-blue-600' },
    { id: 'inc', name: 'INC', leading: 10, won: 2, color: 'bg-green-600' },
  ]);

  const updateCount = (partyId: string, field: 'leading' | 'won', delta: number) => {
    setParties(parties.map(p => 
      p.id === partyId ? { ...p, [field]: Math.max(0, p[field] + delta) } : p
    ));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">Election <span className="text-primary">Control Center</span></h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Real-time Data Entry Terminal</p>
           </div>
           <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl border border-green-100">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Live Sync Active</span>
              </div>
              <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
                 <Save className="w-4 h-4" />
                 <span>Publish All</span>
              </button>
           </div>
        </div>

        {/* Global Party Tracker */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
           <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2 border-b border-gray-50 pb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>State-wide Totals</span>
           </h3>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {parties.map((party) => (
                <div key={party.id} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-6">
                   <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${party.color} rounded-lg`} />
                      <h4 className="font-black italic uppercase tracking-tighter">{party.name}</h4>
                   </div>

                   <div className="space-y-4">
                      {/* Leading Input */}
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-gray-500">Leading</span>
                         <div className="flex items-center space-x-3">
                            <button onClick={() => updateCount(party.id, 'leading', -1)} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary"><Minus className="w-4 h-4" /></button>
                            <span className="text-2xl font-black italic min-w-[40px] text-center">{party.leading}</span>
                            <button onClick={() => updateCount(party.id, 'leading', 1)} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary"><Plus className="w-4 h-4" /></button>
                         </div>
                      </div>
                      {/* Won Input */}
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-gray-500">Won (Declared)</span>
                         <div className="flex items-center space-x-3">
                            <button onClick={() => updateCount(party.id, 'won', -1)} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary"><Minus className="w-4 h-4" /></button>
                            <span className="text-2xl font-black italic min-w-[40px] text-center text-primary">{party.won}</span>
                            <button onClick={() => updateCount(party.id, 'won', 1)} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary"><Plus className="w-4 h-4" /></button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Constituency Management Grid */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                 <Trophy className="w-4 h-4 text-primary" />
                 <span>Constituency Wise Updates</span>
              </h3>
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search Seat (Ex: Vizag North...)" 
                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all"
                 />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-gray-50">
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Constituency</th>
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Candidate Leading</th>
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Margin</th>
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {[1, 2, 3].map(i => (
                      <tr key={i} className="group hover:bg-gray-50 transition-colors">
                         <td className="py-6 font-black italic text-secondary uppercase">Constituency {i}</td>
                         <td className="py-6">
                            <select className="bg-transparent font-bold text-xs outline-none text-primary">
                               <option>Candidate Name A (TDP)</option>
                               <option>Candidate Name B (YSRCP)</option>
                               <option>Others</option>
                            </select>
                         </td>
                         <td className="py-6">
                            <input type="text" placeholder="12,500" className="w-20 bg-transparent font-bold text-xs outline-none border-b border-gray-200 focus:border-primary" />
                         </td>
                         <td className="py-6">
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Counting</span>
                         </td>
                         <td className="py-6">
                            <button className="text-primary text-[10px] font-black uppercase hover:underline">Declare Win</button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>

        {/* Audit Log / Warning */}
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start space-x-4">
           <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
           <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900 uppercase tracking-tighter">Safety Notice</p>
              <p className="text-xs text-amber-700">Any updates published here will reflect instantly on the public website for thousands of users. Double-check margins before declaring a win.</p>
           </div>
        </div>

      </div>
    </main>
  );
}
