"use client";

import React, { useState } from 'react';
import { Send, Share2, Copy, Check, MessageCircle, FileText, ExternalLink } from 'lucide-react';

export default function WhatsAppBroadcaster() {
  const [copied, setCopied] = useState(false);
  const [newsTitle, setNewsTitle] = useState("తెలంగాణ రాజకీయాల్లో అనూహ్య మార్పులు – కొత్త పొత్తుల దిశగా అడుగులు?");
  const [newsUrl, setNewsUrl] = useState("https://telugupost.com/news/politics-update");

  const waMessage = `*${newsTitle}*\n\nమరిన్ని వివరాల కోసం ఈ లింక్ క్లిక్ చేయండి 👇\n\n🔗 ${newsUrl}\n\n--- \nTelugu Post - మీ స్వరం, మీ అండ!`;

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
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-1">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">WhatsApp <span className="text-green-600">Broadcaster</span></h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Viral Distribution Engine</p>
           </div>
           <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                 Connected to 5,200 Groups
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Draft Area */}
          <div className="lg:col-span-3 space-y-8">
             <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2">
                   <MessageCircle className="w-4 h-4 text-green-600" />
                   <span>Draft News Alert</span>
                </h3>

                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">News Title</label>
                      <input 
                        type="text" 
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold telugu-text outline-none focus:border-green-600 transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Link</label>
                      <input 
                        type="text" 
                        value={newsUrl}
                        onChange={(e) => setNewsUrl(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none focus:border-green-600 transition-all"
                      />
                   </div>
                </div>
             </section>

             {/* Action Buttons */}
             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center space-x-3 bg-white border-2 border-gray-100 p-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:border-green-600 transition-all"
                >
                   {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                   <span>{copied ? "Copied!" : "Copy Format"}</span>
                </button>
                <button 
                  onClick={shareToWA}
                  className="flex items-center justify-center space-x-3 bg-green-600 text-white p-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-900/20 hover:scale-105 transition-all"
                >
                   <Send className="w-5 h-5" />
                   <span>Send Blast</span>
                </button>
             </div>
          </div>

          {/* Preview Area (Mobile Style) */}
          <div className="lg:col-span-2">
             <div className="sticky top-24 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 text-center">Mobile Preview</h3>
                <div className="bg-[#E5DDD5] w-full aspect-[9/16] rounded-[2.5rem] p-4 relative overflow-hidden border-[8px] border-secondary shadow-2xl">
                   {/* WA Header */}
                   <div className="bg-[#075E54] -mx-4 -mt-4 p-4 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                         <p className="text-white font-bold text-xs">Official News Group</p>
                         <p className="text-white/60 text-[8px]">online</p>
                      </div>
                   </div>

                   {/* Chat Bubble */}
                   <div className="mt-8 bg-white p-4 rounded-xl rounded-tl-none shadow-sm relative max-w-[85%]">
                      <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                      <div className="bg-gray-100 -m-2 mb-2 rounded-lg overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400&h=200&auto=format&fit=crop" alt="preview" className="w-full h-24 object-cover" />
                      </div>
                      <p className="text-[11px] leading-relaxed whitespace-pre-wrap font-medium">
                         {waMessage}
                      </p>
                      <p className="text-[8px] text-gray-400 text-right mt-2">14:50 PM</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
