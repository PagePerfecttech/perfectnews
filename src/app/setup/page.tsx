"use client";

import React, { useState } from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  Layout, 
  UserPlus, 
  ChevronRight, 
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  Lock,
  Sparkles,
  Zap
} from 'lucide-react';
import { initializeBranding, createRootAdmin, finalizeSetup } from '@/lib/setup-actions';
import { useRouter } from 'next/navigation';

export default function SetupWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const onBrandingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await initializeBranding(formData);
    setLoading(false);
    handleNext();
  };

  const onAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createRootAdmin(formData);
    setLoading(false);
    handleNext();
  };

  const onFinalize = async () => {
    setLoading(true);
    await finalizeSetup();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
        
        {/* Left Side: Onboarding Info */}
        <div className="lg:col-span-4 bg-white/5 p-12 border-r border-white/5 hidden lg:flex flex-col justify-between">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/20 rotate-3">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">Perfect <span className="text-primary">News</span></h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Empowering your voice with high-fidelity digital journalism.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { id: 1, label: "Brand Identity", desc: "Core portal naming & design tokens" },
              { id: 2, label: "Core Audit", desc: "Cloud infrastructure validation" },
              { id: 3, label: "Superuser", desc: "Administrative access creation" },
              { id: 4, label: "Activation", desc: "Engine deployment & launch" }
            ].map((s) => (
              <div key={s.id} className={`flex items-center space-x-4 transition-all duration-500 ${step === s.id ? 'opacity-100 scale-105 translate-x-2' : 'opacity-30'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${step === s.id ? 'bg-primary text-white' : 'bg-white/10 text-white'}`}>
                  {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase text-white tracking-widest">{s.label}</h3>
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-tight">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.3em]">v1.0.8 Enterprise Engine</p>
          </div>
        </div>

        {/* Right Side: Interactive Forms */}
        <div className="lg:col-span-8 p-12 lg:p-16 flex flex-col justify-center">
          
          {step === 1 && (
            <form onSubmit={onBrandingSubmit} className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Step 01 / Identity</span>
                </div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-tight">
                  Design Your <span className="text-primary">Portal</span>
                </h2>
                <p className="text-sm text-gray-400 font-medium">Initialize your news empire's core branding.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Portal Name</label>
                  <div className="relative group">
                    <Globe className="absolute left-5 top-5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input name="portalName" required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 pl-14 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600" placeholder="e.g. Perfect News" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Tagline</label>
                  <input name="tagline" className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600" placeholder="e.g. Real News, Real Voice" />
                </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center space-x-2">
                   <Layout className="w-3 h-3" />
                   <span>Select Design Architecture</span>
                 </label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: "SLIDER", name: "Slider Auth", image: "/setup/sakshi.png" },
                      { id: "DYNAMIC", name: "Dynamic Grid", image: "/setup/10tv.png" },
                      { id: "HYBRID", name: "Vision Hybrid", image: "/setup/tv9.png" },
                      { id: "MINIMAL", name: "Minimalist Pro", image: "/setup/m9.png" }
                    ].map(tpl => (
                      <label key={tpl.id} className="relative group cursor-pointer">
                        <input type="radio" name="template" value={tpl.id} className="peer hidden" defaultChecked={tpl.id === "HYBRID"} />
                        <div className="border-2 border-white/5 bg-white/5 rounded-2xl overflow-hidden p-1 peer-checked:border-primary peer-checked:bg-primary/5 transition-all grayscale group-hover:grayscale-0 peer-checked:grayscale-0">
                           <img src={tpl.image} className="aspect-video object-cover rounded-xl" alt={tpl.name} />
                           <p className="text-[8px] font-black text-center py-2 text-gray-500 peer-checked:text-white uppercase tracking-tighter">{tpl.name}</p>
                        </div>
                      </label>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Support Email</label>
                  <input name="contactEmail" type="email" required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="news@perfect.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Hotline Number</label>
                  <input name="contactPhone" className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="+91 00000 00000" />
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-primary text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(227,6,19,0.3)] active:scale-95 transition-all">
                {loading ? "Initializing..." : "Proceed to Cloud Audit"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Zap className="w-6 h-6 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Step 02 / Core Audit</span>
                </div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-tight">
                  Verifying <span className="text-primary">Engine</span>
                </h2>
                <p className="text-sm text-gray-400 font-medium">Validating cloud infrastructure & security protocols.</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "PostgreSQL Database", status: "connected", label: "ORM Layer Active" },
                  { name: "Content Delivery Network", status: "pending", label: "Resolving S3 Cluster..." },
                  { name: "Push Notification Hub", status: "pending", label: "Syncing App Identity..." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/[0.03] rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center space-x-5">
                      <div className={`w-3 h-3 rounded-full ${item.status === 'connected' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-amber-500 animate-pulse'}`} />
                      <div>
                        <p className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-1">{item.name}</p>
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">{item.label}</p>
                      </div>
                    </div>
                    {item.status === 'connected' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 pt-4">
                <button onClick={handleBack} className="flex-1 bg-white/5 text-gray-400 p-6 rounded-[2rem] font-black uppercase tracking-widest text-xs border border-white/5">Back</button>
                <button onClick={handleNext} className="flex-[2] bg-white text-black p-6 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-primary hover:text-white transition-all">
                  Confirm Integration
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={onAdminSubmit} className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <UserPlus className="w-6 h-6" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Step 03 / Superuser</span>
                </div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-tight">
                  Administrative <span className="text-primary">Master</span>
                </h2>
                <p className="text-sm text-gray-400 font-medium">Create your high-level security credentials.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
                  <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Chief Administrator" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Primary Email</label>
                  <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="admin@perfectnews.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 text-primary">Master Key (Password)</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input name="password" type="password" required className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 pl-14 text-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-primary text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 hover:scale-105 active:scale-95 transition-all">
                {loading ? "Generating Credentials..." : "Initialize Admin Access"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-12 animate-in zoom-in duration-700">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <div className="absolute inset-0 w-32 h-32 border-4 border-green-500 border-dashed rounded-full animate-spin-slow opacity-20" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Ready for <span className="text-primary">Launch</span></h2>
                <p className="text-lg text-gray-400 font-medium">Your enterprise news engine is fully operational.</p>
              </div>

              <button onClick={onFinalize} disabled={loading} className="w-full bg-white text-black p-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center space-x-4 shadow-[0_0_60px_rgba(255,255,255,0.1)] hover:bg-primary hover:text-white hover:scale-105 transition-all">
                {loading ? "Igniting Engine..." : "Go to Homepage"}
                <Rocket className="w-6 h-6" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
