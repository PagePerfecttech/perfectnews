import React from 'react';
import Link from 'next/link';

interface BreakingNewsProps {
  news?: { title: string; slug: string }[];
}

export function BreakingNews({ news = [] }: BreakingNewsProps) {
  const displayItems = news.length > 0 ? news : [
    { title: "ఆంధ్రప్రదేశ్లో భారీ వర్షాలు – ప్రజలకు హెచ్చరిక", slug: "#" },
    { title: "తెలంగాణలో రాజకీయ ఉద్రిక్తత - అసెంబ్లీలో వాడివేడి చర్చ", slug: "#" },
  ];

  return (
    <div className="bg-secondary text-white h-[var(--ticker-height)] flex items-center overflow-hidden border-b border-white/10 relative z-40">
      <div className="bg-primary px-4 h-full flex items-center font-bold text-sm uppercase whitespace-nowrap z-10 shadow-lg">
        Breaking News
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker py-2">
          {displayItems.map((item, index) => (
            <Link 
              key={index} 
              href={`/news/${item.slug}`} 
              className="px-8 telugu-text hover:text-accent transition-colors"
            >
              • {item.title}
            </Link>
          ))}
          {/* Duplicate for seamless loop */}
          {displayItems.map((item, index) => (
            <Link 
              key={`dup-${index}`} 
              href={`/news/${item.slug}`} 
              className="px-8 telugu-text hover:text-accent transition-colors"
            >
              • {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
