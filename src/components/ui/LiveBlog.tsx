"use client";

import React from 'react';
import { Radio, Clock, Share2 } from 'lucide-react';

interface Update {
  time: string;
  content: string;
  isImportant?: boolean;
}

export function LiveBlog({ updates }: { updates: Update[] }) {
  return (
    <div className="space-y-8">
      {/* Live Indicator */}
      <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full w-fit animate-pulse shadow-lg shadow-red-600/20">
         <Radio className="w-4 h-4" />
         <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
      </div>

      <div className="relative border-l-2 border-gray-100 ml-4 space-y-12 pb-8">
        {updates.map((update, i) => (
          <div key={i} className="relative pl-8">
            {/* Dot Indicator */}
            <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white ${
              i === 0 ? 'bg-primary ring-4 ring-red-100' : 'bg-gray-300'
            }`} />
            
            <div className={`p-6 rounded-2xl transition-all ${
              update.isImportant 
                ? 'bg-red-50 border border-red-100 shadow-sm' 
                : 'bg-white border border-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{update.time}</span>
                </div>
                <button className="text-gray-300 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="telugu-text text-lg font-bold leading-relaxed text-gray-800">
                {update.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
