"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  Shield, 
  User, 
  Check, 
  ChevronRight, 
  ArrowRight,
  Settings,
  Mail,
  Phone,
  Lock,
  ArrowLeft
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
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col items-center justify-center p-6 sm:p-12">
      
      {/* Precision Header */}
      <div className="mb-12 text-center space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black mb-4">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Set up your portal</h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">Complete these steps to initialize your Perfect News experience.</p>
      </div>

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        
        {/* Navigation Sidebar (Apple HIG Stepper) */}
        <div className="lg:col-span-1 space-y-8 py-2">
          {[
            { id: 1, label: "Identity", icon: Globe },
            { id: 2, label: "Services", icon: Shield },
            { id: 3, label: "Account", icon: User },
            { id: 4, label: "Complete", icon: Check }
          ].map((s) => (
            <div key={s.id} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                step === s.id ? 'bg-black text-white shadow-lg' : 
                step > s.id ? 'bg-gray-200 text-gray-800' : 'bg-transparent border border-gray-300 text-gray-400'
              }`}>
                {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              <span className={`text-sm font-medium transition-colors ${step >= s.id ? 'text-black' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-12 min-h-[500px] flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          {step === 1 && (
            <form onSubmit={onBrandingSubmit} className="space-y-10 flex-grow flex flex-col">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Portal Identity</h2>
                <p className="text-gray-500 text-sm">Provide the core branding details for your news platform.</p>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-gray-500 ml-1">Portal Name</label>
                    <input 
                      name="portalName" 
                      required 
                      className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="e.g. Perfect News" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-gray-500 ml-1">Tagline</label>
                    <input 
                      name="tagline" 
                      className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="Real News, Real Voice" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[12px] font-semibold text-gray-500 ml-1">Select Design Architecture</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { id: "SLIDER", name: "Slider Authority", image: "/setup/slider.png" },
                      { id: "DYNAMIC", name: "Dynamic Grid", image: "/setup/dynamic.png" },
                      { id: "HYBRID", name: "Vision Hybrid", image: "/setup/hybrid.png" },
                      { id: "MINIMAL", name: "Minimalist Pro", image: "/setup/minimal.png" }
                    ].map(tpl => (
                      <label key={tpl.id} className="relative cursor-pointer group">
                        <input type="radio" name="template" value={tpl.id} className="peer hidden" defaultChecked={tpl.id === "HYBRID"} />
                        <div className="border-2 border-transparent bg-gray-50 rounded-2xl overflow-hidden peer-checked:border-black peer-checked:bg-white transition-all ring-offset-2 peer-checked:ring-2 peer-checked:ring-black/5">
                           <img src={tpl.image} className="aspect-video object-cover transition-transform duration-500 group-hover:scale-105" alt={tpl.name} />
                           <p className="text-[10px] font-medium text-center py-2 text-gray-500 peer-checked:text-black">{tpl.name}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-gray-500 ml-1">Contact Email</label>
                    <input 
                      name="contactEmail" 
                      type="email" 
                      required 
                      className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="contact@perfectnews.com" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-gray-500 ml-1">Contact Phone</label>
                    <input 
                      name="contactPhone" 
                      className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="+91 00000 00000" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-auto flex justify-end">
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="bg-black text-white px-8 py-4 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-gray-800 active:scale-95 transition-all"
                >
                  <span>{loading ? "Saving..." : "Continue"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-10 flex-grow flex flex-col">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Services Audit</h2>
                <p className="text-gray-500 text-sm">Verifying your integrated cloud services.</p>
              </div>

              <div className="space-y-4 flex-grow">
                {[
                  { name: "Database Cluster", status: "connected", label: "PostgreSQL Production" },
                  { name: "Storage Service", status: "pending", label: "Object Storage Check" },
                  { name: "Notifications", status: "pending", label: "Push Service Hub" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-[#F5F5F7] rounded-3xl">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${item.status === 'connected' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`} />
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </div>
                    </div>
                    {item.status === 'connected' && <Check className="w-5 h-5 text-green-600" />}
                  </div>
                ))}
              </div>

              <div className="pt-8 mt-auto flex justify-between items-center">
                <button 
                  onClick={handleBack} 
                  className="text-gray-500 font-medium text-sm hover:text-black transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext} 
                  className="bg-black text-white px-8 py-4 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-gray-800 active:scale-95 transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={onAdminSubmit} className="space-y-10 flex-grow flex flex-col">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Superuser Account</h2>
                <p className="text-gray-500 text-sm">Create the primary administrative account.</p>
              </div>

              <div className="space-y-6 flex-grow">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 ml-1">Full Name</label>
                  <input 
                    name="name" 
                    required 
                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                    placeholder="Chief Administrator" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 ml-1">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                    placeholder="admin@perfectnews.com" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-gray-500 ml-1">Password</label>
                  <input 
                    name="password" 
                    type="password" 
                    required 
                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <div className="pt-8 mt-auto flex justify-between items-center">
                <button 
                  onClick={handleBack} 
                  className="text-gray-500 font-medium text-sm hover:text-black transition-colors"
                >
                  Back
                </button>
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="bg-black text-white px-8 py-4 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-gray-800 active:scale-95 transition-all"
                >
                  <span>{loading ? "Creating..." : "Initialize Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-10 flex-grow flex flex-col justify-center items-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                <Check className="w-10 h-10 stroke-[3px]" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight">System Ready</h2>
                <p className="text-gray-500 max-w-sm mx-auto">Your digital news engine has been successfully initialized and is ready for production.</p>
              </div>

              <button 
                onClick={onFinalize} 
                disabled={loading} 
                className="bg-black text-white px-12 py-5 rounded-full font-semibold text-base shadow-xl shadow-black/10 hover:bg-gray-800 hover:-translate-y-1 active:scale-95 transition-all"
              >
                {loading ? "Starting Engine..." : "Go to Homepage"}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Compliance Footer */}
      <footer className="mt-12 text-center">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest flex items-center justify-center">
          <Shield className="w-3 h-3 mr-2" />
          SECURED BY PERFECT NEWS TECHNOLOGY
        </p>
      </footer>
    </div>
  );
}
