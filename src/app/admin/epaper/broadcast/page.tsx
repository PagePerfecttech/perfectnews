"use client";

import React, { useState } from 'react';
import { Send, FileText, Calendar, MapPin, Copy, Check, MessageSquare, Image as ImageIcon } from 'lucide-react';

export default function EPaperBroadcaster() {
  const [copied, setCopied] = useState(false);
  const [district, setDistrict] = useState("Hyderabad");
  const [date, setDate] = useState("April 24, 2026");

  const waMessage = `🌞 *శుభోదయం! నేటి ఈ-పేపర్ మీ కోసం...*\n\n📰 *${district} ఎడిషన్* - ${date}\n\nనేటి ముఖ్యాంశాలు మరియు పూర్తి వార్తల కోసం ఈ క్రింది లింక్ క్లిక్ చేయండి 👇\n\n🔗 https://telugupost.com/epaper/${district.toLowerCase()}\n\n--- \nTelugu Post - అక్షర రూపం, ప్రజా పక్షం!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWA = () => {
    const encoded = encodeURIComponent(waMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">E-Paper <span className="text-primary">Morning Bot</span></h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Daily Circulation Engine</p>
           </div>
           <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest">{date}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Area */}
          <div className="lg:col-span-7 space-y-8">
             <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
                <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                   <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                   </div>
                   <div>
                      <h3 className="font-black italic uppercase tracking-tighter">Edition Selection</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Choose which district paper to blast</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> District
                      </label>
                      <select 
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-all appearance-none"
                      >
                         <option>Hyderabad</option>
                         <option>Vizag</option>
                         <option>Guntur</option>
                         <option>Vijayawada</option>
                         <option>Kurnool</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> Publish Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-primary transition-all"
                      />
                   </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-start space-x-4">
                   <ImageIcon className="w-5 h-5 text-primary mt-1" />
                   <div>
                      <p className="text-sm font-bold text-secondary">Automatic Thumbnail</p>
                      <p className="text-xs text-gray-500">The front page of the {district} edition will be attached as the link preview image.</p>
                   </div>
                </div>
             </section>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center space-x-3 bg-white border-2 border-gray-100 p-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:border-primary transition-all"
                >
                   {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                   <span>{copied ? "Copy Link" : "Copy Message"}</span>
                </button>
                <button 
                  onClick={shareToWA}
                  className="flex items-center justify-center space-x-3 bg-primary text-white p-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:scale-105 transition-all"
                >
                   <Send className="w-5 h-5" />
                   <span>Share Now</span>
                </button>
             </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-5">
             <div className="sticky top-24 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 text-center italic">Morning Blast Preview</h3>
                <div className="bg-[#E5DDD5] w-full aspect-[4/5] rounded-[2.5rem] p-4 relative overflow-hidden border-[8px] border-secondary shadow-2xl">
                   {/* Chat Bubble */}
                   <div className="mt-8 bg-white p-3 rounded-xl rounded-tl-none shadow-sm relative max-w-[90%]">
                      <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                      
                      {/* E-Paper Card Preview */}
                      <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-3">
                         <div className="aspect-[3/4] relative">
                            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400&h=500&auto=format&fit=crop" alt="paper front" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                               <div className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded uppercase">E-Paper Edition</div>
                            </div>
                         </div>
                         <div className="p-3 bg-gray-50 border-t border-gray-100">
                            <p className="text-[10px] font-black text-secondary">{district.toUpperCase()} MAIN EDITION</p>
                            <p className="text-[8px] text-gray-400 font-bold">{date}</p>
                         </div>
                      </div>

                      <p className="text-[11px] leading-relaxed whitespace-pre-wrap font-medium telugu-text">
                         {waMessage}
                      </p>
                      <p className="text-[8px] text-gray-400 text-right mt-2 italic">Sent at 6:00 AM</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
