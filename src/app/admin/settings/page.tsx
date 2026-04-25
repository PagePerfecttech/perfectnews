"use client";

import React, { useState, useEffect } from 'react';
import { Save, Shield, Globe, Palette, Share2, Camera, Check, AlertCircle, Eye } from 'lucide-react';
import { updateSiteSettings, getSiteSettings } from '@/lib/settings';

export default function SiteSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    siteName: "Perfect News",
    siteDescription: "Leading Telugu Hyperlocal News Portal",
    primaryColor: "#E11D48",
    template: "ORIGINAL",
    contactEmail: "contact@perfectnews.com",
    facebookUrl: "https://facebook.com/perfectnews",
    twitterUrl: "https://twitter.com/perfectnews",
    whatsappNumber: "919988776655",
    liveTvUrl: "",
    market_weather: "34°C",
    market_gold: "₹72,450",
    market_sensex: "74,248.12",
    market_usdInr: "₹83.45",
  });

  useEffect(() => {
    async function load() {
      const settings = await getSiteSettings();
      if (settings) {
        setFormData(prev => ({
          ...prev,
          siteName: settings.name || prev.siteName,
          siteDescription: settings.tagline || prev.siteDescription,
          primaryColor: settings.primaryColor || prev.primaryColor,
          template: settings.template || prev.template,
          contactEmail: settings.contactEmail || prev.contactEmail,
          liveTvUrl: settings.liveTvUrl || prev.liveTvUrl,
          market_weather: settings.market_weather || prev.market_weather,
          market_gold: settings.market_gold || prev.market_gold,
          market_sensex: settings.market_sensex || prev.market_sensex,
          market_usdInr: settings.market_usdInr || prev.market_usdInr,
        }));
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSiteSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900">Site <span className="text-gray-400">Settings</span></h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
               <Shield className="w-3 h-3 mr-1 text-green-500" />
               Administrator Only Access
            </p>
         </div>
         <button 
           onClick={handleSave}
           disabled={isSaving}
           className="bg-black text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-gray-800 transition-all flex items-center space-x-2 disabled:opacity-50"
         >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (success ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
            <span>{isSaving ? "Saving..." : (success ? "Saved!" : "Save Configuration")}</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* General Branding */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <span>General Branding</span>
           </h3>
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Site Name</label>
                 <input 
                   type="text" 
                   value={formData.siteName}
                   onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Site Description</label>
                 <textarea 
                   value={formData.siteDescription}
                   onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 h-24" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Logo Upload</label>
                 <div className="aspect-[3/1] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all">
                    <Camera className="w-6 h-6 text-gray-300" />
                 </div>
              </div>
           </div>
        </section>

        {/* Visual Identity & Template */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8 md:col-span-2">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center space-x-2">
                 <Palette className="w-4 h-4 text-gray-400" />
                 <span>Frontend Design & Template</span>
              </h3>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Primary Color</label>
                 <input 
                    type="color" 
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                    className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border-none" 
                 />
                 <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">{formData.primaryColor}</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: "SLIDER", name: "Slider Authority", image: "/setup/slider.png", desc: "Slider-First Authoritative Layout" },
                { id: "DYNAMIC", name: "Dynamic Grid", image: "/setup/dynamic.png", desc: "High-Energy Grid with Hashtags" },
                { id: "HYBRID", name: "Vision Hybrid", image: "/setup/hybrid.png", desc: "Media-Rich Hybrid Grid" },
                { id: "MINIMAL", name: "Minimalist Pro", image: "/setup/minimal.png", desc: "Premium Minimal with Box Office Ticker" }
              ].map(tpl => (
                <label key={tpl.id} className="relative group cursor-pointer">
                  <input 
                    type="radio" 
                    name="template" 
                    value={tpl.id} 
                    className="peer hidden" 
                    checked={formData.template === tpl.id}
                    onChange={() => setFormData({...formData, template: tpl.id})}
                  />
                  <div className="border-2 border-gray-100 rounded-3xl overflow-hidden p-1 peer-checked:border-black transition-all shadow-sm peer-checked:shadow-md">
                     <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                        <img src={tpl.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" alt={tpl.name} />
                        <div className="absolute inset-0 bg-black/0 peer-checked:bg-black/5 transition-all" />
                     </div>
                     <div className="px-3 pb-3 space-y-1 text-center">
                        <p className="text-[10px] font-black uppercase tracking-tight">{tpl.name}</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase leading-none">{tpl.desc}</p>
                     </div>
                  </div>
                   <div className="absolute top-3 right-3 flex flex-col items-end space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black text-white p-1 rounded-full shadow-sm peer-checked:block hidden">
                         <Check className="w-3 h-3" />
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(`/?template=${tpl.id}`, '_blank');
                        }}
                        className="bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-xl shadow-sm border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all"
                      >
                         <Eye className="w-4 h-4" />
                      </button>
                   </div>
                </label>
              ))}
           </div>
        </section>

        {/* Social & Contact */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 md:col-span-2">
           <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-gray-400" />
              <span>Social & Community Connections</span>
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Facebook Page URL</label>
                 <input 
                   type="text" 
                   value={formData.facebookUrl}
                   onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Twitter Handle URL</label>
                 <input 
                   type="text" 
                   value={formData.twitterUrl}
                   onChange={(e) => setFormData({...formData, twitterUrl: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">WhatsApp Helpdesk</label>
                 <input 
                   type="text" 
                   value={formData.whatsappNumber}
                   onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Live TV URL (YouTube Embed)</label>
                 <input 
                   type="text" 
                   value={formData.liveTvUrl}
                   onChange={(e) => setFormData({...formData, liveTvUrl: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                   placeholder="https://www.youtube.com/embed/..."
                 />
              </div>
           </div>
        </section>

        {/* Market Ticker Section */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
           <div className="flex items-center space-x-4 border-b pb-4">
             <div className="p-3 bg-green-50 text-green-600 rounded-xl">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
             </div>
             <div>
               <h3 className="font-bold text-gray-800">Market Ticker Values</h3>
               <p className="text-xs text-gray-500">Update the live ticker shown at the top of the portal.</p>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Weather (°C)</label>
                 <input 
                   type="text" 
                   value={formData.market_weather}
                   onChange={(e) => setFormData({...formData, market_weather: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">24K Gold</label>
                 <input 
                   type="text" 
                   value={formData.market_gold}
                   onChange={(e) => setFormData({...formData, market_gold: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Sensex</label>
                 <input 
                   type="text" 
                   value={formData.market_sensex}
                   onChange={(e) => setFormData({...formData, market_sensex: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">USD / INR</label>
                 <input 
                   type="text" 
                   value={formData.market_usdInr}
                   onChange={(e) => setFormData({...formData, market_usdInr: e.target.value})}
                   className="w-full bg-gray-50 p-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20" 
                 />
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
