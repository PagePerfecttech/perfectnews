"use client";

import React, { useState } from 'react';
import { 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function ElectionResultEntry() {
  const [isSaving, setIsSaving] = useState(false);
  const [parties, setParties] = useState([
    { name: 'BRS', color: '#FFB800', leads: 42, won: 12, total: 119 },
    { name: 'Congress', color: '#00BFFF', leads: 38, won: 8, total: 119 },
    { name: 'BJP', color: '#FF4500', leads: 15, won: 2, total: 119 },
    { name: 'Others', color: '#808080', leads: 24, won: 0, total: 119 },
  ]);

  const handleUpdate = (index: number, field: 'leads' | 'won', value: number) => {
    const newParties = [...parties];
    newParties[index][field] = value;
    setParties(newParties);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Result <span className="text-primary">Entry</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
               <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
               War Room Access Only
            </p>
         </div>
         <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Update Live Boards</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
         
         {/* Live Counter */}
         <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Party Standings</span>
               </h3>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Election Year: 2024</span>
            </div>

            <div className="space-y-6">
               {parties.map((party, i) => (
                 <div key={party.name} className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                    <div className="flex items-center space-x-4 min-w-[150px]">
                       <div className="w-4 h-12 rounded-full" style={{ backgroundColor: party.color }} />
                       <span className="text-lg font-black italic uppercase tracking-tighter text-secondary">{party.name}</span>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase">Leads</label>
                          <input 
                            type="number" 
                            value={party.leads}
                            onChange={(e) => handleUpdate(i, 'leads', parseInt(e.target.value))}
                            className="w-full bg-white p-4 rounded-xl text-lg font-black border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase">Won</label>
                          <input 
                            type="number" 
                            value={party.won}
                            onChange={(e) => handleUpdate(i, 'won', parseInt(e.target.value))}
                            className="w-full bg-white p-4 rounded-xl text-lg font-black border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                       </div>
                    </div>

                    <div className="flex flex-col items-end justify-center px-4">
                       <p className="text-[10px] font-black text-gray-400 uppercase">Total</p>
                       <p className="text-xl font-black text-secondary">{party.leads + party.won}</p>
                    </div>
                 </div>
               ))}
            </div>
         </section>

         {/* Local Constituency Update */}
         <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Constituency Pulse</span>
               </h3>
               <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center">
                  Add New <Plus className="w-3 h-3 ml-1" />
               </button>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-gray-50">
                        <th className="py-4 text-[10px] font-black uppercase text-gray-400">Name</th>
                        <th className="py-4 text-[10px] font-black uppercase text-gray-400">Candidate</th>
                        <th className="py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
                        <th className="py-4 text-[10px] font-black uppercase text-gray-400">Margin</th>
                        <th className="py-4 text-right"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {[
                       { name: 'Hyderabad', candidate: 'Asaduddin Owaisi', status: 'LEADING', margin: '2,42,000', party: 'AIMIM' },
                       { name: 'Secunderabad', candidate: 'Kishan Reddy', status: 'WON', margin: '1,12,000', party: 'BJP' },
                     ].map((c, i) => (
                       <tr key={i} className="group">
                          <td className="py-6 font-black text-sm italic uppercase tracking-tighter text-secondary">{c.name}</td>
                          <td className="py-6">
                             <p className="text-sm font-bold text-secondary">{c.candidate}</p>
                             <p className="text-[10px] font-black text-primary uppercase">{c.party}</p>
                          </td>
                          <td className="py-6">
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               c.status === 'WON' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                             }`}>
                                {c.status}
                             </span>
                          </td>
                          <td className="py-6 text-sm font-black text-secondary">{c.margin}</td>
                          <td className="py-6 text-right">
                             <button className="p-2 text-gray-300 hover:text-primary transition-colors">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start space-x-4">
         <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
         <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 uppercase tracking-tighter">Fact Verification Protocol</p>
            <p className="text-xs text-amber-700 leading-relaxed italic">
               All entries made here are instantly pushed to the public dashboard. Verify data from EC official source before clicking "Update Live Boards".
            </p>
         </div>
      </div>
    </div>
  );
}
