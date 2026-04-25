"use client";

import React, { useTransition } from 'react';
import { Save, Plus, Minus, Search, Trophy, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { updatePartyCount, updateConstituency } from '@/lib/election-actions';
import type { ElectionResult, ConstituencyResult } from '@prisma/client';

interface ElectionClientProps {
  parties: ElectionResult[];
  constituencies: ConstituencyResult[];
}

export function ElectionClient({ parties, constituencies }: ElectionClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateCount = (id: string, field: 'leads' | 'won', delta: number) => {
    // Optimistic UI updates could be added here, but we'll rely on fast server actions for now
    startTransition(() => {
      updatePartyCount(id, field, delta);
    });
  };

  const handleConstituencyUpdate = (id: string, field: string, value: any) => {
    startTransition(() => {
      updateConstituency(id, { [field]: value });
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">Election <span className="text-primary">Control Center</span></h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Real-time Data Entry Terminal</p>
           </div>
           <div className="flex items-center space-x-4">
              {isPending && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
              <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl border border-green-100">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Live Sync Active</span>
              </div>
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
                      <div className={`w-8 h-8 ${party.partyColor} rounded-lg`} />
                      <h4 className="font-black italic uppercase tracking-tighter">{party.partyName}</h4>
                   </div>

                   <div className="space-y-4">
                      {/* Leading Input */}
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-gray-500">Leading</span>
                         <div className="flex items-center space-x-3">
                            <button onClick={() => handleUpdateCount(party.id, 'leads', -1)} disabled={isPending || party.leads <= 0} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary disabled:opacity-50"><Minus className="w-4 h-4" /></button>
                            <span className="text-2xl font-black italic min-w-[40px] text-center">{party.leads}</span>
                            <button onClick={() => handleUpdateCount(party.id, 'leads', 1)} disabled={isPending} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary disabled:opacity-50"><Plus className="w-4 h-4" /></button>
                         </div>
                      </div>
                      {/* Won Input */}
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-gray-500">Won (Declared)</span>
                         <div className="flex items-center space-x-3">
                            <button onClick={() => handleUpdateCount(party.id, 'won', -1)} disabled={isPending || party.won <= 0} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary disabled:opacity-50"><Minus className="w-4 h-4" /></button>
                            <span className="text-2xl font-black italic min-w-[40px] text-center text-primary">{party.won}</span>
                            <button onClick={() => handleUpdateCount(party.id, 'won', 1)} disabled={isPending} className="p-2 bg-white rounded-lg border border-gray-200 hover:text-primary disabled:opacity-50"><Plus className="w-4 h-4" /></button>
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
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Candidate / Party</th>
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Margin</th>
                       <th className="py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {constituencies.map((c) => (
                      <tr key={c.id} className="group hover:bg-gray-50 transition-colors">
                         <td className="py-6 font-black italic text-secondary uppercase">{c.name}</td>
                         <td className="py-6 space-y-2">
                            <input 
                              type="text" 
                              defaultValue={c.candidate} 
                              onBlur={(e) => handleConstituencyUpdate(c.id, 'candidate', e.target.value)}
                              className="bg-transparent font-bold text-xs outline-none text-primary border-b border-dashed border-gray-200 focus:border-primary block" 
                            />
                            <select 
                              defaultValue={c.party} 
                              onChange={(e) => handleConstituencyUpdate(c.id, 'party', e.target.value)}
                              className="bg-transparent text-[10px] font-black uppercase outline-none text-gray-500"
                            >
                               <option value="TDP+">TDP+</option>
                               <option value="YSRCP">YSRCP</option>
                               <option value="INC">INC</option>
                               <option value="OTHERS">OTHERS</option>
                            </select>
                         </td>
                         <td className="py-6">
                            <input 
                              type="number" 
                              defaultValue={c.leadMargin} 
                              onBlur={(e) => handleConstituencyUpdate(c.id, 'leadMargin', parseInt(e.target.value))}
                              className="w-24 bg-transparent font-bold text-xs outline-none border-b border-gray-200 focus:border-primary" 
                            />
                         </td>
                         <td className="py-6">
                            <select 
                              defaultValue={c.status} 
                              onChange={(e) => handleConstituencyUpdate(c.id, 'status', e.target.value)}
                              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase outline-none cursor-pointer ${
                                c.status === 'WON' ? 'bg-green-50 text-green-600' :
                                c.status === 'TRAILING' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                              }`}
                            >
                               <option value="LEADING">LEADING</option>
                               <option value="TRAILING">TRAILING</option>
                               <option value="WON">WON</option>
                            </select>
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
