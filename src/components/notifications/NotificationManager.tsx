"use client";

import React, { useState } from 'react';
import { Bell, BellOff, ShieldCheck, X } from 'lucide-react';

export function NotificationManager() {
  const [permission, setPermission] = useState<string>('default');
  const [showPrompt, setShowPrompt] = useState(false);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
      return;
    }

    const res = await Notification.requestPermission();
    setPermission(res);
    setShowPrompt(false);
    
    if (res === 'granted') {
      new Notification("Welcome to Prajapalana News", {
        body: "You will now receive real-time breaking news alerts.",
        icon: "/logo.png"
      });
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setShowPrompt(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-2xl shadow-2xl shadow-red-900/40 flex items-center justify-center hover:scale-110 transition-all z-50 group"
      >
        <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-primary animate-ping" />
      </button>

      {/* Subscription Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[60] animate-in fade-in duration-300">
           <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <button 
                 onClick={() => setShowPrompt(false)}
                 className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100"
              >
                 <X className="w-4 h-4" />
              </button>

              <div className="space-y-8">
                 <div className="w-20 h-20 bg-red-50 rounded-[2.5rem] flex items-center justify-center">
                    <Bell className="w-10 h-10 text-primary" />
                 </div>

                 <div className="space-y-2">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Never <span className="text-primary">Miss</span> A Story</h3>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Real-Time Mobile Push Alerts</p>
                 </div>

                 <p className="text-sm font-medium text-gray-600 telugu-text leading-relaxed italic">
                   బ్రేకింగ్ న్యూస్ మరియు తాజా రాజకీయ వార్తల అప్డేట్స్ నేరుగా మీ మొబైల్ నోటిఫికేషన్స్ ద్వారా పొందండి.
                 </p>

                 <div className="space-y-4 pt-4">
                    <button 
                       onClick={requestPermission}
                       className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center justify-center space-x-2"
                    >
                       <ShieldCheck className="w-4 h-4" />
                       <span>Enable Notifications</span>
                    </button>
                    <button 
                       onClick={() => setShowPrompt(false)}
                       className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                    >
                       Maybe Later
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
