"use client";

import React, { useState } from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  Layout, 
  UserPlus, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Lock
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
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Progress Header */}
        <div className="bg-secondary p-8 text-white relative">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">Perfect News <span className="text-primary">Setup</span></h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enterprise News SaaS Engine v1.0</p>
            </div>
          </div>

          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= i ? 'bg-primary text-white scale-110' : 'bg-gray-700 text-gray-400'}`}>
                  {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-tighter ${step >= i ? 'text-white' : 'text-gray-500'}`}>
                  {i === 1 && "Identity"}
                  {i === 2 && "Verification"}
                  {i === 3 && "Superuser"}
                  {i === 4 && "Launch"}
                </span>
              </div>
            ))}
            <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-700 -z-10" />
            <div className="absolute top-4 left-0 h-[2px] bg-primary transition-all duration-500 -z-10" style={{ width: `${(step - 1) * 33}%` }} />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-10 min-h-[400px] flex flex-col">
          
          {step === 1 && (
            <form onSubmit={onBrandingSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase flex items-center space-x-2">
                  <Layout className="w-5 h-5 text-primary" />
                  <span>Portal Branding</span>
                </h2>
                <p className="text-sm text-gray-500 font-medium">Define your portal's public identity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">News Portal Name</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                    <input name="portalName" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 pl-12 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Telugu Post" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Tagline / Motto</label>
                  <input name="tagline" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. మీ స్వరం, మీ అండ" />
                </div>
              </div>

              {/* Template Selection */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                 <label className="text-[10px] font-black uppercase text-gray-400">Select Frontend Design (Clone)</label>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "SLIDER", name: "Slider Authority", image: "/setup/sakshi.png" },
                      { id: "DYNAMIC", name: "Dynamic Grid", image: "/setup/10tv.png" },
                      { id: "HYBRID", name: "Vision Hybrid", image: "/setup/tv9.png" },
                      { id: "MINIMAL", name: "Minimalist Pro", image: "/setup/m9.png" }
                    ].map(tpl => (
                      <label key={tpl.id} className="relative group cursor-pointer">
                        <input type="radio" name="template" value={tpl.id} className="peer hidden" defaultChecked={tpl.id === "HYBRID"} />
                        <div className="border-2 border-gray-100 rounded-2xl overflow-hidden p-1 peer-checked:border-primary transition-all grayscale-[50%] peer-checked:grayscale-0 hover:grayscale-0">
                           <img src={tpl.image} className="aspect-video object-cover rounded-xl" alt={tpl.name} />
                           <p className="text-[9px] font-black text-center py-2 uppercase tracking-tighter">{tpl.name}</p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                           <CheckCircle2 className="w-5 h-5 text-primary fill-white" />
                        </div>
                      </label>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                    <input name="contactEmail" type="email" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 pl-12 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="news@portal.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                    <input name="contactPhone" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 pl-12 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="+91 00000 00000" />
                  </div>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-secondary text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-black transition-all">
                {loading ? "Saving Config..." : "Continue to Verification"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Infrastructure Audit</span>
                </h2>
                <p className="text-sm text-gray-500 font-medium">Verifying your cloud integrations.</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Database (PostgreSQL)", status: "connected", label: "Prisma Layer Active" },
                  { name: "Media CDN (Cloudflare R2)", status: "pending", label: "Checking S3 Keys..." },
                  { name: "Push Hub (OneSignal)", status: "pending", label: "Verifying App ID..." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'connected' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                      <div>
                        <p className="text-xs font-black uppercase text-secondary">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.label}</p>
                      </div>
                    </div>
                    {item.status === 'connected' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button onClick={handleBack} className="flex-1 bg-gray-100 text-gray-500 p-4 rounded-2xl font-black uppercase tracking-widest text-xs">Back</button>
                <button onClick={handleNext} className="flex-[2] bg-primary text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 shadow-lg shadow-primary/20">
                  Confirm & Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={onAdminSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  <span>Root Admin Creation</span>
                </h2>
                <p className="text-sm text-gray-500 font-medium">Create your master administrative account.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Full Name</label>
                  <input name="name" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Master Admin" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Login Email</label>
                  <input name="email" type="email" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="admin@portal.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                    <input name="password" type="password" required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 pl-12 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-secondary text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-black transition-all">
                {loading ? "Creating..." : "Initialize Admin Access"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Ready for <span className="text-primary">Launch</span></h2>
                <p className="telugu-text text-xl font-bold text-gray-500">మీ న్యూస్ పోర్టల్ సిద్ధంగా ఉంది!</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Setup is complete. The wizard will now be disabled.</p>
              </div>

              <button onClick={onFinalize} disabled={loading} className="w-full bg-primary text-white p-6 rounded-3xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                {loading ? "Finalizing..." : "Go to Homepage"}
                <Rocket className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.3em]">
            Secured by PagePerfect Tech • Enterprise News Platform
          </p>
        </div>

      </div>
    </div>
  );
}
