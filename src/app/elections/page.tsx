"use client";

import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ElectionDashboard } from "@/components/election/ElectionDashboard";
import { TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ElectionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Ticker for Election Only */}
      <div className="bg-red-700 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center">
           <div className="flex-shrink-0 bg-white text-red-700 text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest mr-4">
              Flash Result
           </div>
           <div className="flex-1 whitespace-nowrap animate-marquee font-bold text-sm">
              కుప్పం: చంద్రబాబు నాయుడు 15,000 ఓట్ల ఆధిక్యం... పులివెందుల: జగన్ మోహన్ రెడ్డి 22,000 ఓట్ల ఆధిక్యం... పిఠాపురం: పవన్ కళ్యాణ్ 10,000 ఓట్ల ఆధిక్యం...
           </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12 space-y-12">
        <ElectionDashboard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Big Fights Section */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-black italic tracking-tighter border-l-4 border-primary pl-4 uppercase">Key Face-offs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group">
                   <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto overflow-hidden border-2 border-primary">
                         <img src={`https://i.pravatar.cc/150?u=cand1${i}`} alt="Candidate" />
                      </div>
                      <p className="text-xs font-black uppercase">Candidate A</p>
                   </div>
                   <div className="text-center">
                      <div className="text-xl font-black text-primary">VS</div>
                      <p className="text-[10px] text-gray-400 font-bold">KUPPAM</p>
                   </div>
                   <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto overflow-hidden border-2 border-gray-200">
                         <img src={`https://i.pravatar.cc/150?u=cand2${i}`} alt="Candidate" />
                      </div>
                      <p className="text-xs font-black uppercase text-gray-400">Candidate B</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Sidebar */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black italic tracking-tighter border-l-4 border-primary pl-4 uppercase">Live Analysis</h3>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-red-600">
                     <AlertTriangle className="w-5 h-5" />
                     <p className="font-black text-xs uppercase tracking-widest">Early Leaning</p>
                  </div>
                  <p className="telugu-text text-lg font-bold leading-relaxed">
                    కోస్తా ఆంధ్రలో విపక్షాల కూటమి అనూహ్య ఆధిక్యం కనబరుస్తోంది. గ్రామీణ ఓటర్ల తీర్పు కీలకం కానుంది.
                  </p>
               </div>
               <button className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>View Swing Analysis</span>
               </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </main>
  );
}
