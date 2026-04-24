"use client";

import React, { useState } from 'react';
import { Vote, CheckCircle2, TrendingUp } from 'lucide-react';

export function NewsPoll() {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    { id: 1, label: "అవును, బలోపేతం అవుతుంది", percent: 65 },
    { id: 2, label: "లేదు, ప్రభావం ఉండదు", percent: 25 },
    { id: 3, label: "చెప్పలేము", percent: 10 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center justify-between mb-2">
         <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Daily Opinion Poll</span>
         </h3>
      </div>

      <div className="space-y-4">
        <h4 className="telugu-text text-lg font-bold text-gray-800 leading-relaxed">
          తెలంగాణలో కొత్త రాజకీయ పొత్తులు రాష్ట్ర అభివృద్ధికి దోహదపడతాయని మీరు భావిస్తున్నారా?
        </h4>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              disabled={voted}
              onClick={() => {
                setSelectedOption(opt.id);
                setVoted(true);
              }}
              className={`w-full p-4 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                selectedOption === opt.id 
                  ? 'border-primary bg-red-50' 
                  : 'border-gray-100 hover:border-gray-200 bg-gray-50'
              }`}
            >
              {/* Progress Bar (Visible after voting) */}
              {voted && (
                <div 
                  className="absolute inset-0 bg-primary/10 transition-all duration-1000 ease-out" 
                  style={{ width: `${opt.percent}%` }}
                />
              )}
              
              <div className="relative z-10 flex items-center justify-between">
                <span className={`telugu-text text-sm font-bold ${selectedOption === opt.id ? 'text-primary' : 'text-gray-600'}`}>
                   {opt.label}
                </span>
                {voted && (
                   <span className="text-xs font-black text-primary">{opt.percent}%</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {!voted ? (
        <button className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all">
           <Vote className="w-4 h-4" />
           <span>Cast Your Vote</span>
        </button>
      ) : (
        <div className="flex items-center justify-center space-x-2 text-green-600">
           <CheckCircle2 className="w-4 h-4" />
           <span className="text-[10px] font-black uppercase tracking-widest">Thanks for voting!</span>
        </div>
      )}
      
      <p className="text-[10px] text-gray-400 font-bold text-center uppercase">Total Votes: 1,245</p>
    </div>
  );
}
