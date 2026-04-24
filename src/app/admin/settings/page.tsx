"use client";

import React, { useState, useEffect } from 'react';
import { Save, Shield, Globe, Palette, Share2, Camera, Check, AlertCircle } from 'lucide-react';
import { updateSiteSettings } from '@/lib/settings';

export default function SiteSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    siteName: "Prajapalana News",
    siteDescription: "Leading Telugu Hyperlocal News Portal",
    primaryColor: "#E11D48",
    contactEmail: "contact@prajapalana.com",
    facebookUrl: "https://facebook.com/prajapalana",
    twitterUrl: "https://twitter.com/prajapalana",
    whatsappNumber: "919988776655",
  });

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
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">Site <span className="text-primary">Settings</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
               <Shield className="w-3 h-3 mr-1 text-green-500" />
               Administrator Only Access
            </p>
         </div>
         <button 
           onClick={handleSave}
           disabled={isSaving}
           className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center space-x-2"
         >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (success ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
            <span>{isSaving ? "Saving..." : (success ? "Saved!" : "Save Configuration")}</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* General Branding */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
              <Globe className="w-4 h-4 text-primary" />
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

        {/* Visual Identity */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
              <Palette className="w-4 h-4 text-primary" />
              <span>Visual Identity</span>
           </h3>
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase">Primary Brand Color</label>
                 <div className="flex items-center space-x-4">
                    <input 
                      type="color" 
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                      className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-none" 
                    />
                    <span className="font-mono text-sm font-bold text-gray-500 uppercase">{formData.primaryColor}</span>
                 </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl flex items-start space-x-3">
                 <AlertCircle className="w-4 h-4 text-amber-500 mt-1" />
                 <p className="text-[10px] font-bold text-amber-700 uppercase leading-relaxed">
                    Changing the brand color will automatically update all buttons, borders, and accents across the entire site.
                 </p>
              </div>
           </div>
        </section>

        {/* Social & Contact */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 md:col-span-2">
           <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-primary" />
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
           </div>
        </section>

      </div>
    </div>
  );
}
