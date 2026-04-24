"use client";

import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrendingUp, Users, Target, ShieldCheck, Mail, Phone } from 'lucide-react';

export default function MediaKit() {
  const adRates = [
    { zone: "Header Leaderboard", size: "970x90", price: "₹25,000 / month" },
    { zone: "Sidebar Square", size: "300x250", price: "₹15,000 / month" },
    { zone: "In-Article Native", size: "Responsive", price: "₹0.50 / view" },
    { zone: "E-Paper Full Page", size: "Full Page", price: "₹50,000 / edition" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-secondary text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
            GROW YOUR BRAND WITH <span className="text-primary">TELUGU POST</span>
          </h1>
          <p className="telugu-text text-xl text-gray-400 max-w-2xl mx-auto">
            మీ వ్యాపారాన్ని లక్షలాది మంది పాఠకులకు చేరవేయండి. అత్యంత నమ్మకమైన వార్తా పోర్టల్‌లో ప్రకటనలు ఇవ్వండి.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Monthly Readers", value: "2.5M+", icon: Users },
            { label: "Avg. Time on Site", value: "4:30m", icon: TrendingUp },
            { label: "Conversion Rate", value: "3.2%", icon: Target },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-4xl font-black tracking-tighter text-secondary">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Tariff Table */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-12 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-50 pb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">Advertising Tariff</h2>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Effective from April 2026</p>
              </div>
              <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-red-600/20">
                Download Full Media Kit (PDF)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Ad Zone</th>
                    <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Spec Size</th>
                    <th className="py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Pricing / Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {adRates.map((rate, i) => (
                    <tr key={i} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-8 font-black text-secondary text-lg italic uppercase">{rate.zone}</td>
                      <td className="py-8 font-bold text-gray-500">{rate.size}</td>
                      <td className="py-8 font-black text-primary text-xl italic">{rate.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
