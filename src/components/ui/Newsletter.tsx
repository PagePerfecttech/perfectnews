"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="bg-secondary text-white p-10 rounded-[2.5rem] relative overflow-hidden group">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-1 rounded-full border border-white/5">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Daily Digest</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-tight">
            STAY AHEAD OF THE <span className="text-primary">CURVE.</span>
          </h2>
          <p className="telugu-text text-lg text-gray-400">
            ముఖ్యమైన వార్తలు మరియు విశ్లేషణలను నేరుగా మీ ఈమెయిల్ బాక్స్‌లో పొందండి.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[320px]">
          {subscribed ? (
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in duration-500">
               <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                  <CheckCircle className="text-white w-6 h-6" />
               </div>
               <p className="text-sm font-bold uppercase tracking-widest text-white">Subscription Successful!</p>
               <p className="text-xs text-gray-400">Welcome to our daily newsletter.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
              className="relative group"
            >
              <div className="flex flex-col space-y-3">
                 <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold outline-none focus:bg-white/10 focus:border-primary transition-all placeholder:text-gray-600"
                    />
                 </div>
                 <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
                    <span>Subscribe Now</span>
                    <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 text-center uppercase font-bold tracking-tighter">
                * No spam, just pure news. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
